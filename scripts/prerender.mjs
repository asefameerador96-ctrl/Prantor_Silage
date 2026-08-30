#!/usr/bin/env node
/**
 * Post-build prerender for every route in src/seo/routeMeta.js.
 *
 * Without it each URL ships an empty <div id="root">, so every crawler that does
 * not execute JavaScript — Bing, WhatsApp, Facebook, GPTBot, PerplexityBot — sees
 * no content. That matters here because the audience finds and shares this site
 * mostly through Facebook and WhatsApp, and because the guide pages exist
 * specifically to be found in search.
 *
 * The client replaces this markup rather than hydrating it (see src/main.jsx):
 * the page animates on mount and on scroll, so the snapshot is a state React's
 * first render cannot reproduce and hydration would fail.
 */
import { createServer } from 'node:http'
import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync } from 'node:fs'
import { dirname, extname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

// Playwright refuses to load on Node < 20, which is an import-time failure that a
// guard around launch() would never see. Import it dynamically so an unsupported
// host skips prerendering instead of blocking the deploy.
let chromium
try {
  ({ chromium } = await import('playwright'))
} catch (err) {
  console.warn('prerender: skipped - Playwright could not be loaded.')
  console.warn('  ' + String(err.message).split(String.fromCharCode(10))[0])
  console.warn('  Node ' + process.versions.node + ' is in use; Playwright needs Node 20 or newer.')
  process.exit(0)
}

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')

const source = readFileSync(join(root, 'src/seo/routeMeta.js'), 'utf8')
const body = source.slice(source.indexOf('export const ROUTE_META'))
const routes = [...body.matchAll(/^ {2}'(\/[^']*)':/gm)].map((m) => m[1])

if (routes.length === 0) {
  console.error('prerender: no routes found in src/seo/routeMeta.js')
  process.exit(1)
}

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf',
  '.mp4': 'video/mp4', '.ico': 'image/x-icon', '.xml': 'application/xml',
  '.txt': 'text/plain',
}

const server = createServer((req, res) => {
  const urlPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname)
  let file = join(dist, urlPath)
  if (!existsSync(file) || statSync(file).isDirectory()) file = join(dist, 'index.html')
  try {
    res.writeHead(200, { 'Content-Type': MIME[extname(file)] ?? 'application/octet-stream' })
    res.end(readFileSync(file))
  } catch {
    res.writeHead(500).end('error')
  }
})

const port = await new Promise((ok) => server.listen(0, () => ok(server.address().port)))

let browser
try {
  browser = await chromium.launch()
} catch (err) {
  server.close()
  console.warn('prerender: skipped - could not launch Chromium.')
  console.warn('  ' + String(err.message).split(String.fromCharCode(10))[0])
  console.warn('  Fix with: npx playwright install chromium')
  process.exit(0)
}

const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })
const failures = []
let written = 0

for (const route of routes) {
  try {
    await page.goto(`http://127.0.0.1:${port}${route}`, { waitUntil: 'networkidle', timeout: 60000 })
    await page.waitForFunction(() => document.querySelector('#root')?.children.length > 0, { timeout: 25000 })

    // Sections reveal on scroll, so walk the page before snapshotting; otherwise the
    // captured HTML holds content still sitting at opacity:0.
    await page.evaluate(async () => {
      const step = window.innerHeight
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y)
        await new Promise((r) => setTimeout(r, 180))
      }
      window.scrollTo(0, 0)
      await new Promise((r) => setTimeout(r, 250))
    })
    await page.waitForTimeout(400)

    const text = await page.evaluate(() => document.body.innerText.trim().length)
    if (text < 600) throw new Error(`only ${text} characters of text rendered`)

    const html = await page.evaluate(() => {
      // Vite injects <link rel="modulepreload" as="script"> at runtime when a dynamic
      // import fires. Those would be baked into the static HTML of every route,
      // making each page preload chunks it never uses. Vite's own build-time
      // preloads carry no "as" attribute, so only the runtime ones go.
      for (const link of document.querySelectorAll('link[rel="modulepreload"][as="script"]')) {
        link.remove()
      }

      // The hero video is attached on idle by the client precisely so it does not
      // compete with first paint. By snapshot time that has happened, so the source
      // has to come back out or the browser would fetch 2.7 MB straight from the
      // static HTML. The poster is what the static view should show.
      for (const video of document.querySelectorAll('video')) {
        video.removeAttribute('src')
        video.setAttribute('preload', 'none')
      }

      // In the snapshot every section exists at once, and an <img> with no loading
      // attribute is eager by default — so the gallery would be fetched up front
      // rather than progressively as it was before prerendering.
      const fold = window.innerHeight
      for (const img of document.images) {
        const belowFold = img.getBoundingClientRect().top > fold
        if (belowFold && img.getAttribute('loading') !== 'lazy') img.setAttribute('loading', 'lazy')
        if (belowFold) img.setAttribute('fetchpriority', 'low')
        if (!img.getAttribute('decoding')) img.setAttribute('decoding', 'async')
      }

      document.getElementById('root')?.setAttribute('data-prerendered', 'true')
      return '<!doctype html>\n' + document.documentElement.outerHTML
    })

    const outDir = route === '/' ? dist : join(dist, route)
    mkdirSync(outDir, { recursive: true })
    writeFileSync(join(outDir, 'index.html'), html)
    written++
    console.log(`  prerendered ${route} (${text} characters)`)
  } catch (err) {
    failures.push(`${route}: ${String(err.message).split(String.fromCharCode(10))[0]}`)
  }
}

await browser.close()
server.close()

if (failures.length) {
  console.error(`prerender: ${failures.length} route(s) FAILED:`)
  for (const f of failures) console.error(`  ${f}`)
  process.exit(1) // never ship a partially prerendered build
}
console.log(`prerender: ${written}/${routes.length} routes written`)

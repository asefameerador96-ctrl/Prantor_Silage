#!/usr/bin/env node
/**
 * Generates public/sitemap.xml and public/robots.txt from the routes declared in
 * src/seo/routeMeta.js, so a new guide page cannot be added without appearing in
 * the sitemap. Runs before every build.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SITE = 'https://www.prantorsilage.com'

const source = readFileSync(resolve(root, 'src/seo/routeMeta.js'), 'utf8')
const body = source.slice(source.indexOf('export const ROUTE_META'))
const routes = [...body.matchAll(/^ {2}'(\/[^']*)':/gm)].map((m) => m[1])

if (routes.length === 0) {
  console.error('generate-sitemap: no routes found in src/seo/routeMeta.js')
  process.exit(1)
}

const lastmod = new Date().toISOString().slice(0, 10)
const priority = (r) => (r === '/' ? '1.0' : r === '/guide' ? '0.8' : '0.7')
const changefreq = (r) => (r === '/' ? 'weekly' : 'monthly')

const urls = routes
  .map(
    (r) => `  <url>
    <loc>${SITE}${r}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq(r)}</changefreq>
    <priority>${priority(r)}</priority>
  </url>`
  )
  .join('\n')

writeFileSync(
  resolve(root, 'public/sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
)

writeFileSync(
  resolve(root, 'public/robots.txt'),
  `User-agent: *
Allow: /

# AI crawlers — allowed, so the brand is citable in AI answers.
User-agent: GPTBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

Sitemap: ${SITE}/sitemap.xml
`
)

console.log(`generate-sitemap: wrote ${routes.length} URLs`)

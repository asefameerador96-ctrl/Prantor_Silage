#!/usr/bin/env node
/**
 * Post-build prerender for this single-page site.
 *
 * Without it the site ships an empty <div id="root">, so every crawler that does
 * not execute JavaScript — Bing, WhatsApp, Facebook, LinkedIn, GPTBot,
 * PerplexityBot — sees no content at all. That matters here because the audience
 * finds and shares this site mostly through Facebook and WhatsApp.
 *
 * The client replaces this markup rather than hydrating it (see src/main.jsx):
 * the page animates on mount and on scroll, so the snapshot is a state React's
 * first render cannot reproduce and hydration would fail. Replacing costs one
 * render on a page that was fully client-rendered before this step existed.
 */
import { createServer } from "node:http";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// Playwright is imported dynamically and the browser is launched inside a guard.
// It refuses to load at all on Node < 20, which is an import-time failure that a
// try/catch around launch() would never see — that is exactly how this step broke
// the first time it ran in CI.
let chromium;
try {
  ({ chromium } = await import("playwright"));
} catch (err) {
  console.warn("prerender: skipped - Playwright could not be loaded.");
  console.warn("  " + String(err.message).split(String.fromCharCode(10))[0]);
  console.warn("  Node " + process.versions.node + " is in use; Playwright needs Node 20 or newer.");
  console.warn("  The site still deploys, but crawlers that do not run JavaScript");
  console.warn("  will see an empty page.");
  process.exit(0);
}

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");

const MIME = {
  ".html": "text/html", ".js": "text/javascript", ".css": "text/css",
  ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png",
  ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp",
  ".woff": "font/woff", ".woff2": "font/woff2", ".ttf": "font/ttf",
  ".mp4": "video/mp4", ".ico": "image/x-icon", ".xml": "application/xml",
  ".txt": "text/plain",
};

const server = createServer((req, res) => {
  const urlPath = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
  let file = join(dist, urlPath);
  if (!existsSync(file) || urlPath.endsWith("/")) file = join(dist, "index.html");
  try {
    res.writeHead(200, { "Content-Type": MIME[extname(file)] ?? "application/octet-stream" });
    res.end(readFileSync(file));
  } catch {
    res.writeHead(500).end("error");
  }
});

const port = await new Promise((ok) => server.listen(0, () => ok(server.address().port)));

// A build host without the Chromium download should still ship a working site, just
// without the prerendered HTML. Any other failure is a real bug and must fail loudly.
let browser;
try {
  browser = await chromium.launch();
} catch (err) {
  server.close();
  console.warn("prerender: skipped - could not launch Chromium.");
  console.warn("  " + String(err.message).split(String.fromCharCode(10))[0]);
  console.warn("  The site still deploys, but crawlers that do not run JavaScript");
  console.warn("  will see an empty page. Fix with: npx playwright install chromium");
  process.exit(0);
}
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

try {
  await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForFunction(() => document.querySelector("#root")?.children.length > 0, { timeout: 20000 });

  // Sections reveal on scroll via IntersectionObserver. Walk the page so each one
  // has fired before the snapshot, otherwise the captured HTML holds content
  // still sitting at opacity:0.
  await page.evaluate(async () => {
    const step = window.innerHeight;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 200));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 300));
  });
  await page.waitForTimeout(500);

  const html = await page.evaluate(() => {
    document.getElementById("root")?.setAttribute("data-prerendered", "true");
    return "<!doctype html>\n" + document.documentElement.outerHTML;
  });

  const text = await page.evaluate(() => document.body.innerText.trim().length);
  if (text < 800) throw new Error(`only ${text} characters of text rendered — refusing to ship this snapshot`);

  writeFileSync(join(dist, "index.html"), html);
  console.log(`prerender: wrote dist/index.html (${text} characters of visible text)`);
} catch (err) {
  console.error(`prerender FAILED: ${err.message}`);
  process.exitCode = 1;
} finally {
  await browser.close();
  server.close();
}

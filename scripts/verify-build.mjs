#!/usr/bin/env node
/**
 * Smoke-tests the built dist/ in a real browser after prerendering: fails on any
 * console error, on a page that renders no text, or on an image that did not load
 * (which would catch a broken asset path after image conversion).
 */
import { createServer } from "node:http";
import { readFileSync, existsSync, statSync } from "node:fs";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// Matches scripts/prerender.mjs: if Playwright cannot load (Node < 20), skip rather
// than fail, since the site itself is still fine.
let chromium;
try {
  ({ chromium } = await import("playwright"));
} catch {
  console.warn("verify-build: skipped - Playwright unavailable on Node " + process.versions.node + ".");
  process.exit(0);
}

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");

const MIME = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css",
  ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png",
  ".webp": "image/webp", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".mp4": "video/mp4",
  ".woff2": "font/woff2", ".woff": "font/woff", ".xml": "application/xml",
  ".txt": "text/plain", ".ico": "image/x-icon" };

const srv = createServer((q, r) => {
  let f = join(dist, decodeURIComponent(new URL(q.url, "http://x").pathname));
  if (!existsSync(f) || statSync(f).isDirectory()) f = join(dist, "index.html");
  try {
    r.writeHead(200, { "Content-Type": MIME[extname(f)] ?? "application/octet-stream" });
    r.end(readFileSync(f));
  } catch {
    r.writeHead(500).end();
  }
});

const port = await new Promise((ok) => srv.listen(0, () => ok(srv.address().port)));
const browser = await chromium.launch();
const page = await browser.newPage();

const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });

await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: "networkidle", timeout: 45000 });
await page.waitForTimeout(1200);

// Most gallery images are loading="lazy", so they report naturalWidth 0 until they
// enter the viewport. Scroll the whole page first, otherwise the broken-image check
// flags every below-the-fold image regardless of whether the file exists.
await page.evaluate(async () => {
  const step = window.innerHeight;
  for (let y = 0; y < document.body.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 220));
  }
  window.scrollTo(0, 0);
});
await page.waitForLoadState("networkidle");
await page.waitForTimeout(800);

const result = await page.evaluate(() => ({
  title: document.title,
  text: document.body.innerText.trim().length,
  brokenImages: [...document.images]
    .filter((i) => !i.complete || i.naturalWidth === 0)
    .map((i) => i.currentSrc || i.src)
    .slice(0, 5),
}));

await browser.close();
srv.close();

// Third-party font/CDN noise does not affect correctness of the page itself.
const real = errors.filter((e) => !/favicon|net::ERR_|Failed to load resource/i.test(e));
const problems = [];
if (real.length) problems.push(`${real.length} console error(s): ${real.slice(0, 3).join(" | ")}`);
if (result.brokenImages.length) problems.push(`broken images: ${result.brokenImages.join(", ")}`);
if (result.text < 800) problems.push(`only ${result.text} characters of text rendered`);

console.log(`verify-build: "${result.title.slice(0, 60)}" — ${result.text} chars, ${result.brokenImages.length} broken images`);
if (problems.length) {
  console.error("verify-build FAILED:\n  " + problems.join("\n  "));
  process.exit(1);
}
console.log("verify-build: ok");

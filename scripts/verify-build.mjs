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

const source = readFileSync(join(root, "src/seo/routeMeta.js"), "utf8");
const body = source.slice(source.indexOf("export const ROUTE_META"));
const routes = [...body.matchAll(/^ {2}'(\/[^']*)':/gm)].map((m) => m[1]);

const MIME = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css",
  ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png",
  ".webp": "image/webp", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".mp4": "video/mp4",
  ".woff2": "font/woff2", ".woff": "font/woff", ".xml": "application/xml",
  ".txt": "text/plain", ".ico": "image/x-icon" };

const srv = createServer((q, r) => {
  let f = join(dist, decodeURIComponent(new URL(q.url, "http://x").pathname));
  if (existsSync(join(f, "index.html"))) f = join(f, "index.html");
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
const problems = [];
const seenTitles = new Map();

for (const route of routes) {
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });

  await page.goto(`http://127.0.0.1:${port}${route}`, { waitUntil: "networkidle", timeout: 45000 });
  await page.waitForTimeout(1000);

  // Gallery images are loading="lazy", so scroll before checking for broken ones —
  // otherwise every below-the-fold image reports naturalWidth 0.
  await page.evaluate(async () => {
    const step = window.innerHeight;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 200));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(600);

  const r = await page.evaluate(() => ({
    title: document.title,
    canonical: document.querySelector('link[rel="canonical"]')?.href ?? "",
    robots: document.querySelector('meta[name="robots"]')?.content ?? "",
    text: document.body.innerText.trim().length,
    broken: [...document.images].filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.currentSrc || i.src).slice(0, 4),
  }));

  const real = errors.filter((e) => !/favicon|net::ERR_|Failed to load resource/i.test(e));
  const issues = [];
  if (real.length) issues.push(`console: ${real.slice(0, 2).join(" | ")}`);
  if (r.broken.length) issues.push(`broken images: ${r.broken.join(", ")}`);
  if (r.text < 600) issues.push(`only ${r.text} chars of text`);
  if (!r.canonical.endsWith(route === "/" ? ".com/" : route)) issues.push(`canonical is ${r.canonical}`);
  if (!r.robots.startsWith("index")) issues.push(`robots is "${r.robots}"`);
  // Duplicate titles across routes are the exact problem these pages exist to avoid.
  if (seenTitles.has(r.title)) issues.push(`title duplicates ${seenTitles.get(r.title)}`);
  seenTitles.set(r.title, route);

  console.log(`  ${issues.length ? "FAIL" : "ok  "} ${route.padEnd(32)} ${String(r.text).padStart(5)} chars  "${r.title.slice(0, 42)}"`);
  if (issues.length) problems.push({ route, issues });
  await page.close();
}

await browser.close();
srv.close();

if (problems.length) {
  console.error("");
  console.error("verify-build FAILED:");
  for (const p of problems) {
    console.error("  " + p.route);
    for (const issue of p.issues) console.error("    " + issue);
  }
  process.exit(1);
}
console.error("");
console.log(`verify-build: all ${routes.length} routes render cleanly with distinct titles`);

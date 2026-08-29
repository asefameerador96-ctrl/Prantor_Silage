#!/usr/bin/env node
/**
 * Rewrites public/sitemap.xml with today's date on every build, so <lastmod>
 * cannot go stale the way a hand-edited sitemap does. Single-page site, so there
 * is exactly one URL.
 */
import { writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://www.prantorsilage.com";
const lastmod = new Date().toISOString().slice(0, 10);

writeFileSync(
  resolve(root, "public/sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`
);

console.log(`generate-sitemap: ${SITE}/ lastmod ${lastmod}`);

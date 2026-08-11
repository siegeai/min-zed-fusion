/**
 * Writes a real HTML file for every route, so GitHub Pages serves them with a
 * 200 instead of a 404.
 *
 * The problem this solves: Pages has no server, so any path without a matching
 * file falls through to 404.html. The CI copies index.html there, which makes
 * deep links WORK in a browser (React boots and routes on the client) while
 * still returning HTTP 404 on the wire. Every subpage in sitemap.xml was
 * answering 404, and Google does not index a 404. Only the homepage was ever
 * indexable.
 *
 * It also fixes a quieter version of the same thing. Because every route was
 * served the same index.html, a crawler that does not execute JavaScript saw
 * the HOMEPAGE's title and description on /pricing and /about. Helmet only
 * corrects that after React mounts. Now each route ships with its own metadata
 * already in the markup.
 *
 * Titles and descriptions are read out of the page components rather than
 * duplicated here, so there is one source of truth and these cannot drift from
 * what Helmet renders for real visitors.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const SITE = "https://getmin.ai";

// Mirrors the routes in src/App.tsx. The catch-all and "/" are handled
// separately: "/" is dist/index.html itself, and the catch-all is 404.html.
const ROUTES = [
  ["/about", "About.tsx"],
  ["/careers", "Careers.tsx"],
  ["/contact", "Contact.tsx"],
  ["/privacy", "PrivacyPolicy.tsx"],
  ["/terms", "TermsOfService.tsx"],
  ["/security", "Security.tsx"],
  ["/pricing", "Pricing.tsx"],
  ["/join-community", "JoinCommunity.tsx"],
];

/** Pull the Helmet values straight out of the page component. */
function readMeta(file) {
  const src = readFileSync(join(root, "src/pages", file), "utf8");
  const title = src.match(/<title>([\s\S]*?)<\/title>/)?.[1]?.replace(/\s+/g, " ").trim();
  const description = src
    .match(/name="description"\s*\n?\s*content=(?:\{)?"([\s\S]*?)"/)?.[1]
    ?.replace(/\s+/g, " ")
    .trim();
  return { title, description };
}

function setTag(html, pattern, replacement) {
  return pattern.test(html) ? html.replace(pattern, replacement) : html;
}

const template = readFileSync(join(dist, "index.html"), "utf8");
const rows = [];
let missing = 0;

for (const [route, file] of ROUTES) {
  const { title, description } = readMeta(file);
  if (!title || !description) {
    // Loud, and non-fatal: a page without its own metadata still deserves a
    // 200. It just inherits the homepage's copy until someone adds a Helmet.
    console.warn(`  ! ${route}: could not read ${!title ? "title" : "description"} from ${file}`);
    missing++;
  }

  let html = template;
  const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;");

  if (title) {
    html = setTag(html, /<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`);
    html = setTag(html, /(<meta property="og:title" content=")[^"]*(")/, `$1${esc(title)}$2`);
    html = setTag(html, /(<meta name="twitter:title" content=")[^"]*(")/, `$1${esc(title)}$2`);
  }
  if (description) {
    html = setTag(html, /(<meta name="description" content=")[^"]*(")/, `$1${esc(description)}$2`);
    html = setTag(html, /(<meta property="og:description" content=")[^"]*(")/, `$1${esc(description)}$2`);
    html = setTag(html, /(<meta name="twitter:description" content=")[^"]*(")/, `$1${esc(description)}$2`);
  }

  // Trailing slash: GitHub Pages serves dist/<route>/index.html at "/route/"
  // and 301s "/route" to it. Pointing canonical at the redirecting form tells
  // Google the canonical URL is not the one that answers 200.
  const canonical = `${SITE}${route}/`;
  html = setTag(html, /(<meta property="og:url" content=")[^"]*(")/, `$1${canonical}$2`);
  html = /<link rel="canonical"/.test(html)
    ? html.replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${canonical}" />`)
    : html.replace("</head>", `    <link rel="canonical" href="${canonical}" />\n  </head>`);

  const outDir = join(dist, route.replace(/^\//, ""));
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "index.html"), html);
  rows.push({ route, title: (title ?? "(inherited)").slice(0, 52) });
}

console.log(`\n  prerendered ${rows.length} routes as real files (was: 404 for all of them)`);
for (const r of rows) console.log(`    ${r.route.padEnd(17)} ${r.title}`);
if (missing) console.log(`  ${missing} route(s) fell back to homepage copy`);

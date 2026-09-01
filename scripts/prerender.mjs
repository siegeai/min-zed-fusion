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
import { execFileSync } from "node:child_process";
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
  ["/blog", "Blog.tsx"],
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

/**
 * Blog posts are a dynamic route, so their metadata lives in the post data
 * rather than in a page component. Read straight out of src/content/posts.ts:
 * a post that exists but is not emitted here would answer 404 to a crawler
 * while working perfectly in a browser, which is the exact failure this whole
 * script exists to prevent.
 */
function readPosts() {
  const src = readFileSync(join(root, "src/content/posts.ts"), "utf8");
  // Tolerates escaped quotes inside a title or excerpt.
  const STR = '"((?:[^"\\\\]|\\\\.)*)"';
  const re = new RegExp(
    "slug:\\s*" + STR + "[\\s\\S]*?title:\\s*" + STR +
    "[\\s\\S]*?excerpt:\\s*" + STR + "[\\s\\S]*?date:\\s*" + STR,
    "g",
  );
  const out = [];
  let m;
  while ((m = re.exec(src))) {
    const unesc = (v) => v.replace(/\\(.)/g, "$1");
    out.push({
      slug: unesc(m[1]), title: unesc(m[2]), description: unesc(m[3]), date: unesc(m[4]),
    });
  }
  return out;
}

function setTag(html, pattern, replacement) {
  return pattern.test(html) ? html.replace(pattern, replacement) : html;
}

/**
 * Escapes a value for use inside a String.replace REPLACEMENT.
 *
 * "$" is special there: a description containing "$20" was read as capture
 * group $2 followed by "0", which on the pricing page expanded to the closing
 * quote and truncated the meta tag mid-sentence. It shipped that way. Any copy
 * with a price in it hits this, so every interpolation below goes through lit().
 */
const lit = (v) => String(v).replace(/\$/g, "$$$$");

/* ── crawler mirror ───────────────────────────────────────────────────────
 *
 * The hidden <main> inside index.html is the copy a crawler sees when it does
 * not run JavaScript. It used to be written by hand next to the markup it
 * duplicated, and it drifted four times without ever failing a build.
 * scripts/mirror-entry.tsx renders the real component instead, so it cannot.
 *
 * Only the homepage gets one. Every route was previously served the HOMEPAGE's
 * mirror, which told a crawler that /pricing and /security were about the
 * landing page. No mirror is better than the wrong one: these routes still
 * ship their own title, description and canonical below.
 */
const rawTemplate = readFileSync(join(dist, "index.html"), "utf8");
const MIRROR = /[ \t]*<!-- mirror:start -->[\s\S]*?<!-- mirror:end -->\n?/;
if (!MIRROR.test(rawTemplate)) {
  throw new Error("prerender: mirror markers missing from index.html");
}

const { renderMirror } = await import("../.mirror-ssr/mirror-entry.js");
const mirrorBlock = `      <main hidden>\n${renderMirror()}\n      </main>\n`;
writeFileSync(join(dist, "index.html"), rawTemplate.replace(MIRROR, () => mirrorBlock));
console.log(`  crawler mirror: ${mirrorBlock.trim().split("\n").length - 2} blocks rendered from the live component`);

const template = rawTemplate.replace(MIRROR, "");

/* ── copy guard ────────────────────────────────────────────────────────────
 *
 * No em or en dashes in anything a visitor reads. They are a house rule and
 * they are also the single most reliable tell that a line was not written by
 * a person, so this fails the build rather than trusting a review to catch it.
 *
 * Source files rather than dist, because every route except "/" renders on the
 * client, so the built HTML does not contain their copy to scan.
 */
const COPY_FILES = [
  "index.html",
  "public/llms.txt",
  "public/og-image.html",
  "src/content/posts.ts",
  "src/components/MinFooter.tsx",
  "src/components/PillNav.tsx",
  "src/components/page/Kit.tsx",
  "src/components/landing/MinionLanding.tsx",
  "src/components/landing/AskMin.tsx",
  ...ROUTES.map(([, file]) => `src/pages/${file}`),
];

const dashHits = [];
for (const rel of COPY_FILES) {
  const full = join(root, rel);
  if (!existsSync(full)) continue;
  readFileSync(full, "utf8").split("\n").forEach((line, i) => {
    if (/[\u2014\u2013]/.test(line)) dashHits.push(`${rel}:${i + 1}  ${line.trim().slice(0, 90)}`);
  });
}
if (dashHits.length) {
  throw new Error(
    `copy guard: em/en dash in ${dashHits.length} place(s). Use a comma, colon or full stop.\n  ` +
      dashHits.join("\n  ")
  );
}
console.log(`  copy guard: ${COPY_FILES.length} files clean of em/en dashes`);
const rows = [];
let missing = 0;

const esc = (v) => v.replace(/&/g, "&amp;").replace(/"/g, "&quot;");

/** Write dist/<route>/index.html with its own title, description and canonical. */
function emit(route, title, description, extraHead = "") {
  let html = template;

  if (title) {
    html = setTag(html, /<title>[\s\S]*?<\/title>/, `<title>${lit(esc(title))}</title>`);
    html = setTag(html, /(<meta property="og:title" content=")[^"]*(")/, `$1${lit(esc(title))}$2`);
    html = setTag(html, /(<meta name="twitter:title" content=")[^"]*(")/, `$1${lit(esc(title))}$2`);
  }
  if (description) {
    html = setTag(html, /(<meta name="description" content=")[^"]*(")/, `$1${lit(esc(description))}$2`);
    html = setTag(html, /(<meta property="og:description" content=")[^"]*(")/, `$1${lit(esc(description))}$2`);
    html = setTag(html, /(<meta name="twitter:description" content=")[^"]*(")/, `$1${lit(esc(description))}$2`);
  }

  // Trailing slash: GitHub Pages serves dist/<route>/index.html at "/route/"
  // and 301s "/route" to it. Pointing canonical at the redirecting form tells
  // Google the canonical URL is not the one that answers 200.
  if (route.startsWith("/blog/")) {
    html = setTag(html, /(<meta property="og:type" content=")[^"]*(")/, `$1article$2`);
  }

  const canonical = `${SITE}${route}/`;
  html = setTag(html, /(<meta property="og:url" content=")[^"]*(")/, `$1${lit(canonical)}$2`);
  html = /<link rel="canonical"/.test(html)
    ? html.replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${lit(canonical)}" />`)
    : html.replace("</head>", `    <link rel="canonical" href="${canonical}" />\n  </head>`);

  if (extraHead) html = html.replace("</head>", `${lit(extraHead)}\n  </head>`);

  const outDir = join(dist, route.replace(/^\//, ""));
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
  // The bug above was silent for a full deploy, so verify rather than trust.
  for (const [label, value] of [["title", title], ["description", description]]) {
    if (value && !html.includes(esc(value))) {
      throw new Error(
        `prerender: ${route} ${label} was mangled on the way into the HTML.\n` +
          `  wanted: ${value}\n` +
          `  got:    ${html.match(new RegExp(`<meta name="${label}" content="([^"]*)"`))?.[1] ?? "(missing)"}`
      );
    }
  }
  writeFileSync(join(outDir, "index.html"), html);
}

for (const [route, file] of ROUTES) {
  const { title, description } = readMeta(file);
  if (!title || !description) {
    // Loud, and non-fatal: a page without its own metadata still deserves a
    // 200. It just inherits the homepage's copy until someone adds a Helmet.
    console.warn(`  ! ${route}: could not read ${!title ? "title" : "description"} from ${file}`);
    missing++;
  }
  emit(route, title, description);
  rows.push({ route, title: (title ?? "(inherited)").slice(0, 52) });
}

const posts = readPosts();
if (!posts.length) {
  // Not fatal, but it means every post URL will 404 for crawlers.
  console.warn("  ! no posts parsed from src/content/posts.ts");
}
for (const post of posts) {
  const url = `${SITE}/blog/${post.slug}/`;
  const ld = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    url,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Person", name: "Eric Wang", url: `${SITE}/about/` },
    publisher: {
      "@type": "Organization",
      name: "min.",
      url: SITE,
      logo: { "@type": "ImageObject", url: `${SITE}/favicon.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: `${SITE}/og-cover-yours.png`,
  };
  const extraHead = [
    `    <meta property="article:published_time" content="${post.date}" />`,
    `    <meta property="article:author" content="Eric Wang" />`,
    `    <script type="application/ld+json">${JSON.stringify(ld)}</script>`,
  ].join("\n");

  emit(`/blog/${post.slug}`, `${post.title} | min.`, post.description, extraHead);
  rows.push({ route: `/blog/${post.slug}`, title: post.title.slice(0, 52) });
}

/* ── sitemap ──────────────────────────────────────────────────────────────
 *
 * Generated here rather than hand-kept in public/, for the same reason the
 * HTML above is: a list maintained by hand drifts from the router, and the
 * drift is silent.
 *
 * It had drifted in a way that actively worked against us. Every lastmod read
 * 2026-08-19 while sixteen commits shipped on the 20th, including a rebuild of
 * every sub page. lastmod is a crawl scheduling hint, so a stale one tells
 * Google there is nothing new to come back for, on exactly the pages that had
 * just changed.
 *
 * Dates come from git: the newest commit touching either the page's own source
 * or the shared chrome every page renders through. That is honest without
 * anyone having to remember to bump anything, and a change to the nav or the
 * palette correctly marks every page as modified, because it modified them.
 */
function gitDate(paths) {
  for (const p of paths) {
    try {
      const out = execFileSync("git", ["log", "-1", "--format=%cs", "--", p], {
        cwd: root,
        encoding: "utf8",
      }).trim();
      if (out) return out;
    } catch {
      /* not a git checkout, or the path never existed: fall through */
    }
  }
  return null;
}

const SHARED = [
  "src/components/PillNav.tsx",
  "src/components/MinFooter.tsx",
  "src/components/page/Kit.tsx",
  "src/index.css",
  "tailwind.config.ts",
];
const sharedDate = gitDate(SHARED) ?? new Date().toISOString().slice(0, 10);
const newer = (a, b) => (!a ? b : !b ? a : a > b ? a : b);

const sitemapEntries = [
  { loc: `${SITE}/`, priority: "1.0", changefreq: "daily",
    lastmod: newer(gitDate(["src/components/landing/PlainLanding.tsx", "src/pages/Index.tsx"]), sharedDate) },
  ...ROUTES.map(([route, file]) => ({
    loc: `${SITE}${route}/`,
    priority: route === "/pricing" ? "0.9" : "0.7",
    changefreq: "weekly",
    lastmod: newer(gitDate([`src/pages/${file}`]), sharedDate),
  })),
  ...posts.map((post) => ({
    loc: `${SITE}/blog/${post.slug}/`,
    priority: "0.6",
    changefreq: "monthly",
    // A post's own date is the truth for it; shared chrome does not restate it.
    lastmod: post.date?.slice(0, 10) ?? sharedDate,
  })),
];

writeFileSync(
  join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    sitemapEntries
      .map(
        (e) =>
          `  <url>\n` +
          `    <loc>${e.loc}</loc>\n` +
          `    <lastmod>${e.lastmod}</lastmod>\n` +
          `    <changefreq>${e.changefreq}</changefreq>\n` +
          `    <priority>${e.priority}</priority>\n` +
          `  </url>`
      )
      .join("\n") +
    `\n</urlset>\n`
);

const staleDates = sitemapEntries.filter((e) => !/^\d{4}-\d{2}-\d{2}$/.test(e.lastmod));
if (staleDates.length) throw new Error(`sitemap: bad lastmod on ${staleDates.map((e) => e.loc).join(", ")}`);
console.log(`  sitemap.xml: ${sitemapEntries.length} urls, newest lastmod ${sitemapEntries.map((e) => e.lastmod).sort().at(-1)}`);

console.log(`\n  prerendered ${rows.length} routes as real files (was: 404 for all of them)`);
for (const r of rows) console.log(`    ${r.route.padEnd(17)} ${r.title}`);
if (missing) console.log(`  ${missing} route(s) fell back to homepage copy`);

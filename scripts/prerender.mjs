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

const template = readFileSync(join(dist, "index.html"), "utf8");
const rows = [];
let missing = 0;

const esc = (v) => v.replace(/&/g, "&amp;").replace(/"/g, "&quot;");

/** Write dist/<route>/index.html with its own title, description and canonical. */
function emit(route, title, description, extraHead = "") {
  let html = template;

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
  if (route.startsWith("/blog/")) {
    html = setTag(html, /(<meta property="og:type" content=")[^"]*(")/, `$1article$2`);
  }

  const canonical = `${SITE}${route}/`;
  html = setTag(html, /(<meta property="og:url" content=")[^"]*(")/, `$1${canonical}$2`);
  html = /<link rel="canonical"/.test(html)
    ? html.replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${canonical}" />`)
    : html.replace("</head>", `    <link rel="canonical" href="${canonical}" />\n  </head>`);

  if (extraHead) html = html.replace("</head>", `${extraHead}\n  </head>`);

  const outDir = join(dist, route.replace(/^\//, ""));
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
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
    image: `${SITE}/og-cover.png`,
  };
  const extraHead = [
    `    <meta property="article:published_time" content="${post.date}" />`,
    `    <meta property="article:author" content="Eric Wang" />`,
    `    <script type="application/ld+json">${JSON.stringify(ld)}</script>`,
  ].join("\n");

  emit(`/blog/${post.slug}`, `${post.title} | min.`, post.description, extraHead);
  rows.push({ route: `/blog/${post.slug}`, title: post.title.slice(0, 52) });
}

console.log(`\n  prerendered ${rows.length} routes as real files (was: 404 for all of them)`);
for (const r of rows) console.log(`    ${r.route.padEnd(17)} ${r.title}`);
if (missing) console.log(`  ${missing} route(s) fell back to homepage copy`);

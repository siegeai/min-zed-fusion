/**
 * Do the in-page links in the nav and footer actually move the page?
 *
 * Run: npm run check:links   (needs a build in dist/ first)
 *
 * This exists because the bug it catches is invisible to every cheaper check.
 * The hrefs were right, the ids existed, and the scroll call was made; the page
 * simply did not move, because a link can only bring its target to the top of
 * the viewport if there is a viewport's worth of page below it. A section at
 * the end of the document therefore reads as a dead link, and only on tall
 * windows, which is why it survived several rounds of "looks fine to me".
 *
 * So this asserts the OUTCOME, scrollY and the target's final position, across
 * a range of viewport heights, rather than asserting that a function was
 * called.
 */
import puppeteer from "puppeteer";
import { createServer } from "node:http";
import { readFileSync, existsSync, statSync } from "node:fs";
import { join, extname } from "node:path";
const DIST = process.argv[2];
const T = { ".html":"text/html",".js":"text/javascript",".css":"text/css",".png":"image/png",".svg":"image/svg+xml",".txt":"text/plain" };
const server = createServer((req,res)=>{ let p=join(DIST, decodeURIComponent(req.url.split("?")[0]));
  if (existsSync(p)&&statSync(p).isDirectory()) p=join(p,"index.html");
  if (!existsSync(p)) p=join(DIST,"index.html");
  res.writeHead(200,{ "Content-Type": T[extname(p)]??"application/octet-stream" }); res.end(readFileSync(p)); });
await new Promise(r=>server.listen(0,r));
const base=`http://localhost:${server.address().port}`;
const browser = await puppeteer.launch({ headless: "new" });
const out=[];
async function run(name, { viewport, reducedMotion, scrollToBottomFirst, startPath }) {
  const page = await browser.newPage();
  await page.setViewport(viewport);
  if (reducedMotion) await page.emulateMediaFeatures([{ name:"prefers-reduced-motion", value:"reduce" }]);
  await page.goto(base+startPath, { waitUntil:"networkidle0" });
  if (scrollToBottomFirst) {
    await page.evaluate(()=>window.scrollTo(0, document.body.scrollHeight));
    await new Promise(r=>setTimeout(r,700));
  }
  const before = await page.evaluate(()=>Math.round(window.scrollY));
  const ok = await page.evaluate(()=>{ const a=[...document.querySelectorAll("footer a")]
      .find(x=>x.textContent.trim()==="All your repos"); if(!a) return false; a.click(); return true; });
  await new Promise(r=>setTimeout(r,1800));
  const after = await page.evaluate(()=>{ const el=document.getElementById("repos"); const r=el?.getBoundingClientRect();
    return { y:Math.round(window.scrollY), top:r?Math.round(r.top):null, inView:r?(r.top>=-5&&r.top<innerHeight):false }; });
  out.push({ name, clicked:ok, before, after:after.y, targetTop:after.top, inView:after.inView, MOVED: Math.abs(after.y-before)>50 });
  await page.close();
}
await run("footer link, 900px window",   { viewport:{width:1440,height:900},  scrollToBottomFirst:true, startPath:"/" });
await run("footer link, 1200px window",  { viewport:{width:1440,height:1200}, scrollToBottomFirst:true, startPath:"/" });
await run("footer link, 1400px window",  { viewport:{width:1440,height:1400}, scrollToBottomFirst:true, startPath:"/" });
await run("footer link, laptop 1280x720",{ viewport:{width:1280,height:720},  scrollToBottomFirst:true, startPath:"/" });
await run("footer link, mobile 390x844", { viewport:{width:390,height:844},   scrollToBottomFirst:true, startPath:"/" });
await run("footer link, reduced motion", { viewport:{width:1440,height:900},  scrollToBottomFirst:true, reducedMotion:true, startPath:"/" });
await run("cross-route from /pricing",   { viewport:{width:1440,height:900},  scrollToBottomFirst:true, startPath:"/pricing/" });
console.table(out);
const bad=out.filter(r=>!r.clicked || !r.inView || r.targetTop===null || r.targetTop>200);
console.log(bad.length?`\n  FAIL: ${bad.map(b=>b.name).join(" | ")}`:`\n  PASS: all ${out.length}`);
await browser.close(); server.close();

/**
 * Renders the landing page to the static text mirror that ships inside
 * index.html for crawlers and for visitors with JavaScript off.
 *
 * This exists because the mirror used to be written by hand, directly in
 * index.html, as a duplicate of copy that actually lives in the component. It
 * drifted four separate times, and every drift was silent: the build passed,
 * the site looked right, and the only thing that saw the stale copy was Google.
 * The last one described a meeting notetaker for days after the page had been
 * rebuilt around the issue-to-PR loop.
 *
 * Rendering the real component means it cannot drift by construction. The
 * markup is then reduced to plain block text rather than shipped whole: the
 * mirror is a fallback, not a second copy of the page, and inlining every
 * Tailwind class into every prerendered route would cost far more than the
 * fallback is worth.
 *
 * Server rendering is safe here because effects do not run: MemoryField only
 * touches document and canvas inside its effect, and useMinion only fetches
 * inside its own. Both render to inert markup, which is exactly what a
 * crawler should see.
 */
import { renderToStaticMarkup } from "react-dom/server";
import MinionLanding from "@/components/landing/MinionLanding";

/**
 * Block-level elements carrying copy, matched in document order. The
 * backreference keeps each match paired with its own closing tag, and because
 * a completed match consumes its own inner HTML, a link nested inside a
 * paragraph is never emitted twice.
 */
const BLOCK = /<(h1|h2|p|a)\b[^>]*>([\s\S]*?)<\/\1>/g;

export function renderMirror(indent = "        "): string {
  const html = renderToStaticMarkup(<MinionLanding />);
  const out: string[] = [];

  for (const [, tag, inner] of html.matchAll(BLOCK)) {
    const text = inner
      .replace(/<[^>]+>/g, "") // drop the spans that mark up a lead-in
      .replace(/\s+/g, " ")
      .trim();
    if (!text) continue; // loading skeletons and the canvas carry no copy
    const as = tag === "h1" || tag === "h2" ? tag : "p";
    // Consecutive duplicates: the CTA is deliberately repeated on the page,
    // but saying it twice teaches a crawler nothing.
    if (out.at(-1) === `${indent}<${as}>${text}</${as}>`) continue;
    out.push(`${indent}<${as}>${text}</${as}>`);
  }

  if (out.length < 8) {
    throw new Error(`mirror: only ${out.length} blocks rendered, expected the landing page`);
  }
  return out.join("\n");
}

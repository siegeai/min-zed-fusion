import { useEffect, useRef } from "react";

/**
 * The ambient graphic behind the hero.
 *
 * The subject picks the picture: min. builds a picture of the people and
 * threads you work with out of the meetings and mail you already have. So the
 * graphic is that graph, drawn live rather than posed. Nodes drift, links form
 * and dissolve as they pass near each other, and one node is the minion, which
 * is the only thing on the page that pulls anything toward it.
 *
 * It is fixed to the viewport while the page scrolls past it, so it overlaps
 * the reading column by design. It stays legible by getting out of the way
 * rather than by hiding: every frame it reads where the real text currently
 * sits and fades itself out behind those boxes. Scroll and the clear patches
 * travel with the words.
 *
 * That is done without a scroll listener. The draw loop is already running, so
 * it re-measures the text on a slow cadence and interpolates in between, which
 * costs one layout read every few frames instead of one per scroll event.
 *
 * Canvas rather than hand authored SVG paths, per the design guidance, and it
 * runs entirely outside React: no state, no re-renders, one rAF loop that is
 * cancelled on unmount. Under prefers-reduced-motion the nodes stop drifting
 * but the loop keeps running, because the suppression still has to track the
 * page; the field holds still, it just does not go stale.
 */

/**
 * Canvas cannot use Tailwind classes, so the field reads the very same CSS
 * variables the rest of the site is themed from. Without this it would keep
 * drawing near-black threads on a near-black ground and disappear entirely
 * the moment the OS is set to dark.
 */
function readPalette() {
  const cs = getComputedStyle(document.documentElement);
  const v = (name: string, fallback: string) =>
    cs.getPropertyValue(name).trim().replace(/\s+/g, ", ") || fallback;
  return { ink: v("--ink", "12, 18, 17"), moss: v("--moss", "11, 110, 79") };
}

type Node = { x: number; y: number; vx: number; vy: number; r: number };
type Box = { l: number; t: number; r: number; b: number };

/** Text the field must not sit on top of. */
const TEXT_SELECTOR =
  "main h1, main h2, main p, main li, main button, main dt, main dd";

/** How far beyond a text box the field stays faded, in px. */
const FEATHER = 46;

/**
 * 1 where the field may draw at full strength, 0 directly over text, ramping
 * across FEATHER so edges are soft rather than a visible cut-out.
 */
function clearance(x: number, y: number, boxes: Box[]) {
  let m = 1;
  for (const b of boxes) {
    const dx = Math.max(b.l - x, 0, x - b.r);
    const dy = Math.max(b.t - y, 0, y - b.b);
    if (dx >= FEATHER || dy >= FEATHER) continue;
    const d = Math.hypot(dx, dy);
    if (d >= FEATHER) continue;
    const k = d / FEATHER;
    if (k < m) m = k;
    if (m === 0) break;
  }
  return m;
}

export default function MemoryField({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let w = 0;
    let h = 0;
    let nodes: Node[] = [];
    // min. itself, in normalised coordinates so it survives a resize.
    const hub = { nx: 0.62, ny: 0.44 };

    const seed = () => {
      // Denser than before, and biased right. The field overlaps the reading
      // column across most of its width, and everything behind text is faded
      // out, so a centred scatter put almost every node somewhere it could
      // never be seen: measured, the right-hand quarter, the one strip that is
      // always visible, was drawing nothing at all.
      //
      // Two irrational strides give an even spread with no clumping and no
      // randomness, so the field is identical on every load and never flickers
      // differently between renders.
      const count = Math.max(26, Math.min(52, Math.round((w * h) / 15000)));
      nodes = Array.from({ length: count }, (_, i) => {
        const gx = ((i + 1) * 0.6180339887) % 1;
        const gy = ((i + 1) * 0.7548776662) % 1;
        const a = (i * 2.399963) % (Math.PI * 2);
        return {
          x: w * (0.28 + 0.76 * gx),
          y: h * (0.05 + 0.9 * gy),
          vx: Math.cos(a * 3.1) * 0.05,
          vy: Math.sin(a * 2.3) * 0.05,
          r: 1.1 + ((i * 13) % 5) * 0.42,
        };
      });
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    // Re-measured on a slow cadence rather than every frame: a layout read per
    // frame for every paragraph on the page is the expensive way to do this,
    // and the boxes only move when the page scrolls.
    let boxes: Box[] = [];
    let sinceMeasure = 1e9;
    const measure = () => {
      const rect = canvas.getBoundingClientRect();
      const out: Box[] = [];
      document.querySelectorAll<HTMLElement>(TEXT_SELECTOR).forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.width < 4 || r.height < 4) return;
        if (r.bottom < rect.top - FEATHER || r.top > rect.bottom + FEATHER) return;
        if (r.right < rect.left - FEATHER || r.left > rect.right + FEATHER) return;
        // Canvas-local coordinates, so drawing can compare directly.
        out.push({
          l: r.left - rect.left,
          t: r.top - rect.top,
          r: r.right - rect.left,
          b: r.bottom - rect.top,
        });
      });
      boxes = out;
    };

    const draw = () => {
      const { ink: INK, moss: MOSS } = readPalette();
      if (sinceMeasure >= 5) {
        measure();
        sinceMeasure = 0;
      }
      sinceMeasure++;
      ctx.clearRect(0, 0, w, h);
      // One clearance value per node, reused by every link that touches it.
      const clear = nodes.map((n) => clearance(n.x, n.y, boxes));
      const hx = w * hub.nx;
      const hy = h * hub.ny;
      const LINK = Math.min(w, h) * 0.42;

      // Links first, so nodes sit on top of their own threads.
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.hypot(dx, dy);
          if (d > LINK) continue;
          const kf = Math.min(clear[i], clear[j]);
          if (kf <= 0.02) continue;
          ctx.strokeStyle = `rgba(${INK}, ${(1 - d / LINK) * 0.17 * kf})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }

      // Everything within reach of min. keeps a fainter thread to it: the one
      // asymmetry in the field, and the whole point of the product.
      const REACH = Math.min(w, h) * 0.72;
      const hubClear = clearance(hx, hy, boxes);
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const d = Math.hypot(n.x - hx, n.y - hy);
        if (d > REACH) continue;
        const kf = Math.min(clear[i], hubClear);
        if (kf <= 0.02) continue;
        ctx.strokeStyle = `rgba(${MOSS}, ${(1 - d / REACH) * 0.2 * kf})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(n.x, n.y);
        ctx.lineTo(hx, hy);
        ctx.stroke();
      }

      for (let i = 0; i < nodes.length; i++) {
        if (clear[i] <= 0.02) continue;
        const n = nodes[i];
        ctx.fillStyle = `rgba(${INK}, ${0.34 * clear[i]})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // The minion. The brightest thing drawn, so it is the one that most
      // needs to yield when a paragraph passes over it.
      if (hubClear > 0.02) {
        ctx.fillStyle = `rgba(${MOSS}, ${0.1 * hubClear})`;
        ctx.beginPath();
        ctx.arc(hx, hy, 15, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(${MOSS}, ${0.85 * hubClear})`;
        ctx.beginPath();
        ctx.arc(hx, hy, 3.6, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const step = () => {
      for (const n of nodes) {
        if (reduced) break;
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -20) n.x = w + 20;
        if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20;
        if (n.y > h + 20) n.y = -20;
      }
      draw();
      raf = requestAnimationFrame(step);
    };

    resize();
    // Paint one frame synchronously, always. The animation loop cannot be
    // relied on for the first frame: a tab opened in the background has rAF
    // suspended, so the graphic would simply be absent until the tab was
    // focused. Draw first, then animate if we are allowed to.
    draw();
    if (!reduced) raf = requestAnimationFrame(step);

    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) draw();
    });
    ro.observe(canvas);

    const scheme = window.matchMedia("(prefers-color-scheme: dark)");
    const onScheme = () => draw();
    scheme.addEventListener("change", onScheme);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      scheme.removeEventListener("change", onScheme);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none block h-full w-full ${className}`}
    />
  );
}

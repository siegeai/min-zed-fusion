import { useEffect, useRef } from "react";

/**
 * The ambient graphic behind the hero.
 *
 * The subject picks the picture: min. builds a picture of the people and
 * threads you work with out of the meetings and mail you already have. So the
 * graphic is that graph, drawn live rather than posed.
 *
 * It is fixed to the viewport while the page scrolls past it, so it overlaps
 * the reading column by design. It keeps out of the way by MOVING: every text
 * box on screen pushes the nodes away from it, so a paragraph scrolling up
 * shoulders the constellation aside and it eases back once the text has gone.
 * The graph reorganises as you read rather than sitting still and dimming.
 *
 * The fade stays as a floor under that. Pushing handles the nodes, but a link
 * between two nodes can still stretch across a line of text, and a node that
 * is boxed in on all sides has nowhere to go. Anything left over a word is
 * faded out, so readability never depends on the physics working perfectly.
 *
 * No scroll listener. The draw loop already runs, so it re-measures the text
 * on a slow cadence: one layout read every five frames rather than one per
 * scroll event. Under prefers-reduced-motion nothing drifts and nothing is
 * pushed, and the field falls back to fading alone.
 */

const TEXT_SELECTOR =
  "main h1, main h2, main p, main li, main button, main dt, main dd";

/** How far beyond a text box the field keeps clear, in px. */
const FEATHER = 46;
/** How hard text shoves the nodes, and the furthest a node will be moved. */
const PUSH = 96;
const MAX_SHIFT = 190;
/** Easing on the shove, so scrolling glides rather than snaps. */
const EASE = 0.14;

type Node = {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
  /** Current displacement, eased toward the shove the text is applying. */
  ox: number; oy: number;
};
type Box = { l: number; t: number; r: number; b: number };

function readPalette() {
  const cs = getComputedStyle(document.documentElement);
  const v = (name: string, fallback: string) =>
    cs.getPropertyValue(name).trim().replace(/\s+/g, ", ") || fallback;
  return { ink: v("--ink", "12, 18, 17"), moss: v("--moss", "11, 110, 79") };
}

/** 1 in the open, 0 directly over text, ramping across FEATHER. */
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

/** Where the text wants this node to be, relative to where it is. */
function shove(x: number, y: number, boxes: Box[]) {
  let px = 0;
  let py = 0;
  for (const b of boxes) {
    const inside = x > b.l && x < b.r && y > b.t && y < b.b;
    if (inside) {
      // Straight out by the nearest edge, plus enough to clear it.
      const left = x - b.l, right = b.r - x, top = y - b.t, bottom = b.b - y;
      const m = Math.min(left, right, top, bottom);
      if (m === left) px -= PUSH + left;
      else if (m === right) px += PUSH + right;
      else if (m === top) py -= PUSH + top;
      else py += PUSH + bottom;
      continue;
    }
    const cx = Math.min(Math.max(x, b.l), b.r);
    const cy = Math.min(Math.max(y, b.t), b.b);
    const dx = x - cx, dy = y - cy;
    const d = Math.hypot(dx, dy);
    if (d >= PUSH || d < 0.001) continue;
    const k = 1 - d / PUSH;
    px += (dx / d) * k * PUSH;
    py += (dy / d) * k * PUSH;
  }
  const mag = Math.hypot(px, py);
  if (mag > MAX_SHIFT) { px = (px / mag) * MAX_SHIFT; py = (py / mag) * MAX_SHIFT; }
  return [px, py] as const;
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
    const hub = { nx: 0.62, ny: 0.44 };

    const seed = () => {
      // Denser and biased right. The field overlaps the reading column across
      // most of its width, so a centred scatter put almost every node where it
      // could never be seen: measured, the right-hand quarter was empty.
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
          ox: 0,
          oy: 0,
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

    let boxes: Box[] = [];
    let sinceMeasure = 1e9;
    const measure = () => {
      const rect = canvas.getBoundingClientRect();
      const out: Box[] = [];
      document.querySelectorAll<HTMLElement>(TEXT_SELECTOR).forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.width < 4 || r.height < 4) return;
        if (r.bottom < rect.top - PUSH || r.top > rect.bottom + PUSH) return;
        if (r.right < rect.left - PUSH || r.left > rect.right + PUSH) return;
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
      ctx.clearRect(0, 0, w, h);

      const px = nodes.map((n) => n.x + n.ox);
      const py = nodes.map((n) => n.y + n.oy);
      const clear = px.map((x, i) => clearance(x, py[i], boxes));
      const hx = w * hub.nx;
      const hy = h * hub.ny;
      const hubClear = clearance(hx, hy, boxes);
      const LINK = Math.min(w, h) * 0.42;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = px[i] - px[j];
          const dy = py[i] - py[j];
          const d = Math.hypot(dx, dy);
          if (d > LINK) continue;
          const kf = Math.min(clear[i], clear[j]);
          if (kf <= 0.02) continue;
          ctx.strokeStyle = `rgba(${INK}, ${(1 - d / LINK) * 0.17 * kf})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(px[i], py[i]);
          ctx.lineTo(px[j], py[j]);
          ctx.stroke();
        }
      }

      const REACH = Math.min(w, h) * 0.72;
      for (let i = 0; i < nodes.length; i++) {
        const d = Math.hypot(px[i] - hx, py[i] - hy);
        if (d > REACH) continue;
        const kf = Math.min(clear[i], hubClear);
        if (kf <= 0.02) continue;
        ctx.strokeStyle = `rgba(${MOSS}, ${(1 - d / REACH) * 0.2 * kf})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(px[i], py[i]);
        ctx.lineTo(hx, hy);
        ctx.stroke();
      }

      for (let i = 0; i < nodes.length; i++) {
        if (clear[i] <= 0.02) continue;
        ctx.fillStyle = `rgba(${INK}, ${0.34 * clear[i]})`;
        ctx.beginPath();
        ctx.arc(px[i], py[i], nodes[i].r, 0, Math.PI * 2);
        ctx.fill();
      }

      // The minion. The brightest thing drawn, so the one that most needs to
      // yield when a paragraph passes over it. It holds its position, because
      // it is the anchor everything else is drawn toward.
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
      if (sinceMeasure >= 5) {
        measure();
        sinceMeasure = 0;
      }
      sinceMeasure++;

      if (!reduced) {
        for (const n of nodes) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < -20) n.x = w + 20;
          if (n.x > w + 20) n.x = -20;
          if (n.y < -20) n.y = h + 20;
          if (n.y > h + 20) n.y = -20;
          const [tx, ty] = shove(n.x, n.y, boxes);
          n.ox += (tx - n.ox) * EASE;
          n.oy += (ty - n.oy) * EASE;
        }
      }

      draw();
      raf = requestAnimationFrame(step);
    };

    resize();
    raf = requestAnimationFrame(step);

    const ro = new ResizeObserver(() => {
      resize();
      sinceMeasure = 1e9;
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

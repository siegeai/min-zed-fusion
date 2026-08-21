import { useEffect, useRef } from "react";

/**
 * The ambient graphic behind the hero.
 *
 * The subject picks the picture: min. builds a picture of the people and
 * threads you work with out of the meetings and mail you already have. So the
 * graphic is that graph, drawn live rather than posed. Nodes drift, links form
 * and dissolve as they pass near each other, and one node is min., which is
 * the only thing on the page that pulls anything toward it.
 *
 * Canvas rather than hand authored SVG paths, per the design guidance, and it
 * runs entirely outside React: no state, no re-renders, one rAF loop that is
 * cancelled on unmount. Under prefers-reduced-motion it paints a single frame
 * and stops, so the composition survives without the movement.
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
      const count = Math.max(14, Math.min(30, Math.round((w * h) / 26000)));
      nodes = Array.from({ length: count }, (_, i) => {
        // Deterministic scatter: no Math.random, so the field is identical on
        // every load and never flickers differently between renders.
        const a = (i * 2.399963) % (Math.PI * 2);
        const rad = 0.18 + ((i * 37) % 100) / 145;
        return {
          x: w * (0.5 + Math.cos(a) * rad * 0.92),
          y: h * (0.5 + Math.sin(a) * rad),
          vx: Math.cos(a * 3.1) * 0.045,
          vy: Math.sin(a * 2.3) * 0.045,
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

    const draw = () => {
      const { ink: INK, moss: MOSS } = readPalette();
      ctx.clearRect(0, 0, w, h);
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
          ctx.strokeStyle = `rgba(${INK}, ${(1 - d / LINK) * 0.13})`;
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
      for (const n of nodes) {
        const d = Math.hypot(n.x - hx, n.y - hy);
        if (d > REACH) continue;
        ctx.strokeStyle = `rgba(${MOSS}, ${(1 - d / REACH) * 0.2})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(n.x, n.y);
        ctx.lineTo(hx, hy);
        ctx.stroke();
      }

      for (const n of nodes) {
        ctx.fillStyle = `rgba(${INK}, 0.26)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // min.
      ctx.fillStyle = `rgba(${MOSS}, 0.10)`;
      ctx.beginPath();
      ctx.arc(hx, hy, 15, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = `rgba(${MOSS}, 0.85)`;
      ctx.beginPath();
      ctx.arc(hx, hy, 3.6, 0, Math.PI * 2);
      ctx.fill();
    };

    const step = () => {
      for (const n of nodes) {
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

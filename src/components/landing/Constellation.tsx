/**
 * Ambient constellation: your network as a faint, slowly drifting map behind
 * the hero capsule. Pure SVG + CSS animation (no JS, no canvas) so it stays
 * cheap and never fights the capsule for attention.
 */

const NODES = [
  { x: 80, y: 90, r: 3 },
  { x: 210, y: 60, r: 2 },
  { x: 340, y: 130, r: 4 },
  { x: 150, y: 210, r: 2.5 },
  { x: 470, y: 80, r: 2 },
  { x: 560, y: 190, r: 3 },
  { x: 690, y: 110, r: 2.5 },
  { x: 420, y: 260, r: 3.5 },
  { x: 300, y: 330, r: 2 },
  { x: 640, y: 320, r: 3 },
  { x: 100, y: 340, r: 2.5 },
  { x: 760, y: 240, r: 2 },
];

const LINKS: [number, number][] = [
  [0, 1], [1, 2], [2, 4], [4, 6], [3, 0], [3, 8], [2, 7], [7, 9], [5, 7], [10, 3], [11, 6], [9, 11],
];

export default function Constellation({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <svg
        className="constellation-drift absolute left-1/2 top-1/2 h-[640px] w-[860px] -translate-x-1/2 -translate-y-1/2"
        viewBox="0 0 840 400"
        fill="none"
      >
        {LINKS.map(([a, b], i) => (
          <line
            key={i}
            x1={NODES[a].x}
            y1={NODES[a].y}
            x2={NODES[b].x}
            y2={NODES[b].y}
            stroke="rgb(16 185 129)"
            strokeWidth="1"
            strokeOpacity="0.16"
          />
        ))}
        {NODES.map((n, i) => (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={n.r}
            fill="rgb(16 185 129)"
            fillOpacity="0.28"
          />
        ))}
      </svg>
    </div>
  );
}

import { Inbox, Network, MessageSquareText } from "lucide-react";
import { FadeIn } from "@/components/vision/FadeIn";

function FeedMock() {
  const items = [
    { dot: "bg-amber-500", t: "Send Jordan the cohort data", s: "Promised Jun 8 · due today" },
    { dot: "bg-emerald-500", t: "Reply to Priya Nair", s: "Warm intro, waiting 2 days" },
    { dot: "bg-gray-300", t: "Lunch with Andy, Thu 12:30", s: "3 open threads to review" },
  ];
  return (
    <div className="space-y-2">
      {items.map((it, i) => (
        <div key={i} className="flex items-center gap-2.5 rounded-lg border border-gray-100 bg-white px-3 py-2">
          <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${it.dot}`} />
          <div className="min-w-0">
            <p className="truncate text-[12.5px] font-medium text-gray-800">{it.t}</p>
            <p className="truncate text-[11px] text-gray-400">{it.s}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function ConstellationMock() {
  const nodes = [
    { x: 40, y: 40 }, { x: 120, y: 25 }, { x: 175, y: 70 }, { x: 90, y: 90 },
    { x: 30, y: 105 }, { x: 150, y: 120 }, { x: 200, y: 40 },
  ];
  const links: [number, number][] = [[0, 1], [1, 2], [3, 0], [3, 5], [1, 6], [4, 3], [2, 6]];
  return (
    <div className="rounded-lg border border-gray-100 bg-white p-2">
      <svg viewBox="0 0 230 145" className="h-[120px] w-full">
        {links.map(([a, b], i) => (
          <line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} stroke="rgb(16 185 129)" strokeWidth="1" strokeOpacity="0.3" />
        ))}
        {nodes.map((n, i) => (
          <circle key={i} cx={n.x} cy={n.y} r={i === 3 ? 5 : 3.5} fill="rgb(16 185 129)" fillOpacity={i === 3 ? 0.9 : 0.5} />
        ))}
      </svg>
    </div>
  );
}

function PrepMock() {
  return (
    <div className="space-y-2">
      <div className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-sm bg-gray-900 px-3 py-2 text-[12.5px] text-white">
        Prep me for lunch with Andy.
      </div>
      <div className="w-fit max-w-[92%] rounded-2xl rounded-bl-sm border border-gray-100 bg-white px-3 py-2 text-[12.5px] leading-snug text-gray-700">
        You last met in March. Andy offered to intro you to two agencies and
        never followed up. He is waiting on your revised scope.
      </div>
    </div>
  );
}

const TILES = [
  {
    Icon: Inbox,
    title: "Feed",
    body: "What needs you this week: commitments coming due, important emails, meetings with context.",
    mock: <FeedMock />,
  },
  {
    Icon: Network,
    title: "Constellation",
    body: "Your whole network as a living map, yours and your team's. Ask it anything.",
    mock: <ConstellationMock />,
  },
  {
    Icon: MessageSquareText,
    title: "Prep",
    body: "A briefing from everything you two have ever discussed, before you walk in.",
    mock: <PrepMock />,
  },
];

export default function SurfaceTiles() {
  return (
    <section className="border-y border-gray-100 bg-white px-4 py-20 md:py-24">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-gray-900 md:text-[2.5rem]">
              The capsule is the center. Not the whole story.
            </h2>
            <p className="mt-4 text-[17px] leading-relaxed text-gray-500">
              Around it, min. gives you the rest of your network at a glance.
            </p>
          </div>
        </FadeIn>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TILES.map((t, i) => (
            <FadeIn key={t.title} delay={i * 0.09}>
              <div className="flex h-full flex-col rounded-2xl border border-gray-100 bg-[#FBFBFA] p-6">
                <div className="mb-4 flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 shadow-sm">
                    <t.Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                  </span>
                  <h3 className="font-display text-[18px] font-semibold text-gray-900">{t.title}</h3>
                </div>
                <p className="mb-5 text-[14px] leading-relaxed text-gray-500">{t.body}</p>
                <div className="mt-auto">{t.mock}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

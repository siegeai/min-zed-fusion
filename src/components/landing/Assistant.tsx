import { CalendarClock, ListChecks, Sparkles } from "lucide-react";
import { FadeIn } from "@/components/vision/FadeIn";

function PrepMock() {
  return (
    <div className="space-y-2">
      <div className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-sm bg-gray-900 px-3 py-2 text-[12.5px] text-white">
        Prep me for lunch with Andy.
      </div>
      <div className="w-fit max-w-[94%] rounded-2xl rounded-bl-sm border border-gray-100 bg-white px-3 py-2 text-[12.5px] leading-snug text-gray-700">
        You last met in March. Andy offered to intro you to two agencies and
        never followed up. He is waiting on your revised scope.
      </div>
    </div>
  );
}

function FeedMock() {
  const items = [
    { dot: "bg-amber-500", t: "Send Jordan the cohort data", s: "Promised Jun 8 · due today" },
    { dot: "bg-emerald-500", t: "Reply to Priya Nair", s: "Warm intro, waiting 2 days" },
    { dot: "bg-gray-300", t: "Follow up with Andy on scope", s: "Went quiet 3 weeks ago" },
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

function AskMock() {
  return (
    <div className="space-y-2">
      <div className="ml-auto w-fit max-w-[88%] rounded-2xl rounded-br-sm bg-gray-900 px-3 py-2 text-[12.5px] text-white">
        Who did I promise a testimonial to?
      </div>
      <div className="w-fit max-w-[94%] rounded-2xl rounded-bl-sm border border-gray-100 bg-white px-3 py-2 text-[12.5px] leading-snug text-gray-700">
        Dana at Meridian, on the Jun 15 call. She sent the billing fix you asked
        for, so it is your move.
      </div>
    </div>
  );
}

const TILES = [
  {
    Icon: CalendarClock,
    title: "Never walk in cold",
    body: "Before any meeting, ask min. to prep you. Everything you two have ever discussed, in seconds.",
    mock: <PrepMock />,
  },
  {
    Icon: ListChecks,
    title: "Never drop the ball",
    body: "Every promise and open loop, surfaced before it slips. The follow through people remember you for.",
    mock: <FeedMock />,
  },
  {
    Icon: Sparkles,
    title: "Ask anything, remember everything",
    body: "Your whole network, one question away. Ask about anyone and get an answer grounded in your real history.",
    mock: <AskMock />,
  },
];

export default function Assistant() {
  return (
    <section className="px-4 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.16em] text-emerald-600">
              Your relationship assistant
            </p>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-gray-900 md:text-[2.75rem] md:leading-[1.08]">
              Be the person who always remembers.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-gray-500">
              Your work runs on relationships, but you're only human. min.
              remembers what you can't, so you never walk in cold or let one go
              quiet. Being great with people stops being a gift. It becomes a
              system.
            </p>
          </div>
        </FadeIn>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TILES.map((t, i) => (
            <FadeIn key={t.title} delay={i * 0.09}>
              <div className="flex h-full flex-col rounded-2xl border border-gray-100 bg-[#FBFBFA] p-6">
                <div className="mb-4 flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 shadow-sm">
                    <t.Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                  </span>
                  <h3 className="font-display text-[17px] font-semibold text-gray-900">{t.title}</h3>
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

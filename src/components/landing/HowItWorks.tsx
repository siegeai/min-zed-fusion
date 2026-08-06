import { CalendarDays, Sparkles, Zap } from "lucide-react";
import { FadeIn } from "@/components/vision/FadeIn";

const STEPS = [
  {
    n: "01",
    Icon: CalendarDays,
    title: "Just do your work.",
    body: "Take the calls, send the email, run the 1:1s. min. sits invisibly on all of it and quietly remembers what you would have lost: the promise, the deadline, the offhand detail. No meeting bots, no data entry, ever.",
  },
  {
    n: "02",
    Icon: Sparkles,
    title: "Know where you stand.",
    body: "Every relationship stays distilled into a living capsule, always current: where you stand, action items with deadlines, the whole history. Open it before a call and you are prepped in a minute.",
  },
  {
    n: "03",
    Icon: Zap,
    title: "Think it through, then hand it off.",
    body: "Consult it like a teammate who was in every room: what am I missing, how should I play this. Then let it do the work, drafting the follow up that lands on what they actually said, the next step email, the nudge on what is owed.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-24 border-y border-gray-100 bg-white px-4 py-14 md:py-24">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <h2 className="max-w-md font-display text-3xl font-semibold tracking-tight text-gray-900 md:text-[2.5rem]">
            How it works.
          </h2>
          <p className="mt-4 max-w-md text-[16px] leading-relaxed text-gray-500">
            It runs on the work you already do.{" "}
            <span className="font-medium text-gray-900">There is no step four.</span>
          </p>
        </FadeIn>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
          {STEPS.map((s, i) => (
            <FadeIn key={s.n} delay={i * 0.09}>
              <div className="relative rounded-2xl border border-gray-100 bg-[#FBFBFA] p-7">
                <div className="mb-5 flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 shadow-sm">
                    <s.Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <span className="font-display text-sm font-semibold tracking-wide text-gray-300">
                    {s.n}
                  </span>
                </div>
                <h3 className="font-display text-[19px] font-semibold text-gray-900">
                  {s.title}
                </h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-gray-500">{s.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Plug, Sparkles, Share2 } from "lucide-react";
import { FadeIn } from "@/components/vision/FadeIn";

const STEPS = [
  {
    n: "01",
    Icon: Plug,
    title: "Connect.",
    body: "Connect your calendar. Two minutes, and add email whenever you're ready.",
  },
  {
    n: "02",
    Icon: Sparkles,
    title: "min. summarizes.",
    body: "The relationship, the facts, the commitments, from every meeting and thread. Automatically.",
  },
  {
    n: "03",
    Icon: Share2,
    title: "Share.",
    body: "Share a relationship capsule with anyone on your team, so everyone stays up to date.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-24 border-y border-gray-100 bg-white px-4 py-20 md:py-24">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <h2 className="max-w-md font-display text-3xl font-semibold tracking-tight text-gray-900 md:text-[2.5rem]">
            How it works.
          </h2>
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

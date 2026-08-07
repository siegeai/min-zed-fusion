import { Video, Mail, Users, Check, Send } from "lucide-react";
import { FadeIn } from "@/components/vision/FadeIn";

/**
 * Each step carries a small looping scene instead of a decorative icon: the
 * work being quietly read, the capsule writing itself in, and the hand-off
 * landing. They are built from the same parts as the real UI (rows, section
 * labels, chat bubbles, an emerald action chip) so the section previews the
 * product rather than illustrating it. Motion lives in index.css and every
 * resting state is the finished state, so reduced motion still reads.
 */

/* 01 — you work; min. reads over it */
function WorkScene() {
  const rows = [
    { Icon: Video, label: "Call with Jordan", w: "78%" },
    { Icon: Mail, label: "Re: pilot agreement", w: "64%" },
    { Icon: Users, label: "1:1 with Dana", w: "70%" },
    { Icon: Mail, label: "Intro from Priya", w: "52%" },
  ];
  return (
    <div className="relative h-[172px] overflow-hidden rounded-xl border border-gray-100 bg-white px-3 py-3">
      <div className="space-y-2.5">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center gap-2">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-400">
              <r.Icon className="h-3 w-3" strokeWidth={2} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[10.5px] font-medium leading-tight text-gray-600">
                {r.label}
              </p>
              <span
                className="mt-1 block h-1 rounded-full bg-gray-100"
                style={{ width: r.w }}
              />
            </div>
          </div>
        ))}
      </div>
      {/* the quiet read passing over everything */}
      <div className="hiw-scan pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-transparent via-emerald-400/20 to-transparent" />
    </div>
  );
}

/* 02 — the capsule, always current */
function CapsuleScene() {
  const groups = [
    { label: "Where you stand", bars: ["86%", "62%"], tone: "bg-emerald-200" },
    { label: "Action items", bars: ["74%", "48%"], tone: "bg-gray-200" },
    { label: "History", bars: ["58%", "40%"], tone: "bg-gray-200" },
  ];
  let i = 0;
  return (
    <div className="h-[172px] overflow-hidden rounded-xl border border-gray-100 bg-white px-3 py-3">
      {groups.map((g, gi) => (
        <div key={g.label} className={gi === 0 ? "" : "mt-2.5"}>
          <p className="text-[8.5px] font-semibold uppercase tracking-[0.14em] text-gray-400">
            {g.label}
          </p>
          <div className="mt-1.5 space-y-1.5">
            {g.bars.map((w) => (
              <span
                key={w}
                className={`hiw-fill block h-1.5 rounded-full ${g.tone}`}
                style={{ width: w, animationDelay: `${(i++) * 0.28}s` }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* 03 — consult it, then hand it off */
function HandoffScene() {
  return (
    <div className="flex h-[172px] flex-col overflow-hidden rounded-xl border border-gray-100 bg-white px-3 py-3">
      <span
        className="hiw-pop ml-auto block w-fit max-w-[88%] rounded-xl rounded-br-sm bg-gray-900 px-2.5 py-1.5 text-[10px] leading-tight text-white"
        style={{ animationDelay: "0s" }}
      >
        How should I angle this?
      </span>
      <span
        className="hiw-pop mt-1.5 block w-fit max-w-[92%] rounded-xl rounded-bl-sm border border-gray-100 bg-[#FBFBFA] px-2.5 py-1.5 text-[10px] leading-tight text-gray-600"
        style={{ animationDelay: "0.55s" }}
      >
        Lead with onboarding because it is his last doubt. Want me to draft a
        follow up?
      </span>
      <span
        className="hiw-pop mt-auto flex w-fit items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-medium text-emerald-700"
        style={{ animationDelay: "1.15s" }}
      >
        <Check className="h-3 w-3" strokeWidth={2.5} />
        Drafted, in your outbox
        <Send className="h-2.5 w-2.5 text-emerald-500" strokeWidth={2.5} />
      </span>
    </div>
  );
}

const STEPS = [
  {
    n: "01",
    Scene: WorkScene,
    title: "Just do your work.",
    body: "Take the calls, send the email, run the 1:1s. min. sits invisibly on all of it and quietly remembers what you would have lost: the promise, the deadline, the offhand detail. No meeting bots, no data entry, ever.",
  },
  {
    n: "02",
    Scene: CapsuleScene,
    title: "Before calls.",
    body: "Every relationship stays distilled into a living capsule, always current: where you stand, action items with deadlines, the whole history. Open it before a call and you are prepped in a minute.",
  },
  {
    n: "03",
    Scene: HandoffScene,
    title: "After calls.",
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
              <div className="relative rounded-2xl border border-gray-100 bg-[#FBFBFA] p-5 sm:p-6">
                <div className="relative">
                  <s.Scene />
                  <span className="absolute right-2.5 top-2.5 font-display text-[11px] font-semibold tracking-wide text-gray-300">
                    {s.n}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-[19px] font-semibold text-gray-900">
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

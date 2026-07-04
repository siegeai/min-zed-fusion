import { Lock, Phone, Mail, UserPlus, ArrowRight } from "lucide-react";

/**
 * The relationship capsule: a live memory of every call and email between you
 * and one person, built with zero manual work. This is the artifact the whole
 * landing page orbits. All content is fictional, real-shaped demo data.
 */

type Beat = {
  date: string;
  kind: "call" | "email" | "intro";
  meta?: string;
  text: string;
};

export const demoCapsule = {
  name: "Jordan Lee",
  role: "Founder & CEO, Aperture",
  initials: "JL",
  lastTouch: "3 days ago",
  cadence: "14 emails · 3 calls",
  insights: [
    "Considering a $50K angel check, pending conflict review.",
    "Demo promised Jun 11, never scheduled.",
    "Strong on product. Retention is the open question.",
  ],
  history: [
    {
      date: "Jun 14",
      kind: "email",
      text: "Jordan asked to push the demo to next week. No new date proposed.",
    },
    {
      date: "Jun 8",
      kind: "call",
      meta: "38 min",
      text: "Diligence call. Agreed $50K stays an angel check, not the whole round. Jordan to send the updated cap table.",
    },
    {
      date: "Jun 2",
      kind: "email",
      text: "Sent the deck. Jordan flagged retention as the one thing to prove.",
    },
    {
      date: "May 24",
      kind: "intro",
      text: "Warm intro from Priya Nair. Jordan asked to meet.",
    },
  ] as Beat[],
};

const KIND_META: Record<Beat["kind"], { Icon: React.ElementType; label: string }> = {
  call: { Icon: Phone, label: "Call" },
  email: { Icon: Mail, label: "Email" },
  intro: { Icon: UserPlus, label: "Intro" },
};

function BeatRow({ beat, last }: { beat: Beat; last: boolean }) {
  const { Icon, label } = KIND_META[beat.kind];
  return (
    <li className="relative flex gap-3.5 pl-1">
      {/* rail */}
      <div className="flex flex-col items-center">
        <span className="mt-1.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500">
          <Icon className="h-3 w-3" strokeWidth={1.9} />
        </span>
        {!last && <span className="w-px flex-1 bg-gray-200" />}
      </div>
      <div className={last ? "pb-0" : "pb-5"}>
        <div className="mb-1 flex items-center gap-2">
          <span className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
            {label}
          </span>
          <span className="text-[11px] text-gray-300">·</span>
          <span className="text-[11px] font-medium text-gray-400">{beat.date}</span>
          {beat.meta && (
            <>
              <span className="text-[11px] text-gray-300">·</span>
              <span className="text-[11px] text-gray-400">{beat.meta}</span>
            </>
          )}
        </div>
        <p className="text-[13.5px] leading-relaxed text-gray-700">{beat.text}</p>
      </div>
    </li>
  );
}

export default function Capsule({
  className = "",
  cropOnMobile = false,
}: {
  className?: string;
  cropOnMobile?: boolean;
}) {
  const c = demoCapsule;
  return (
    <div
      data-capsule
      className={[
        "w-full overflow-hidden rounded-[20px] border border-gray-200/80 bg-white",
        "shadow-[0_12px_50px_-12px_rgba(0,0,0,0.18)]",
        className,
      ].join(" ")}
    >
      {/* Person header */}
      <div className="flex items-center gap-3.5 border-b border-gray-100 px-5 py-4 sm:px-6 sm:py-5">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-sm font-semibold text-white">
          {c.initials}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate font-display text-[17px] font-semibold text-gray-900">
              {c.name}
            </h3>
            <span className="hidden h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500 sm:block" />
          </div>
          <p className="truncate text-[13px] text-gray-500">{c.role}</p>
        </div>
        <div className="hidden shrink-0 text-right sm:block">
          <p className="text-[12px] font-medium text-gray-700">Last touch {c.lastTouch}</p>
          <p className="text-[11.5px] text-gray-400">{c.cadence}</p>
        </div>
      </div>

      {/* History */}
      <div className="px-5 py-5 sm:px-6">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">
            History
          </span>
          <span className="text-[11px] text-gray-400">distilled, not stored</span>
        </div>
        <ul className={cropOnMobile ? "" : ""}>
          {c.history.map((b, i) => (
            <BeatRow key={i} beat={b} last={i === c.history.length - 1} />
          ))}
        </ul>
      </div>

      {/* Insights strip, your eyes only */}
      <div className="border-t border-gray-100 bg-[#F7FAF8] px-5 py-4 sm:px-6">
        <div className="mb-2.5 flex items-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-500">
            Insights
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10.5px] font-medium text-emerald-700">
            <Lock className="h-2.5 w-2.5" strokeWidth={2.2} />
            Your eyes only
          </span>
        </div>
        <ul className="space-y-1.5">
          {c.insights.map((line, i) => (
            <li key={i} className="flex gap-2 text-[13px] leading-snug text-gray-700">
              <ArrowRight className="mt-[3px] h-3 w-3 shrink-0 text-emerald-500" strokeWidth={2} />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

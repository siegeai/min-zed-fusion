import { GitMerge, Send, X, Check, Lock } from "lucide-react";
import { FadeIn } from "@/components/vision/FadeIn";

function ShareDialog() {
  return (
    <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)]">
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-3.5">
        <span className="font-display text-[15px] font-semibold text-gray-900">Share memory</span>
        <X className="h-4 w-4 text-gray-400" strokeWidth={2} />
      </div>
      <div className="px-5 py-5">
        <p className="text-[13px] text-gray-500">Relationship</p>
        <div className="mt-1.5 flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-[12px] font-semibold text-white">
            JL
          </span>
          <div>
            <p className="text-[14px] font-medium text-gray-900">Jordan Lee</p>
            <p className="text-[12px] text-gray-400">Founder & CEO, Aperture</p>
          </div>
        </div>

        <p className="mt-5 text-[13px] text-gray-500">Share with</p>
        <div className="mt-1.5 flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-[10px] font-semibold text-white">
            AM
          </span>
          <span className="text-[13.5px] text-gray-700">avery@yourteam.com</span>
        </div>

        <div className="mt-4 flex items-start gap-2 rounded-lg bg-[#F7FAF8] px-3 py-2.5">
          <Check className="mt-[1px] h-3.5 w-3.5 shrink-0 text-emerald-600" strokeWidth={2.4} />
          <p className="text-[12.5px] leading-snug text-gray-600">
            They see the whole relationship, always current. A grant, not an export.
            Revocable any time.
          </p>
        </div>

        <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 py-2.5 text-[14px] font-medium text-white">
          <Send className="h-3.5 w-3.5" strokeWidth={2} />
          Send capsule
        </button>
      </div>
    </div>
  );
}

function MergeChip() {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-gray-200/80 bg-white px-4 py-3 shadow-sm">
      <div className="flex -space-x-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gray-900 text-[11px] font-semibold text-white">
          You
        </span>
        <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-blue-600 text-[11px] font-semibold text-white">
          AM
        </span>
      </div>
      <GitMerge className="h-4 w-4 text-gray-400" strokeWidth={2} />
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-[11px] font-semibold text-white">
        JL
      </span>
      <span className="text-[13px] text-gray-600">One capsule, both of you.</span>
    </div>
  );
}

const OLD_WAY = [
  "Write up notes from memory",
  "Forward a tangle of email threads",
  "Get on a call to brief them",
];

export default function Share() {
  return (
    <section id="share" className="scroll-mt-24 border-y border-gray-100 bg-white px-4 py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <FadeIn>
            <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.16em] text-emerald-600">
              Share and merge
            </p>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-gray-900 md:text-[2.5rem] md:leading-[1.12]">
              Share a relationship
              <br className="hidden sm:block" /> like a doc.
            </h2>
            <p className="mt-5 max-w-md text-[17px] leading-relaxed text-gray-500">
              Bring a teammate or a partner up to speed in one click. The whole
              relationship, always current. No handoff meeting required.
            </p>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="mt-7 rounded-2xl border border-gray-100 bg-[#FBFBFA] p-5">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">
                The old way
              </p>
              <ul className="space-y-2">
                {OLD_WAY.map((o) => (
                  <li key={o} className="flex items-center gap-2.5 text-[14px]">
                    <X className="h-3.5 w-3.5 shrink-0 text-gray-300" strokeWidth={2.5} />
                    <span className="text-gray-400 line-through decoration-gray-300">{o}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex items-center gap-2.5 border-t border-gray-100 pt-3 text-[14.5px]">
                <Check className="h-4 w-4 shrink-0 text-emerald-500" strokeWidth={2.5} />
                <span className="font-medium text-gray-900">With min., share the capsule.</span>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.14}>
            <div className="mt-5 flex items-center gap-2.5 rounded-xl border border-emerald-100 bg-emerald-50/60 px-4 py-3">
              <Lock className="h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2} />
              <p className="text-[14.5px] font-medium text-gray-800">
                When someone leaves, the relationships stay.
              </p>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.1}>
          <div className="flex flex-col items-center gap-5 lg:items-end">
            <ShareDialog />
            <MergeChip />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

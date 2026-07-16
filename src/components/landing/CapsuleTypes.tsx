import { User, Building2, Users } from "lucide-react";
import { FadeIn } from "@/components/vision/FadeIn";

const TYPES = [
  {
    Icon: User,
    label: "People",
    title: "Every person you work with",
    body: "One person, and the entire history between you. What you agreed, what is owed, what happens next.",
    visual: (
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-[12px] font-semibold text-white">
          JL
        </span>
        <div className="min-w-0">
          <p className="text-[13px] font-medium text-gray-900">Jordan Lee</p>
          <p className="text-[11.5px] text-gray-400">Founder, Aperture</p>
        </div>
      </div>
    ),
  },
  {
    Icon: Building2,
    label: "Companies",
    title: "Every company, in one view",
    body: "Everyone you know at an account, rolled into a single relationship. The whole company, not scattered across inboxes.",
    visual: (
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 text-[13px] font-semibold text-white">
          A
        </span>
        <div className="min-w-0">
          <p className="text-[13px] font-medium text-gray-900">Aperture</p>
          <p className="text-[11.5px] text-gray-400">5 people you know</p>
        </div>
      </div>
    ),
  },
  {
    Icon: Users,
    label: "Groups",
    title: "Every deal team and group",
    body: "A deal team, a partnership, a recurring group. Everyone who is part of it stays in sync, automatically.",
    visual: (
      <div className="flex items-center gap-2.5">
        <div className="flex -space-x-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-gray-900 text-[11px] font-semibold text-white">
            You
          </span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-amber-500 text-[11px] font-semibold text-white">
            JL
          </span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-emerald-500 text-[11px] font-semibold text-white">
            PN
          </span>
        </div>
        <p className="text-[12.5px] text-gray-500">The Aperture round</p>
      </div>
    ),
  },
];

export default function CapsuleTypes() {
  return (
    <section className="border-y border-gray-100 bg-white px-4 py-20 md:py-24">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-gray-900 md:text-[2.5rem]">
              A living capsule for every relationship.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[17px] leading-relaxed text-gray-500">
              People, companies, and groups. Each one a living memory that builds
              itself from your calendar and email.
            </p>
          </div>
        </FadeIn>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TYPES.map((t, i) => (
            <FadeIn key={t.label} delay={i * 0.09}>
              <div className="flex h-full flex-col rounded-2xl border border-gray-100 bg-[#FBFBFA] p-6">
                <div className="mb-4 flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 shadow-sm">
                    <t.Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">
                    {t.label}
                  </span>
                </div>
                <h3 className="font-display text-[18px] font-semibold text-gray-900">
                  {t.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-gray-500">{t.body}</p>
                <div className="mt-5 rounded-xl border border-gray-100 bg-white px-3.5 py-3">
                  {t.visual}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

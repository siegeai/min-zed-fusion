import { GitMerge, Send, X, Lock, Link2 } from "lucide-react";
import { FadeIn } from "@/components/vision/FadeIn";
import { FlatAvatar } from "./DemoAvatars";

function ShareDialog() {
  return (
    <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)]">
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-3.5">
        <span className="font-display text-[15px] font-semibold text-gray-900">Share capsule</span>
        <X className="h-4 w-4 text-gray-400" strokeWidth={2} />
      </div>
      <div className="px-5 py-5">
        <p className="text-[13px] text-gray-500">Relationship</p>
        <div className="mt-1.5 flex items-center gap-2.5">
          <FlatAvatar who="jordan" size={32} label="Jordan Lee" />
          <div>
            <p className="text-[14px] font-medium text-gray-900">Jordan Lee</p>
            <p className="text-[12px] text-gray-400">Founder & CEO, Aperture</p>
          </div>
        </div>

        <p className="mt-5 text-[13px] text-gray-500">Share with</p>
        <div className="mt-1.5 flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2">
          <FlatAvatar who="avery" size={24} label="Avery Moss" />
          <span className="text-[13.5px] text-gray-700">avery@yourteam.com</span>
        </div>

        {/* The merge preview: sharing with someone who knows them merges your histories */}
        <div className="mt-4 rounded-lg border border-emerald-100 bg-emerald-50/60 px-3 py-2.5">
          <p className="text-[12.5px] font-medium text-gray-800">
            Avery already knows Jordan
          </p>

          {/* Two capsules of the same Jordan become one */}
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            <span className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2 py-1">
              <FlatAvatar who="jordan" size={18} label="Jordan Lee" />
              <span className="text-[10.5px] font-medium text-gray-500">You</span>
            </span>
            <span className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2 py-1">
              <FlatAvatar who="jordan" size={18} label="Jordan Lee" />
              <span className="text-[10.5px] font-medium text-gray-500">Avery</span>
            </span>
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100">
              <GitMerge className="h-3 w-3 text-emerald-700" strokeWidth={2.2} />
            </span>
            <span className="flex items-center gap-1.5 rounded-lg border border-emerald-300 bg-white px-2 py-1">
              <FlatAvatar who="jordan" size={18} label="Jordan Lee" />
              <span className="flex -space-x-1">
                <FlatAvatar who="you" size={14} label="You" className="border border-white" />
                <FlatAvatar who="avery" size={14} label="Avery Moss" className="border border-white" />
              </span>
            </span>
          </div>

          <p className="mt-2 text-[12px] text-gray-500">
            Your capsule: 3 calls · since May. Hers: 2 calls · since Feb.
          </p>
          <p className="mt-0.5 text-[12px] font-medium text-emerald-700">
            Share to merge: one capsule, 5 calls · 23 emails · since Feb.
          </p>
        </div>

        <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 py-2.5 text-[14px] font-medium text-white">
          <Send className="h-3.5 w-3.5" strokeWidth={2} />
          Send capsule
        </button>

        <div className="mt-3 flex items-center justify-between gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
          <span className="flex min-w-0 items-center gap-2 text-[12.5px] text-gray-500">
            <Link2 className="h-3.5 w-3.5 shrink-0 text-gray-400" strokeWidth={2} />
            <span className="truncate">getmin.ai/c/jordan-lee</span>
          </span>
          <button className="shrink-0 text-[12.5px] font-medium text-emerald-700">
            Copy link
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Share() {
  return (
    <section id="share" className="scroll-mt-24 border-y border-gray-100 bg-white px-4 py-14 md:py-28">
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
              A capsule is shareable context. One link, and a teammate or
              partner has the whole relationship, always current. Paste it into
              a doc, a thread, or a CRM record. No internal prep call, no
              forwarded threads, no write up from memory.
            </p>
          </FadeIn>

          <FadeIn delay={0.14}>
            <div className="mt-5 space-y-3">
              <div className="flex items-center gap-2.5 rounded-xl border border-emerald-100 bg-emerald-50/60 px-4 py-3">
                <Link2 className="h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2} />
                <p className="text-[14.5px] font-medium text-gray-800">
                  Works with any CRM. No data entry, no upkeep.
                </p>
              </div>
              <div className="flex items-center gap-2.5 rounded-xl border border-emerald-100 bg-emerald-50/60 px-4 py-3">
                <Lock className="h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2} />
                <p className="text-[14.5px] font-medium text-gray-800">
                  When someone leaves, the relationships stay.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.1}>
          <div className="flex flex-col items-center gap-5 lg:items-end">
            <ShareDialog />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

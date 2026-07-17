import { History, Wand2, MessageSquareText, Users } from "lucide-react";
import { FadeIn } from "@/components/vision/FadeIn";
import CapsuleWorkspace from "./CapsuleWorkspace";

const ANNOTATIONS = [
  {
    Icon: History,
    title: "Live history",
    body: "Every call and email, summarized into what mattered: the who, what, when, where, and why. The scheduling noise never makes it in.",
  },
  {
    Icon: Wand2,
    title: "Zero manual work",
    body: "min. extracts the important details from your meetings and email on its own. Every capsule builds and maintains itself.",
  },
  {
    Icon: MessageSquareText,
    title: "Ask the AI anything",
    body: "Ask any question about the relationship, or dive deeper on what was discussed. Your whole history, one question away.",
  },
  {
    Icon: Users,
    title: "Share and merge",
    body: "You choose who gets access. Share and merge capsules with teammates to see the whole relationship, or bring someone up to speed in seconds.",
  },
];

export default function CapsuleUpClose() {
  return (
    <section id="capsule" className="scroll-mt-24 px-4 py-14 md:py-28">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-gray-900 md:text-[2.75rem] md:leading-[1.1]">
              One relationship, one capsule.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[17px] leading-relaxed text-gray-500">
              Everything summarized into an easy to read memory capsule: the who,
              what, when, where, and why. Then ask it anything.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mx-auto mt-14 max-w-5xl">
            <CapsuleWorkspace />
          </div>
        </FadeIn>

        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {ANNOTATIONS.map((a, i) => (
            <FadeIn key={a.title} delay={0.05 + i * 0.06}>
              <div>
                <div className="mb-2.5 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 shadow-sm">
                  <a.Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                </div>
                <h3 className="font-display text-[16px] font-semibold text-gray-900">{a.title}</h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-gray-500">{a.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

import { History, Wand2, MessageSquareText, Users } from "lucide-react";
import { FadeIn } from "@/components/vision/FadeIn";
import Capsule from "./Capsule";

const ANNOTATIONS = [
  {
    Icon: History,
    title: "Live history",
    body: "Every call and email, summarized into what mattered: the who, what, when, where, and why. The scheduling noise never makes it in.",
  },
  {
    Icon: Wand2,
    title: "Zero manual work",
    body: "min. extracts the important details from your emails and meetings on its own. Every capsule builds and maintains itself.",
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

function Annotation({
  a,
  align,
}: {
  a: (typeof ANNOTATIONS)[number];
  align: "left" | "right";
}) {
  return (
    <div className={align === "right" ? "lg:text-right" : "lg:text-left"}>
      <div
        className={[
          "mb-2.5 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 shadow-sm",
        ].join(" ")}
      >
        <a.Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
      </div>
      <h3 className="font-display text-[16px] font-semibold text-gray-900">{a.title}</h3>
      <p
        className={[
          "mt-1.5 text-[14px] leading-relaxed text-gray-500 lg:max-w-xs",
          align === "right" ? "lg:ml-auto" : "",
        ].join(" ")}
      >
        {a.body}
      </p>
    </div>
  );
}

export default function CapsuleUpClose() {
  return (
    <section id="capsule" className="scroll-mt-24 px-4 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-gray-900 md:text-[2.75rem] md:leading-[1.1]">
              One relationship, one capsule.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[17px] leading-relaxed text-gray-500">
              Everything summarized into an easy to read memory capsule: the who,
              what, when, where, and why.
            </p>
          </div>
        </FadeIn>

        <div className="mt-14 grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_minmax(360px,1.15fr)_1fr] lg:gap-8">
          {/* Left annotations */}
          <div className="order-2 flex flex-col gap-10 lg:order-1 lg:gap-14">
            <FadeIn delay={0.05}>
              <Annotation a={ANNOTATIONS[0]} align="right" />
            </FadeIn>
            <FadeIn delay={0.12}>
              <Annotation a={ANNOTATIONS[1]} align="right" />
            </FadeIn>
          </div>

          {/* Capsule */}
          <FadeIn delay={0.1} className="order-1 lg:order-2">
            <div className="mx-auto w-full max-w-md">
              <Capsule />
            </div>
          </FadeIn>

          {/* Right annotations */}
          <div className="order-3 flex flex-col gap-10 lg:gap-14">
            <FadeIn delay={0.05}>
              <Annotation a={ANNOTATIONS[2]} align="left" />
            </FadeIn>
            <FadeIn delay={0.12}>
              <Annotation a={ANNOTATIONS[3]} align="left" />
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

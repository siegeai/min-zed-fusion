import { Sparkles } from "lucide-react";
import { FadeIn } from "@/components/vision/FadeIn";
import CapsuleWorkspace from "./CapsuleWorkspace";

/**
 * The one big demo. The capsule speaks for itself, live history, the ask
 * rail, company swap, so no annotation row repeating what it shows. The one
 * caption that earns its place sits UNDER the card, answering the question a
 * dense record provokes: who keeps all of this up to date?
 */

export default function CapsuleUpClose() {
  return (
    <section id="capsule" className="scroll-mt-24 px-4 py-14 md:py-28">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-gray-900 md:text-[2.75rem] md:leading-[1.1]">
              One relationship, all the context.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[17px] leading-relaxed text-gray-500">
              <span className="font-medium text-gray-900">
                It reads between the lines, and across every call, email, and
                thread.
              </span>{" "}
              One page on the people deciding your deal, your promotion, your
              callback. Always current.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mx-auto mt-14 max-w-5xl">
            <CapsuleWorkspace />
            <p className="mx-auto mt-6 flex max-w-xl items-center justify-center gap-2 text-center text-[13.5px] leading-relaxed text-gray-400">
              <Sparkles
                className="h-3.5 w-3.5 shrink-0 text-emerald-500"
                strokeWidth={2}
              />
              Built completely automatically from your calendar, meetings, and
              emails.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

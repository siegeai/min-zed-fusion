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
              Relationship context continuously fed into min.
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
            {/* One flowing sentence: `flex` here would make the text node and
                the bolded span separate flex items sitting side by side */}
            <p className="mx-auto mt-6 max-w-2xl text-center text-[13.5px] leading-relaxed text-gray-400">
              <Sparkles
                className="mr-1.5 inline-block h-3.5 w-3.5 align-[-2px] text-emerald-500"
                strokeWidth={2}
              />
              Built completely auto-magically from your calendar, meetings, and
              emails.{" "}
              <span className="font-medium text-gray-900">
                No data entry, ever.
              </span>
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

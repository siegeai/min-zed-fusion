import { FadeIn } from "@/components/vision/FadeIn";
import CapsuleWorkspace from "./CapsuleWorkspace";

/**
 * The one big demo. The capsule speaks for itself, live history, the ask
 * rail, share, company swap, so no annotation row repeating what it shows.
 */

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
              <span className="font-medium text-gray-900">
                It reads between the lines, and between the conversations.
              </span>{" "}
              The whole relationship in a one page TL;DR, one click deep dives.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mx-auto mt-14 max-w-5xl">
            <CapsuleWorkspace />
          </div>
        </FadeIn>

        <FadeIn delay={0.16}>
          <p className="mx-auto mt-8 max-w-xl text-center text-[15px] leading-relaxed text-gray-500">
            This is how a $12K pilot doesn't slip through the cracks.{" "}
            <span className="font-medium text-gray-900">
              That is relationship intelligence.
            </span>
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

import { FadeIn } from "@/components/vision/FadeIn";

/**
 * The category turn, one line between the hero and everything else. The hero
 * already carries the pain; this names why nothing they use today fixes it.
 */

export default function ProblemStrip() {
  return (
    <section className="border-y border-gray-100 bg-white px-4 py-10 md:py-12">
      <FadeIn>
        <p className="mx-auto max-w-3xl text-center text-[17px] leading-relaxed text-gray-500 md:text-[19px]">
          Work runs on relationships. Meeting apps remember meetings. Inboxes
          remember threads.{" "}
          <span className="font-medium text-gray-900">
            min. remembers relationships.
          </span>
        </p>
      </FadeIn>
    </section>
  );
}

import { FadeIn } from "@/components/vision/FadeIn";

/**
 * The recognition beat: three moments the visitor felt this week, before any
 * pitch. Closes on the category turn, why nothing they already use fixed it.
 */

const PROBLEMS = [
  "One customer's story is spread across your inbox, your calendar, and calls you half remember.",
  "A teammate talked to them last week, and you have no idea what was said.",
  "You are the only thing connecting what they asked for in March to what they need now.",
];

export default function ProblemStrip() {
  return (
    <section className="border-y border-gray-100 bg-white px-4 py-14 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10">
          {PROBLEMS.map((p, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <p className="font-display text-[19px] font-medium leading-snug text-gray-900 md:px-2">
                {p}
              </p>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.24}>
          <p className="mt-12 border-t border-gray-100 pt-8 text-center text-[17px] leading-relaxed text-gray-500">
            Meeting apps remember meetings. Inboxes remember threads.{" "}
            <span className="font-medium text-gray-900">
              min. remembers relationships.
            </span>
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

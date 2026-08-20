import { FadeIn } from "@/components/vision/FadeIn";
import { Download, Mail } from "lucide-react";
import { getDownloadTarget } from "@/lib/download";

/**
 * The 2026-08 pivot hero: min. as the AI teammate you teach.
 *
 * The whole page is built to be understood in fifteen seconds, so the hero
 * carries exactly three ideas: what min. is, the two ways to start, and the
 * trust line. The primary CTA is a mailto because the product's first entry
 * point IS an email: the button starts the onboarding.
 */
export default function TeammateHero() {
  return (
    <section className="px-4 pb-10 pt-28 md:pt-40 md:pb-16">
      <div className="mx-auto max-w-3xl text-center">
        <FadeIn delay={0.1}>
          <h1 className="font-display text-[2.6rem] font-semibold leading-[1.08] tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            The AI teammate you teach.
          </h1>
        </FadeIn>

        <FadeIn delay={0.18}>
          <p className="mx-auto mt-6 max-w-xl text-[17px] leading-relaxed text-gray-500">
            min. does the small daily tasks of work, for you and your team.
            It remembers, schedules, captures, and follows up.
          </p>
        </FadeIn>

        <FadeIn delay={0.26}>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="mailto:min@getmin.ai?subject=hi%20min."
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-black px-7 py-3.5 text-[15px] font-medium text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-xl sm:w-auto"
            >
              <Mail className="h-4 w-4" strokeWidth={2} />
              Email min@getmin.ai
            </a>
            <a
              href={getDownloadTarget().href}
              className="inline-flex items-center gap-2 rounded-full px-5 py-3.5 text-[15px] font-medium text-gray-600 transition-colors hover:bg-black/5 hover:text-gray-900"
            >
              {getDownloadTarget().label}
              <Download className="h-4 w-4" strokeWidth={2} />
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={0.34}>
          <p className="mt-7 text-[13px] text-gray-400">
            That is the whole onboarding. CC it, invite it, or email it.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

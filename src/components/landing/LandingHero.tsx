import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/vision/FadeIn";
import Capsule from "./Capsule";
import Constellation from "./Constellation";

const APP_URL = "https://app.getmin.ai";

export default function LandingHero() {
  return (
    <section className="relative overflow-hidden px-4 pt-28 pb-6 md:pt-36 md:pb-8">
      <Constellation className="opacity-70" />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        {/* Copy */}
        <div className="text-center lg:text-left">
          <FadeIn delay={0.05}>
            <span className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white/70 px-3 py-1 text-[12.5px] font-medium text-gray-600 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Relationship memory, zero upkeep
            </span>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="font-display text-[2.6rem] font-semibold leading-[1.08] tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="text-gray-400">
                Your relationships live in five places.
              </span>
              <br /> min. brings them into one.
            </h1>
          </FadeIn>

          <FadeIn delay={0.18}>
            <p className="mx-auto mt-6 max-w-xl text-[17px] leading-relaxed text-gray-500 lg:mx-0">
              Calls, email, calendar, and your teammates each hold a different
              piece. One living memory for every person, company, and group, so
              you stop stitching the story together yourself.
            </p>
          </FadeIn>

          <FadeIn delay={0.26}>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
              <a
                href={APP_URL}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-black px-7 py-3.5 text-[15px] font-medium text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-xl sm:w-auto"
              >
                Connect your calendar
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </a>
              <a
                href="#capsule"
                className="rounded-full px-5 py-3.5 text-[15px] font-medium text-gray-600 transition-colors hover:bg-black/5 hover:text-gray-900"
              >
                See example capsule
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={0.34}>
            <p className="mt-7 text-[13px] text-gray-400">
              Works with Google and Outlook calendars. Two minute setup.
            </p>
          </FadeIn>
        </div>

        {/* Capsule */}
        <FadeIn delay={0.2}>
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <Capsule />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

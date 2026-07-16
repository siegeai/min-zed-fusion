import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/vision/FadeIn";
import Constellation from "./Constellation";

const APP_URL = "https://app.getmin.ai";

export default function FinalCTA() {
  return (
    <section className="px-4 py-24">
      <FadeIn>
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-zinc-950 px-8 py-20 text-center md:py-28">
          <Constellation className="opacity-40" />
          <div className="relative">
            <h2 className="mx-auto mb-6 max-w-2xl font-display text-3xl font-semibold leading-[1.1] tracking-tight text-white md:text-5xl">
              Stop walking in cold.
            </h2>
            <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-gray-400">
              Connect in two minutes. min. does the rest.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={APP_URL}
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-medium text-black shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-100"
              >
                Connect your calendar
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </a>
              <a
                href="#capsule"
                className="rounded-full px-8 py-3.5 font-medium text-gray-300 transition-colors duration-200 hover:bg-white/5"
              >
                See a relationship capsule
              </a>
            </div>
            <p className="mt-8 text-[13px] text-gray-500">
              Works with Google and Outlook calendars. Your memory, your eyes only.
            </p>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

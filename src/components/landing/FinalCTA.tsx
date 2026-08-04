import { Download } from "lucide-react";
import { FadeIn } from "@/components/vision/FadeIn";
import Constellation from "./Constellation";
import { getDownloadTarget } from "@/lib/download";


export default function FinalCTA() {
  return (
    <section className="px-4 py-14 md:py-24">
      <FadeIn>
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-zinc-950 px-6 py-14 text-center sm:px-8 md:rounded-[2.5rem] md:py-28">
          <Constellation className="opacity-40" />
          <div className="relative">
            <h2 className="mx-auto mb-6 max-w-2xl font-display text-3xl font-semibold leading-[1.1] tracking-tight text-white md:text-5xl">
              All your context,
              <br className="hidden sm:block" /> at your fingertips.
            </h2>
            <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-gray-400">
              Every relationship distilled into a living capsule, ready
              wherever you work, even inside any AI model or tool you already
              use.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={getDownloadTarget().href}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-medium text-black shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-100 sm:w-auto"
              >
                {getDownloadTarget().label}
                <Download className="h-4 w-4" strokeWidth={2} />
              </a>
              <a
                href="#capsule"
                className="rounded-full px-8 py-3.5 font-medium text-gray-300 transition-colors duration-200 hover:bg-white/5"
              >
                See interactive demo
              </a>
            </div>
            <p className="mt-8 text-[13px] text-gray-500">
              For macOS and Windows. Your capsules, your eyes only.
            </p>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

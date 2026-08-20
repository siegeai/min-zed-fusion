import { FadeIn } from "@/components/vision/FadeIn";
import { Lock, Users, HeartHandshake } from "lucide-react";

/**
 * The mental model and the trust line, together, because for a product that
 * listens to meetings the trust line IS the pitch. Three short cards, no
 * qualifiers, in the product's own plain words.
 */
export default function Trust() {
  return (
    <section id="trust" className="scroll-mt-24 px-4 py-12 md:py-20">
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <div className="text-center">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-gray-900 md:text-[2.5rem]">
              Private by default. Share deliberately.
            </h2>
          </div>
        </FadeIn>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          <FadeIn delay={0.05}>
            <div className="h-full rounded-2xl border border-gray-200/80 bg-white p-6">
              <Lock className="h-5 w-5 text-emerald-600" strokeWidth={2} />
              <h3 className="mt-3 font-display text-[16px] font-semibold text-gray-900">
                Yours unless you share it
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-gray-600">
                min. remembers things privately for you. It can sit in a
                sensitive 1:1 without making it company knowledge. Seeing
                something is never sharing it.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="h-full rounded-2xl border border-gray-200/80 bg-white p-6">
              <Users className="h-5 w-5 text-emerald-600" strokeWidth={2} />
              <h3 className="mt-3 font-display text-[16px] font-semibold text-gray-900">
                Spaces are shared memory
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-gray-600">
                Your team is the first space. A Sales space or an Acme space is
                one click away, or one connected channel, or one email to
                sales@yourco.getmin.ai.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="h-full rounded-2xl border border-gray-200/80 bg-white p-6">
              <HeartHandshake className="h-5 w-5 text-emerald-600" strokeWidth={2} />
              <h3 className="mt-3 font-display text-[16px] font-semibold text-gray-900">
                Never scores you
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-gray-600">
                min. never coaches, scores, or manages you. It quietly does the
                small things so the team does not have to.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

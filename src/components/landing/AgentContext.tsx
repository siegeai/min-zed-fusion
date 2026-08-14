import { FadeIn } from "@/components/vision/FadeIn";
import { Zap } from "lucide-react";

/**
 * The coding-agent use case, promoted to a landing section for the Product
 * Hunt launch ("CRM for your coding agents").
 *
 * This is launch slide 5 ported to the page: a real MCP exchange rather than a
 * feature list, because the audience for this section reads code and can smell
 * a mocked-up tool call. The example mirrors the Aperture demo the rest of the
 * page uses, so the site keeps telling one story.
 */
export default function AgentContext() {
  return (
    <section id="agents" className="scroll-mt-24 px-4 py-14 md:py-24">
      <div className="mx-auto max-w-4xl">
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] tracking-[0.2em] uppercase text-gray-400 mb-3">
              MCP
            </p>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-gray-900 md:text-[2.75rem] md:leading-[1.1]">
              Introduce them to your coding agents.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[17px] leading-relaxed text-gray-500">
              Your agents are missing business context: what customers asked
              for, why decisions were made, what matters. min. serves it over
              MCP, straight from the CRM that builds itself.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.12}>
          <div className="mt-10 overflow-hidden rounded-[22px] border border-gray-200/80 bg-[#FBFBFA] shadow-[0_16px_60px_-16px_rgba(0,0,0,0.18)]">
            <div className="px-5 py-5 font-mono text-[13px] sm:px-7 sm:py-6 sm:text-[13.5px]">
              {/* The developer's question */}
              <div className="flex items-baseline gap-2.5 font-medium text-gray-900">
                <span className="font-bold text-emerald-500">&gt;</span>
                <span>
                  Why is Aperture blocked, and what do they still need from us?
                </span>
              </div>

              {/* The tool call */}
              <div className="mt-4 inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50/70 px-3 py-2 text-[12.5px] text-emerald-900">
                <Zap className="h-3.5 w-3.5 text-emerald-600" strokeWidth={2} />
                <span className="font-bold">min</span>
                <span aria-hidden="true">·</span>
                <span>
                  get_relationship<span className="opacity-70">(&quot;jordan@aperture.io&quot;)</span>
                </span>
              </div>

              {/* What comes back */}
              <div className="mt-4 border-l-2 border-emerald-200 pl-4 sm:pl-5">
                <p className="font-sans text-[10.5px] font-bold uppercase tracking-[0.14em] text-gray-400">
                  Asked for
                </p>
                <p className="mt-1 leading-relaxed text-gray-700">
                  <span className="font-bold text-gray-900">
                    CSV export before kickoff.
                  </span>{" "}
                  Raised twice, Jun 2 email and Jun 8 call. Sam blocks the
                  pilot on it.
                </p>
                <p className="mt-3 font-sans text-[10.5px] font-bold uppercase tracking-[0.14em] text-gray-400">
                  Open commitments
                </p>
                <p className="mt-1 leading-relaxed text-gray-700">
                  You owe{" "}
                  <span className="font-bold text-gray-900">
                    the onboarding checklist
                  </span>
                  , promised Jun 8. Pilot kickoff{" "}
                  <span className="font-bold text-gray-900">July 1</span>.
                </p>
              </div>

              {/* The agent's plan */}
              <div className="mt-5 rounded-xl border border-gray-100 bg-white px-4 py-3 font-sans text-[14.5px] leading-relaxed text-gray-700">
                Building the <span className="font-semibold text-gray-900">CSV export</span>{" "}
                first. It was promised on the Jun 8 call, Sam&apos;s workflow
                blocks on it, and kickoff is July 1.
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="mt-6 text-center text-[13.5px] text-gray-500">
            Works in Claude Code, Cursor, and any MCP client. The context your
            agents were missing, from the conversations you were already having.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

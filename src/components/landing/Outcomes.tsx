import { useState } from "react";
import { Handshake, TrendingUp, PhoneIncoming, type LucideIcon } from "lucide-react";
import { FadeIn } from "@/components/vision/FadeIn";

/**
 * The three wins from the hero, each made concrete: pick an arena, see the
 * question you would actually ask and the grounded answer min. gives back.
 * All content is fictional, real-shaped demo data.
 */

type Outcome = {
  key: string;
  tab: string;
  Icon: LucideIcon;
  persona: string;
  scope: string;
  q: string;
  a: string;
  grounded: string;
};

const OUTCOMES: Outcome[] = [
  {
    key: "deal",
    tab: "Close the deal",
    Icon: Handshake,
    persona: "You & Jordan Lee",
    scope: "Founder & CEO, Aperture · 3 calls · 14 emails",
    q: "What has my team promised Aperture?",
    a: "The onboarding checklist from the Jun 8 call and a team demo promised for the week of Jun 11. Jordan owes you the signed pilot agreement. Clear your two and the July 1 kickoff holds.",
    grounded: "Grounded in 3 calls and 14 emails with Jordan",
  },
  {
    key: "promotion",
    tab: "Get the promotion",
    Icon: TrendingUp,
    persona: "You & Dana Okafor",
    scope: "Your manager · 14 one on ones · since Jan",
    q: "Prep me for my performance review.",
    a: "Dana has raised cross team wins in three straight one on ones, and you shipped two: the billing migration and the on call overhaul. She asked for numbers on both in the May 12 check in. Walk in with those two figures and let her make the case for you.",
    grounded: "Grounded in 14 one on ones with Dana",
  },
  {
    key: "callback",
    tab: "Get the callback",
    Icon: PhoneIncoming,
    persona: "You & Maya Chen",
    scope: "Partner, Kearny Ventures · 2 calls · 6 emails",
    q: "Follow up with Maya without being pushy.",
    a: "Maya's last email asked how retention held after the June launch, so answer that first. She also mentioned her partner meeting moves to Mondays in August. Send the retention number Friday and ask for ten minutes before Monday.",
    grounded: "Grounded in 2 calls and 6 emails with Maya",
  },
];

export default function Outcomes() {
  const [active, setActive] = useState(OUTCOMES[0].key);
  const current = OUTCOMES.find((o) => o.key === active) ?? OUTCOMES[0];

  return (
    <section id="win" className="scroll-mt-24 px-4 py-14 md:py-28">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-gray-900 md:text-[2.75rem] md:leading-[1.1]">
              Whatever winning means to you.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[17px] leading-relaxed text-gray-500">
              A deal, a promotion, a callback. Every answer grounded in what was
              actually said, because min. was there for all of it.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mx-auto mt-10 max-w-3xl">
            {/* Arena tabs */}
            <div className="flex flex-wrap justify-center gap-2">
              {OUTCOMES.map((o) => (
                <button
                  key={o.key}
                  type="button"
                  onClick={() => setActive(o.key)}
                  className={[
                    "inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2 text-[13.5px] font-medium transition-colors",
                    o.key === active
                      ? "border-gray-900 bg-gray-900 text-white"
                      : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:text-gray-900",
                  ].join(" ")}
                >
                  <o.Icon className="h-3.5 w-3.5" strokeWidth={2} />
                  {o.tab}
                </button>
              ))}
            </div>

            {/* The exchange */}
            <div
              key={current.key}
              className="mt-6 rounded-[22px] border border-gray-200/80 bg-white px-5 py-5 shadow-[0_16px_60px_-16px_rgba(0,0,0,0.14)] sm:px-7 sm:py-6"
            >
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                <span className="font-display text-[15px] font-semibold text-gray-900">
                  {current.persona}
                </span>
                <span className="text-[12px] text-gray-400">{current.scope}</span>
              </div>

              <div className="mt-4 space-y-2.5">
                <div className="ml-auto w-fit max-w-[92%] rounded-2xl rounded-br-sm bg-gray-900 px-3.5 py-2 text-[13px] text-white">
                  {current.q}
                </div>
                <div className="w-fit max-w-[96%] rounded-2xl rounded-bl-sm border border-gray-100 bg-[#FBFBFA] px-3.5 py-2.5 text-[13px] leading-relaxed text-gray-700">
                  {current.a}
                </div>
              </div>

              <p className="mt-3.5 text-[11.5px] text-gray-400">{current.grounded}</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

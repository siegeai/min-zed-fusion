import { Shield, EyeOff, Send } from "lucide-react";
import { FadeIn } from "@/components/vision/FadeIn";

const POINTS = [
  {
    Icon: Shield,
    text: "min. keeps distilled memory, not your raw email. Message bodies are not stored.",
  },
  {
    Icon: EyeOff,
    text: "Insights are your eyes only. Sharing is explicit, scoped to one relationship, and revocable.",
  },
  {
    Icon: Send,
    text: "Nothing is sent to anyone unless you share it.",
  },
];

export default function Privacy() {
  return (
    <section className="px-4 py-14 md:py-28">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <h2 className="max-w-2xl font-display text-3xl font-semibold tracking-tight text-gray-900 md:text-[2.5rem] md:leading-[1.12]">
            Your memory, not a copy of your mailbox.
          </h2>
        </FadeIn>
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {POINTS.map((p, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-gray-100 bg-white p-6">
                <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-100 bg-emerald-50 text-emerald-600">
                  <p.Icon className="h-5 w-5" strokeWidth={1.8} />
                </span>
                <p className="text-[15px] leading-relaxed text-gray-700">{p.text}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

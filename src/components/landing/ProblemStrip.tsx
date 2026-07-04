import { FadeIn } from "@/components/vision/FadeIn";

const PROBLEMS = [
  {
    quote: "I walked into the call cold. I couldn't remember what we agreed to last time.",
    sub: null,
  },
  {
    quote: "We tried a CRM. Nobody filled it in. It died.",
    sub: "CRMs are built for sales teams running pipeline, and small teams get forced into them anyway.",
  },
  {
    quote: "The knowledge lives in threads and calls nobody rereads.",
    sub: "When a teammate leaves, their relationships leave with them.",
  },
];

export default function ProblemStrip() {
  return (
    <section className="border-y border-gray-100 bg-white px-4 py-16 md:py-20">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3 md:gap-10">
        {PROBLEMS.map((p, i) => (
          <FadeIn key={i} delay={i * 0.08}>
            <div className="md:px-2">
              <p className="font-display text-[19px] font-medium leading-snug text-gray-900">
                {p.quote}
              </p>
              {p.sub && (
                <p className="mt-3 text-[14.5px] leading-relaxed text-gray-500">
                  {p.sub}
                </p>
              )}
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

import { FadeIn } from './FadeIn';

export default function Hero() {
  return (
    <section className="pt-36 md:pt-40 pb-20 px-4 flex flex-col items-center text-center max-w-5xl mx-auto">
      <FadeIn delay={0.1}>
        <h1 className="text-5xl md:text-7xl font-display font-semibold tracking-tight text-gray-900 leading-[1.1] mb-6">
          Talk to your tools and data <br className="hidden md:block" /> all in one place
        </h1>
      </FadeIn>

      <FadeIn delay={0.2}>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          min lets you organize your emails, docs, CRM, and ERP into a channel
          for every team and project. Ask anything, get work done, and never
          start from scratch.
        </p>
      </FadeIn>

      <FadeIn delay={0.3}>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <a
            href="https://app.getmin.ai"
            className="bg-black text-white px-8 py-3.5 rounded-full text-base font-medium hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 duration-200"
          >
            Start a memory channel
          </a>
          <a
            href="mailto:hello@getmin.ai?subject=Demo%20Request"
            className="text-gray-600 font-medium px-8 py-3.5 rounded-full hover:bg-black/5 transition-colors duration-200"
          >
            Book a demo
          </a>
        </div>
      </FadeIn>
    </section>
  );
}

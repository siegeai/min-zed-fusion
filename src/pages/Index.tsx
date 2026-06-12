import { Helmet } from "react-helmet-async";
import PillNav from "@/components/PillNav";
import MinFooter from "@/components/MinFooter";
import { FadeIn } from "@/components/vision/FadeIn";
import Hero from "@/components/vision/Hero";
import Showcase from "@/components/vision/Showcase";
import MemoryChannels from "@/components/vision/MemoryChannels";
import Features from "@/components/vision/Features";
import BrainAnimation from "@/components/vision/BrainAnimation";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>min. | Talk to your tools and data, all in one place</title>
        <meta
          name="description"
          content="min. lets you organize your emails, docs, CRM, and ERP into a channel for every team and project. Ask anything, get work done, and never start from scratch, in Slack, Teams, or the AI of your choice."
        />
        <link rel="canonical" href="https://getmin.ai" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-[#FAFAF9] text-gray-900 font-sans antialiased overflow-x-hidden selection:bg-gray-200 selection:text-black">
        <PillNav />

        <main className="flex-1">
          <Hero />
          <div className="px-4">
            <Showcase />
          </div>
          <MemoryChannels />
          <Features />
          <BrainAnimation />
          <ClosingCTA />
        </main>

        <MinFooter />
      </div>
    </>
  );
};

function ClosingCTA() {
  return (
    <section className="px-4 py-24">
      <FadeIn>
        <div className="max-w-5xl mx-auto rounded-[2.5rem] bg-zinc-950 px-8 py-20 md:py-28 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_60%)] pointer-events-none" />
          <div className="relative">
            <h2 className="text-3xl md:text-5xl font-display font-semibold text-white tracking-tight leading-[1.1] mb-6 max-w-2xl mx-auto">
              Give every team one place to remember
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto mb-10 font-normal leading-relaxed">
              Connect your tools in minutes. min organizes the context so your
              people and your AI always have the full picture.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://app.getmin.ai"
                className="bg-white text-black px-8 py-3.5 rounded-full text-base font-medium hover:bg-gray-100 transition-all shadow-lg hover:-translate-y-0.5 duration-200"
              >
                Start a memory channel
              </a>
              <a
                href="mailto:hello@getmin.ai?subject=Demo%20Request"
                className="text-gray-300 font-medium px-8 py-3.5 rounded-full hover:bg-white/5 transition-colors duration-200"
              >
                Book a demo
              </a>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

export default Index;

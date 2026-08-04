import { Helmet } from "react-helmet-async";
import PillNav from "@/components/PillNav";
import MinFooter from "@/components/MinFooter";
import LandingHero from "@/components/landing/LandingHero";
import Integrations from "@/components/landing/Integrations";
import CapsuleUpClose from "@/components/landing/CapsuleUpClose";
import HowItWorks from "@/components/landing/HowItWorks";
import Share from "@/components/landing/Share";
import FinalCTA from "@/components/landing/FinalCTA";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>min. | The TL;DR for your customer relationships</title>
        <meta
          name="description"
          content="Your customer context lives in five places: calls, emails, calendars, notetakers, and your teammates' heads. min. brings every word of it into one shareable capsule, giving your team full context."
        />
        <link rel="canonical" href="https://getmin.ai" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-[#FAFAF9] text-gray-900 font-sans antialiased overflow-x-hidden selection:bg-gray-200 selection:text-black">
        <PillNav />

        <main className="flex-1">
          <LandingHero />
          <Integrations />
          <CapsuleUpClose />
          <Share />
          <HowItWorks />
          <FinalCTA />
        </main>

        <MinFooter />
      </div>
    </>
  );
};

export default Index;

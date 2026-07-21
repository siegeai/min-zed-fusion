import { Helmet } from "react-helmet-async";
import PillNav from "@/components/PillNav";
import MinFooter from "@/components/MinFooter";
import LandingHero from "@/components/landing/LandingHero";
import ProblemStrip from "@/components/landing/ProblemStrip";
import Integrations from "@/components/landing/Integrations";
import CapsuleTypes from "@/components/landing/CapsuleTypes";
import CapsuleUpClose from "@/components/landing/CapsuleUpClose";
import HowItWorks from "@/components/landing/HowItWorks";
import Assistant from "@/components/landing/Assistant";
import Share from "@/components/landing/Share";
import Privacy from "@/components/landing/Privacy";
import FinalCTA from "@/components/landing/FinalCTA";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>min. | One living memory for every relationship</title>
        <meta
          name="description"
          content="One customer sits in your inbox, your calendar, your calls, and your teammates' heads. min. keeps one living memory for every person, company, and group you work with, so you stop stitching the story together yourself."
        />
        <link rel="canonical" href="https://getmin.ai" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-[#FAFAF9] text-gray-900 font-sans antialiased overflow-x-hidden selection:bg-gray-200 selection:text-black">
        <PillNav />

        <main className="flex-1">
          <LandingHero />
          <ProblemStrip />
          <Integrations />
          <CapsuleTypes />
          <CapsuleUpClose />
          <HowItWorks />
          <Assistant />
          <Share />
          <Privacy />
          <FinalCTA />
        </main>

        <MinFooter />
      </div>
    </>
  );
};

export default Index;

import { Helmet } from "react-helmet-async";
import PillNav from "@/components/PillNav";
import MinFooter from "@/components/MinFooter";
import LandingHero from "@/components/landing/LandingHero";
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
        <title>min. | The relationship assistant that never forgets</title>
        <meta
          name="description"
          content="min. is your relationship assistant with perfect recall. It remembers every person, company, and group you work with, built from your email and meetings, so you never walk in cold or drop a commitment."
        />
        <link rel="canonical" href="https://getmin.ai" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-[#FAFAF9] text-gray-900 font-sans antialiased overflow-x-hidden selection:bg-gray-200 selection:text-black">
        <PillNav />

        <main className="flex-1">
          <LandingHero />
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

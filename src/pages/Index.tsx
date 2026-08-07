import { Helmet } from "react-helmet-async";
import PillNav from "@/components/PillNav";
import MinFooter from "@/components/MinFooter";
import LandingHero from "@/components/landing/LandingHero";
import Integrations from "@/components/landing/Integrations";
import CapsuleUpClose from "@/components/landing/CapsuleUpClose";
import HowItWorks from "@/components/landing/HowItWorks";
import FinalCTA from "@/components/landing/FinalCTA";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>The relationship AI whose only job is helping you win | min.</title>
        <meta
          name="description"
          content="The relationship AI whose only job is helping you win. Close the deal. Land that promotion. Get the callback. Free for your whole team."
        />
        <link rel="canonical" href="https://getmin.ai" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-[#FAFAF9] text-gray-900 font-sans antialiased overflow-x-hidden selection:bg-gray-200 selection:text-black">
        <PillNav />

        <main className="flex-1">
          <LandingHero />
          <Integrations />
          <CapsuleUpClose />
          <HowItWorks />
          <FinalCTA />
        </main>

        <MinFooter />
      </div>
    </>
  );
};

export default Index;

import { Helmet } from "react-helmet-async";
import PillNav from "@/components/PillNav";
import MinFooter from "@/components/MinFooter";
import LandingHero from "@/components/landing/LandingHero";
import Integrations from "@/components/landing/Integrations";
import CapsuleUpClose from "@/components/landing/CapsuleUpClose";
import HowItWorks from "@/components/landing/HowItWorks";
import FinalCTA from "@/components/landing/FinalCTA";
import LatestWriting from "@/components/landing/LatestWriting";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>AI that builds a digital version of everyone you work with | min.</title>
        <meta
          name="description"
          content="min. builds a digital version of everyone you work with, from every call and email. Get the callback. Close the deal. Land that promotion."
        />
        <link rel="canonical" href="https://getmin.ai/" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-[#FAFAF9] text-gray-900 font-sans antialiased overflow-x-hidden selection:bg-gray-200 selection:text-black">
        <PillNav />

        <main className="flex-1">
          <LandingHero />
          <Integrations />
          <CapsuleUpClose />
          <HowItWorks />
          <LatestWriting />
          <FinalCTA />
        </main>

        <MinFooter />
      </div>
    </>
  );
};

export default Index;

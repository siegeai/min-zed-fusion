import { Helmet } from "react-helmet-async";
import PillNav from "@/components/PillNav";
import MinFooter from "@/components/MinFooter";
import LandingHero from "@/components/landing/LandingHero";
import ProblemStrip from "@/components/landing/ProblemStrip";
import CapsuleUpClose from "@/components/landing/CapsuleUpClose";
import HowItWorks from "@/components/landing/HowItWorks";
import MergeShare from "@/components/landing/MergeShare";
import SurfaceTiles from "@/components/landing/SurfaceTiles";
import Privacy from "@/components/landing/Privacy";
import FinalCTA from "@/components/landing/FinalCTA";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>min. | Relationship memory for small teams</title>
        <meta
          name="description"
          content="min. turns your email and meetings into a live shared memory of every relationship. Zero manual work. Merge it, share it with your team."
        />
        <link rel="canonical" href="https://getmin.ai" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-[#FAFAF9] text-gray-900 font-sans antialiased overflow-x-hidden selection:bg-gray-200 selection:text-black">
        <PillNav />

        <main className="flex-1">
          <LandingHero />
          <ProblemStrip />
          <CapsuleUpClose />
          <HowItWorks />
          <MergeShare />
          <SurfaceTiles />
          <Privacy />
          <FinalCTA />
        </main>

        <MinFooter />
      </div>
    </>
  );
};

export default Index;

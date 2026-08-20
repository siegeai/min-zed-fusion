import { Helmet } from "react-helmet-async";
import PillNav from "@/components/PillNav";
import MinFooter from "@/components/MinFooter";
import PlainLanding from "@/components/landing/PlainLanding";

/**
 * The 2026-08 revamp: one typeset page, understood in fifteen seconds.
 * Plain text does the work; decoration lives in the background only. The
 * older sections remain in the tree but are deliberately not composed here.
 */
const Index = () => {
  return (
    <>
      <Helmet>
        <title>min. | The AI teammate that does the little things right</title>
        <meta
          name="description"
          content="min. books your meetings, takes the notes, remembers your follow ups, and holds your team's context. Email min@getmin.ai to start. Private by default."
        />
        <link rel="canonical" href="https://getmin.ai/" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-[#FAFAF9] text-gray-900 font-sans antialiased overflow-x-hidden selection:bg-gray-200 selection:text-black">
        <PillNav />

        <main className="flex-1">
          <PlainLanding />
        </main>

        <MinFooter />
      </div>
    </>
  );
};

export default Index;

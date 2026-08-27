import { Helmet } from "react-helmet-async";
import PillNav from "@/components/PillNav";
import MinFooter from "@/components/MinFooter";
import MinionLanding from "@/components/landing/MinionLanding";

/**
 * The 2026-08 minion brief. One idea: every team gets a named teammate, and
 * the name is its email address. The hero is the name mechanic rather than a
 * screenshot, and there is no signup form anywhere on the page: the address is
 * the call to action. Older landing sections remain in the tree but are
 * deliberately not composed here.
 */
const Index = () => {
  return (
    <>
      <Helmet>
        <title>min. | Meet your engineering team's minion</title>
        <meta
          name="description"
          content="An AI teammate for engineering teams. Sits in your standups and design reviews, holds what the team decided, and opens the PR."
        />
        <link rel="canonical" href="https://getmin.ai/" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-paper text-ink font-sans antialiased overflow-x-hidden selection:bg-moss-soft selection:text-ink">
        <PillNav />

        <main className="flex-1">
          <MinionLanding />
        </main>

        <MinFooter />
      </div>
    </>
  );
};

export default Index;

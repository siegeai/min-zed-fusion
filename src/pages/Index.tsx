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
        <title>min. | Meet your team's minion</title>
        <meta
          name="description"
          content="Every team gets a minion: a named teammate who sits in your meetings, holds what the team knows, and answers when you ask. Invite them to your next meeting. Nothing to install."
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

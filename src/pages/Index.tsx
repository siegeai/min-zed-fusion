import { Helmet } from "react-helmet-async";
import PillNav from "@/components/PillNav";
import MinFooter from "@/components/MinFooter";
import MinionLanding from "@/components/landing/MinionLanding";

/**
 * The 2026-08-31 brief. One idea: min. is an engineer on your team, and its
 * home is the codebase. The centrepiece is the issue-to-PR loop, not the
 * standup timeline, and the front door is connecting a repo rather than the
 * email invite. Meetings are demoted to what they now are: the reason its
 * plans carry context a ticket does not. Older landing sections remain in the
 * tree but are deliberately not composed here.
 */
const Index = () => {
  return (
    <>
      <Helmet>
        <title>min. | The AI engineer on your team</title>
        <meta
          name="description"
          content="An AI engineer that knows your codebase and turns issues into pull requests you review. Hand it the issue, review the PR."
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

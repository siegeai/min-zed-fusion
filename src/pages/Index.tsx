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
        <title>min. | The AI engineer in your repos</title>
        <meta
          name="description"
          content="I'm min., a dedicated engineer for your GitHub repos. Give me any task: I know the whole codebase, write the fix, and open a pull request your team reviews."
        />
        <link rel="canonical" href="https://getmin.ai/" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-paper text-ink font-sans antialiased overflow-x-clip selection:bg-moss-soft selection:text-ink">
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

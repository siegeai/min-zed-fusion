import MemoryField from "./MemoryField";

/**
 * The landing page.
 *
 * One idea: min. is an engineer on your team and its home is the codebase. The
 * page is the loop and nothing else — hand it an issue, review the PR — plus
 * the two facts a reader needs before they can picture using it: it works
 * across a project's repos, and not everyone who talks to it gets the same
 * version of it.
 *
 * Two things were deliberately removed rather than reworded. The named agent
 * with its own email address is gone from the product, so the name picker and
 * the invite mechanic went with it. The meetings section went too: it argued
 * for context the page no longer needs to argue for.
 */

/**
 * The loop, and the centrepiece of the page.
 *
 * One issue, start to finish, in the order it actually happens. The order is
 * the argument: it reads the issue, says how it hits THIS codebase, proposes a
 * plan, and then waits. The wait is the row that earns the trust, so it gets
 * its own line rather than being folded into the plan above it.
 *
 * Specifics are load bearing. A file name, a named cause and a file count are
 * things a diff could disprove, which is the only kind of claim this audience
 * reads. "Understands your code" is not on the page anywhere, because nothing
 * about it can be checked.
 */
const LOOP: { label: string; accent?: boolean; body: React.ReactNode }[] = [
  {
    label: "Issue #142 · payments-api",
    body: "Webhook retries double-charge on timeout.",
  },
  {
    label: "min.",
    body: (
      <>
        Traced it to the retry handler in{" "}
        <span className="font-mono text-[12.5px] text-ink">charge_worker.ts</span>.
        The idempotency key is minted after the network call, so a timeout mints
        a second one. Two files, no migration. Want me to do it?
      </>
    ),
  },
  { label: "You", body: "Do it." },
  {
    label: "PR #143 opened",
    accent: true,
    body: "2 files changed · awaiting your review.",
  },
];

/**
 * Not a pricing table. The rows split on what someone is allowed to do, and the
 * last one is the one no other coding agent has an answer for: a customer can
 * ask about the product without the codebase leaking through the answer.
 */
const ACCESS: [string, string][] = [
  ["Your team", "The whole engineer. It plans, writes the code, and opens the pull request."],
  [
    "Guests",
    "Contractors and partners ask about the code and propose changes as PRs. Write access stays with membership.",
  ],
  [
    "Your customers",
    "Ask-only. It answers what the product does without revealing how the code works, and files a clean issue when the answer is a bug.",
  ],
];

const H2 =
  "font-display text-[1.6rem] font-semibold leading-tight tracking-[-0.025em] text-ink [text-wrap:balance]";
const BODY = "text-[15.5px] leading-[1.7] text-quiet [text-wrap:pretty]";
const EYEBROW = "font-mono text-[10.5px] uppercase tracking-[0.16em] text-quiet";
const CTA =
  "inline-flex items-center rounded-full bg-moss px-6 py-3 text-[14.5px] font-medium text-onink transition-opacity hover:opacity-90";

export default function MinionLanding() {
  return (
    <div className="relative">
      {/*
        Fixed to the viewport so the text scrolls past it and it does not move.
        It reads where the text is and thins out behind it, so the clear patches
        travel with the words as you scroll.
      */}
      <div
        aria-hidden
        className="pointer-events-none fixed right-0 top-0 z-0 h-[22rem] w-[92%] [mask-image:linear-gradient(to_right,transparent,black_45%,black_88%,transparent)] md:h-[34rem] md:w-[58%]"
      >
        <MemoryField />
      </div>

      <div className="relative z-10 mx-auto max-w-[57rem] px-6 pb-28 pt-32 md:pt-[9.5rem]">
        {/* Hero */}
        <div className="max-w-[44rem]">
          <h1 className="font-display text-[2.2rem] font-semibold leading-[1.06] tracking-[-0.03em] text-ink [text-wrap:balance] md:text-[2.6rem]">
            Meet your eng team's newest member.
          </h1>
          <p className="mt-5 max-w-[33rem] text-[17px] leading-[1.6] text-quiet [text-wrap:pretty]">
            An AI engineer that knows your codebase and turns issues into pull
            requests you review.
          </p>

          <div className="mt-10">
            <a href="https://app.getmin.ai" className={CTA}>
              Connect your repos
            </a>
          </div>
        </div>

        {/* The loop. */}
        <div id="loop" className="mt-28 scroll-mt-28 md:mt-32">
          <div className="max-w-[38rem]">
            <h2 className={H2}>Hand it the issue. Review the PR.</h2>
            <p className={`mt-7 ${BODY}`}>
              It reads the issue, tells you how it lands in your code, and
              proposes a plan. Then it asks. When you say go, it writes the code
              in its own sandbox and opens a pull request.
            </p>
          </div>

          <div className="mt-9 max-w-[40rem] rounded-2xl border border-hair bg-surface/80 p-6 md:p-8">
            <div className="flex flex-col">
              {LOOP.map(({ label, body, accent }) => (
                <div
                  key={label}
                  className="border-t border-hair py-4 first:border-t-0 first:pt-0 last:pb-0"
                >
                  <p
                    className={`font-mono text-[10.5px] uppercase tracking-[0.16em] ${
                      accent ? "text-moss" : "text-quiet"
                    }`}
                  >
                    {label}
                  </p>
                  <p className="mt-2 text-[14.5px] leading-[1.6] text-ink/85 [text-wrap:pretty]">
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <p className={`mt-7 max-w-[38rem] ${BODY}`}>
            It asks before it acts, and what it hands back is a diff you read.
            Nothing reaches your main branch that a person did not merge.
          </p>
        </div>

        {/* Scope: one teammate, not one bot per repo. */}
        <div id="repos" className="mt-28 max-w-[38rem] scroll-mt-28 md:mt-32">
          <h2 className={H2}>One engineer, all your repos.</h2>
          <div className={`mt-7 flex flex-col gap-4 ${BODY}`}>
            <p>
              A project is a collection of repos, and it holds them together. A
              change that crosses three services is still one conversation with
              one teammate.
            </p>
            <p>
              It runs in the cloud, so you can type the prompt and close the
              laptop. Every step is in the session, streamed while it works and
              still there when you come back.
            </p>
          </div>
        </div>

        {/* Who can ask it what. */}
        <div id="access" className="mt-28 max-w-[38rem] scroll-mt-28 md:mt-32">
          <h2 className={H2}>Everyone gets the right version.</h2>
          <div className="mt-8 flex flex-col">
            {ACCESS.map(([who, what]) => (
              <div key={who} className="border-t border-hair py-4 last:border-b">
                <p className={EYEBROW}>{who}</p>
                <p className="mt-2 text-[14.5px] leading-[1.6] text-quiet [text-wrap:pretty]">
                  {what}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Close */}
        <div className="mt-24 max-w-[38rem] border-t border-hair pt-12">
          <p className="font-display text-[19px] font-semibold tracking-[-0.02em] text-ink">
            Hand it the issue. Review the PR.
          </p>
          <div className="mt-6">
            <a href="https://app.getmin.ai" className={CTA}>
              Connect your repos
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

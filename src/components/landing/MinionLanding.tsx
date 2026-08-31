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
 * Written as a conversation because that is what using it is. An earlier
 * version laid the same beats out as a labelled timeline, which read as a
 * process diagram: true, but nothing like the thing you actually do.
 *
 * The middle exchange is the one that earns the section. Anyone can show an
 * agent being told to go; showing it answer a sceptical follow-up about
 * in-flight retries, correctly, is the only way to claim it knows the codebase
 * without saying "it knows your codebase". The last turn hands back an artifact
 * rather than a sentence, because a PR is the unit of work being promised.
 *
 * Specifics are load bearing. A file name, a named cause and a file count are
 * things a diff could disprove, which is the only kind of claim this audience
 * reads.
 */
type Turn = { from: "you" | "min"; body: React.ReactNode };

const CODE = "rounded bg-ink/[0.07] px-1 py-0.5 font-mono text-[12.5px] text-ink";

const THREAD: Turn[] = [
  {
    from: "you",
    body: "take a look at #142 — webhook retries are double-charging on timeout",
  },
  {
    from: "min",
    body: (
      <>
        <p>
          Reproduced it. <span className={CODE}>charge_worker.ts</span> mints the
          idempotency key <em className="not-italic text-ink">after</em> the
          network call returns, so a timeout retries with a fresh key and the
          charge goes through twice.
        </p>
        <p className="mt-3">
          Fix is to mint it before the call and key the retry off it. Two files,
          no migration. Want me to do it?
        </p>
      </>
    ),
  },
  { from: "you", body: "does that break retries already in flight?" },
  {
    from: "min",
    body: (
      <p>
        No. Keys minted before the deploy stay valid, and an in-flight retry
        finishes on the path it started on.
      </p>
    ),
  },
  { from: "you", body: "do it" },
  {
    from: "min",
    body: (
      <>
        <p>Done — running your test suite against the timeout path first.</p>
        <div className="mt-3 rounded-xl border border-hair bg-surface px-4 py-3">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-moss">
            PR #143 opened
          </p>
          <p className="mt-1.5 text-[13.5px] leading-snug text-ink">
            Mint idempotency key before the charge call
          </p>
          <p className="mt-1 font-mono text-[11.5px] text-quiet">
            2 files changed · awaiting your review
          </p>
        </div>
      </>
    ),
  },
];


/**
 * Not a permissions table, and not a pricing table. This is the section that
 * carries the whole-company claim, so it is ordered by distance from the code:
 * the engineers who merge, then everyone who used to have to ask them, then
 * people outside the company entirely.
 *
 * The second row is the one that changes the economics, and the last is the one
 * no editor-bound agent can do at all, because answering a customer means
 * answering without the codebase showing through.
 */
const ACCESS: [string, string][] = [
  [
    "Your engineers",
    "The whole engineer. It plans, writes the code, and opens the pull request they review.",
  ],
  [
    "Everyone else at the company",
    "Support, product, design. They describe the problem in their own words; it finds the cause and drafts the fix for an engineer to sign off.",
  ],
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
            An AI engineer that holds your codebase and turns a request into a
            pull request. Available to your whole team, not just whoever has
            the editor open.
          </p>

          <div className="mt-10">
            <a href="https://app.getmin.ai" className={CTA}>
              Connect your repos
            </a>
          </div>
        </div>

        {/* The difference, stated before the mechanic, because a reader who
            already has Cursor open needs it answered first. The argument is
            structural rather than a speed adjective: their agent is bound to
            one person's editor, so work queues behind that person. */}
        <div id="difference" className="mt-28 max-w-[38rem] scroll-mt-28 md:mt-32">
          <h2 className={H2}>Your coding agent works for one person at a time.</h2>
          <div className={`mt-7 flex flex-col gap-4 ${BODY}`}>
            <p>
              Cursor and Claude Code live in one engineer's editor. Work moves
              while that engineer is at the keyboard and stops when they are
              not, so everything anyone else notices queues behind whoever is
              free to look at it. Most of a change's life is spent waiting in
              that queue, not being written.
            </p>
            <p>
              min. is not in an editor. It holds the project, and anyone on the
              team can hand it something directly. The queue stops forming.
            </p>
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

          <div className="mt-9 max-w-[40rem] overflow-hidden rounded-2xl border border-hair bg-surface/80">
            {/* Thread header: which repo, which issue. Mono, because it is data. */}
            <div className="flex items-baseline justify-between gap-4 border-b border-hair px-5 py-3.5 md:px-6">
              <p className="font-mono text-[12px] text-ink">payments-api</p>
              <p className="font-mono text-[11.5px] text-quiet">issue #142</p>
            </div>

            <div className="flex flex-col gap-5 px-5 py-6 md:px-6">
              {THREAD.map(({ from, body }, i) => {
                const you = from === "you";
                return (
                  <div
                    key={i}
                    className={`flex flex-col ${you ? "items-end" : "items-start"}`}
                  >
                    <p
                      className={`mb-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-quiet ${
                        you ? "pr-1" : "pl-1"
                      }`}
                    >
                      {you ? "You" : "min."}
                    </p>
                    <div
                      className={`max-w-[88%] text-[14.5px] leading-[1.6] [text-wrap:pretty] ${
                        you
                          ? "rounded-2xl rounded-br-md bg-hair/70 px-4 py-2.5 text-ink"
                          : "rounded-2xl rounded-bl-md border border-hair bg-paper px-4 py-3 text-ink/85"
                      }`}
                    >
                      {body}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <p className={`mt-7 max-w-[38rem] ${BODY}`}>
            It asks before it acts, and what it hands back is a diff you read.
            Nothing reaches your main branch that a person did not merge, which
            leaves reviewing it as the only part that still needs one.
          </p>
        </div>

        {/* Who can ask it what. */}
        <div id="access" className="mt-28 max-w-[38rem] scroll-mt-28 md:mt-32">
          <h2 className={H2}>The whole company can reach it.</h2>
          <p className={`mt-7 ${BODY}`}>
            One engineer, and everyone gets the version of it they should have.
            Nobody has to learn the codebase to report what is broken in it, and
            nobody outside the team sees how it works.
          </p>
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

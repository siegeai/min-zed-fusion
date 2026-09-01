import MemoryField from "./MemoryField";

/**
 * The landing page.
 *
 * One idea: min. is an engineer on your team and its home is the codebase. The
 * page is the loop and nothing else (hand it an issue, review the PR) plus
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
    body: "a customer says they got charged twice for the same invoice this morning",
  },
  {
    from: "min",
    body: (
      <>
        <p>
          That's the webhook-timeout double charge: issue{" "}
          <span className={CODE}>#142</span>, three users have hit it.
          Reproduced it: <span className={CODE}>charge_worker.ts</span> mints
          the idempotency key <em className="not-italic text-ink">after</em>{" "}
          the network call, so a timeout retries with a fresh key and charges
          twice.
        </p>
        <p className="mt-3">
          Mint it before the call instead. Two files, no migration. Want me to
          do it?
        </p>
      </>
    ),
  },
  { from: "you", body: "does that break retries already in flight?" },
  {
    from: "min",
    body: (
      <p>
        No. Keys minted before the deploy stay valid; in-flight retries finish
        on the path they started on.
      </p>
    ),
  },
  { from: "you", body: "do it" },
  {
    from: "min",
    body: (
      <>
        <p>Done. Ran your tests against the timeout path.</p>
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
 * Roles, not permission levels.
 *
 * This section used to list who may do what, which described the access model
 * and sold nothing. What a reader needs is their own job on the page: the
 * engineer who stops implementing, the PM who stops queueing, the AE who stops
 * borrowing an engineer for a call, the support rep who stops writing tickets
 * nobody can act on.
 *
 * The sales row carries the capability no editor-bound agent has, which is
 * answering from the real codebase without exposing it. It is stated inside a
 * role because that is where it is worth something.
 */
const ACCESS: [string, string][] = [
  ["For engineers", "Architect and design from anywhere. min. executes, completely in the cloud."],
  ["For product managers", "Describe the feature in plain words. min. hands back a pull request."],
  ["For sales", "min. answers a prospect's technical question from the real code, securely."],
  ["For support", "min. reproduces the bug, files the issue. Fixes the bug, opens the PR."],
];

const H2 =
  "font-display text-[1.6rem] font-semibold leading-tight tracking-[-0.025em] text-ink [text-wrap:balance]";
const BODY = "text-[15.5px] leading-[1.7] text-quiet [text-wrap:pretty]";
const EYEBROW = "font-mono text-[10.5px] uppercase tracking-[0.16em] text-quiet";
const CTA =
  "inline-flex items-center rounded-full bg-moss px-6 py-3 text-[14.5px] font-medium text-onink transition-opacity hover:opacity-90";

/**
 * Every section below the hero is the same two-column row: what this is on the
 * left, the detail that proves it on the right.
 *
 * The page used to be a single 38rem column pinned to the left edge, which left
 * the right half of a laptop screen empty and made five sections read as one
 * undifferentiated stack. Splitting the heading out gives each section an
 * anchor the eye can find while scrolling, and the measure of the reading
 * column is unchanged, so nothing got harder to read to achieve it.
 *
 * It collapses to the old single column below md, where there is no width to
 * spread into.
 */
function Row({
  id,
  title,
  lede,
  children,
}: {
  id?: string;
  title: string;
  lede?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div id={id} className="mt-24 scroll-mt-28 md:mt-32">
      <div className="grid gap-x-14 gap-y-6 md:grid-cols-[17rem_minmax(0,38rem)] md:items-start">
        <div className="md:sticky md:top-28">
          <h2 className={H2}>{title}</h2>
          {lede && <p className={`mt-4 ${BODY}`}>{lede}</p>}
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}

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

      <div className="relative z-10 mx-auto max-w-[62rem] px-6 pb-28 pt-32 md:pt-[9.5rem]">
        {/* Hero */}
        <div className="max-w-[46rem]">
          <h1 className="font-display text-[2.2rem] font-semibold leading-[1.06] tracking-[-0.03em] text-ink [text-wrap:balance] md:text-[2.9rem]">
            Meet your dev team's newest member.
          </h1>
          <p className="mt-5 max-w-[36rem] text-[17.5px] leading-[1.6] text-quiet [text-wrap:pretty]">
            An AI engineer that turns requests into pull requests. Anyone at the
            company can hand min. work, and your engineers still ship the
            result.
          </p>

          <div className="mt-10">
            <a href="https://app.getmin.ai" className={CTA}>
              Connect your repos
            </a>
          </div>
        </div>

        {/* The most valuable block on the page, so it states what min. is
            rather than what Cursor is not. The competitor now gets one clause
            in the second paragraph, where it belongs.

            "Multiplayer" is the idea, but the shallow reading of that word is a
            shared cursor in an editor, which is not this and is not
            interesting. The claim is that the person who noticed a problem can
            start the fix without being able to write code. */}
        <Row
          id="multiplayer"
          title="Everyone builds."
          lede="One AI engineer, working with every team."
        >
          <div className={`flex flex-col gap-4 ${BODY}`}>
            <p className="text-ink">
              The person who noticed the problem can start the fix, whether or
              not they write code.
            </p>
            <p>
              Support hands min. a ticket. Product hands min. a spec.
              Engineering hands min. an issue. min. works all three in the same
              codebase. An agent tied to one engineer's editor can't, because
              it only works while that engineer is at the keyboard.
            </p>
          </div>
        </Row>

        {/* The loop. */}
        <Row
          id="loop"
          title="Tell min. the bug. Review the PR."
          lede="min. already knows your codebase and the issue behind it, so a user's bug report is enough: min. reproduces the problem, shows how it lands in your code, and proposes the fix before asking to go ahead."
        >
          <div className="overflow-hidden rounded-2xl border border-hair bg-surface/80">
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
                      className={`mb-1.5 font-mono text-[10.5px] tracking-[0.06em] text-quiet ${
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

          <p className={`mt-6 ${BODY}`}>
            min. asks before acting. Nothing reaches your main branch that a person
            did not merge, which leaves the review as the only part that still
            needs one.
          </p>
        </Row>

        {/* Multi-repo. The complaint this answers is concrete: a product is
            several repos, a change crosses them, and an agent living in one
            checkout makes you drive each one and re-explain yourself. */}
        <Row
          id="repos"
          title="One engineer. Every repo."
          lede="Your product is not one repo, and neither is a change to it."
        >
          <div className={`flex flex-col gap-4 ${BODY}`}>
            <p>
              Frontend, backend, landing page. min. has every repo in the
              project checked out, so a change that spans the API, the web app and the
              marketing site is one request, and min. opens a PR in every repo the
              change touched.
            </p>
            <p className="text-ink">
              No re-explaining the same feature to a fresh agent in every
              checkout.
            </p>
            <p>
              min. runs in the cloud, so you can type the prompt and close the
              laptop. Every step is in the session when you come back.
            </p>
          </div>
        </Row>

        {/* The roles. This is the payoff for the thesis at the top of the
            page, so it must not restate it: "whoever spots the problem can
            start the fix" already appears up there almost word for word, and
            two headings making the same claim makes the page feel padded. The
            rows carry this section; it does not need a lede.

            Deliberately the LAST section: a footer link can
            only scroll its target to the top if there is a viewport's worth of
            page below it, so whatever ends up last here cannot be linked from
            the footer. #repos is, so it moved above this. */}
        <Row
          id="access"
          title="Same engineer. Different job."
        >
          <div className="grid gap-x-10 sm:grid-cols-2">
            {ACCESS.map(([who, what]) => (
              <div key={who} className="border-t border-hair py-4">
                <p className={EYEBROW}>{who}</p>
                <p className="mt-2 text-[14.5px] leading-[1.6] text-quiet [text-wrap:pretty]">
                  {what}
                </p>
              </div>
            ))}
          </div>
        </Row>

        {/* Close */}
        <div className="mt-28 flex flex-col items-start gap-6 border-t border-hair pt-12 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-[21px] font-semibold tracking-[-0.02em] text-ink">
            Tell min. the bug. Review the PR.
          </p>
          <a href="https://app.getmin.ai" className={CTA}>
            Connect your repos
          </a>
        </div>
      </div>
    </div>
  );
}

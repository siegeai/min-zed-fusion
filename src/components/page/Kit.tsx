import { Link } from "react-router-dom";
import PillNav from "@/components/PillNav";
import MinFooter from "@/components/MinFooter";

/**
 * The shared page language, lifted off the home page so the rest of the site
 * stops being a different website.
 *
 * What the home page does and these now do too: rag left instead of centring,
 * carry no eyebrow above section headings, group related points as typographic
 * runs rather than icon cards in an equal grid, and keep one accent. The three
 * up, icon-in-a-tinted-square card row that every section used to open with is
 * the single most generated looking thing the site had.
 *
 * Measurements match the home page exactly (57rem shell, 44rem hero, the same
 * heading scale) so a visitor moving between pages does not feel the seam.
 */

const SHELL = "relative mx-auto max-w-[57rem] px-6";

/** One contact label for the whole site. It used to have six. */
export const CONTACT_EMAIL = "hello@getmin.ai";
export const CONTACT_LABEL = "Email us";
export const contactHref = (subject?: string) =>
  `mailto:${CONTACT_EMAIL}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;

export function PageFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col overflow-x-clip bg-paper font-sans text-ink antialiased">
      <PillNav />
      <main className="flex-1">{children}</main>
      <MinFooter />
    </div>
  );
}

/**
 * Top padding matches the home page rather than the generic cap: Eric moved
 * the hero down deliberately, and a shorter sub page hero would reintroduce
 * the seam this whole change exists to remove.
 */
export function PageHero({
  title,
  lede,
  children,
}: {
  title: React.ReactNode;
  lede?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className={`${SHELL} pb-4 pt-32 md:pt-[9.5rem]`}>
      <div className="max-w-[44rem]">
        <h1 className="font-display text-[2.7rem] font-semibold leading-[1.04] tracking-[-0.035em] text-ink [text-wrap:balance] md:text-[3.4rem]">
          {title}
        </h1>
        {lede && (
          <p className="mt-6 max-w-[34rem] text-[17px] leading-[1.6] text-quiet [text-wrap:pretty]">
            {lede}
          </p>
        )}
        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}

export function Section({
  title,
  id,
  children,
  wide = false,
}: {
  title?: React.ReactNode;
  id?: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <section id={id} className={`${SHELL} mt-24 scroll-mt-28 md:mt-28`}>
      <div className={wide ? "" : "max-w-[38rem]"}>
        {title && (
          <h2 className="font-display text-[1.6rem] font-semibold leading-tight tracking-[-0.025em] text-ink [text-wrap:balance]">
            {title}
          </h2>
        )}
        <div className={title ? "mt-7" : ""}>{children}</div>
      </div>
    </section>
  );
}

/**
 * Replaces the icon card grids. A bolded lead-in carries what the icon used to
 * gesture at, and the eye still gets an anchor per item without five tinted
 * squares competing for it.
 */
export function LeadList({ items }: { items: [string, string][] }) {
  return (
    <div className="flex flex-col gap-4">
      {items.map(([lead, rest]) => (
        <p
          key={lead}
          className="text-[15.5px] leading-[1.7] text-quiet [text-wrap:pretty]"
        >
          <span className="text-ink">{lead}</span> {rest}
        </p>
      ))}
    </div>
  );
}

/** Plain runs of text where there is no lead-in to bold. */
export function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 text-[15.5px] leading-[1.75] text-quiet [text-wrap:pretty]">
      {children}
    </div>
  );
}

/** Short factual items, hairline separated. Used instead of a card per fact. */
export function Rows({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col">
      {items.map((t) => (
        <li
          key={t}
          className="border-b border-hair py-3 text-[15px] leading-[1.6] text-quiet first:border-t"
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

export function PillLink({
  href,
  to,
  children,
  tone = "ink",
}: {
  href?: string;
  to?: string;
  children: React.ReactNode;
  tone?: "ink" | "quiet";
}) {
  const cls =
    tone === "ink"
      ? "bg-ink text-onink hover:bg-ink/90"
      : "border border-hair bg-surface text-ink hover:border-quiet/40";
  const base = `inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[14px] font-medium transition-colors active:scale-[0.98] ${cls}`;
  if (to) return <Link to={to} className={base}>{children}</Link>;
  return <a href={href} className={base}>{children}</a>;
}

/** The closing beat, same shape the home page ends on. */
export function CloseBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className={`${SHELL} mb-28 mt-24`}>
      <div className="max-w-[38rem] border-t border-hair pt-12">
        <p className="font-display text-[19px] font-semibold tracking-[-0.02em] text-ink">
          {title}
        </p>
        <div className="mt-5">{children}</div>
      </div>
    </section>
  );
}

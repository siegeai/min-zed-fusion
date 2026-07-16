/**
 * Sleek, embedded "works with" strip. Monochrome brand wordmarks on the page
 * background (no boxed band), scrolling seamlessly. Scope stays to email and
 * meeting sources, matching the product. Rendered twice; the track slides
 * exactly one copy (-50%) so the loop has no seam.
 */

const NAMES = [
  "Google Calendar",
  "Outlook Calendar",
  "Zoom",
  "Google Meet",
  "Microsoft Teams",
  "Granola",
  "Otter",
  "Fireflies",
  "Fathom",
  "Gmail",
  "Outlook",
];

const FADE =
  "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)";

export default function Integrations() {
  const loop = [...NAMES, ...NAMES];
  return (
    <section className="px-4 pt-4 pb-14 md:pt-6 md:pb-16">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-[1.7rem] font-semibold tracking-tight text-gray-900 md:text-4xl">
          Every relationship, context at your fingertips.
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-[15.5px] leading-relaxed text-gray-500">
          Built automatically from your calendar, meetings, and email, across the tools
          you already use.
        </p>
      </div>

      <div
        className="relative mt-9 overflow-hidden"
        style={{ maskImage: FADE, WebkitMaskImage: FADE }}
      >
        <div className="marquee-track flex w-max items-center">
          {loop.map((n, i) => (
            <span
              key={i}
              className="whitespace-nowrap px-8 font-display text-[20px] font-medium tracking-tight text-gray-400 md:px-10 md:text-[23px]"
            >
              {n}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

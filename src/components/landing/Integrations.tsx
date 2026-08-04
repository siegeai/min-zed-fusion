import { FadeIn } from "@/components/vision/FadeIn";

/**
 * "Works silently with your existing stack" logo grid. Real brand marks,
 * self-hosted in /public/logos (SVGs from Wikimedia Commons for the majors,
 * official favicons/app icons for the rest) so the page never depends on an
 * external icon service.
 */

const TOOLS: { name: string; file: string }[] = [
  { name: "Gmail", file: "gmail.svg" },
  { name: "Outlook", file: "outlook.svg" },
  { name: "Google Calendar", file: "google-calendar.svg" },
  { name: "Zoom", file: "zoom.png" },
  { name: "Google Meet", file: "google-meet.svg" },
  { name: "Microsoft Teams", file: "teams.svg" },
  { name: "Slack", file: "slack.svg" },
  { name: "Webex", file: "webex.png" },
  { name: "Granola", file: "granola.png" },
  { name: "Otter", file: "otter.png" },
  { name: "Fireflies", file: "fireflies.png" },
  { name: "Fathom", file: "fathom.png" },
];

export default function Integrations() {
  return (
    <section className="px-4 pt-4 pb-14 md:pt-6 md:pb-16">
      <FadeIn>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-[1.7rem] font-semibold tracking-tight text-gray-900 md:text-4xl">
            Notetaker built in. Works with your whole stack.
          </h2>
        </div>

        <div className="mx-auto mt-9 max-w-3xl overflow-hidden rounded-2xl border border-gray-200/80 bg-gray-100">
          {/* min.'s own recorder first: no third-party notetaker required */}
          <div className="flex items-center justify-center gap-2.5 border-b border-gray-100 bg-emerald-50/60 px-4 py-3.5">
            <img
              src="/favicon.png"
              alt="min. logo"
              className="h-5 w-5 rounded-[5px] object-contain"
            />
            <p className="text-center text-[13px] font-medium text-gray-700">
              min. records your meetings itself, botless.{" "}
              <span className="text-emerald-700">No bot ever joins your calls.</span>
            </p>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6">
            {TOOLS.map((t) => (
              <div
                key={t.name}
                className="flex flex-col items-center gap-2 border-b border-r border-gray-100 bg-white px-3 py-5"
              >
                <img
                  src={`/logos/${t.file}`}
                  alt={`${t.name} logo`}
                  className="h-6 w-6 rounded-[5px] object-contain"
                />
                <span className="text-center text-[11px] font-medium leading-tight text-gray-500">
                  {t.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

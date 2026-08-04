import { FadeIn } from "@/components/vision/FadeIn";
import {
  siGmail,
  siGooglecalendar,
  siGooglemeet,
  siZoom,
  siWebex,
  type SimpleIcon,
} from "simple-icons";

/**
 * "Works silently with your existing stack" logo grid. Real brand marks where
 * simple-icons carries them; tasteful monogram tiles for the rest (several
 * marks are unavailable for trademark reasons). One uniform tile chrome so
 * the mix reads as one system.
 */

type Tool =
  | { name: string; icon: SimpleIcon }
  | { name: string; letter: string; color: string };

const TOOLS: Tool[] = [
  { name: "Gmail", icon: siGmail },
  { name: "Outlook", letter: "O", color: "#0F6CBD" },
  { name: "Google Calendar", icon: siGooglecalendar },
  { name: "Zoom", icon: siZoom },
  { name: "Google Meet", icon: siGooglemeet },
  { name: "Microsoft Teams", letter: "T", color: "#6264A7" },
  { name: "Slack", letter: "S", color: "#4A154B" },
  { name: "Webex", icon: siWebex },
  { name: "Granola", letter: "G", color: "#059669" },
  { name: "Otter", letter: "O", color: "#0B57D0" },
  { name: "Fireflies", letter: "F", color: "#F97316" },
  { name: "Fathom", letter: "F", color: "#7C3AED" },
];

function Tile({ tool }: { tool: Tool }) {
  return (
    <div className="flex flex-col items-center gap-2 border-b border-r border-gray-100 bg-white px-3 py-5">
      {"icon" in tool ? (
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6"
          fill={`#${tool.icon.hex === "000000" ? "111827" : tool.icon.hex}`}
          aria-hidden
        >
          <path d={tool.icon.path} />
        </svg>
      ) : (
        <span
          className="flex h-6 w-6 items-center justify-center rounded-md text-[13px] font-bold text-white"
          style={{ backgroundColor: tool.color }}
          aria-hidden
        >
          {tool.letter}
        </span>
      )}
      <span className="text-center text-[11px] font-medium leading-tight text-gray-500">
        {tool.name}
      </span>
    </div>
  );
}

export default function Integrations() {
  return (
    <section className="px-4 pt-4 pb-14 md:pt-6 md:pb-16">
      <FadeIn>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-[1.7rem] font-semibold tracking-tight text-gray-900 md:text-4xl">
            Works silently with your existing stack.
          </h2>
        </div>

        <div className="mx-auto mt-9 max-w-3xl overflow-hidden rounded-2xl border border-gray-200/80 bg-gray-100">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6">
            {TOOLS.map((t) => (
              <Tile key={t.name} tool={t} />
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

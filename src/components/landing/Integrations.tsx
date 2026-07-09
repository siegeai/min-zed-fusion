import { Mail, Video, Mic, FileText } from "lucide-react";

/**
 * A seamless marquee of the tools min. builds memory from. Scope stays to email
 * and meeting sources on purpose, matching the product. Each tile is a brand-
 * colored app mark plus the wordmark. To keep the seam invisible, the list is
 * rendered twice and the track slides exactly one copy (-50%).
 */

type Integration = { name: string; color: string; Icon: React.ElementType };

const INTEGRATIONS: Integration[] = [
  { name: "Gmail", color: "#EA4335", Icon: Mail },
  { name: "Outlook", color: "#0F6CBD", Icon: Mail },
  { name: "Zoom", color: "#2D8CFF", Icon: Video },
  { name: "Google Meet", color: "#00AC47", Icon: Video },
  { name: "Microsoft Teams", color: "#5B5FC7", Icon: Video },
  { name: "Granola", color: "#111827", Icon: FileText },
  { name: "Otter", color: "#00A3C4", Icon: Mic },
  { name: "Fireflies", color: "#D97706", Icon: Mic },
  { name: "Fathom", color: "#4F46E5", Icon: Video },
];

function Chip({ it }: { it: Integration }) {
  return (
    <div className="flex shrink-0 items-center gap-2.5 px-5">
      <span
        className="flex h-9 w-9 items-center justify-center rounded-xl"
        style={{ backgroundColor: it.color }}
      >
        <it.Icon className="h-[18px] w-[18px] text-white" strokeWidth={2} />
      </span>
      <span className="whitespace-nowrap text-[15px] font-medium text-gray-700">
        {it.name}
      </span>
    </div>
  );
}

const FADE =
  "linear-gradient(to right, transparent, #000 7%, #000 93%, transparent)";

export default function Integrations() {
  const loop = [...INTEGRATIONS, ...INTEGRATIONS];
  return (
    <section className="border-y border-gray-100 bg-white py-12 md:py-14">
      <p className="mx-auto mb-8 max-w-xl px-4 text-center text-[13.5px] leading-relaxed text-gray-400">
        Your email and every meeting, from the tools you already use.
      </p>
      <div
        className="relative overflow-hidden"
        style={{ maskImage: FADE, WebkitMaskImage: FADE }}
      >
        <div className="marquee-track flex w-max">
          {loop.map((it, i) => (
            <Chip key={i} it={it} />
          ))}
        </div>
      </div>
    </section>
  );
}

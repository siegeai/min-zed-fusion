import { FadeIn } from "@/components/vision/FadeIn";
import {
  BookOpen,
  CalendarClock,
  PenLine,
  Send,
  type LucideIcon,
} from "lucide-react";

/**
 * The product's four pillars. Each card is a verb, the concrete things under
 * it, and the ask a person would actually type. Quoted items are rendered as
 * asks because showing the exact sentence beats describing the capability.
 */
const PILLARS: {
  Icon: LucideIcon;
  title: string;
  items: string[];
  asks: string[];
}[] = [
  {
    Icon: BookOpen,
    title: "Remember",
    items: ["Reminders", "Contextual memory"],
    asks: ["“What did we decide?”", "“What am I waiting on?”"],
  },
  {
    Icon: CalendarClock,
    title: "Schedule",
    items: ["Coordinate meetings", "Reschedule", "Find availability", "Send invites"],
    asks: ["“CC min@ to find us a time next week.”"],
  },
  {
    Icon: PenLine,
    title: "Capture",
    items: ["Meeting notes", "Decisions", "Commitments"],
    asks: ["“Invite min to the meeting. Everyone gets the notes.”"],
  },
  {
    Icon: Send,
    title: "Follow up",
    items: ["Remind at the right time", "Draft the follow up"],
    asks: ["“Remind me to follow up with John in 3 months.”"],
  },
];

export default function Pillars() {
  return (
    <section id="does" className="scroll-mt-24 px-4 py-12 md:py-20">
      <div className="mx-auto max-w-4xl">
        <FadeIn>
          <div className="text-center">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-gray-900 md:text-[2.5rem]">
              It does four things, deliberately.
            </h2>
            <p className="mt-3 text-[16px] text-gray-500">
              Not a platform. Not another workspace.
            </p>
          </div>
        </FadeIn>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {PILLARS.map((p, i) => (
            <FadeIn key={p.title} delay={0.06 * i}>
              <div className="flex h-full flex-col rounded-[22px] border border-gray-200/80 bg-white p-6 shadow-[0_12px_44px_-18px_rgba(0,0,0,0.12)] sm:p-7">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-50">
                    <p.Icon className="h-[19px] w-[19px] text-emerald-600" strokeWidth={2} />
                  </span>
                  <h3 className="font-display text-[19px] font-semibold text-gray-900">
                    {p.title}
                  </h3>
                </div>

                <ul className="mt-4 space-y-1.5">
                  {p.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-[14.5px] leading-relaxed text-gray-600"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-emerald-400"
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-4">
                  {p.asks.map((ask) => (
                    <p key={ask} className="text-[13px] italic leading-relaxed text-gray-400">
                      {ask}
                    </p>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

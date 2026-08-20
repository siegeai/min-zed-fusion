import { FadeIn } from "@/components/vision/FadeIn";
import {
  CalendarClock,
  PenLine,
  BellRing,
  BookOpen,
  Repeat,
  type LucideIcon,
} from "lucide-react";

/**
 * The product, in five rows. Each row is a verb and the concrete gesture that
 * triggers it, because the fifteen-second test is won by showing the reader
 * the exact move they would make, not by describing a capability.
 */
const THINGS: {
  Icon: LucideIcon;
  title: string;
  how: string;
  example: string;
}[] = [
  {
    Icon: CalendarClock,
    title: "Books your meetings",
    how: "CC min@ on a thread. It negotiates the time across everyone's calendars and sends the invite.",
    example: "“CC'ing min to find us a slot next week.”",
  },
  {
    Icon: PenLine,
    title: "Takes the notes",
    how: "Invite min to a meeting. Everyone who was in the room gets the notes and can ask about them later.",
    example: "“What did we decide about pricing on Tuesday?”",
  },
  {
    Icon: BellRing,
    title: "Remembers your follow ups",
    how: "Forward a thread or write one line. min comes back exactly when it matters.",
    example: "“Remind me to follow up with John in 3 months.”",
  },
  {
    Icon: BookOpen,
    title: "Holds the context",
    how: "Your email, meetings, and Slack or Teams become memory your team can ask, always credited to whoever taught it.",
    example: "“Why did we pick monthly billing?”",
  },
  {
    Icon: Repeat,
    title: "Runs your rituals",
    how: "Daily briefs, Monday summaries, pre-meeting preps. Delivered to the app, your inbox, or your channel, on your schedule.",
    example: "“Every Friday, what did the team ship?”",
  },
];

export default function FiveThings() {
  return (
    <section id="does" className="scroll-mt-24 px-4 py-12 md:py-20">
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <div className="text-center">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-gray-900 md:text-[2.5rem]">
              It does five things, deliberately.
            </h2>
            <p className="mt-3 text-[16px] text-gray-500">
              Not a platform. Not another workspace.
            </p>
          </div>
        </FadeIn>

        <div className="mt-10 overflow-hidden rounded-[22px] border border-gray-200/80 bg-white shadow-[0_16px_60px_-16px_rgba(0,0,0,0.14)]">
          {THINGS.map((t, i) => (
            <FadeIn key={t.title} delay={0.06 * i}>
              <div
                className={`flex flex-col gap-3 px-5 py-5 sm:flex-row sm:items-start sm:gap-5 sm:px-7 ${
                  i > 0 ? "border-t border-gray-100" : ""
                }`}
              >
                <div className="flex shrink-0 items-center gap-3 sm:w-64">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-emerald-50">
                    <t.Icon className="h-4.5 w-4.5 h-[18px] w-[18px] text-emerald-600" strokeWidth={2} />
                  </span>
                  <h3 className="font-display text-[16.5px] font-semibold text-gray-900">
                    {t.title}
                  </h3>
                </div>
                <div className="min-w-0">
                  <p className="text-[14.5px] leading-relaxed text-gray-600">
                    {t.how}
                  </p>
                  <p className="mt-1.5 text-[13px] italic text-gray-400">
                    {t.example}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

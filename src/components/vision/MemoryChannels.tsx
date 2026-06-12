import { Lock, Plus, Hash } from 'lucide-react';
import { FadeIn } from './FadeIn';

const LOGOS = {
  gmail: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg',
  outlook: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Microsoft_Office_Outlook_%282018%E2%80%932024%29.svg',
  salesforce: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg',
  slack: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg',
  github: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg',
  notion: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Notion-logo.svg',
  jira: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Jira_Logo.svg',
  drive: 'https://upload.wikimedia.org/wikipedia/commons/1/12/Google_Drive_icon_%282020%29.svg',
};

function GranolaTool() {
  return (
    <svg viewBox="0 0 100 100" className="w-4 h-4 rounded-[3px]" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Granola">
      <rect width="100" height="100" rx="22" fill="#AFCB42" />
      <path d="M49.5 53 C45.5 52, 43 54.5, 43.5 58.5 C44.5 64, 51.5 64.5, 55.5 58.5 C60.5 50.5, 51 40, 41 45 C25.5 53.5, 36.5 73, 53.5 73 C71 73, 75.5 49, 61 34.5 M61 34.5 C49.5 22.5, 23.5 28.5, 21.5 53 C19 79, 44 95.5, 68 85 C89 75.5, 93 46, 75.5 26.5" stroke="#1A1C19" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type Tool = { src?: string; node?: React.ReactNode };

type Channel = {
  name: string;
  tag: string;
  tools: Tool[];
  members: { initials: string; color: string }[];
  extra?: number;
  shared: boolean;
  isNew?: boolean;
};

const CHANNELS: Channel[] = [
  {
    name: 'acme',
    tag: 'Account',
    tools: [{ src: LOGOS.gmail }, { src: LOGOS.salesforce }, { node: <GranolaTool /> }],
    members: [
      { initials: 'AL', color: 'bg-indigo-100 text-indigo-700' },
      { initials: 'JS', color: 'bg-amber-100 text-amber-700' },
      { initials: 'SM', color: 'bg-emerald-100 text-emerald-700' },
    ],
    extra: 1,
    shared: true,
    isNew: true,
  },
  {
    name: 'q3-product-launch',
    tag: 'Project',
    tools: [{ src: LOGOS.notion }, { src: LOGOS.github }, { src: LOGOS.slack }],
    members: [
      { initials: 'EW', color: 'bg-sky-100 text-sky-700' },
      { initials: 'FK', color: 'bg-rose-100 text-rose-700' },
      { initials: 'RT', color: 'bg-violet-100 text-violet-700' },
    ],
    shared: true,
  },
  {
    name: 'sales',
    tag: 'Team',
    tools: [{ src: LOGOS.salesforce }, { src: LOGOS.outlook }],
    members: [
      { initials: 'DM', color: 'bg-orange-100 text-orange-700' },
      { initials: 'KP', color: 'bg-teal-100 text-teal-700' },
      { initials: 'JS', color: 'bg-amber-100 text-amber-700' },
    ],
    extra: 4,
    shared: true,
  },
  {
    name: 'vendor-review',
    tag: 'One-off',
    tools: [{ src: LOGOS.drive }, { src: LOGOS.jira }],
    members: [
      { initials: 'EW', color: 'bg-sky-100 text-sky-700' },
      { initials: 'FK', color: 'bg-rose-100 text-rose-700' },
    ],
    shared: true,
  },
  {
    name: 'my-scratchpad',
    tag: 'Just me',
    tools: [{ src: LOGOS.gmail }],
    members: [{ initials: 'EW', color: 'bg-sky-100 text-sky-700' }],
    shared: false,
  },
];

const STEPS = [
  { n: '1', t: 'Spin up a channel', d: 'One for a team, a project, a deal, or a quick one-off.' },
  { n: '2', t: 'Add your tools', d: 'Pick the inboxes, docs, and apps that belong in it.' },
  { n: '3', t: 'Share it', d: 'Invite teammates with a click. The memory builds itself.' },
];

export default function MemoryChannels() {
  return (
    <section id="channels" className="py-32 px-4 max-w-5xl mx-auto">
      <FadeIn>
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-display font-semibold text-gray-900 mb-6">
            Spin up a channel for anything
          </h2>
          <p className="text-gray-500 text-lg font-normal leading-relaxed">
            Memory works like Slack. Create a channel for a team, a project, a deal, or a
            quick one-off. Add the tools that matter, invite your teammates, and the shared
            memory builds itself. No setup tax.
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="rounded-[2rem] bg-white border border-gray-100 shadow-[0_2px_20px_rgba(0,0,0,0.03)] overflow-hidden max-w-3xl mx-auto">
          {/* Panel header */}
          <div className="flex items-center justify-between px-5 md:px-6 py-4 border-b border-gray-100 bg-gray-50/50">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-900">Channels</span>
              <span className="text-xs font-medium text-gray-400">{CHANNELS.length}</span>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-black text-white text-xs font-medium px-3 py-1.5">
              <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
              New channel
            </span>
          </div>

          {/* Channel rows */}
          <div className="divide-y divide-gray-50">
            {CHANNELS.map((c) => (
              <div
                key={c.name}
                className="flex items-center justify-between gap-3 px-5 md:px-6 py-3.5 hover:bg-gray-50/60 transition-colors"
              >
                {/* Left: name + tag */}
                <div className="flex items-center gap-2.5 min-w-0">
                  <Hash className="w-4 h-4 text-gray-300 shrink-0" strokeWidth={2.5} />
                  <span className="text-sm font-semibold text-gray-900 truncate">{c.name}</span>
                  <span className="hidden sm:inline-flex shrink-0 text-[10px] font-semibold uppercase tracking-wide text-gray-500 bg-gray-100 rounded-full px-2 py-0.5">
                    {c.tag}
                  </span>
                  {c.isNew && (
                    <span className="shrink-0 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      New
                    </span>
                  )}
                </div>

                {/* Right: tools + members */}
                <div className="flex items-center gap-3 md:gap-4 shrink-0">
                  {/* Tools */}
                  <div className="hidden sm:flex items-center gap-1">
                    {c.tools.map((t, i) => (
                      <span
                        key={i}
                        className="w-7 h-7 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center"
                      >
                        {t.src ? (
                          <img src={t.src} alt="" className="w-4 h-4 object-contain" referrerPolicy="no-referrer" />
                        ) : (
                          t.node
                        )}
                      </span>
                    ))}
                  </div>

                  {/* Members */}
                  <div className="flex items-center">
                    {c.members.map((m, i) => (
                      <span
                        key={i}
                        className={`w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-[9px] font-bold ${m.color} ${i > 0 ? '-ml-1.5' : ''}`}
                        style={{ zIndex: c.members.length - i }}
                      >
                        {m.initials}
                      </span>
                    ))}
                    {c.extra ? (
                      <span className="w-6 h-6 rounded-full border-2 border-white bg-gray-100 text-gray-500 flex items-center justify-center text-[9px] font-bold -ml-1.5">
                        +{c.extra}
                      </span>
                    ) : null}
                  </div>

                  {/* Shared / private */}
                  <span className="w-16 text-right hidden md:block">
                    {c.shared ? (
                      <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                        Shared
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                        <Lock className="w-3 h-3" strokeWidth={2.5} />
                        Private
                      </span>
                    )}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Three steps */}
      <FadeIn delay={0.2}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 max-w-3xl mx-auto">
          {STEPS.map((s) => (
            <div key={s.n} className="p-5 rounded-2xl bg-white border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
              <div className="w-7 h-7 rounded-full bg-gray-900 text-white text-xs font-semibold flex items-center justify-center mb-3">
                {s.n}
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">{s.t}</h3>
              <p className="text-[13px] text-gray-500 leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}

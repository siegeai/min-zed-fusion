import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Send, Paperclip, Users, Handshake, HelpCircle, Laptop, Hash, Plus } from 'lucide-react';

interface Source {
  imgSrc?: string;
  icon?: React.ReactNode;
  bg?: string;
  title: string;
  subtitle: string;
}

function ZendeskIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" aria-label="Zendesk">
      <path d="M11 7v11L3.4 18z" fill="#03363D" />
      <path d="M13 18a4 4 0 0 1 7.6 0z" fill="#03363D" />
    </svg>
  );
}

const CH = {
  sf: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg',
  gmail: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg',
  slack: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg',
  github: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg',
  jira: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Jira_Logo.svg',
  notion: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Notion-logo.svg',
};

type ChannelTool = { imgSrc?: string; icon?: React.ReactNode };

interface UseCase {
  id: 'cs' | 'sales' | 'support' | 'eng';
  label: string;
  channel: { name: string; tag: string; members: number; tools: ChannelTool[] };
  icon: React.ReactNode;
  userPrompt: string;
  aiResponse: string;
  inputPlaceholder: string;
  context: Source[];
}

const USE_CASES: UseCase[] = [
  {
    id: 'cs',
    label: 'Customer Success',
    channel: {
      name: 'acme',
      tag: 'Account',
      members: 6,
      tools: [{ imgSrc: CH.sf }, { imgSrc: CH.gmail }, { icon: <ZendeskIcon /> }],
    },
    icon: <Users className="w-3.5 h-3.5" />,
    userPrompt: "Acme is asking when the new reporting view ships. What can I tell them?",
    aiResponse: "Product has it committed for the next release, the week of the 18th, and it covers the custom export Sara asked for. Safe to confirm with Acme. Want me to draft the reply?",
    inputPlaceholder: "Ask min about an account, what's promised, who to talk to...",
    context: [
      {
        imgSrc: CH.notion,
        bg: "bg-gray-50",
        title: "Q3 roadmap",
        subtitle: "Product • week of the 18th"
      },
      {
        imgSrc: CH.gmail,
        bg: "bg-red-50/50",
        title: "Sara's request",
        subtitle: "Gmail • Last week"
      }
    ]
  },
  {
    id: 'sales',
    label: 'Sales',
    channel: {
      name: 'globex',
      tag: 'Account',
      members: 5,
      tools: [{ imgSrc: CH.sf }, { imgSrc: CH.gmail }, { imgSrc: CH.slack }],
    },
    icon: <Handshake className="w-3.5 h-3.5" />,
    userPrompt: "Prep me for tomorrow's renewal call with Globex. What should I lead with?",
    aiResponse: "Usage is up 40% since January and they hit every goal from the last review. Two things to get ahead of: an open support ticket from last week and their CFO's question on pricing. I've pulled the review and the ticket.",
    inputPlaceholder: "Ask min to prep a call, surface risks, pull the history...",
    context: [
      {
        imgSrc: CH.notion,
        bg: "bg-gray-50",
        title: "Globex business review",
        subtitle: "Notion • Last quarter"
      },
      {
        icon: <ZendeskIcon />,
        bg: "bg-emerald-50/50",
        title: "Open ticket from Globex",
        subtitle: "Zendesk • Last week"
      }
    ]
  },
  {
    id: 'support',
    label: 'Support',
    channel: {
      name: 'support',
      tag: 'Team',
      members: 7,
      tools: [{ icon: <ZendeskIcon /> }, { imgSrc: CH.slack }, { imgSrc: CH.gmail }],
    },
    icon: <HelpCircle className="w-3.5 h-3.5" />,
    userPrompt: "Acme says their weekly report didn't send. Is this a known issue?",
    aiResponse: "Yes, a few customers flagged it this morning and the team already found the cause. A fix goes out this afternoon, and until then reports can be re-run manually. I've linked the update so you can reassure Acme.",
    inputPlaceholder: "Ask min if it's a known issue, the cause, the ETA...",
    context: [
      {
        imgSrc: CH.slack,
        bg: "bg-indigo-50/50",
        title: "Fix going out this afternoon",
        subtitle: "Slack • Engineering"
      },
      {
        icon: <ZendeskIcon />,
        bg: "bg-emerald-50/50",
        title: "3 similar reports today",
        subtitle: "Zendesk • This morning"
      }
    ]
  },
  {
    id: 'eng',
    label: 'Engineering',
    channel: {
      name: 'product',
      tag: 'Team',
      members: 8,
      tools: [{ imgSrc: CH.notion }, { imgSrc: CH.jira }, { imgSrc: CH.slack }],
    },
    icon: <Laptop className="w-3.5 h-3.5" />,
    userPrompt: "Before I pick up the reporting work, which customers actually need it?",
    aiResponse: "Three: Acme (their renewal is gated on it), Globex (asked twice), and Initech (raised it at their last review). Acme's the most urgent, Sales has a call Thursday. I've pulled each so you have the real ask.",
    inputPlaceholder: "Ask min who needs this, why it matters, the real ask...",
    context: [
      {
        imgSrc: CH.sf,
        bg: "bg-sky-50/50",
        title: "Acme renewal",
        subtitle: "Salesforce • Gated on this"
      },
      {
        imgSrc: CH.notion,
        bg: "bg-gray-50",
        title: "Initech business review",
        subtitle: "Notion • Last quarter"
      }
    ]
  }
];

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 bg-gray-50/80 px-4 py-3 rounded-2xl rounded-tl-sm self-start max-w-[100px] shadow-sm border border-gray-100">
      <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
      <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
      <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
    </div>
  );
}

export function SearchMockup() {
  const [activeId, setActiveId] = useState<'cs' | 'sales' | 'support' | 'eng'>('cs');
  const [stage, setStage] = useState<'user' | 'typing' | 'ai'>('user');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Restart sequential animations whenever the active use case changes
  useEffect(() => {
    setStage('user');
    
    const typingTimer = setTimeout(() => {
      setStage('typing');
    }, 1100);

    const aiTimer = setTimeout(() => {
      setStage('ai');
    }, 2500);

    return () => {
      clearTimeout(typingTimer);
      clearTimeout(aiTimer);
    };
  }, [activeId]);

  // Handle auto-cycling through use cases
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveId((current) => {
        const index = USE_CASES.findIndex(uc => uc.id === current);
        const nextIndex = (index + 1) % USE_CASES.length;
        return USE_CASES[nextIndex].id;
      });
    }, 15000);

    return () => clearInterval(interval);
  }, [activeId]);

  // Scroll only the internal chat container (prevents whole-page window scrolling/jumping)
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [stage, activeId]);

  const currentUseCase = USE_CASES.find(uc => uc.id === activeId) || USE_CASES[0];

  const handleUseCaseSelect = (id: 'cs' | 'sales' | 'support' | 'eng') => {
    setActiveId(id);
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Simulated chat frame */}
      <div className="relative rounded-[2rem] border border-gray-200/60 bg-white/40 backdrop-blur-xl shadow-2xl p-2 pb-0 overflow-hidden ring-1 ring-gray-900/5 mt-0 w-full text-left font-sans">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        <div className="rounded-t-3xl border-x border-t border-gray-200/50 bg-[#FDFCFC] overflow-hidden shadow-inner flex flex-col h-[580px] relative">
          
          {/* Header */}
          <div className="h-14 border-b border-gray-100 flex items-center px-6 gap-4 bg-white/60 shrink-0">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full border border-black/10 bg-red-400"></div>
              <div className="w-3 h-3 rounded-full border border-black/10 bg-amber-400"></div>
              <div className="w-3 h-3 rounded-full border border-black/10 bg-green-400"></div>
            </div>
            <div className="ml-4 px-3 py-1.5 rounded-md bg-gray-100 text-xs font-mono text-gray-500 flex-1 max-w-sm flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-gray-200"></span>
              app.getmin.ai/chat
            </div>
          </div>

          {/* Body: channel rail + the active channel */}
          <div className="flex-1 flex min-h-0">
            {/* Channel rail */}
            <div className="hidden md:flex w-52 shrink-0 flex-col border-r border-gray-100 bg-white/40">
              <div className="px-4 pt-4 pb-2 flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Channels</span>
                <Plus className="w-3.5 h-3.5 text-gray-400" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col px-2 gap-0.5">
                {USE_CASES.map((uc) => {
                  const active = uc.id === activeId;
                  return (
                    <button
                      key={uc.id}
                      onClick={() => handleUseCaseSelect(uc.id)}
                      className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left transition-colors cursor-pointer ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                      <Hash className={`w-3.5 h-3.5 shrink-0 ${active ? 'text-gray-700' : 'text-gray-300'}`} strokeWidth={2.5} />
                      <span className="text-[13px] font-medium truncate">{uc.channel.name}</span>
                    </button>
                  );
                })}
                <div className="flex items-center gap-2 px-2.5 py-1.5 mt-0.5 text-gray-400 select-none">
                  <Plus className="w-3.5 h-3.5 shrink-0" strokeWidth={2.5} />
                  <span className="text-[13px] font-medium">New channel</span>
                </div>
              </div>
            </div>

            {/* The active channel */}
            <div className="flex-1 flex flex-col min-w-0 min-h-0">
              {/* Channel header */}
              <div className="h-[52px] shrink-0 border-b border-gray-100 flex items-center justify-between px-5 bg-white/60">
                <div className="flex items-center gap-2 min-w-0">
                  <Hash className="w-4 h-4 text-gray-400 shrink-0" strokeWidth={2.5} />
                  <span className="text-sm font-semibold text-gray-900 truncate">{currentUseCase.channel.name}</span>
                  <span className="hidden sm:inline-flex shrink-0 text-[10px] font-semibold uppercase tracking-wide text-gray-500 bg-gray-100 rounded-full px-2 py-0.5">{currentUseCase.channel.tag}</span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <div className="hidden sm:flex items-center gap-1">
                    {currentUseCase.channel.tools.map((s, i) => (
                      <span key={i} className="w-6 h-6 rounded-md bg-gray-50 border border-gray-100 flex items-center justify-center">
                        {s.imgSrc ? (
                          <img src={s.imgSrc} alt="" className="w-4 h-4 object-contain" referrerPolicy="no-referrer" />
                        ) : (
                          <span className="flex scale-[0.78]">{s.icon}</span>
                        )}
                      </span>
                    ))}
                  </div>
                  <span className="text-[11px] font-medium text-gray-400 whitespace-nowrap">{currentUseCase.channel.members} members</span>
                </div>
              </div>

              {/* Chat History Flow Area */}
              <div ref={chatContainerRef} className="flex-1 w-full flex flex-col gap-6 p-5 md:p-6 overflow-y-auto scrollbar-thin">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeId}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2, ease: 'easeIn' }}
                    className="flex flex-col gap-6 w-full max-w-2xl mx-auto"
                  >
                
                {/* 1. User Message (always shown when use case starts) */}
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex gap-4 justify-end"
                >
                  <div className="max-w-[80%] flex flex-col items-end">
                    <div className="px-5 py-3 rounded-2xl text-[15px] leading-relaxed bg-gray-100 text-gray-900 rounded-tr-sm shadow-sm border border-gray-200/20">
                      {currentUseCase.userPrompt}
                    </div>
                  </div>
                </motion.div>

                {/* 2. Typing Indicator Stage */}
                {stage === 'typing' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex gap-4 justify-start items-start"
                  >
                    <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white shrink-0 mt-0.5 shadow-sm">
                      <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <TypingIndicator />
                      <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider pl-1">min is connecting the context...</span>
                    </div>
                  </motion.div>
                )}

                {/* 3. AI Reply Stage */}
                {stage === 'ai' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45 }}
                    className="flex gap-4 justify-start"
                  >
                    <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white shrink-0 mt-1 shadow-sm">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    
                    <div className="flex-1 flex flex-col gap-4">
                      {/* Response Message bubble */}
                      <div className="px-5 py-3 rounded-2xl text-[15px] leading-relaxed text-gray-800 rounded-tl-sm bg-white border border-gray-100 shadow-sm">
                        {currentUseCase.aiResponse}
                      </div>

                      {/* Staggered Context Sources */}
                      {currentUseCase.context && currentUseCase.context.length > 0 && (
                        <div className="mt-1">
                          <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2 block pl-1">Connected Context</span>
                          <div className="flex flex-col sm:flex-row gap-3">
                            {currentUseCase.context.map((source, index) => (
                              <SourceItem
                                key={index}
                                imgSrc={source.imgSrc}
                                icon={source.icon}
                                bg={source.bg}
                                title={source.title}
                                subtitle={source.subtitle}
                                delay={0.15 * index}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

              </motion.div>
            </AnimatePresence>
          </div>

          {/* Locked Chat Footer Input Field bar */}
          <div className="p-4 bg-gradient-to-t from-white via-white/95 to-transparent shrink-0 select-none border-t border-gray-100">
            <div className="max-w-2xl mx-auto">
              <div className="flex flex-col rounded-2xl border border-gray-200 bg-white/80 p-2.5 gap-2 cursor-default">
                <div className="w-full bg-transparent text-[15px] text-gray-400 py-1 px-2.5 select-none">
                  {currentUseCase.inputPlaceholder}
                </div>
                
                <div className="flex justify-between items-center px-1">
                  <div className="flex gap-1 text-gray-400">
                    <div className="p-1.5 rounded-lg text-gray-400">
                      <Paperclip className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="rounded-full bg-gray-100 text-gray-300 p-2 shadow-none cursor-default select-none">
                    <Send className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
            </div>
          </div>

        </div>
      </div>

      {/* Control Dock: Interactive Segmented Pill Selectors */}
      <div className="mt-8 flex flex-col items-center gap-3 w-full">
        <div className="flex flex-wrap justify-center gap-2.5 p-1 rounded-full bg-zinc-900/60 border border-zinc-800 backdrop-blur-md max-w-full">
          {USE_CASES.map((uc) => {
            const isSelected = activeId === uc.id;
            return (
              <button
                key={uc.id}
                onClick={() => handleUseCaseSelect(uc.id)}
                className={`px-4.5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-white text-zinc-950 border-transparent shadow-[0_4px_16px_rgba(255,255,255,0.15)] ring-1 ring-black/5'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                }`}
              >
                {uc.icon}
                <span>{uc.label}</span>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}

function SourceItem({ imgSrc, icon, bg, title, subtitle, delay }: { imgSrc?: string, icon?: React.ReactNode, bg?: string, title: string, subtitle: string, delay?: number, key?: any }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.3 }}
      className="flex items-start gap-3 p-3 rounded-xl border border-gray-200/85 bg-white shadow-sm min-w-[210px] flex-1 cursor-default hover:bg-gray-50/50 transition-colors shrink-0"
    >
       <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${bg || 'bg-gray-50'}`}>
          {imgSrc && (
            <img src={imgSrc} alt="" className="w-5 h-5 object-contain" referrerPolicy="no-referrer" />
          )}
          {!imgSrc && icon}
       </div>
       <div className="flex flex-col overflow-hidden justify-center h-8">
          <span className="text-sm font-semibold text-gray-900 truncate leading-tight mb-0.5">{title}</span>
          <span className="text-[11px] font-medium text-gray-500 truncate leading-tight">{subtitle}</span>
       </div>
    </motion.div>
  );
}

import { Zap, Shield, Users, Layout } from 'lucide-react';
import { FadeIn } from './FadeIn';

const features = [
  { 
    t: "Control your data", 
    d: "Curate each team and project memory by choosing precisely which documents and databases min can read and reason over.",
    i: Zap,
    capsule: true
  },
  { t: "Enterprise Security", d: "SOC2 compliant with AES-256 encryption. Your raw thought process remains completely private.", i: Shield },
  { t: "Team Collaboration", d: "Launch a project, add your team, and start collaborating from its own shared memory instantly.", i: Users },
  { 
    t: "Everywhere You Work", 
    d: "Query and chat with any team or project memory using your LLM of choice, or bring min directly into Slack or Microsoft Teams and collaborate with your team.",
    i: Layout,
    showLogos: true
  }
];

export default function Features() {
  return (
    <section id="features" className="py-32 px-4 max-w-5xl mx-auto">
      <FadeIn>
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-display font-semibold text-gray-900 mb-6 font-display">Knowledge Centralization</h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto font-normal">AI models don't know your business. min feeds your AI the right team and project memory, grounding your models in actual context while leaving you in absolute control of exactly what data is shared.</p>
        </div>
      </FadeIn>

      <div className="grid md:grid-cols-2 gap-6">
        {features.map((f, i) => {
          const Icon = f.i;
          return (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="p-8 rounded-[2rem] bg-white border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full">
                <div>
                  <div className={f.capsule ? "w-16 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center mb-6" : "w-12 h-12 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-6"}>
                    <Icon className="w-5 h-5 text-gray-700" />
                  </div>
                  <h3 className="text-xl font-semibold font-display text-gray-900 mb-3">{f.t}</h3>
                  <p className="text-gray-500 leading-relaxed font-normal">{f.d}</p>
                </div>

                {f.showLogos && (
                  <div className="mt-8 pt-6 border-t border-gray-50 flex items-center gap-5">
                    {/* ChatGPT */}
                    <div 
                      className="w-10 h-10 rounded-xl bg-gray-50/80 border border-gray-100 flex items-center justify-center hover:scale-110 transition-transform duration-200 cursor-pointer shadow-sm" 
                      title="ChatGPT"
                    >
                      <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg" 
                        alt="ChatGPT Logo" 
                        className="w-6 h-6 object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Gemini */}
                    <div 
                      className="w-10 h-10 rounded-xl bg-gray-50/80 border border-gray-100 flex items-center justify-center hover:scale-110 transition-transform duration-200 cursor-pointer shadow-sm" 
                      title="Gemini"
                    >
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                        <path d="M12 2C12 2 12.3 7.7 15.3 10.7C18.3 13.7 24 14 24 14C24 14 18.3 14.3 15.3 17.3C12.3 20.3 12 26 12 26C12 26 11.7 20.3 8.7 17.3C5.7 14.3 0 14 0 14C0 14 5.7 13.7 8.7 10.7C11.7 7.7 12 2 12 2Z" fill="url(#geminiGradient)"/>
                        <defs>
                          <linearGradient id="geminiGradient" x1="0" y1="14" x2="24" y2="14" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="#4285F4"/>
                            <stop offset="35%" stopColor="#9B51E0"/>
                            <stop offset="70%" stopColor="#E94196"/>
                            <stop offset="100%" stopColor="#F2994A"/>
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>

                    {/* Claude */}
                    <div 
                      className="w-10 h-10 rounded-xl bg-gray-50/80 border border-gray-100 flex items-center justify-center hover:scale-110 transition-transform duration-200 cursor-pointer shadow-sm" 
                      title="Claude"
                    >
                      <svg viewBox="0 0 24 24" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" aria-label="Claude">
                        <rect width="24" height="24" rx="6" fill="#D97757" />
                        <g stroke="#fff" strokeWidth="1.8" strokeLinecap="round">
                          <line x1="12" y1="6" x2="12" y2="18" />
                          <line x1="6.8" y1="9" x2="17.2" y2="15" />
                          <line x1="6.8" y1="15" x2="17.2" y2="9" />
                        </g>
                      </svg>
                    </div>

                    {/* Microsoft Teams */}
                    <div 
                      className="w-10 h-10 rounded-xl bg-gray-50/80 border border-gray-100 flex items-center justify-center hover:scale-110 transition-transform duration-200 cursor-pointer shadow-sm" 
                      title="Microsoft Teams"
                    >
                      <svg viewBox="0 0 24 24" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" aria-label="Microsoft Teams">
                        <rect width="24" height="24" rx="6" fill="#5059C9" />
                        <circle cx="17.2" cy="7.6" r="2.3" fill="#7B83EB" />
                        <rect x="7" y="8" width="10" height="2.2" rx="1.1" fill="#fff" />
                        <rect x="10.9" y="8" width="2.2" height="9" rx="1.1" fill="#fff" />
                      </svg>
                    </div>

                    {/* Slack */}
                    <div 
                      className="w-10 h-10 rounded-xl bg-gray-50/80 border border-gray-100 flex items-center justify-center hover:scale-110 transition-transform duration-200 cursor-pointer shadow-sm" 
                      title="Slack"
                    >
                      <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg" 
                        alt="Slack Logo" 
                        className="w-6 h-6 object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                )}
              </div>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}

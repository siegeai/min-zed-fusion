import VideoDemo from "@/components/VideoDemo";

const PROMPTS = [
  "Give me a list of carriers that run FTL dry van from LA to Miami",
  "What was our average booked and quoted rate for FTL reefer Toronto to Ohio in the last 30 days?",
  "Email blast a quote request to my top 20 carriers that do Seattle → LA, flatbed, for next Tuesday, FTL.",
  "Go through my active shipments and get status updates from the carriers",
  "Reach out to my customers on the west coast. We have a truck in LA ready tomorrow for any loads going to Texas.",
  "Send a track-and-trace to all loads with delivery appointments this week",
  "Send over a load confirmation PDF for this load, fill in all you can, let me know what else you need",
];

const PromptBubble = ({
  prompt,
  index,
  className = "",
  style,
}: {
  prompt: string;
  index: number;
  className?: string;
  style?: React.CSSProperties;
}) => {
  return (
    <div
      className={`opacity-0 animate-fade-in ${className}`}
      style={{
        animationDelay: `${200 + index * 80}ms`,
        animationFillMode: "forwards",
        ...style,
      }}
    >
      <div className="w-[210px] 2xl:w-[230px] px-4 py-3 rounded-2xl border border-emerald-300/30 bg-slate-900/85 backdrop-blur-sm shadow-xl">
        <p className="text-xs leading-relaxed font-medium text-emerald-50/95">&ldquo;{prompt}&rdquo;</p>
      </div>
    </div>
  );
};

const PromptBubbles = () => {
  const orbitItems = PROMPTS.map((prompt, index) => {
    const angle = (-90 + index * (360 / PROMPTS.length)) * (Math.PI / 180);
    const radiusX = 44; // percentage of container width
    const radiusY = 34; // percentage of container height

    return {
      prompt,
      index,
      style: {
        left: `${50 + Math.cos(angle) * radiusX}%`,
        top: `${50 + Math.sin(angle) * radiusY}%`,
        transform: "translate(-50%, -50%)",
      } as React.CSSProperties,
    };
  });

  return (
    <div className="max-w-7xl mx-auto">
      {/* Orbit layout on large desktop */}
      <div className="hidden xl:block">
        <div className="relative h-[860px]">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[720px] h-[520px] border border-emerald-400/20 rounded-full" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[560px] h-[400px] border border-dashed border-emerald-400/25 rounded-full" />
          </div>

          {orbitItems.map((item) => (
            <PromptBubble
              key={item.prompt}
              prompt={item.prompt}
              index={item.index}
              className="absolute z-10"
              style={item.style}
            />
          ))}

          <div className="absolute inset-0 flex items-center justify-center z-20 px-20">
            <div className="w-full max-w-xl opacity-0 animate-fade-in" style={{ animationDelay: "120ms", animationFillMode: "forwards" }}>
              <VideoDemo />
            </div>
          </div>
        </div>
      </div>

      {/* Tablet/mobile fallback */}
      <div className="xl:hidden space-y-5">
        <div className="max-w-2xl mx-auto opacity-0 animate-fade-in" style={{ animationDelay: "120ms", animationFillMode: "forwards" }}>
          <div className="opacity-0 animate-fade-in" style={{ animationDelay: "120ms", animationFillMode: "forwards" }}>
            <VideoDemo />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {PROMPTS.map((prompt, index) => (
            <PromptBubble key={prompt} prompt={prompt} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromptBubbles;

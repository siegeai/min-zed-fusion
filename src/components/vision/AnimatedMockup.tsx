import { motion } from 'motion/react';
import { Cloud, Share2, Video, NotepadText, CloudLightning, Book, Mail, Mails, MousePointer2 } from 'lucide-react';

export function AnimatedMockup() {
  const cursorX = [100,  62,   62,  494,  494,  62,   62,  494,  494,  62,   62,  494,  494,  250, 100];
  const cursorY = [100, 554,  554,  299,  299, 502,  502,  374,  374, 294,  294,  449,  449,  250, 100];
  const times   = [  0, 0.1, 0.16, 0.29, 0.33,0.37, 0.41, 0.54, 0.58,0.62, 0.66, 0.79, 0.83, 0.91,   1];

  return (
    <div className="relative rounded-[2rem] border border-gray-200/60 bg-white/40 backdrop-blur-xl shadow-2xl p-2 pb-0 overflow-hidden ring-1 ring-gray-900/5 mt-0 w-full text-left">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
      <div className="rounded-t-3xl border-x border-t border-gray-200/50 bg-[#FDFCFC] overflow-hidden shadow-inner flex flex-col h-[740px] relative">
        
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

        {/* Body */}
        <div className="flex-1 flex p-6 gap-6 overflow-hidden relative">
           
           {/* Left Sidebar - Integrations */}
           <div className="w-56 hidden md:flex flex-col gap-1 relative z-10 shrink-0 bg-white/60 p-3.5 rounded-xl border border-gray-100/80 shadow-sm backdrop-blur-sm">
             <div className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider pl-2">Integrations</div>
             
             <IntegrationItem id="gdrive" imgSrc="https://upload.wikimedia.org/wikipedia/commons/d/da/Google_Drive_logo.png" name="Google Drive" />
             <IntegrationItem id="sharepoint" customIcon={<SharePointIcon />} name="SharePoint" />
             <IntegrationItem id="zoom" customIcon={<ZoomIcon />} name="Zoom" />
             <IntegrationItem id="gmail" imgSrc="https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg" name="Gmail" />
             <IntegrationItem id="salesforce" imgSrc="https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg" name="Salesforce" glow />
             <IntegrationItem id="hubspot" imgSrc="https://www.vectorlogo.zone/logos/hubspot/hubspot-icon.svg" name="HubSpot" glow />
             <IntegrationItem id="github" imgSrc="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" name="GitHub" />
             <IntegrationItem id="notion" imgSrc="https://upload.wikimedia.org/wikipedia/commons/e/e9/Notion-logo.svg" name="Notion" />
             <IntegrationItem id="granola" customIcon={<GranolaIcon />} name="Granola" glow />
             <IntegrationItem id="outlook" imgSrc="https://upload.wikimedia.org/wikipedia/commons/4/45/Microsoft_Office_Outlook_%282018%E2%80%932024%29.svg" name="Outlook" glow />

           </div>

           {/* Chat Window */}
           <div className="flex-1 rounded-xl bg-white border border-gray-100/80 shadow-sm flex flex-col relative z-10 h-full overflow-hidden">
             
             <div className="h-14 border-b border-gray-100 flex items-center justify-between px-6 bg-gray-50/50">
               <div className="flex items-center gap-3">
                 <div className="font-semibold text-gray-900 text-sm"># acme</div>
                 <span className="px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-600 text-[10px] font-semibold border border-zinc-200 uppercase tracking-wide">Shared</span>
               </div>
               <div className="flex items-center">
                 <div className="w-7 h-7 rounded-full bg-indigo-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-indigo-700 relative z-40 shadow-sm">AL</div>
                  <div className="w-7 h-7 rounded-full bg-amber-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-amber-700 relative z-30 -ml-2 shadow-sm">JS</div>
                 <div className="w-7 h-7 rounded-full bg-emerald-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-emerald-700 relative z-20 -ml-2 shadow-sm">SM</div>
                 <div className="w-7 h-7 rounded-full bg-black border-2 border-white flex items-center justify-center text-[10px] font-bold text-white relative z-10 -ml-2 shadow-sm">✨</div>
               </div>
             </div>

             <div className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto">
               
               <ChatMessage 
                 avatar="AL" avatarColor="bg-indigo-100 text-indigo-700"
                 name="Alex" time="10:42 AM"
                 text="Hey team, I'm creating a memory capsule so that we can transition this new customer from the sales org to customer success and implementation team."
               />

                <motion.div 
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.5, duration: 0.5 }}
                 className="flex gap-4 mt-2"
               >
                 <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center text-xs font-medium text-white shrink-0 shadow-sm mt-1">✨</div>
                 <div className="flex-1">
                   <div className="flex items-baseline gap-2 mb-1.5 ml-1">
                     <span className="text-sm font-semibold text-gray-900">min. AI</span>
                     <span className="text-xs text-gray-400">10:46 AM</span>
                   </div>
                   <div className="bg-gray-50/80 p-5 rounded-2xl rounded-tl-none border border-gray-100 relative shadow-sm">
                     <p className="text-sm text-gray-700 mb-4 font-medium">I'll organize the context for you. Drop any references here:</p>
                     
                     {/* Drop Target Zone */}
                     <div className="border border-dashed border-gray-300 rounded-xl p-3 min-h-[220px] bg-white flex flex-col gap-2 relative shadow-inner">
                        
                        <motion.div
                           animate={{ opacity: [1, 1, 0, 0] }}
                           transition={{ times: [0, 0.28, 0.29, 1], duration: 12, repeat: Infinity }}
                           className="absolute inset-0 flex items-center justify-center text-sm text-gray-400 font-medium z-0"
                        >
                           Drag context here...
                        </motion.div>

                        <DroppedItem imgSrc="https://upload.wikimedia.org/wikipedia/commons/4/45/Microsoft_Office_Outlook_%282018%E2%80%932024%29.svg" title="All Acme.com emails" subtitle="Outlook • Today"
                           bg="bg-blue-50" border="border-blue-100" dropPercent={0.29}
                        />
                        
                        <DroppedItem customIcon={<GranolaIcon className="w-5 h-5 drop-shadow-sm" />} title="All recorded Acme calls" subtitle="Granola • Yesterday"
                           bg="transparent" border="border-gray-200" dropPercent={0.54}
                        />

                        <DroppedItem imgSrc="https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg" title="Acme Account & Opportunity card" subtitle="Salesforce • Account"
                           bg="bg-sky-50" border="border-sky-100" dropPercent={0.79}
                        />

                     </div>
                   </div>
                 </div>
               </motion.div>
             </div>

             <div className="p-4 bg-white border-t border-gray-100 shrink-0">
               <div className="h-12 bg-gray-50 rounded-full border border-gray-200 px-4 flex items-center shadow-sm">
                 <span className="text-sm text-gray-400 font-medium">Reply to #acme...</span>
               </div>
             </div>

           </div>

           <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden hidden md:block">
              {/* Fake Cursor */}
              <motion.div 
                 className="absolute left-0 top-0 z-[60]"
                 animate={{ x: cursorX, y: cursorY, scale: [1, 1, 0.9, 0.9, 1, 1, 0.9, 0.9, 1, 1, 0.9, 0.9, 1, 1, 1] }}
                 transition={{ duration: 12, times, ease: "easeInOut", repeat: Infinity }}
              >
                <div className="relative">
                  <MousePointer2 className="w-6 h-6 text-black drop-shadow-md relative z-10" fill="black" />
                  <motion.div 
                    animate={{ opacity: [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0], scale: [0.5, 0.5, 1.5, 2, 0.5, 0.5, 1.5, 2, 0.5, 0.5, 1.5, 2, 0.5, 0.5, 0.5] }}
                    transition={{ duration: 12, times, ease: "easeOut", repeat: Infinity }}
                    className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-black/20 z-0" 
                  />
                </div>
              </motion.div>

              {/* Dragged items track the cursor exactly during their drag window */}
              {/* Outlook Item: picked up and dragged 0.16 to 0.29 */}
              <FlyingItem imgSrc="https://upload.wikimedia.org/wikipedia/commons/4/45/Microsoft_Office_Outlook_%282018%E2%80%932024%29.svg" title="All Acme.com emails" bg="bg-blue-50" border="border-blue-200"
                  cursorX={cursorX} cursorY={cursorY} times={times}
                  visibleAt={[0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}
              />

              {/* Granola Item: picked up and dragged 0.41 to 0.54 */}
              <FlyingItem customIcon={<GranolaIcon className="w-5 h-5 drop-shadow-sm" />} title="All recorded Acme calls" bg="bg-white" border="border-gray-200"
                  cursorX={cursorX} cursorY={cursorY} times={times}
                  visibleAt={[0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0]}
              />

              {/* Salesforce Item: picked up and dragged 0.66 to 0.79 */}
              <FlyingItem imgSrc="https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg" title="Acme Account & Opportunity card" bg="bg-sky-50" border="border-sky-200"
                  cursorX={cursorX} cursorY={cursorY} times={times}
                  visibleAt={[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0]}
              />
           </div>
        </div>
      </div>
    </div>
  );
}

function IntegrationItem({ icon: Icon, imgSrc, customIcon, name, color, glow }: any) {
  return (
    <div className={`flex items-center gap-3 p-2 rounded-xl transition-colors cursor-default border border-transparent ${glow ? '' : 'hover:bg-gray-100/50'}`}>
      <div className={`w-[32px] h-[32px] flex items-center justify-center rounded-lg ${color} bg-gray-50/80 border border-gray-100 ${glow ? 'shadow-sm ring-1 ring-gray-200/50 bg-white' : ''}`}>
         {imgSrc && <img src={imgSrc} alt={name} className="w-[18px] h-[18px] object-contain" />}
         {customIcon && customIcon}
         {Icon && <Icon className="w-[18px] h-[18px]" strokeWidth={2} />}
      </div>
      <span className={`text-sm font-semibold ${glow ? 'text-gray-900' : 'text-gray-600'}`}>{name}</span>
    </div>
  )
}

function ChatMessage({ avatar, avatarColor, name, time, text }: any) {
  return (
    <div className="flex gap-4">
      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${avatarColor}`}>
        {avatar}
      </div>
      <div>
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-sm font-semibold text-gray-900">{name}</span>
          <span className="text-xs text-gray-400">{time}</span>
        </div>
        <p className="text-sm text-gray-700 leading-relaxed font-medium">{text}</p>
      </div>
    </div>
  )
}

function DroppedItem({ icon: Icon, imgSrc, customIcon, title, subtitle, color, bg, border, dropPercent }: any) {
  return (
    <motion.div 
       animate={{
         display: ["none", "none", "flex", "flex", "flex", "none"],
         opacity: [0, 0, 0, 1, 1, 0],
         scale: [0.95, 0.95, 0.95, 1, 1, 0.95],
         y: [10, 10, 10, 0, 0, 10]
       }}
       transition={{
         duration: 12,
         times: [0, dropPercent - 0.001, dropPercent, dropPercent + 0.02, 0.98, 1],
         repeat: Infinity,
         ease: 'easeOut'
       }}
       className={`flex items-center gap-3 p-3 rounded-xl border bg-white ${border} shadow-sm z-10 w-full hover:border-gray-300 transition-colors`}
    >
       <div className={`w-[36px] h-[36px] flex items-center justify-center rounded-lg ${bg} ${color}`}>
         {imgSrc && <img src={imgSrc} alt={title} className="w-[18px] h-[18px] object-contain" />}
         {customIcon && customIcon}
         {Icon && <Icon className="w-[18px] h-[18px]" strokeWidth={2.5} />}
       </div>
       <div>
         <div className="text-sm font-semibold text-gray-900 leading-tight mb-0.5">{title}</div>
         <div className="text-[11px] text-gray-500 font-semibold">{subtitle}</div>
       </div>
    </motion.div>
  )
}

function FlyingItem({ icon: Icon, imgSrc, customIcon, title, color, bg, border, cursorX, cursorY, times, visibleAt }: any) {
  // Hang the card just below-right of the cursor tip so it reads as "held".
  const OFF_X = 16;
  const OFF_Y = 12;
  return (
    <motion.div
       className={`absolute left-0 top-0 flex items-center gap-3 p-2 pr-4 rounded-xl bg-white border ${border} shadow-xl pointer-events-none z-[55] w-max max-w-[280px] origin-top-left`}
       animate={{
         opacity: visibleAt,
         x: cursorX.map((v: number) => v + OFF_X),
         y: cursorY.map((v: number) => v + OFF_Y),
       }}
       transition={{ duration: 12, times, ease: 'easeInOut', repeat: Infinity }}
    >
      <div className={`w-[32px] h-[32px] flex items-center justify-center rounded-lg ${color || ''} ${bg || ''}`}>
         {imgSrc && <img src={imgSrc} alt={title} className="w-[18px] h-[18px] object-contain" />}
         {customIcon && customIcon}
         {Icon && <Icon className="w-[18px] h-[18px]" strokeWidth={2.5} />}
      </div>
      <span className="text-sm font-semibold text-gray-800">{title}</span>
    </motion.div>
  )
}

function GranolaIcon({ className = "w-[18px] h-[18px] shadow-sm rounded-md" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="20" fill="#AFCB42"/>
      <path d="M49.5 53 C45.5 52, 43 54.5, 43.5 58.5 C44.5 64, 51.5 64.5, 55.5 58.5 C60.5 50.5, 51 40, 41 45 C25.5 53.5, 36.5 73, 53.5 73 C71 73, 75.5 49, 61 34.5 M61 34.5 C49.5 22.5, 23.5 28.5, 21.5 53 C19 79, 44 95.5, 68 85 C89 75.5, 93 46, 75.5 26.5" stroke="#1A1C19" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ZoomIcon({ className = "w-[18px] h-[18px]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="6" fill="#0B5CFF" />
      <path d="M15 9.5C15 8.67157 14.3284 8 13.5 8H6.5C5.67157 8 5 8.67157 5 9.5V14.5C5 15.3284 5.67157 16 6.5 16H13.5C14.3284 16 15 15.3284 15 14.5V13.5L19 16.5V7.5L15 10.5V9.5Z" fill="white" stroke="white" strokeWidth="0.5" strokeLinejoin="round"/>
    </svg>
  );
}

function SharePointIcon({ className = "w-[18px] h-[18px]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg" fill="#036C70">
      <path d="M24 13.5q0 1.242-.475 2.332-.474 1.09-1.289 1.904-.814.815-1.904 1.29-1.09.474-2.332.474-.762 0-1.523-.2-.106.997-.557 1.858-.451.862-1.154 1.494-.704.633-1.606.99-.902.358-1.91.358-1.09 0-2.045-.416-.955-.416-1.664-1.125-.709-.709-1.125-1.664Q6 19.84 6 18.75q0-.188.018-.375.017-.188.04-.375H.997q-.41 0-.703-.293T0 17.004V6.996q0-.41.293-.703T.996 6h3.54q.14-1.277.726-2.373.586-1.096 1.488-1.904Q7.652.914 8.807.457 9.96 0 11.25 0q1.395 0 2.625.533T16.02 1.98q.914.915 1.447 2.145T18 6.75q0 .188-.012.375-.011.188-.035.375 1.242 0 2.344.469 1.101.468 1.928 1.277.826.809 1.3 1.904Q24 12.246 24 13.5zm-12.75-12q-.973 0-1.857.34-.885.34-1.577.943-.691.604-1.154 1.43Q6.2 5.039 6.06 6h4.945q.41 0 .703.293t.293.703v4.945l.21-.035q.212-.75.61-1.424.399-.673.944-1.218.545-.545 1.213-.944.668-.398 1.43-.61.093-.503.093-.96 0-1.09-.416-2.045-.416-.955-1.125-1.664-.709-.709-1.664-1.125Q12.34 1.5 11.25 1.5zM6.117 15.902q.54 0 1.06-.111.522-.111.932-.37.41-.257.662-.679.252-.422.252-1.055 0-.632-.263-1.054-.264-.422-.662-.703-.399-.282-.856-.463l-.855-.34q-.399-.158-.662-.334-.264-.176-.264-.445 0-.2.14-.323.141-.123.335-.193.193-.07.404-.094.21-.023.351-.023.598 0 1.055.152.457.153.95.457V8.543q-.282-.082-.522-.14-.24-.06-.475-.1-.234-.041-.486-.059-.252-.017-.557-.017-.515 0-1.054.117-.54.117-.979.375-.44.258-.715.68-.275.421-.275 1.03 0 .598.263.997.264.398.663.68.398.28.855.474l.856.363q.398.17.662.358.263.187.263.457 0 .222-.123.351-.123.13-.31.2-.188.07-.393.087-.205.018-.369.018-.703 0-1.248-.234-.545-.235-1.107-.621v1.875q1.195.468 2.472.468zM11.25 22.5q.773 0 1.453-.293t1.19-.803q.51-.51.808-1.195.299-.686.299-1.459 0-.668-.223-1.277-.222-.61-.62-1.096-.4-.486-.95-.826-.55-.34-1.207-.48v1.933q0 .41-.293.703t-.703.293H7.57q-.07.375-.07.75 0 .773.293 1.459t.803 1.195q.51.51 1.195.803.686.293 1.459.293zM18 18q.926 0 1.746-.352.82-.351 1.436-.966.615-.616.966-1.43.352-.815.352-1.752 0-.926-.352-1.746-.351-.82-.966-1.436-.616-.615-1.436-.966Q18.926 9 18 9t-1.74.357q-.815.358-1.43.973t-.973 1.43q-.357.814-.357 1.74 0 .129.006.258t.017.258q.551.27 1.02.65t.838.855q.369.475.627 1.026.258.55.387 1.148Q17.18 18 18 18Z"/>
    </svg>
  );
}


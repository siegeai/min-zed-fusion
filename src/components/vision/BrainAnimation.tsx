import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, Mail, FileSpreadsheet, Image, Presentation, 
  Sparkles, RefreshCw, Check, Layers, ChevronRight, HelpCircle
} from 'lucide-react';

interface FileItem {
  id: string;
  name: string;
  type: 'mail' | 'call' | 'crm' | 'doc' | 'sheet' | 'img' | 'slide';
  iconSrc?: string;
  color: string;
  category: string;
  // Chaotic coordinates relative to center (0, 0)
  messyX: number;
  messyY: number;
  messyRotate: number;
  // Neatly ordered coordinates relative to center (0, 0) inside brain hemispheres
  organizedX: number;
  organizedY: number;
  side: 'left' | 'right';
  stackIndex: number; // 0 sits on top, larger numbers stack behind
}

const INITIAL_FILES: FileItem[] = [
  // --- GMAIL --- (Left Side, Top)
  {
    id: 'f_gmail_1',
    name: 'Acme partnership thread',
    type: 'mail',
    iconSrc: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg',
    color: 'from-red-500 to-rose-600 border-red-200',
    category: 'Gmail Thread',
    messyX: -340, messyY: -220, messyRotate: 15,
    organizedX: -125, organizedY: -65,
    side: 'left',
    stackIndex: 0
  },
  {
    id: 'f_gmail_2',
    name: 'Feedback on layout proposal',
    type: 'mail',
    iconSrc: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg',
    color: 'from-red-500 to-rose-600 border-red-200',
    category: 'Gmail Thread',
    messyX: -260, messyY: -110, messyRotate: -8,
    organizedX: -125, organizedY: -65,
    side: 'left',
    stackIndex: 1
  },

  // --- HUBSPOT --- (Left Side, Bottom)
  {
    id: 'f_hubspot_1',
    name: 'Acme Corp Deal (Closed Won)',
    type: 'crm',
    iconSrc: 'https://www.vectorlogo.zone/logos/hubspot/hubspot-icon.svg',
    color: 'from-orange-400 to-orange-500 border-orange-200',
    category: 'HubSpot Deal',
    messyX: -380, messyY: 60, messyRotate: -12,
    organizedX: -125, organizedY: 55,
    side: 'left',
    stackIndex: 0
  },
  {
    id: 'f_hubspot_2',
    name: 'John Doe Lead Profile',
    type: 'crm',
    iconSrc: 'https://www.vectorlogo.zone/logos/hubspot/hubspot-icon.svg',
    color: 'from-orange-400 to-orange-500 border-orange-200',
    category: 'HubSpot Contact',
    messyX: -440, messyY: 170, messyRotate: 10,
    organizedX: -125, organizedY: 55,
    side: 'left',
    stackIndex: 1
  },

  // --- GRANOLA --- (Right Side, Top)
  {
    id: 'f_granola_1',
    name: 'Acme Kickoff Call.grn',
    type: 'call',
    color: 'from-amber-400 to-yellow-500 border-amber-200',
    category: 'Granola Call',
    messyX: 300, messyY: -220, messyRotate: -15,
    organizedX: 125, organizedY: -80,
    side: 'right',
    stackIndex: 0
  },
  {
    id: 'f_granola_2',
    name: 'Product Demo Sync.grn',
    type: 'call',
    color: 'from-amber-400 to-yellow-500 border-amber-200',
    category: 'Granola Call',
    messyX: 420, messyY: -140, messyRotate: 12,
    organizedX: 125, organizedY: -80,
    side: 'right',
    stackIndex: 1
  },

  // --- GITHUB --- (Right Side, Middle)
  {
    id: 'f_github_1',
    name: 'PR #422: Refactor auth',
    type: 'doc',
    iconSrc: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg',
    color: 'from-gray-800 to-black border-gray-700',
    category: 'GitHub PR',
    messyX: 250, messyY: -30, messyRotate: 18,
    organizedX: 125, organizedY: 0,
    side: 'right',
    stackIndex: 0
  },
  {
    id: 'f_github_2',
    name: 'Issue #810: HMR error',
    type: 'doc',
    iconSrc: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg',
    color: 'from-gray-800 to-black border-gray-700',
    category: 'GitHub Issue',
    messyX: 430, messyY: 30, messyRotate: -10,
    organizedX: 125, organizedY: 0,
    side: 'right',
    stackIndex: 1
  },

  // --- GOOGLE DRIVE --- (Right Side, Bottom)
  {
    id: 'f_drive_1',
    name: 'Q3 Marketing Plan.gdoc',
    type: 'doc',
    iconSrc: 'https://upload.wikimedia.org/wikipedia/commons/1/12/Google_Drive_icon_%282020%29.svg',
    color: 'from-blue-500 to-teal-500 border-blue-200',
    category: 'Google Drive',
    messyX: 320, messyY: 130, messyRotate: -14,
    organizedX: 125, organizedY: 80,
    side: 'right',
    stackIndex: 0
  },
  {
    id: 'f_drive_2',
    name: 'Pricing_Model.xlsx',
    type: 'doc',
    iconSrc: 'https://upload.wikimedia.org/wikipedia/commons/1/12/Google_Drive_icon_%282020%29.svg',
    color: 'from-blue-500 to-teal-500 border-blue-200',
    category: 'Google Drive',
    messyX: 440, messyY: 190, messyRotate: 8,
    organizedX: 125, organizedY: 80,
    side: 'right',
    stackIndex: 1
  },
  {
    id: 'f_drive_3',
    name: 'AcmeLogo_Variant.png',
    type: 'doc',
    iconSrc: 'https://upload.wikimedia.org/wikipedia/commons/1/12/Google_Drive_icon_%282020%29.svg',
    color: 'from-blue-500 to-teal-500 border-blue-200',
    category: 'Google Drive',
    messyX: 250, messyY: 250, messyRotate: 20,
    organizedX: 125, organizedY: 80,
    side: 'right',
    stackIndex: 2
  }
];

export default function BrainAnimation() {
  const [status, setStatus] = useState<'messy' | 'organizing' | 'organized'>('messy');

  useEffect(() => {
    let timer: any;

    if (status === 'messy') {
      timer = setTimeout(() => {
        setStatus('organizing');
      }, 3500);
    } else if (status === 'organizing') {
      timer = setTimeout(() => {
        setStatus('organized');
      }, 1500);
    } else if (status === 'organized') {
      timer = setTimeout(() => {
        setStatus('messy');
      }, 4500);
    }

    return () => clearTimeout(timer);
  }, [status]);

  return (
    <section id="memory" className="scroll-mt-24 py-24 bg-gray-50/30 overflow-hidden relative">
      {/* Soft Ambient Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.02),transparent_75%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.006)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.006)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        
        {/* Humble, Professional Header Section */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-3xl md:text-5xl font-semibold tracking-tight text-gray-900 mb-4 max-w-2xl mx-auto font-display"
          >
            Memory, automatically organized
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto font-normal leading-relaxed"
          >
            Watch min instantly pull scattered documents, emails, calls, and CRM/ERP records and sort them into the right team and project memories.
          </motion.p>
        </div>

        {/* Clean, Frameless Canvas container */}
        <div className="relative flex flex-col h-[650px] justify-center items-center overflow-visible select-none">
          
          {/* Animation Core Area */}
          <div className="w-full h-full relative flex items-center justify-center overflow-visible">
            
            {/* Center Brain: Simple, Minimal, Styled Line-Art Vector Brain */}
            <div className="relative w-[525px] h-[525px] flex items-center justify-center z-10">
              <svg viewBox="0 0 100 100" className="w-full h-full text-gray-200 transition-colors duration-500" fill="none">
                {/* Subtle Background Radial Gradient Glow only when organized */}
                <AnimatePresence>
                  {status === 'organized' && (
                    <motion.circle 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 0.25, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.6 }}
                      cx="50" cy="50" r="38" 
                      fill="url(#brainGlowRad)" 
                    />
                  )}
                </AnimatePresence>

                {/* Symmetrical left and right brain contours */}
                <motion.path 
                  d="M 50 15 
                     C 31 15, 17 28, 17 46 
                     C 17 56, 23 62, 20 70 
                     C 16 80, 25 88, 36 88 
                     C 42 88, 44 81, 50 83" 
                  stroke={status === 'organized' ? '#E2E8F0' : status === 'organizing' ? '#93C5FD' : '#E2E8F0'} 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  fill="white" 
                  className="shadow-sm filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.01)]"
                />
                <motion.path 
                  d="M 50 15 
                     C 69 15, 83 28, 83 46 
                     C 83 56, 77 62, 80 70 
                     C 84 80, 75 88, 64 88 
                     C 58 88, 56 81, 50 83" 
                  stroke={status === 'organized' ? '#E2E8F0' : status === 'organizing' ? '#93C5FD' : '#E2E8F0'} 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  fill="white"
                  className="shadow-sm filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.01)]"
                />

                {/* Simple lobe line accents representing the hemispheres beautifully */}
                <path d="M 31 32 C 31 38, 43 40, 50 36 M 41 22 C 39 32, 47 34, 50 42" stroke="#F1F5F9" strokeWidth="1.2" />
                <path d="M 69 32 C 69 38, 57 40, 50 36 M 59 22 C 61 32, 53 34, 50 42" stroke="#F1F5F9" strokeWidth="1.2" />
                <path d="M 19 50 C 25 50, 32 55, 39 55 C 43 55, 47 49, 50 51" stroke="#F1F5F9" strokeWidth="1.2" />
                <path d="M 81 50 C 75 50, 68 55, 61 55 C 57 55, 53 49, 50 51" stroke="#F1F5F9" strokeWidth="1.2" />
                <path d="M 28 73 C 32 66, 40 69, 50 64" stroke="#F1F5F9" strokeWidth="1.2" />
                <path d="M 72 73 C 68 66, 60 69, 50 64" stroke="#F1F5F9" strokeWidth="1.2" />
                
                {/* Divider line */}
                <line x1="50" y1="15" x2="50" y2="83" stroke="#F1F5F9" strokeWidth="1.5" strokeDasharray="2 2" />

                <defs>
                  <radialGradient id="brainGlowRad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                  </radialGradient>
                </defs>
              </svg>

              {/* Minimalist State Indicator Widget right in the brain center */}
              <div className="absolute z-20 inset-0 flex items-center justify-center p-6">
                <div className="w-[125px] h-[125px] rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center flex-col p-3 text-center">
                  <span className="text-[11px] font-bold text-gray-800 tracking-wider uppercase font-sans leading-tight">
                    Collective<br />Memory
                  </span>
                </div>
              </div>
            </div>

            {/* Scattered Document Cards smoothly transitioning */}
            {INITIAL_FILES.map((file) => {
              const isLeft = file.side === 'left';
              const stackX = file.organizedX + file.stackIndex * 6;
              const stackY = file.organizedY + file.stackIndex * 8;
              const stackRotate = (file.stackIndex % 2 === 0 ? 1 : -1) * file.stackIndex * 2;
              const stackScale = 0.78 - file.stackIndex * 0.02;
              
              return (
                <motion.div
                  key={file.id}
                  animate={status === 'messy' ? {
                    x: file.messyX,
                    y: file.messyY,
                    rotate: file.messyRotate,
                    scale: 1,
                    opacity: 1,
                    zIndex: 10,
                  } : status === 'organizing' ? {
                    // Smooth mid-way drift
                    x: stackX * 0.4,
                    y: stackY * 0.4,
                    rotate: file.messyRotate * 0.4,
                    scale: 0.85 - file.stackIndex * 0.02,
                    opacity: 0.7,
                    zIndex: 30 - file.stackIndex,
                  } : {
                    // Organized and layered inside hemispheres
                    x: stackX,
                    y: stackY,
                    rotate: stackRotate,
                    scale: stackScale,
                    opacity: 1,
                    zIndex: 30 - file.stackIndex,
                  }}
                  transition={{ 
                    type: 'spring', 
                    stiffness: status === 'organizing' ? 140 : 85, 
                    damping: status === 'organizing' ? 22 : 14,
                    mass: 1.0,
                  }}
                  className={`absolute rounded-xl border bg-white border-gray-200/80 p-2 text-[11px] pr-3.5 flex items-center gap-3 transition-shadow cursor-default select-none group w-[212px] ${
                    status === 'organized' 
                      ? 'shadow-[0_2px_6px_rgba(0,0,0,0.03)] hover:border-gray-300 hover:bg-gray-50/50' 
                      : 'shadow-[0_4px_15px_rgba(0,0,0,0.03)]'
                  }`}
                >
                  {/* File Integration Icon Area */}
                  <div className="w-[35px] h-[35px] rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center p-2 shrink-0">
                    {file.iconSrc ? (
                      <img 
                        src={file.iconSrc} 
                        alt="" 
                        className="w-full h-full object-contain shrink-0 rounded-none pointer-events-none" 
                        referrerPolicy="no-referrer"
                      />
                    ) : file.type === 'call' ? (
                      <GranolaIcon className="w-full h-full object-contain shrink-0 text-gray-700" />
                    ) : (
                      <FileText className="w-full h-full text-gray-500 stroke-[2]" />
                    )}
                  </div>

                  <div className="flex flex-col text-left overflow-hidden min-w-0 pr-1 select-none">
                    <span className="text-[11px] font-semibold text-gray-800 truncate leading-tight">
                      {file.name}
                    </span>
                    <span className="text-[8.5px] text-gray-400 font-semibold uppercase font-mono tracking-wider mt-0.5 leading-none">
                      {file.category}
                    </span>
                  </div>

                  {/* Organized micro-checkmark indicator inside */}
                  <AnimatePresence>
                    {status === 'organized' && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute -top-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5 shadow-sm border border-white z-40"
                      >
                        <Check className="w-2 h-2 stroke-[3]" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}

          </div>

        </div>

      </div>
    </section>
  );
}

function GranolaIcon({ className = "w-4 h-4 shadow-sm rounded-md" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="20" fill="#AFCB42"/>
      <path d="M49.5 53 C45.5 52, 43 54.5, 43.5 58.5 C44.5 64, 51.5 64.5, 55.5 58.5 C60.5 50.5, 51 40, 41 45 C25.5 53.5, 36.5 73, 53.5 73 C71 73, 75.5 49, 61 34.5 M61 34.5 C49.5 22.5, 23.5 28.5, 21.5 53 C19 79, 44 95.5, 68 85 C89 75.5, 93 46, 75.5 26.5" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

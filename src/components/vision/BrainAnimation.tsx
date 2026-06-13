import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FileText, Mail, FileSpreadsheet, Image, Presentation,
  Sparkles, RefreshCw, Check, Layers, ChevronRight, HelpCircle
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();
  // On mobile the whole group is CSS-scaled to 0.6; tighten the scatter so cards
  // don't fly off the screen edges during the messy phase.
  const spread = isMobile ? 0.62 : 1;

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
            Watch min instantly pull scattered documents, emails, calls, and CRM/ERP records and sort them into the right team and project channels.
          </motion.p>
        </div>

        {/* Clean, Frameless Canvas container */}
        <div className="relative flex flex-col h-[440px] sm:h-[650px] justify-center items-center overflow-visible select-none">

          {/* Animation Core Area (scaled down on mobile so the brain + cards fit) */}
          <div className="w-full h-full relative flex items-center justify-center overflow-visible scale-[0.6] sm:scale-100">
            
            {/* Center Brain: two mirrored hemispheres built from circular arcs */}
            <div className="relative w-[525px] h-[525px] flex items-center justify-center z-10">
              <svg viewBox="0 0 200 200" className="w-full h-full" fill="none">
                {/* Subtle Background Radial Gradient Glow only when organized */}
                <AnimatePresence>
                  {status === 'organized' && (
                    <motion.circle
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 0.25, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.6 }}
                      cx="100" cy="100" r="78"
                      fill="url(#brainGlowRad)"
                    />
                  )}
                </AnimatePresence>

                {/* Left hemisphere: outline of tangent circular arcs (lobes), straight medial edge */}
                <motion.path
                  d="M 97 26
                     A 30 30 0 0 0 64 38
                     A 30 30 0 0 0 41 62
                     A 30 30 0 0 0 33 94
                     A 30 30 0 0 0 38 126
                     A 28 28 0 0 0 53 152
                     A 26 26 0 0 0 78 168
                     A 14 14 0 0 0 97 173
                     L 97 26 Z"
                  animate={{ stroke: status === 'organizing' ? '#BFDBFE' : '#E2E8F0' }}
                  transition={{ duration: 0.5 }}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="white"
                  className="filter drop-shadow-[0_6px_14px_rgba(15,23,42,0.04)]"
                />
                {/* Left gyri: two long inner contours echoing the outline */}
                <path d="M 88 48 C 62 56, 50 80, 49 106" stroke="#EEF1F5" strokeWidth="2.2" strokeLinecap="round" />
                <path d="M 86 150 C 68 145, 56 128, 53 110" stroke="#EEF1F5" strokeWidth="2.2" strokeLinecap="round" />
                <path d="M 90 94 C 80 90, 73 82, 71 72" stroke="#EEF1F5" strokeWidth="2.2" strokeLinecap="round" />

                {/* Right hemisphere: exact mirror of the left */}
                <g transform="translate(200 0) scale(-1 1)">
                  <motion.path
                    d="M 97 26
                       A 30 30 0 0 0 64 38
                       A 30 30 0 0 0 41 62
                       A 30 30 0 0 0 33 94
                       A 30 30 0 0 0 38 126
                       A 28 28 0 0 0 53 152
                       A 26 26 0 0 0 78 168
                       A 14 14 0 0 0 97 173
                       L 97 26 Z"
                    animate={{ stroke: status === 'organizing' ? '#BFDBFE' : '#E2E8F0' }}
                    transition={{ duration: 0.5 }}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="white"
                    className="filter drop-shadow-[0_6px_14px_rgba(15,23,42,0.04)]"
                  />
                  <path d="M 88 48 C 62 56, 50 80, 49 106" stroke="#EEF1F5" strokeWidth="2.2" strokeLinecap="round" />
                  <path d="M 86 150 C 68 145, 56 128, 53 110" stroke="#EEF1F5" strokeWidth="2.2" strokeLinecap="round" />
                  <path d="M 90 94 C 80 90, 73 82, 71 72" stroke="#EEF1F5" strokeWidth="2.2" strokeLinecap="round" />
                </g>

                <defs>
                  <radialGradient id="brainGlowRad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                  </radialGradient>
                </defs>
              </svg>
            </div>

            {/* Scattered Document Cards smoothly transitioning */}
            {INITIAL_FILES.map((file, idx) => {
              const isLeft = file.side === 'left';
              const stackX = file.organizedX + file.stackIndex * 6;
              const stackY = file.organizedY + file.stackIndex * 8;
              const stackRotate = (file.stackIndex % 2 === 0 ? 1 : -1) * file.stackIndex * 2;
              const stackScale = 0.78 - file.stackIndex * 0.02;
              
              return (
                <motion.div
                  key={file.id}
                  animate={status === 'messy' ? {
                    x: file.messyX * spread,
                    y: file.messyY * spread,
                    rotate: file.messyRotate,
                    scale: 1,
                    opacity: 1,
                    zIndex: 10,
                  } : {
                    // Stream straight into the hemisphere stacks; no mid-point
                    // pile-up at the center.
                    x: stackX,
                    y: stackY,
                    rotate: stackRotate,
                    scale: stackScale,
                    opacity: 1,
                    zIndex: 30 - file.stackIndex,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: status === 'organizing' ? 110 : 85,
                    damping: status === 'organizing' ? 20 : 14,
                    mass: 1.0,
                    delay: status === 'organizing' ? idx * 0.06 : 0,
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

          {/* Status pill narrating the animation state (full size, above the scaled brain) */}
          <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
            <motion.div
              key={status}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2 rounded-full bg-white border border-gray-200 shadow-md px-4 py-2"
            >
              {status === 'organized' ? (
                <span className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 text-white" strokeWidth={3.5} />
                </span>
              ) : (
                <span className={`w-2 h-2 rounded-full ${status === 'organizing' ? 'bg-blue-500 animate-pulse' : 'bg-amber-400'}`} />
              )}
              <span className="text-xs font-semibold text-gray-800 whitespace-nowrap">
                {status === 'messy' ? 'Scattered across your tools' : status === 'organizing' ? 'min is organizing...' : 'Organized into channels'}
              </span>
            </motion.div>
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

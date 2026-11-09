import React from 'react';
import { motion } from 'framer-motion';

/**
 * Hand-drawn orange starburst shape matching the top-right sticker in the reference screenshot
 */
export const Starburst = ({ className = "w-14 h-14", color = "#FF8A3D" }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className={`select-none pointer-events-none drop-shadow-sm ${className}`}
      fill={color}
    >
      <polygon points="50,0 59,32 91,15 74,45 100,50 74,55 91,85 59,68 50,100 41,68 9,85 26,55 0,50 26,45 9,15 41,32" />
    </svg>
  );
};

/**
 * Circular Rotating Badge ("Learning. Building. Repeating.")
 */
export const RotatingBadge = ({ text = "LEARNING • BUILDING • REPEATING •", className = "" }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
        className="w-28 h-28 md:w-32 md:h-32 rounded-full flex items-center justify-center cursor-pointer"
      >
        <svg viewBox="0 0 120 120" className="w-full h-full fill-current text-plum dark:text-cream-100">
          <defs>
            <path
              id="badgeCirclePath"
              d="M 60, 60 m -44, 0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0"
            />
          </defs>
          <text fontSize="10.5" fontWeight="800" letterSpacing="2.2" className="font-sans uppercase">
            <textPath href="#badgeCirclePath" startOffset="0%">
              {text}
            </textPath>
          </text>
        </svg>
      </motion.div>
      {/* Center icon */}
      <div className="absolute w-12 h-12 rounded-full bg-orange-accent text-white flex items-center justify-center shadow-md font-bold text-sm">
        <span className="text-xl">✨</span>
      </div>
    </div>
  );
};

/**
 * Hand-drawn curved arrow with handwritten note
 * Exactly matches "Hey, I'm Sofia!" in the reference image
 */
export const HandwrittenNote = ({ text = "Hey, I'm Liya!", className = "" }) => {
  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      <span className="font-script text-2xl md:text-3xl text-plum dark:text-cream-100 font-bold tracking-wide transform -rotate-6">
        {text}
      </span>
      {/* Hand-drawn SVG arrow pointing downward toward photo */}
      <svg
        width="65"
        height="55"
        viewBox="0 0 70 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-plum dark:text-cream-100 mt-0.5"
      >
        <path
          d="M 12 5 C 25 15, 45 28, 48 48"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Arrow head */}
        <path
          d="M 38 43 L 49 50 L 53 37"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </div>
  );
};

/**
 * Vertical rotated side text matching the left-side sticker in reference screenshot
 * ("CURIOUS MINDS BUILD COOL THINGS")
 */
export const RotatedSideText = ({ text = "CURIOUS MINDS BUILD COOL THINGS" }) => {
  return (
    <div className="hidden lg:flex fixed left-5 top-1/2 -translate-y-1/2 z-20 pointer-events-none select-none items-center space-x-3">
      <div 
        className="text-[11px] font-extrabold tracking-[0.25em] text-plum/50 dark:text-cream-100/40 uppercase"
        style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
      >
        {text}
      </div>
      <div className="w-[1.5px] h-12 bg-plum/30 dark:bg-cream-100/30"></div>
    </div>
  );
};

/**
 * Fun sticker pill with icon and text
 */
export const StickerPill = ({ icon, text, color = "bg-orange-accent", textColor = "text-white", className = "" }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: 2 }}
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full ${color} ${textColor} text-xs font-bold shadow-sticker tracking-wide select-none ${className}`}
    >
      <span>{icon}</span>
      <span>{text}</span>
    </motion.div>
  );
};


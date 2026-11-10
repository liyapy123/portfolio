// src/components/RobotCard.jsx
// Interactive animated robot hero card — replaces the static image for card id=3.
//
// TUNE THESE at the top:  C (colors)  WAVE (timing)  HEAD (rotation limits)

import React, { useRef, useEffect, useCallback, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, animate } from 'framer-motion';
import { useMouseLook } from '../utils/useMouseLook';

// ─── COLORS ────────────────────────────────────────────────────────────────
const C = {
  body:      '#F5F0E8', bodyLo: '#DDD5C5', bodyHi: '#FFFFFF',
  plum:      '#3B1F3F', plumMid: '#5a3060', plumDark: '#1a0a1f',
  eye:       '#FF4F9A', eyeHi: '#ff8cc4',
  antenna:   '#FF8A3D', antennaHi: '#ffa86a',
  joint:     '#2d1830',
  bg:        '#1f0d26',
  shadow:    'rgba(59,31,63,0.4)',
};

// ─── WAVE TIMING ────────────────────────────────────────────────────────────
// TUNE: delay=ms after mount, shoulder=degrees arm raises (more negative = higher)
const WAVE = {
  delay: 1200, raise: 0.42, swing: 0.21, swingDeg: 30,
  cycles: 4, lower: 0.52, shoulder: -148, bubbleMs: 2600,
};

// ─── HEAD ROTATION LIMITS ───────────────────────────────────────────────────
// TUNE: rotY/rotX/rotZ in degrees, pupil in pixels
const HEAD = { rotY: 25, rotX: 15, rotZ: 6, pupil: 3 };

// ─── SPEECH BUBBLE ──────────────────────────────────────────────────────────
function SpeechBubble({ visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="bubble"
          role="status" aria-live="polite"
          initial={{ opacity: 0, scale: 0.75, y: 6 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.75, y: 6 }}
          transition={{ type: 'spring', stiffness: 320, damping: 22 }}
          className="absolute top-[5%] left-1/2 z-40 pointer-events-none -translate-x-1/2"
          style={{ whiteSpace: 'nowrap' }}
        >
          <span className="relative block bg-white text-plum text-[9px] sm:text-[11px] font-bold px-3 py-1 rounded-xl shadow-lg border border-pink-accent/30">
            Hi, I&apos;m Liya&apos;s bot! 👋
            <span className="absolute -bottom-[7px] left-1/2 -translate-x-1/2 block w-0 h-0"
              style={{ borderLeft:'6px solid transparent', borderRight:'6px solid transparent', borderTop:'7px solid white' }}
            />
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── ROBOT SVG ───────────────────────────────────────────────────────────────
// ViewBox 0 0 200 300. Key joints (absolute SVG coords):
//   Left shoulder: (68,152)   Right shoulder: (132,152)
//   Head/neck pivot: (100,128)
function RobotSVG({ headRotY, headRotX, headRotZ, pupilX, pupilY, eyeScaleY, antennaScale, rShoulder, rElbow, isHappy }) {
  return (
    <svg viewBox="0 0 200 300" className="w-full h-full" style={{ overflow:'visible' }} aria-hidden="true">
      <defs>
        <radialGradient id="rc-body" cx="38%" cy="28%" r="68%">
          <stop offset="0%" stopColor={C.bodyHi}/><stop offset="100%" stopColor={C.bodyLo}/>
        </radialGradient>
        <radialGradient id="rc-eye" cx="32%" cy="32%" r="65%">
          <stop offset="0%" stopColor={C.eyeHi}/><stop offset="100%" stopColor={C.eye}/>
        </radialGradient>
        <filter id="rc-glow-e" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="3.5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="rc-glow-a" x="-120%" y="-120%" width="340%" height="340%">
          <feGaussianBlur stdDeviation="5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Ground shadow */}
      <ellipse cx="100" cy="276" rx="56" ry="9" fill={C.shadow}/>

      {/* ── LEFT ARM (behind torso) ── pivot at (68,152) */}
      <g transform="translate(68,152)">
        <rect x="-10" y="0" width="20" height="40" rx="8" fill="url(#rc-body)" stroke={C.plum} strokeWidth="1.2"/>
        <circle cx="0" cy="0" r="10" fill={C.plumMid} stroke={C.joint} strokeWidth="1"/>
        <g transform="translate(0,40)">
          <circle cx="0" cy="0" r="8" fill={C.joint}/>
          <rect x="-8" y="0" width="16" height="30" rx="6" fill="url(#rc-body)" stroke={C.plum} strokeWidth="1.2"/>
          <g transform="translate(0,30)">
            <ellipse cx="0" cy="10" rx="10" ry="12" fill="url(#rc-body)" stroke={C.plum} strokeWidth="1.2"/>
            <ellipse cx="-5" cy="5" rx="4" ry="5" fill={C.body} stroke={C.plum} strokeWidth="0.8"/>
            <ellipse cx="0"  cy="2" rx="4.5" ry="5.5" fill={C.body} stroke={C.plum} strokeWidth="0.8"/>
            <ellipse cx="5"  cy="5" rx="4" ry="5" fill={C.body} stroke={C.plum} strokeWidth="0.8"/>
          </g>
        </g>
      </g>

      {/* ── FEET ── */}
      <rect x="66" y="251" width="34" height="17" rx="8.5" fill={C.bodyLo} stroke={C.plum} strokeWidth="1.2"/>
      <rect x="100" y="251" width="34" height="17" rx="8.5" fill={C.bodyLo} stroke={C.plum} strokeWidth="1.2"/>
      <rect x="70"  y="254" width="12" height="5" rx="2.5" fill={C.bodyHi} opacity="0.45"/>
      <rect x="104" y="254" width="12" height="5" rx="2.5" fill={C.bodyHi} opacity="0.45"/>

      {/* ── LEGS ── */}
      <rect x="75"  y="213" width="20" height="40" rx="8" fill="url(#rc-body)" stroke={C.plum} strokeWidth="1.2"/>
      <rect x="105" y="213" width="20" height="40" rx="8" fill="url(#rc-body)" stroke={C.plum} strokeWidth="1.2"/>

      {/* ── TORSO ── */}
      <rect x="62" y="143" width="76" height="73" rx="17" fill="url(#rc-body)" stroke={C.plum} strokeWidth="1.5"/>
      <circle cx="85"  cy="214" r="7" fill={C.plumMid} stroke={C.joint} strokeWidth="1"/>
      <circle cx="115" cy="214" r="7" fill={C.plumMid} stroke={C.joint} strokeWidth="1"/>
      {/* chest screen */}
      <rect x="76" y="155" width="48" height="40" rx="10" fill={C.plumDark} stroke={C.plumMid} strokeWidth="1.2"/>
      <rect x="82" y="163" width="30" height="3" rx="1.5" fill={C.eye} opacity="0.9"/>
      <rect x="82" y="171" width="22" height="3" rx="1.5" fill={C.eye} opacity="0.55"/>
      <rect x="82" y="179" width="26" height="3" rx="1.5" fill={C.eye} opacity="0.72"/>
      <circle cx="104" cy="188" r="2.5" fill={C.antenna} opacity="0.9"/>
      <circle cx="110" cy="188" r="2.5" fill={C.eye} opacity="0.9"/>
      <ellipse cx="84" cy="156" rx="13" ry="6" fill={C.bodyHi} opacity="0.28"/>

      {/* ── NECK ── */}
      <rect x="90" y="128" width="20" height="17" rx="6" fill={C.bodyLo} stroke={C.plum} strokeWidth="1.2"/>
      <line x1="94" y1="133" x2="106" y2="133" stroke={C.plum} strokeWidth="0.7" opacity="0.4"/>
      <line x1="94" y1="138" x2="106" y2="138" stroke={C.plum} strokeWidth="0.7" opacity="0.4"/>

      {/* ── RIGHT ARM (waving arm, in front of torso) ── pivot at (132,152) */}
      <g transform="translate(132,152)">
        {/* Upper arm — shoulder rotation */}
        <motion.g
          style={{
            rotate: rShoulder,
            transformBox: 'fill-box',
            transformOrigin: 'center top',
            willChange: 'transform',
          }}
        >
          <rect x="-10" y="0" width="20" height="40" rx="8" fill="url(#rc-body)" stroke={C.plum} strokeWidth="1.2"/>
          <g transform="translate(0,40)">
            {/* Elbow cap (not in forearm rotation group) */}
            <circle cx="0" cy="0" r="8" fill={C.joint}/>
            {/* Forearm — elbow rotation */}
            <motion.g
              style={{
                rotate: rElbow,
                transformBox: 'fill-box',
                transformOrigin: 'center top',
                willChange: 'transform',
              }}
            >
              <rect x="-8" y="0" width="16" height="30" rx="6" fill="url(#rc-body)" stroke={C.plum} strokeWidth="1.2"/>
              <g transform="translate(0,30)">
                <ellipse cx="0" cy="10" rx="10" ry="12" fill="url(#rc-body)" stroke={C.plum} strokeWidth="1.2"/>
                <ellipse cx="-5" cy="5" rx="4" ry="5" fill={C.bodyHi} stroke={C.plum} strokeWidth="0.8"/>
                <ellipse cx="0"  cy="2" rx="4.5" ry="5.5" fill={C.bodyHi} stroke={C.plum} strokeWidth="0.8"/>
                <ellipse cx="5"  cy="5" rx="4" ry="5" fill={C.bodyHi} stroke={C.plum} strokeWidth="0.8"/>
              </g>
            </motion.g>
          </g>
        </motion.g>
        {/* Shoulder cap rendered on top */}
        <circle cx="0" cy="0" r="10" fill={C.plumMid} stroke={C.joint} strokeWidth="1"/>
      </g>

      {/* ── HEAD GROUP — rotates for mouse-follow ── pivot at (100,128) = neck top */}
      <g transform="translate(100,128)">
        <motion.g
          style={{
            rotateY: headRotY, rotateX: headRotX, rotateZ: headRotZ,
            transformBox: 'fill-box', transformOrigin: 'center bottom',
            willChange: 'transform',
          }}
        >
          {/* Ear nubs */}
          <circle cx="-42" cy="-27" r="8" fill={C.bodyLo} stroke={C.plum} strokeWidth="1.2"/>
          <circle cx=" 42" cy="-27" r="8" fill={C.bodyLo} stroke={C.plum} strokeWidth="1.2"/>
          <circle cx="-42" cy="-27" r="4" fill={C.plumMid}/>
          <circle cx=" 42" cy="-27" r="4" fill={C.plumMid}/>

          {/* Head box */}
          <rect x="-38" y="-58" width="76" height="58" rx="20" fill="url(#rc-body)" stroke={C.plum} strokeWidth="1.5"/>
          <ellipse cx="-15" cy="-50" rx="13" ry="6" fill={C.bodyHi} opacity="0.32"/>

          {/* ── LEFT EYE at (-16,-28) relative to head pivot ── */}
          <g transform="translate(-16,-28)">
            <motion.g style={{ scaleY: eyeScaleY, transformBox:'fill-box', transformOrigin:'center center' }}>
              {/* Normal eye */}
              <motion.g animate={{ opacity: isHappy ? 0 : 1 }} transition={{ duration: 0.15 }}>
                <circle r="11.5" fill="white" stroke={C.plum} strokeWidth="0.8"/>
                <motion.circle r="8"   fill="url(#rc-eye)" filter="url(#rc-glow-e)" style={{ x: pupilX, y: pupilY }}/>
                <motion.circle r="4"   fill={C.plumDark} style={{ x: pupilX, y: pupilY }}/>
                <circle cx="-4" cy="-4" r="2.5" fill="white"/>
              </motion.g>
              {/* Happy eye ^ */}
              <motion.g animate={{ opacity: isHappy ? 1 : 0 }} transition={{ duration: 0.15 }}>
                <path d="M -11 1 Q 0 -14 11 1" stroke={C.eye} strokeWidth="4.5" fill="none" strokeLinecap="round"/>
              </motion.g>
            </motion.g>
          </g>

          {/* ── RIGHT EYE at (16,-28) ── */}
          <g transform="translate(16,-28)">
            <motion.g style={{ scaleY: eyeScaleY, transformBox:'fill-box', transformOrigin:'center center' }}>
              <motion.g animate={{ opacity: isHappy ? 0 : 1 }} transition={{ duration: 0.15 }}>
                <circle r="11.5" fill="white" stroke={C.plum} strokeWidth="0.8"/>
                <motion.circle r="8"   fill="url(#rc-eye)" filter="url(#rc-glow-e)" style={{ x: pupilX, y: pupilY }}/>
                <motion.circle r="4"   fill={C.plumDark} style={{ x: pupilX, y: pupilY }}/>
                <circle cx="-4" cy="-4" r="2.5" fill="white"/>
              </motion.g>
              <motion.g animate={{ opacity: isHappy ? 1 : 0 }} transition={{ duration: 0.15 }}>
                <path d="M -11 1 Q 0 -14 11 1" stroke={C.eye} strokeWidth="4.5" fill="none" strokeLinecap="round"/>
              </motion.g>
            </motion.g>
          </g>

          {/* ── MOUTH ── */}
          <motion.path
            animate={{ opacity: isHappy ? 0 : 1 }}
            d="M -11 -8 Q 0 -3 11 -8"
            stroke={C.plum} strokeWidth="2.2" fill="none" strokeLinecap="round"
          />
          <motion.path
            initial={{ opacity: 0 }}
            animate={{ opacity: isHappy ? 1 : 0 }}
            d="M -15 -8 Q 0 2 15 -8"
            stroke={C.plum} strokeWidth="2.2" fill="none" strokeLinecap="round"
          />

          {/* ── ANTENNA ── */}
          <line x1="0" y1="-58" x2="0" y2="-80" stroke={C.plum} strokeWidth="2.5" strokeLinecap="round"/>
          <motion.circle cx="0" cy="-88" r="11" fill={C.antennaHi} opacity="0.25" filter="url(#rc-glow-a)"
            style={{ scale: antennaScale }}/>
          <motion.circle cx="0" cy="-88" r="7"  fill={C.antenna} filter="url(#rc-glow-a)"
            style={{ scale: antennaScale }}/>
          <circle cx="-2.5" cy="-91" r="2.5" fill="white" opacity="0.6"/>
        </motion.g>
      </g>
    </svg>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export function RobotCard({ card }) {
  const cardRef   = useRef(null);
  const liveRef   = useRef(true);
  const wavingRef = useRef(false);

  // Spring values from mouse hook
  const { springX, springY } = useMouseLook(cardRef);

  // Derived head transforms
  const headRotY = useTransform(springX, [-1,1], [-HEAD.rotY,  HEAD.rotY ]);
  const headRotX = useTransform(springY, [-1,1], [ HEAD.rotX, -HEAD.rotX ]);
  const headRotZ = useTransform(springX, [-1,1], [-HEAD.rotZ,  HEAD.rotZ ]);
  const pupilX   = useTransform(springX, [-1,1], [-HEAD.pupil, HEAD.pupil]);
  const pupilY   = useTransform(springY, [-1,1], [-HEAD.pupil, HEAD.pupil]);

  // Imperative motion values
  const rShoulder    = useMotionValue(0);
  const rElbow       = useMotionValue(0);
  const eyeScaleY    = useMotionValue(1);
  const antennaScale = useMotionValue(1);
  const robotY       = useMotionValue(0);

  const [bubble,  setBubble]  = useState(false);
  const [isHappy, setIsHappy] = useState(false);

  const reduced = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;

  // ── Blink ──────────────────────────────────────────────────────────────────
  const doBlink = useCallback(async () => {
    if (!liveRef.current || reduced) return;
    await animate(eyeScaleY, 0.04, { duration: 0.08, ease: 'easeIn' });
    if (!liveRef.current) return;
    await animate(eyeScaleY, 1,    { duration: 0.1,  ease: 'easeOut' });
    if (Math.random() > 0.6) {
      await new Promise(r => setTimeout(r, 180));
      if (!liveRef.current) return;
      await animate(eyeScaleY, 0.04, { duration: 0.08 });
      if (!liveRef.current) return;
      await animate(eyeScaleY, 1,    { duration: 0.1 });
    }
  }, [reduced, eyeScaleY]);

  // ── Wave ───────────────────────────────────────────────────────────────────
  const playWave = useCallback(async () => {
    if (wavingRef.current || reduced) return;
    wavingRef.current = true;
    try {
      await animate(rShoulder, WAVE.shoulder, { duration: WAVE.raise, ease: 'easeOut' });
      for (let i = 0; i < WAVE.cycles; i++) {
        if (!liveRef.current) return;
        await animate(rElbow,  WAVE.swingDeg, { duration: WAVE.swing, ease: 'easeInOut' });
        if (!liveRef.current) return;
        await animate(rElbow, -WAVE.swingDeg, { duration: WAVE.swing, ease: 'easeInOut' });
      }
      if (!liveRef.current) return;
      await animate(rElbow,    0, { duration: 0.2,       ease: 'easeOut' });
      await animate(rShoulder, 0, { duration: WAVE.lower, ease: [0.22,1,0.36,1] });
    } finally { wavingRef.current = false; }
  }, [reduced, rShoulder, rElbow]);

  // ── Click handler ──────────────────────────────────────────────────────────
  const handleClick = useCallback(async () => {
    if (!liveRef.current) return;
    setIsHappy(true);
    setBubble(true);
    animate(robotY, [0, -18, 2, -9, 0], { duration: 0.65, ease: 'easeOut', times: [0,0.28,0.52,0.72,1] });
    await doBlink();
    await playWave();
    if (liveRef.current) {
      setIsHappy(false);
      setTimeout(() => { if (liveRef.current) setBubble(false); }, WAVE.bubbleMs);
    }
  }, [doBlink, playWave, robotY]);

  // ── Effects ────────────────────────────────────────────────────────────────
  useEffect(() => { liveRef.current = true; return () => { liveRef.current = false; }; }, []);

  // Greeting wave on mount (once per session)
  useEffect(() => {
    if (reduced) return;
    const wasGreeted = sessionStorage.getItem('robotGreeted');
    const t = setTimeout(async () => {
      if (!liveRef.current) return;
      await doBlink();
      if (!liveRef.current) return;
      setBubble(true);
      playWave();
      setTimeout(() => { if (liveRef.current) setBubble(false); }, WAVE.bubbleMs);
      sessionStorage.setItem('robotGreeted', '1');
    }, wasGreeted ? 3000 : WAVE.delay);
    return () => clearTimeout(t);
  }, [reduced, doBlink, playWave]);

  // Antenna pulse
  useEffect(() => {
    if (reduced) return;
    const c = animate(antennaScale, [1, 1.4, 1], { duration: 2.0, repeat: Infinity, ease: 'easeInOut' });
    return () => c.stop();
  }, [reduced, antennaScale]);

  // Breathing
  useEffect(() => {
    if (reduced) return;
    const c = animate(robotY, [0, -4, 0], { duration: 3.6, repeat: Infinity, ease: 'easeInOut' });
    return () => c.stop();
  }, [reduced, robotY]);

  // Random blinks
  useEffect(() => {
    let t;
    const schedule = () => {
      t = setTimeout(async () => { await doBlink(); if (liveRef.current) schedule(); },
        reduced ? 5000 : 2200 + Math.random() * 3800);
    };
    schedule();
    return () => clearTimeout(t);
  }, [reduced, doBlink]);

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <motion.div
      ref={cardRef}
      drag
      dragConstraints={{ left: -40, right: 40, top: -40, bottom: 40 }}
      dragElastic={0.2}
      dragSnapToOrigin
      whileDrag={{ scale: 1.08, zIndex: 40, cursor: 'grabbing' }}
      initial={{ opacity: 0, y: 50, rotate: 0 }}
      animate={{ opacity: 1, y: 0, rotate: card.rotation }}
      whileHover={{ scale: 1.04, rotate: 0, zIndex: 30, transition: { duration: 0.25 } }}
      transition={{ duration: 0.8, delay: 0.44, ease: [0.22, 1, 0.36, 1] }}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label="Friendly animated robot — click to wave"
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClick(); }}
      className="group relative bg-white dark:bg-plum/90 p-2.5 sm:p-3.5 rounded-[22px] sm:rounded-28 shadow-polaroid hover:shadow-polaroid-hover transition-shadow duration-300 border border-plum/10 dark:border-cream-100/10 cursor-grab active:cursor-grabbing overflow-visible"
      style={{ perspective: '800px', willChange: 'transform' }}
    >
      <SpeechBubble visible={bubble} />

      {/* Robot viewport */}
      <div
        className="relative aspect-[4/5] w-full overflow-hidden rounded-[16px] sm:rounded-[20px]"
        style={{ background: `radial-gradient(ellipse at 38% 22%, #2a1040 0%, ${C.bg} 100%)` }}
      >
        {/* Subtle pink grid bg */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="rc-grid" width="18" height="18" patternUnits="userSpaceOnUse">
              <path d="M18 0H0V18" fill="none" stroke="#FF4F9A" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#rc-grid)"/>
        </svg>

        {/* Robot */}
        <motion.div className="absolute inset-0 flex items-center justify-center p-1" style={{ y: robotY }}>
          <RobotSVG
            headRotY={headRotY} headRotX={headRotX} headRotZ={headRotZ}
            pupilX={pupilX} pupilY={pupilY}
            eyeScaleY={eyeScaleY} antennaScale={antennaScale}
            rShoulder={rShoulder} rElbow={rElbow}
            isHappy={isHappy}
          />
        </motion.div>

        {/* "click to wave" hint on hover */}
        <motion.div
          className="absolute bottom-2 inset-x-0 flex justify-center pointer-events-none"
          initial={{ opacity: 0 }} whileHover={{ opacity: 1 }}
        >
          <span className="text-[9px] text-pink-accent font-bold bg-plum/60 backdrop-blur-sm px-2.5 py-0.5 rounded-full">
            click to wave ✨
          </span>
        </motion.div>
      </div>

      {/* Caption */}
      <div className="pt-2.5 sm:pt-3 px-1 text-left">
        <p className="font-bold text-xs sm:text-sm text-plum dark:text-cream-100 truncate">{card.title}</p>
        <p className="text-[11px] sm:text-xs text-plum/60 dark:text-cream-100/60 truncate font-medium">{card.caption}</p>
      </div>
    </motion.div>
  );
}

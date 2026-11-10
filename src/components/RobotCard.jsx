// src/components/RobotCard.jsx — Enhanced interactive robot card
// Matching reference: dark-purple bg, floating particles, animated screen,
// eye-glow pulse, idle sway, floor glow, circuit lines.
//
// TUNE at top: C (colors) · WAVE (timing) · HEAD (rotation limits)

import React, { useRef, useEffect, useCallback, useState } from 'react';
import {
  motion, AnimatePresence,
  useMotionValue, useSpring, useTransform, animate,
} from 'framer-motion';
import { useMouseLook } from '../utils/useMouseLook';

// ─── COLORS ────────────────────────────────────────────────────────────────
const C = {
  body:     '#F0EBE3', bodyLo: '#D8CEBD', bodyHi: '#FFFFFF',
  plum:     '#3B1F3F', plumMid: '#5a3060', plumDark: '#160920',
  eye:      '#FF4F9A', eyeHi: '#ff8cc4', eyeOuter: 'rgba(255,79,154,0.25)',
  antenna:  '#FF8A3D', antennaHi: '#ffa86a',
  joint:    '#2d1830',
  bg:       '#130820',          // card background (dark purple like reference)
  bgGrad1:  '#1e0f35',          // gradient center
  shadow:   'rgba(59,31,63,0.5)',
  floorGlow:'rgba(255,79,154,0.18)',
};

// ─── WAVE TIMING ─────────────────────────────────────────────────────────
const WAVE = {
  delay: 1200, raise: 0.42, swing: 0.21, swingDeg: 32,
  cycles: 4, lower: 0.52, shoulder: -148, bubbleMs: 2600,
};

// ─── HEAD ROTATION LIMITS ─────────────────────────────────────────────────
const HEAD = { rotY: 25, rotX: 15, rotZ: 6, pupil: 3 };

// ─────────────────────────────────────────────────────────────────────────
// FLOATING PARTICLES (HTML divs for smooth performance)
// ─────────────────────────────────────────────────────────────────────────
const PARTICLES = [
  { id:1, x:'12%', dur:4.2, delay:0.0,  size:3,   color:'#FF4F9A' },
  { id:2, x:'28%', dur:5.0, delay:1.3,  size:2,   color:'#FF8A3D' },
  { id:3, x:'48%', dur:4.8, delay:0.5,  size:2.5, color:'#c084fc' },
  { id:4, x:'65%', dur:3.9, delay:2.2,  size:2,   color:'#FF4F9A' },
  { id:5, x:'80%', dur:5.5, delay:1.0,  size:3,   color:'#FF8A3D' },
  { id:6, x:'20%', dur:6.2, delay:3.1,  size:1.5, color:'#c084fc' },
  { id:7, x:'72%', dur:4.6, delay:0.8,  size:2,   color:'#FF4F9A' },
  { id:8, x:'40%', dur:5.8, delay:2.7,  size:1.5, color:'#FF8A3D' },
  { id:9, x:'88%', dur:4.0, delay:1.9,  size:2.5, color:'#c084fc' },
];

function FloatingParticles({ reduced }) {
  if (reduced) return null;
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {PARTICLES.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.x, width: p.size * 2, height: p.size * 2,
            background: p.color,
            boxShadow: `0 0 ${p.size * 4}px ${p.color}, 0 0 ${p.size * 2}px ${p.color}`,
          }}
          initial={{ bottom: '-5%', opacity: 0 }}
          animate={{ bottom: ['0%', '105%'], opacity: [0, 0.9, 0.9, 0] }}
          transition={{
            duration: p.dur, delay: p.delay,
            repeat: Infinity, ease: 'linear', times: [0, 0.08, 0.9, 1],
          }}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// SPEECH BUBBLE
// ─────────────────────────────────────────────────────────────────────────
function SpeechBubble({ visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="bubble"
          role="status" aria-live="polite"
          initial={{ opacity: 0, scale: 0.75, y: 6 }}
          animate={{ opacity: 1, scale: 1,    y: 0 }}
          exit   ={{ opacity: 0, scale: 0.75, y: 6 }}
          transition={{ type: 'spring', stiffness: 320, damping: 22 }}
          className="absolute top-[4%] left-1/2 z-40 pointer-events-none -translate-x-1/2"
          style={{ whiteSpace: 'nowrap' }}
        >
          <span className="relative block bg-white text-plum text-[9px] sm:text-[11px] font-bold px-3 py-1 rounded-xl shadow-lg border border-pink-accent/40">
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

// ─────────────────────────────────────────────────────────────────────────
// ROBOT SVG  — ViewBox 0 0 200 300
// Key joints: Left shoulder (68,152) · Right shoulder (132,152) · Head pivot (100,128)
// ─────────────────────────────────────────────────────────────────────────
function RobotSVG({
  headRotY, headRotX, headRotZ,
  pupilX, pupilY,
  eyeScaleY, antennaScale,
  rShoulder, rElbow,
  isHappy, idleRotate,
}) {
  return (
    <svg viewBox="0 0 200 300" className="w-full h-full" style={{ overflow:'visible' }} aria-hidden="true">
      <defs>
        <radialGradient id="rc-body" cx="38%" cy="28%" r="68%">
          <stop offset="0%" stopColor={C.bodyHi}/><stop offset="100%" stopColor={C.bodyLo}/>
        </radialGradient>
        <radialGradient id="rc-eye" cx="32%" cy="32%" r="65%">
          <stop offset="0%" stopColor={C.eyeHi}/><stop offset="100%" stopColor={C.eye}/>
        </radialGradient>
        {/* Floor glow gradient */}
        <radialGradient id="rc-floor" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={C.eye} stopOpacity="0.3"/>
          <stop offset="100%" stopColor={C.eye} stopOpacity="0"/>
        </radialGradient>
        {/* Eye glow filter */}
        <filter id="rc-glow-e" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="3.5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        {/* Antenna glow */}
        <filter id="rc-glow-a" x="-120%" y="-120%" width="340%" height="340%">
          <feGaussianBlur stdDeviation="6" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        {/* Soft body shadow */}
        <filter id="rc-shadow" x="-20%" y="-10%" width="140%" height="130%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor={C.shadow}/>
        </filter>
      </defs>

      {/* ── Floor glow ── */}
      <ellipse cx="100" cy="278" rx="62" ry="14" fill="url(#rc-floor)"/>
      {/* Ground shadow */}
      <ellipse cx="100" cy="276" rx="52" ry="8" fill={C.shadow} opacity="0.7"/>

      {/* ── Idle sway wraps everything ── */}
      <motion.g style={{ rotate: idleRotate, transformBox:'fill-box', transformOrigin:'center bottom' }}>

        {/* ── LEFT ARM (behind torso) ── */}
        <g transform="translate(68,152)">
          <rect x="-10" y="0" width="20" height="40" rx="8" fill="url(#rc-body)" stroke={C.plum} strokeWidth="1.3"/>
          <circle cx="0" cy="0" r="10" fill={C.plumMid} stroke={C.joint} strokeWidth="1"/>
          <g transform="translate(0,40)">
            <circle cx="0" cy="0" r="8" fill={C.joint}/>
            <rect x="-8" y="0" width="16" height="30" rx="6" fill="url(#rc-body)" stroke={C.plum} strokeWidth="1.2"/>
            <g transform="translate(0,30)">
              <ellipse cx="0" cy="10" rx="10" ry="12" fill="url(#rc-body)" stroke={C.plum} strokeWidth="1.2"/>
              <ellipse cx="-5" cy="5" rx="4" ry="5" fill={C.bodyHi} opacity="0.7" stroke={C.plum} strokeWidth="0.7"/>
              <ellipse cx="0"  cy="2" rx="4.5" ry="5.5" fill={C.bodyHi} opacity="0.7" stroke={C.plum} strokeWidth="0.7"/>
              <ellipse cx="5"  cy="5" rx="4" ry="5" fill={C.bodyHi} opacity="0.7" stroke={C.plum} strokeWidth="0.7"/>
            </g>
          </g>
        </g>

        {/* ── FEET ── */}
        <rect x="66" y="251" width="34" height="17" rx="8.5" fill={C.bodyLo} stroke={C.plum} strokeWidth="1.2"/>
        <rect x="100" y="251" width="34" height="17" rx="8.5" fill={C.bodyLo} stroke={C.plum} strokeWidth="1.2"/>
        <rect x="70"  y="254" width="12" height="5" rx="2.5" fill={C.bodyHi} opacity="0.5"/>
        <rect x="104" y="254" width="12" height="5" rx="2.5" fill={C.bodyHi} opacity="0.5"/>

        {/* ── LEGS ── */}
        <rect x="75"  y="213" width="20" height="40" rx="8" fill="url(#rc-body)" stroke={C.plum} strokeWidth="1.2"/>
        <rect x="105" y="213" width="20" height="40" rx="8" fill="url(#rc-body)" stroke={C.plum} strokeWidth="1.2"/>
        {/* Leg shine */}
        <rect x="79"  y="217" width="7" height="18" rx="3.5" fill={C.bodyHi} opacity="0.25"/>
        <rect x="109" y="217" width="7" height="18" rx="3.5" fill={C.bodyHi} opacity="0.25"/>

        {/* ── TORSO ── */}
        <rect x="62" y="143" width="76" height="73" rx="17" fill="url(#rc-body)" stroke={C.plum} strokeWidth="1.5" filter="url(#rc-shadow)"/>
        <circle cx="85"  cy="214" r="7" fill={C.plumMid} stroke={C.joint} strokeWidth="1"/>
        <circle cx="115" cy="214" r="7" fill={C.plumMid} stroke={C.joint} strokeWidth="1"/>

        {/* Chest screen */}
        <rect x="76" y="155" width="48" height="40" rx="10" fill={C.plumDark} stroke={C.plumMid} strokeWidth="1.3"/>
        {/* Animated screen lines — simulating typing/scanning */}
        <motion.rect x="82" y="163" height="3" rx="1.5" fill={C.eye}
          animate={{ width:[30,18,30,24,30], opacity:[0.95,0.4,0.95,0.7,0.95] }}
          transition={{ duration:2.8, repeat:Infinity, ease:'easeInOut' }}/>
        <motion.rect x="82" y="171" height="3" rx="1.5" fill={C.eye}
          animate={{ width:[22,30,16,22,16], opacity:[0.55,0.9,0.3,0.55,0.9] }}
          transition={{ duration:2.8, repeat:Infinity, ease:'easeInOut', delay:0.5 }}/>
        <motion.rect x="82" y="179" height="3" rx="1.5" fill={C.eye}
          animate={{ width:[26,22,30,14,26], opacity:[0.75,0.5,0.9,0.4,0.75] }}
          transition={{ duration:2.8, repeat:Infinity, ease:'easeInOut', delay:1.0 }}/>
        {/* Indicator dots with pulse */}
        <motion.circle cx="104" cy="188" r="2.5" fill={C.antenna}
          animate={{ opacity:[1,0.3,1], scale:[1,1.3,1] }}
          transition={{ duration:1.4, repeat:Infinity, ease:'easeInOut' }}/>
        <motion.circle cx="110" cy="188" r="2.5" fill={C.eye}
          animate={{ opacity:[1,0.3,1], scale:[1,1.3,1] }}
          transition={{ duration:1.4, repeat:Infinity, ease:'easeInOut', delay:0.7 }}/>

        {/* Torso highlight */}
        <ellipse cx="84" cy="156" rx="13" ry="6" fill={C.bodyHi} opacity="0.3"/>

        {/* ── NECK ── */}
        <rect x="90" y="128" width="20" height="17" rx="6" fill={C.bodyLo} stroke={C.plum} strokeWidth="1.2"/>
        <line x1="94" y1="133" x2="106" y2="133" stroke={C.plum} strokeWidth="0.7" opacity="0.4"/>
        <line x1="94" y1="138" x2="106" y2="138" stroke={C.plum} strokeWidth="0.7" opacity="0.4"/>

        {/* ── RIGHT ARM — waving arm, in front of torso ── */}
        <g transform="translate(132,152)">
          <motion.g style={{ rotate:rShoulder, transformBox:'fill-box', transformOrigin:'center top', willChange:'transform' }}>
            <rect x="-10" y="0" width="20" height="40" rx="8" fill="url(#rc-body)" stroke={C.plum} strokeWidth="1.3"/>
            <g transform="translate(0,40)">
              <circle cx="0" cy="0" r="8" fill={C.joint}/>
              <motion.g style={{ rotate:rElbow, transformBox:'fill-box', transformOrigin:'center top', willChange:'transform' }}>
                <rect x="-8" y="0" width="16" height="30" rx="6" fill="url(#rc-body)" stroke={C.plum} strokeWidth="1.2"/>
                <g transform="translate(0,30)">
                  <ellipse cx="0" cy="10" rx="10" ry="12" fill="url(#rc-body)" stroke={C.plum} strokeWidth="1.2"/>
                  <ellipse cx="-5" cy="5" rx="4" ry="5" fill={C.bodyHi} opacity="0.7" stroke={C.plum} strokeWidth="0.7"/>
                  <ellipse cx="0"  cy="2" rx="4.5" ry="5.5" fill={C.bodyHi} opacity="0.7" stroke={C.plum} strokeWidth="0.7"/>
                  <ellipse cx="5"  cy="5" rx="4" ry="5" fill={C.bodyHi} opacity="0.7" stroke={C.plum} strokeWidth="0.7"/>
                </g>
              </motion.g>
            </g>
          </motion.g>
          {/* Shoulder cap on top */}
          <circle cx="0" cy="0" r="10" fill={C.plumMid} stroke={C.joint} strokeWidth="1"/>
        </g>

        {/* ── HEAD GROUP — rotates for mouse-follow ── neck pivot at (100,128) */}
        <g transform="translate(100,128)">
          <motion.g style={{ rotateY:headRotY, rotateX:headRotX, rotateZ:headRotZ, transformBox:'fill-box', transformOrigin:'center bottom', willChange:'transform' }}>

            {/* Ear nubs */}
            <circle cx="-42" cy="-27" r="9" fill={C.bodyLo} stroke={C.plum} strokeWidth="1.3"/>
            <circle cx=" 42" cy="-27" r="9" fill={C.bodyLo} stroke={C.plum} strokeWidth="1.3"/>
            <circle cx="-42" cy="-27" r="4.5" fill={C.plumMid}/>
            <circle cx=" 42" cy="-27" r="4.5" fill={C.plumMid}/>

            {/* Head box */}
            <rect x="-38" y="-58" width="76" height="58" rx="22" fill="url(#rc-body)" stroke={C.plum} strokeWidth="1.6" filter="url(#rc-shadow)"/>
            <ellipse cx="-14" cy="-50" rx="13" ry="6" fill={C.bodyHi} opacity="0.35"/>

            {/* ── LEFT EYE at (-16,-28) ── */}
            <g transform="translate(-16,-28)">
              {/* Outer glow ring (pulsing) */}
              <motion.circle r="15" fill={C.eye} opacity="0"
                animate={{ r:[13,17,13], opacity:[0.08,0.22,0.08] }}
                transition={{ duration:2.8, repeat:Infinity, ease:'easeInOut' }}/>

              <motion.g style={{ scaleY:eyeScaleY, transformBox:'fill-box', transformOrigin:'center center' }}>
                {/* Normal eye */}
                <motion.g animate={{ opacity: isHappy ? 0 : 1 }} transition={{ duration:0.15 }}>
                  {/* Sclera */}
                  <circle r="12" fill="white" stroke={C.plum} strokeWidth="0.9"/>
                  {/* Iris glow */}
                  <motion.circle r="9" fill="url(#rc-eye)" filter="url(#rc-glow-e)"
                    style={{ x:pupilX, y:pupilY }}
                    animate={{ r:[8,9.5,8] }}
                    transition={{ duration:2.5, repeat:Infinity, ease:'easeInOut' }}/>
                  {/* Pupil */}
                  <motion.circle r="4.5" fill={C.plumDark} style={{ x:pupilX, y:pupilY }}/>
                  {/* Shine */}
                  <circle cx="-4" cy="-5" r="2.5" fill="white"/>
                  <circle cx="3"  cy="-2" r="1.2" fill="white" opacity="0.6"/>
                </motion.g>
                {/* Happy eye ^ */}
                <motion.g animate={{ opacity: isHappy ? 1 : 0 }} transition={{ duration:0.15 }}>
                  <path d="M -11 1 Q 0 -16 11 1" stroke={C.eye} strokeWidth="5" fill="none" strokeLinecap="round"/>
                  <motion.path d="M -11 1 Q 0 -16 11 1" stroke={C.eyeHi} strokeWidth="2" fill="none" strokeLinecap="round"
                    animate={{ opacity:[1,0.4,1] }} transition={{ duration:1, repeat:Infinity }}/>
                </motion.g>
              </motion.g>
            </g>

            {/* ── RIGHT EYE at (16,-28) ── */}
            <g transform="translate(16,-28)">
              <motion.circle r="15" fill={C.eye} opacity="0"
                animate={{ r:[13,17,13], opacity:[0.08,0.22,0.08] }}
                transition={{ duration:2.8, repeat:Infinity, ease:'easeInOut', delay:0.3 }}/>

              <motion.g style={{ scaleY:eyeScaleY, transformBox:'fill-box', transformOrigin:'center center' }}>
                <motion.g animate={{ opacity: isHappy ? 0 : 1 }} transition={{ duration:0.15 }}>
                  <circle r="12" fill="white" stroke={C.plum} strokeWidth="0.9"/>
                  <motion.circle r="9" fill="url(#rc-eye)" filter="url(#rc-glow-e)"
                    style={{ x:pupilX, y:pupilY }}
                    animate={{ r:[8,9.5,8] }}
                    transition={{ duration:2.5, repeat:Infinity, ease:'easeInOut', delay:0.4 }}/>
                  <motion.circle r="4.5" fill={C.plumDark} style={{ x:pupilX, y:pupilY }}/>
                  <circle cx="-4" cy="-5" r="2.5" fill="white"/>
                  <circle cx="3"  cy="-2" r="1.2" fill="white" opacity="0.6"/>
                </motion.g>
                <motion.g animate={{ opacity: isHappy ? 1 : 0 }} transition={{ duration:0.15 }}>
                  <path d="M -11 1 Q 0 -16 11 1" stroke={C.eye} strokeWidth="5" fill="none" strokeLinecap="round"/>
                  <motion.path d="M -11 1 Q 0 -16 11 1" stroke={C.eyeHi} strokeWidth="2" fill="none" strokeLinecap="round"
                    animate={{ opacity:[1,0.4,1] }} transition={{ duration:1, repeat:Infinity, delay:0.5 }}/>
                </motion.g>
              </motion.g>
            </g>

            {/* ── MOUTH ── */}
            <motion.path animate={{ opacity: isHappy ? 0 : 1 }} transition={{ duration:0.2 }}
              d="M -11 -8 Q 0 -3 11 -8" stroke={C.plum} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            <motion.path initial={{ opacity:0 }} animate={{ opacity: isHappy ? 1 : 0 }} transition={{ duration:0.2 }}
              d="M -15 -8 Q 0 2 15 -8" stroke={C.plum} strokeWidth="2.5" fill="none" strokeLinecap="round"/>

            {/* ── ANTENNA ── */}
            <line x1="0" y1="-58" x2="0" y2="-82" stroke={C.plum} strokeWidth="2.8" strokeLinecap="round"/>
            {/* Glow halo */}
            <motion.circle cx="0" cy="-90" r="13" fill={C.antennaHi} opacity="0.2" filter="url(#rc-glow-a)"
              style={{ scale:antennaScale }}/>
            {/* Ball */}
            <motion.circle cx="0" cy="-90" r="8" fill={C.antenna} filter="url(#rc-glow-a)"
              style={{ scale:antennaScale }}/>
            {/* Shine */}
            <circle cx="-3" cy="-93" r="3" fill="white" opacity="0.65"/>

          </motion.g>
        </g>

      </motion.g>{/* end idle-sway group */}
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// CIRCUIT LINES BACKGROUND — decorative SVG overlay
// ─────────────────────────────────────────────────────────────────────────
function CircuitBg() {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-[0.09]" viewBox="0 0 200 250" preserveAspectRatio="xMidYMid slice">
      {/* Horizontal traces */}
      <line x1="0"   y1="30"  x2="60"  y2="30"  stroke="#FF4F9A" strokeWidth="0.6"/>
      <line x1="140" y1="30"  x2="200" y2="30"  stroke="#FF4F9A" strokeWidth="0.6"/>
      <line x1="0"   y1="80"  x2="40"  y2="80"  stroke="#FF8A3D" strokeWidth="0.6"/>
      <line x1="160" y1="80"  x2="200" y2="80"  stroke="#FF8A3D" strokeWidth="0.6"/>
      <line x1="0"   y1="180" x2="50"  y2="180" stroke="#FF4F9A" strokeWidth="0.6"/>
      <line x1="150" y1="180" x2="200" y2="180" stroke="#FF4F9A" strokeWidth="0.6"/>
      {/* Vertical traces */}
      <line x1="20"  y1="0"   x2="20"  y2="60"  stroke="#c084fc" strokeWidth="0.6"/>
      <line x1="180" y1="0"   x2="180" y2="60"  stroke="#c084fc" strokeWidth="0.6"/>
      <line x1="20"  y1="140" x2="20"  y2="250" stroke="#c084fc" strokeWidth="0.6"/>
      <line x1="180" y1="140" x2="180" y2="250" stroke="#c084fc" strokeWidth="0.6"/>
      {/* Corner dots */}
      <circle cx="20"  cy="30"  r="2.5" fill="#FF4F9A"/>
      <circle cx="180" cy="30"  r="2.5" fill="#FF4F9A"/>
      <circle cx="20"  cy="80"  r="2"   fill="#FF8A3D"/>
      <circle cx="180" cy="80"  r="2"   fill="#FF8A3D"/>
      <circle cx="20"  cy="180" r="2.5" fill="#FF4F9A"/>
      <circle cx="180" cy="180" r="2.5" fill="#FF4F9A"/>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────
export function RobotCard({ card }) {
  const cardRef   = useRef(null);
  const liveRef   = useRef(true);
  const wavingRef = useRef(false);

  const { springX, springY } = useMouseLook(cardRef);

  // Head transforms
  const headRotY = useTransform(springX, [-1,1], [-HEAD.rotY,  HEAD.rotY]);
  const headRotX = useTransform(springY, [-1,1], [ HEAD.rotX, -HEAD.rotX]);
  const headRotZ = useTransform(springX, [-1,1], [-HEAD.rotZ,  HEAD.rotZ]);
  const pupilX   = useTransform(springX, [-1,1], [-HEAD.pupil, HEAD.pupil]);
  const pupilY   = useTransform(springY, [-1,1], [-HEAD.pupil, HEAD.pupil]);

  // Imperative motion values
  const rShoulder    = useMotionValue(0);
  const rElbow       = useMotionValue(0);
  const eyeScaleY    = useMotionValue(1);
  const antennaScale = useMotionValue(1);
  const robotY       = useMotionValue(0);
  const idleRotate   = useMotionValue(0);

  const [bubble,  setBubble]  = useState(false);
  const [isHappy, setIsHappy] = useState(false);

  const reduced = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;

  // ── Blink ────────────────────────────────────────────────────
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

  // ── Wave ─────────────────────────────────────────────────────
  const playWave = useCallback(async () => {
    if (wavingRef.current || reduced) return;
    wavingRef.current = true;
    try {
      await animate(rShoulder, WAVE.shoulder, { duration: WAVE.raise,  ease: 'easeOut' });
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

  // ── Click handler ────────────────────────────────────────────
  const handleClick = useCallback(async () => {
    if (!liveRef.current) return;
    setIsHappy(true);
    setBubble(true);
    // Bounce
    animate(robotY, [0, -22, 3, -11, 0], { duration: 0.7, ease: 'easeOut', times: [0,0.28,0.52,0.72,1] });
    // Excited sway
    animate(idleRotate, [0, -6, 6, -4, 4, 0], { duration: 0.9, ease: 'easeInOut' });
    await doBlink();
    await playWave();
    if (liveRef.current) {
      setIsHappy(false);
      setTimeout(() => { if (liveRef.current) setBubble(false); }, WAVE.bubbleMs);
    }
  }, [doBlink, playWave, robotY, idleRotate]);

  // ── Effects ──────────────────────────────────────────────────
  useEffect(() => { liveRef.current = true; return () => { liveRef.current = false; }; }, []);

  // Greeting wave (once per session)
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
    const c = animate(antennaScale, [1, 1.45, 1], { duration: 1.8, repeat: Infinity, ease: 'easeInOut' });
    return () => c.stop();
  }, [reduced, antennaScale]);

  // Breathing (up/down bob)
  useEffect(() => {
    if (reduced) return;
    const c = animate(robotY, [0, -5, 0], { duration: 3.4, repeat: Infinity, ease: 'easeInOut' });
    return () => c.stop();
  }, [reduced, robotY]);

  // Gentle idle sway (left-right)
  useEffect(() => {
    if (reduced) return;
    const c = animate(idleRotate, [-1.5, 1.5, -1.5], { duration: 5.5, repeat: Infinity, ease: 'easeInOut' });
    return () => c.stop();
  }, [reduced, idleRotate]);

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

  // ── Render ────────────────────────────────────────────────────
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
      role="button" tabIndex={0}
      aria-label="Friendly animated robot — click to wave"
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClick(); }}
      className="group relative bg-white dark:bg-plum/90 p-2.5 sm:p-3.5 rounded-[22px] sm:rounded-28 shadow-polaroid hover:shadow-polaroid-hover transition-shadow duration-300 border border-plum/10 dark:border-cream-100/10 cursor-grab active:cursor-grabbing overflow-visible"
      style={{ perspective: '800px', willChange: 'transform' }}
    >
      <SpeechBubble visible={bubble} />

      {/* Robot viewport */}
      <div
        className="relative aspect-[4/5] w-full overflow-hidden rounded-[16px] sm:rounded-[20px]"
        style={{
          background: `radial-gradient(ellipse at 45% 30%, ${C.bgGrad1} 0%, ${C.bg} 65%, #0a0415 100%)`,
        }}
      >
        {/* Circuit line decorations */}
        <CircuitBg />

        {/* Floating particles */}
        <FloatingParticles reduced={reduced} />

        {/* Top vignette glow */}
        <div className="absolute inset-x-0 top-0 h-16 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(255,79,154,0.08) 0%, transparent 80%)' }}/>

        {/* Robot SVG */}
        <motion.div className="absolute inset-0 flex items-center justify-center p-1 pb-2" style={{ y: robotY }}>
          <RobotSVG
            headRotY={headRotY} headRotX={headRotX} headRotZ={headRotZ}
            pupilX={pupilX} pupilY={pupilY}
            eyeScaleY={eyeScaleY} antennaScale={antennaScale}
            rShoulder={rShoulder} rElbow={rElbow}
            isHappy={isHappy} idleRotate={idleRotate}
          />
        </motion.div>

        {/* Hover hint */}
        <motion.div
          className="absolute bottom-2 inset-x-0 flex justify-center pointer-events-none"
          initial={{ opacity: 0 }} whileHover={{ opacity: 1 }}
        >
          <span className="text-[9px] text-pink-accent font-bold bg-plum/70 backdrop-blur-sm px-2.5 py-0.5 rounded-full border border-pink-accent/30">
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

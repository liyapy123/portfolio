import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, animate } from 'framer-motion';

// Palette matching Liya's portfolio with vibrant 3D accents
const C = {
  bodyHi: '#FFFFFF',
  bodyMid: '#F8F3ED',
  bodyLo: '#DED3C4',
  plum: '#3B1F3F',
  plumMid: '#5B3061',
  plumDark: '#1E0A24',
  pink: '#FF4F9A',
  pinkHi: '#FFA3D0',
  pinkGlow: 'rgba(255, 79, 154, 0.55)',
  orange: '#FF8A3D',
  orangeHi: '#FFB37C',
  orangeGlow: 'rgba(255, 138, 61, 0.65)',
  cyanGlow: 'rgba(56, 189, 248, 0.6)',
  joint: '#2A142D',
  blush: 'rgba(255, 79, 154, 0.42)',
  teeth: '#FFFFFF',
  mouthBg: '#250B30',
  tongue: '#FF4F9A',
  tongueHi: '#FFA1CF',
};

const PHRASES = [
  "Hi, I'm Liya's AI bot! 👋",
  "Curious minds build cool things! 🚀",
  "B.Tech CSE (AI) @ Thejus! 🎓",
  "I see your mouse! Tracking... ✨",
  "Keep moving your mouse! 🤖",
  "Try dragging me around! 💫",
  "Always building something new! 💻",
];

export const HeroRobotBackground = () => {
  const robotRef = useRef(null);
  const liveRef = useRef(true);
  const wavingRef = useRef(false);

  // Normalized mouse coordinates: -1 to 1
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const mouseSpeed = useMotionValue(0);

  // Responsive spring physics for 3D look
  const springHead = { stiffness: 160, damping: 14, mass: 0.55 };
  const smoothMouseX = useSpring(mouseX, springHead);
  const smoothMouseY = useSpring(mouseY, springHead);

  // Body inertia and banking spring
  const springBody = { stiffness: 100, damping: 16, mass: 0.9 };
  const bodyTiltZ = useSpring(useTransform(smoothMouseX, [-1, 1], [-10, 10]), springBody);
  const bodyShiftX = useSpring(useTransform(smoothMouseX, [-1, 1], [-16, 16]), springBody);
  const bodyShiftY = useSpring(useTransform(smoothMouseY, [-1, 1], [-8, 8]), springBody);

  // 3D Head rotations
  const headRotY = useTransform(smoothMouseX, [-1, 1], [-35, 35]);
  const headRotX = useTransform(smoothMouseY, [-1, 1], [22, -22]);
  const headRotZ = useTransform(smoothMouseX, [-1, 1], [-11, 11]);

  // Eye Pupils tracking
  const pupilX = useTransform(smoothMouseX, [-1, 1], [-6.5, 6.5]);
  const pupilY = useTransform(smoothMouseY, [-1, 1], [-5, 5]);

  // Antenna dynamic physics wobble
  const antennaSway = useTransform(smoothMouseX, [-1, 1], [-18, 18]);

  // Interactive Arm Motion tracking mouse (when not actively waving)
  const leftArmAngle = useSpring(
    useTransform(smoothMouseY, [-1, 1], [-18, 22]),
    { stiffness: 120, damping: 14 }
  );
  const leftForearmAngle = useSpring(
    useTransform(smoothMouseX, [-1, 1], [15, -15]),
    { stiffness: 120, damping: 14 }
  );

  // Right arm default mouse tracking (overridden during wave)
  const rightArmMouseAngle = useTransform(smoothMouseX, [-1, 1], [-25, 30]);
  const rightForearmMouseAngle = useTransform(smoothMouseY, [-1, 1], [25, -20]);

  // Manual wave motion values
  const rShoulderWave = useMotionValue(0);
  const rElbowWave = useMotionValue(0);
  const isWaving = useMotionValue(0); // 0 = mouse track, 1 = wave

  // Blend right arm between mouse tracking and wave
  const finalRightShoulder = useTransform(
    [rightArmMouseAngle, rShoulderWave, isWaving],
    ([mouseAngle, waveAngle, waveBlend]) =>
      waveBlend > 0.05 ? waveAngle : mouseAngle
  );
  const finalRightElbow = useTransform(
    [rightForearmMouseAngle, rElbowWave, isWaving],
    ([mouseAngle, waveAngle, waveBlend]) =>
      waveBlend > 0.05 ? waveAngle : mouseAngle
  );

  // Mouth smile scale reacting to mouse excitement
  const smileScaleX = useSpring(
    useTransform(smoothMouseX, [-1, 0, 1], [1.08, 1, 1.08]),
    { stiffness: 200, damping: 20 }
  );

  // Animated values
  const eyeScaleY = useMotionValue(1);
  const antennaPulse = useMotionValue(1);
  const levitationY = useMotionValue(0);
  const thrusterScale = useMotionValue(1);

  // UI States
  const [bubbleText, setBubbleText] = useState(PHRASES[0]);
  const [showBubble, setShowBubble] = useState(false);
  const [isHappy, setIsHappy] = useState(false);
  const [sparks, setSparks] = useState([]);

  // Reduced motion preference
  const reducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  // Track global mouse position and velocity
  useEffect(() => {
    if (reducedMotion) return;
    liveRef.current = true;

    let rafId = null;
    let idleTimer = null;
    let lastX = 0;
    let lastY = 0;
    let lastTime = performance.now();

    const handleMouseMove = (e) => {
      clearTimeout(idleTimer);

      const now = performance.now();
      const dt = Math.max(now - lastTime, 16);
      const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
      const speed = Math.min(dist / dt, 5); // 0 to 5
      mouseSpeed.set(speed);
      lastX = e.clientX;
      lastY = e.clientY;
      lastTime = now;

      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        rafId = null;
        if (!robotRef.current) return;
        const rect = robotRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const maxRangeX = Math.max(window.innerWidth * 0.45, 260);
        const maxRangeY = Math.max(window.innerHeight * 0.45, 260);

        const nx = Math.max(-1, Math.min(1, (e.clientX - centerX) / maxRangeX));
        const ny = Math.max(-1, Math.min(1, (e.clientY - centerY) / maxRangeY));

        mouseX.set(nx);
        mouseY.set(ny);
      });

      idleTimer = setTimeout(() => {
        mouseX.set(0);
        mouseY.set(0);
        mouseSpeed.set(0);
      }, 3500);
    };

    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
      mouseSpeed.set(0);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      liveRef.current = false;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
      clearTimeout(idleTimer);
    };
  }, [mouseX, mouseY, mouseSpeed, reducedMotion]);

  // Levitation anti-gravity hover loop
  useEffect(() => {
    if (reducedMotion) return;
    const hoverAnim = animate(levitationY, [-9, 9, -9], {
      duration: 3.8,
      repeat: Infinity,
      ease: 'easeInOut',
    });
    const thrusterAnim = animate(thrusterScale, [0.8, 1.4, 0.8], {
      duration: 1.6,
      repeat: Infinity,
      ease: 'easeInOut',
    });
    const pulseAnim = animate(antennaPulse, [1, 1.45, 1], {
      duration: 1.9,
      repeat: Infinity,
      ease: 'easeInOut',
    });
    return () => {
      hoverAnim.stop();
      thrusterAnim.stop();
      pulseAnim.stop();
    };
  }, [levitationY, thrusterScale, antennaPulse, reducedMotion]);

  // Natural Blinking
  const doBlink = useCallback(async () => {
    if (!liveRef.current || reducedMotion) return;
    await animate(eyeScaleY, 0.05, { duration: 0.08, ease: 'easeIn' });
    if (!liveRef.current) return;
    await animate(eyeScaleY, 1, { duration: 0.1, ease: 'easeOut' });

    if (Math.random() > 0.6) {
      await new Promise((r) => setTimeout(r, 130));
      if (!liveRef.current) return;
      await animate(eyeScaleY, 0.05, { duration: 0.07 });
      if (!liveRef.current) return;
      await animate(eyeScaleY, 1, { duration: 0.09 });
    }
  }, [eyeScaleY, reducedMotion]);

  useEffect(() => {
    let blinkTimer;
    const scheduleNextBlink = () => {
      blinkTimer = setTimeout(async () => {
        await doBlink();
        if (liveRef.current) scheduleNextBlink();
      }, 2400 + Math.random() * 3200);
    };
    scheduleNextBlink();
    return () => clearTimeout(blinkTimer);
  }, [doBlink]);

  // Wave Action
  const playWave = useCallback(async () => {
    if (wavingRef.current || reducedMotion) return;
    wavingRef.current = true;
    isWaving.set(1);
    try {
      await animate(rShoulderWave, -145, { duration: 0.36, ease: 'easeOut' });
      for (let i = 0; i < 4; i++) {
        if (!liveRef.current) return;
        await animate(rElbowWave, 34, { duration: 0.18, ease: 'easeInOut' });
        if (!liveRef.current) return;
        await animate(rElbowWave, -34, { duration: 0.18, ease: 'easeInOut' });
      }
      if (!liveRef.current) return;
      await animate(rElbowWave, 0, { duration: 0.16, ease: 'easeOut' });
      await animate(rShoulderWave, 0, { duration: 0.4, ease: [0.22, 1, 0.36, 1] });
    } finally {
      isWaving.set(0);
      wavingRef.current = false;
    }
  }, [rShoulderWave, rElbowWave, isWaving, reducedMotion]);

  // Initial Greeting
  useEffect(() => {
    if (reducedMotion) return;
    const timer = setTimeout(async () => {
      if (!liveRef.current) return;
      setShowBubble(true);
      await playWave();
      setTimeout(() => {
        if (liveRef.current) setShowBubble(false);
      }, 3000);
    }, 1300);
    return () => clearTimeout(timer);
  }, [playWave, reducedMotion]);

  // Interactive Click / Tap Reaction
  const handleClick = useCallback(() => {
    if (!liveRef.current) return;

    const nextPhrase = PHRASES[Math.floor(Math.random() * PHRASES.length)];
    setBubbleText(nextPhrase);
    setShowBubble(true);
    setIsHappy(true);

    // Generate burst of colorful celebratory sparks
    const newSparks = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 80,
      y: (Math.random() - 0.5) * 80,
      color: i % 3 === 0 ? C.pink : i % 3 === 1 ? C.orange : '#38BDF8',
      size: 3 + Math.random() * 3,
    }));
    setSparks(newSparks);
    setTimeout(() => setSparks([]), 900);

    doBlink();
    playWave();

    setTimeout(() => {
      if (liveRef.current) setIsHappy(false);
    }, 2800);

    setTimeout(() => {
      if (liveRef.current) setShowBubble(false);
    }, 3800);
  }, [doBlink, playWave]);

  return (
    <div
      ref={robotRef}
      className="absolute right-2 sm:right-6 md:right-12 lg:right-16 top-20 sm:top-24 md:top-28 z-20 pointer-events-auto select-none"
      style={{ perspective: 1100 }}
    >
      {/* Draggable & Floating Container */}
      <motion.div
        drag
        dragConstraints={{ left: -220, right: 100, top: -60, bottom: 260 }}
        dragElastic={0.16}
        whileDrag={{ scale: 1.1, cursor: 'grabbing' }}
        whileHover={{ scale: 1.05 }}
        onClick={handleClick}
        className="relative cursor-grab active:cursor-grabbing flex flex-col items-center"
        style={{
          y: levitationY,
          x: bodyShiftX,
          rotateZ: bodyTiltZ,
        }}
      >
        {/* Floating Speech Bubble */}
        <AnimatePresence>
          {showBubble && (
            <motion.div
              initial={{ opacity: 0, y: 14, scale: 0.75 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.75 }}
              transition={{ type: 'spring', stiffness: 380, damping: 22 }}
              className="absolute -top-14 sm:-top-16 z-50 pointer-events-none whitespace-nowrap"
            >
              <div className="relative bg-white/95 dark:bg-plum/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-2xl border-2 border-pink-accent/50 text-xs sm:text-sm font-extrabold text-plum dark:text-cream-100 flex items-center gap-1.5">
                <span>{bubbleText}</span>
                <span
                  className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-0 h-0 border-x-[8px] border-x-transparent border-t-[9px] border-t-white/95 dark:border-t-plum/95"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Celebratory Click Sparkles */}
        {sparks.map((spark) => (
          <motion.div
            key={spark.id}
            initial={{ opacity: 1, scale: 0.4, x: 0, y: 0 }}
            animate={{ opacity: 0, scale: 1.8, x: spark.x, y: spark.y }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="absolute top-1/2 left-1/2 rounded-full pointer-events-none z-40"
            style={{
              width: spark.size,
              height: spark.size,
              background: spark.color,
              boxShadow: `0 0 12px ${spark.color}`,
            }}
          />
        ))}

        {/* Robot Main SVG Visual */}
        <div className="relative w-40 h-52 sm:w-48 sm:h-60 md:w-56 md:h-72 lg:w-60 lg:h-76 drop-shadow-2xl">
          <svg
            viewBox="0 0 200 270"
            className="w-full h-full overflow-visible"
            aria-label="Interactive AI Robot Companion with Toothy Smile"
            role="img"
          >
            <defs>
              {/* 3D Body Surface Gradients */}
              <radialGradient id="h-body-grad" cx="36%" cy="28%" r="72%">
                <stop offset="0%" stopColor={C.bodyHi} />
                <stop offset="65%" stopColor={C.bodyMid} />
                <stop offset="100%" stopColor={C.bodyLo} />
              </radialGradient>

              {/* Glowing Pink Eye Gradient */}
              <radialGradient id="h-eye-grad" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor={C.pinkHi} />
                <stop offset="60%" stopColor={C.pink} />
                <stop offset="100%" stopColor="#D92275" />
              </radialGradient>

              {/* Glowing Orange Antenna Gradient */}
              <radialGradient id="h-antenna-grad" cx="32%" cy="32%" r="68%">
                <stop offset="0%" stopColor={C.orangeHi} />
                <stop offset="70%" stopColor={C.orange} />
                <stop offset="100%" stopColor="#C95B16" />
              </radialGradient>

              {/* Thruster Energy Ring Glow */}
              <radialGradient id="h-thruster-grad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={C.cyanGlow} stopOpacity="0.9" />
                <stop offset="50%" stopColor={C.pinkGlow} stopOpacity="0.5" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </radialGradient>

              {/* Glow Filters */}
              <filter id="h-glow-pink" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="4.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <filter id="h-glow-orange" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="6.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Soft Drop Shadow for 3D Depth */}
              <filter id="h-robot-shadow" x="-20%" y="-20%" width="140%" height="150%">
                <feDropShadow dx="0" dy="12" stdDeviation="14" floodColor="rgba(59,31,63,0.32)" />
              </filter>

              {/* Smile Mouth Clip-Path for clean tooth & tongue rendering */}
              <clipPath id="h-mouth-clip">
                <path d="M -16 -15 Q 0 -15 16 -15 C 16 -15 17 -1 0 1 C -17 -1 -16 -15 -16 -15 Z" />
              </clipPath>
              {/* Wide Smile Mouth Clip-Path when clicked */}
              <clipPath id="h-mouth-clip-happy">
                <path d="M -19 -16 Q 0 -16 19 -16 C 19 -16 20 5 0 7 C -20 5 -19 -16 -19 -16 Z" />
              </clipPath>
            </defs>

            {/* ── THRUSTER HOVER PROPULSION ENERGY RING ── */}
            <motion.ellipse
              cx="100"
              cy="252"
              rx="46"
              ry="12"
              fill="url(#h-thruster-grad)"
              style={{ scale: thrusterScale }}
            />
            {/* Ground Shadow */}
            <ellipse cx="100" cy="256" rx="52" ry="8" fill="rgba(30,10,36,0.35)" />

            {/* ── LEFT ARM (Mouse Interactive Gesture & Counter-Balance) — pivot at (64, 138) ── */}
            <g transform="translate(64, 138)">
              {/* Shoulder socket */}
              <circle cx="0" cy="0" r="10" fill={C.plumMid} stroke={C.joint} strokeWidth="1.3" />
              {/* Upper arm with reactive mouse rotation */}
              <motion.g style={{ rotate: leftArmAngle, transformBox: 'fill-box', transformOrigin: 'center top' }}>
                <rect x="-8.5" y="0" width="17" height="35" rx="7.5" fill="url(#h-body-grad)" stroke={C.plum} strokeWidth="1.4" />
                <g transform="translate(0, 35)">
                  {/* Elbow joint */}
                  <circle cx="0" cy="0" r="7.5" fill={C.joint} />
                  {/* Forearm */}
                  <motion.g style={{ rotate: leftForearmAngle, transformBox: 'fill-box', transformOrigin: 'center top' }}>
                    <rect x="-7.5" y="0" width="15" height="27" rx="6.5" fill="url(#h-body-grad)" stroke={C.plum} strokeWidth="1.3" />
                    {/* Cute rounded hand / fingers */}
                    <g transform="translate(0, 27)">
                      <circle cx="0" cy="8" r="9.5" fill="url(#h-body-grad)" stroke={C.plum} strokeWidth="1.3" />
                      <circle cx="-4" cy="5" r="3.5" fill={C.bodyHi} stroke={C.plum} strokeWidth="0.7" />
                      <circle cx="0" cy="2" r="3.5" fill={C.bodyHi} stroke={C.plum} strokeWidth="0.7" />
                      <circle cx="4" cy="5" r="3.5" fill={C.bodyHi} stroke={C.plum} strokeWidth="0.7" />
                    </g>
                  </motion.g>
                </g>
              </motion.g>
            </g>

            {/* ── LOWER BODY & LEGS ── */}
            <g>
              {/* Legs */}
              <rect x="74" y="196" width="18" height="36" rx="8" fill="url(#h-body-grad)" stroke={C.plum} strokeWidth="1.3" />
              <rect x="108" y="196" width="18" height="36" rx="8" fill="url(#h-body-grad)" stroke={C.plum} strokeWidth="1.3" />
              {/* Leg shine */}
              <rect x="77" y="200" width="5.5" height="18" rx="2.5" fill={C.bodyHi} opacity="0.45" />
              <rect x="111" y="200" width="5.5" height="18" rx="2.5" fill={C.bodyHi} opacity="0.45" />
              {/* Rounded hover pods / feet */}
              <ellipse cx="83" cy="235" rx="16" ry="10" fill={C.bodyLo} stroke={C.plum} strokeWidth="1.3" />
              <ellipse cx="117" cy="235" rx="16" ry="10" fill={C.bodyLo} stroke={C.plum} strokeWidth="1.3" />
              {/* Ion emitter dots */}
              <circle cx="83" cy="238" r="4" fill={C.cyanGlow} />
              <circle cx="117" cy="238" r="4" fill={C.cyanGlow} />
            </g>

            {/* ── TORSO ── */}
            <g filter="url(#h-robot-shadow)">
              <rect x="58" y="128" width="84" height="74" rx="20" fill="url(#h-body-grad)" stroke={C.plum} strokeWidth="1.6" />
              <ellipse cx="78" cy="142" rx="16" ry="8" fill={C.bodyHi} opacity="0.45" />

              {/* Chest Screen Display */}
              <rect x="72" y="140" width="56" height="44" rx="12" fill={C.plumDark} stroke={C.plumMid} strokeWidth="1.4" />

              {/* Real-time AI Equalizer Bars */}
              <motion.rect
                x="80"
                y="148"
                height="3.5"
                rx="1.75"
                fill={C.pink}
                animate={{ width: [32, 18, 38, 22, 32], opacity: [0.95, 0.5, 1, 0.65, 0.95] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.rect
                x="80"
                y="157"
                height="3.5"
                rx="1.75"
                fill={C.pink}
                animate={{ width: [24, 36, 16, 30, 24], opacity: [0.65, 1, 0.45, 0.85, 0.65] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.35 }}
              />
              <motion.rect
                x="80"
                y="166"
                height="3.5"
                rx="1.75"
                fill={C.pink}
                animate={{ width: [30, 20, 36, 14, 30], opacity: [0.85, 0.55, 1, 0.4, 0.85] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
              />

              {/* Status LEDs */}
              <motion.circle
                cx="110"
                cy="176"
                r="3"
                fill={C.orange}
                filter="url(#h-glow-orange)"
                animate={{ opacity: [1, 0.35, 1], scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.circle
                cx="118"
                cy="176"
                r="3"
                fill={C.pink}
                filter="url(#h-glow-pink)"
                animate={{ opacity: [1, 0.35, 1], scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.75 }}
              />
            </g>

            {/* ── NECK BELLOWS ── */}
            <g>
              <rect x="88" y="112" width="24" height="18" rx="6" fill={C.bodyLo} stroke={C.plum} strokeWidth="1.2" />
              <line x1="92" y1="117" x2="108" y2="117" stroke={C.plum} strokeWidth="1" opacity="0.45" />
              <line x1="92" y1="123" x2="108" y2="123" stroke={C.plum} strokeWidth="1" opacity="0.45" />
            </g>

            {/* ── RIGHT ARM (Mouse Pointer Tracking + Wave Reaction) — pivot at (136, 138) ── */}
            <g transform="translate(136, 138)">
              <motion.g
                style={{
                  rotate: finalRightShoulder,
                  transformBox: 'fill-box',
                  transformOrigin: 'center top',
                  willChange: 'transform',
                }}
              >
                <rect x="-8.5" y="0" width="17" height="35" rx="7.5" fill="url(#h-body-grad)" stroke={C.plum} strokeWidth="1.4" />
                <g transform="translate(0, 35)">
                  <circle cx="0" cy="0" r="7.5" fill={C.joint} />
                  <motion.g
                    style={{
                      rotate: finalRightElbow,
                      transformBox: 'fill-box',
                      transformOrigin: 'center top',
                      willChange: 'transform',
                    }}
                  >
                    <rect x="-7.5" y="0" width="15" height="27" rx="6.5" fill="url(#h-body-grad)" stroke={C.plum} strokeWidth="1.3" />
                    <g transform="translate(0, 27)">
                      <circle cx="0" cy="8" r="9.5" fill="url(#h-body-grad)" stroke={C.plum} strokeWidth="1.3" />
                      <circle cx="-4" cy="4" r="3.5" fill={C.bodyHi} stroke={C.plum} strokeWidth="0.7" />
                      <circle cx="0" cy="2" r="3.5" fill={C.bodyHi} stroke={C.plum} strokeWidth="0.7" />
                      <circle cx="4" cy="4" r="3.5" fill={C.bodyHi} stroke={C.plum} strokeWidth="0.7" />
                    </g>
                  </motion.g>
                </g>
              </motion.g>
              <circle cx="0" cy="0" r="10" fill={C.plumMid} stroke={C.joint} strokeWidth="1.3" />
            </g>

            {/* ── HEAD GROUP (Full 3D Mouse Look Physics) ── pivot at (100, 114) */}
            <g transform="translate(100, 114)">
              <motion.g
                style={{
                  rotateY: headRotY,
                  rotateX: headRotX,
                  rotateZ: headRotZ,
                  transformBox: 'fill-box',
                  transformOrigin: 'center bottom',
                  willChange: 'transform',
                }}
              >
                {/* Ear Sensors / Headphones */}
                <circle cx="-47" cy="-30" r="10.5" fill={C.bodyLo} stroke={C.plum} strokeWidth="1.4" />
                <circle cx="47" cy="-30" r="10.5" fill={C.bodyLo} stroke={C.plum} strokeWidth="1.4" />
                <circle cx="-47" cy="-30" r="5.5" fill={C.plumMid} />
                <circle cx="47" cy="-30" r="5.5" fill={C.plumMid} />

                {/* Head Body */}
                <rect
                  x="-42"
                  y="-64"
                  width="84"
                  height="64"
                  rx="24"
                  fill="url(#h-body-grad)"
                  stroke={C.plum}
                  strokeWidth="1.7"
                  filter="url(#h-robot-shadow)"
                />

                {/* Head 3D Specular Highlight */}
                <ellipse cx="-16" cy="-54" rx="18" ry="8" fill={C.bodyHi} opacity="0.48" />

                {/* Cute Rosy Cheeks */}
                <circle cx="-26" cy="-18" r="7" fill={C.blush} />
                <circle cx="26" cy="-18" r="7" fill={C.blush} />

                {/* ── LEFT EYE (at -18, -32) ── */}
                <g transform="translate(-18, -32)">
                  <motion.circle
                    r="17"
                    fill={C.pink}
                    opacity="0.15"
                    animate={{ r: [16, 19, 16], opacity: [0.1, 0.25, 0.1] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  />

                  <motion.g style={{ scaleY: eyeScaleY, transformBox: 'fill-box', transformOrigin: 'center center' }}>
                    <motion.g animate={{ opacity: isHappy ? 0 : 1 }} transition={{ duration: 0.15 }}>
                      <circle r="13.5" fill="white" stroke={C.plum} strokeWidth="1.1" />
                      {/* Glowing Pink Iris tracking mouse */}
                      <motion.circle
                        r="9.5"
                        fill="url(#h-eye-grad)"
                        filter="url(#h-glow-pink)"
                        style={{ x: pupilX, y: pupilY }}
                      />
                      <motion.circle r="4.8" fill={C.plumDark} style={{ x: pupilX, y: pupilY }} />
                      {/* Specular Star/Catchlights */}
                      <circle cx="-4" cy="-5" r="3" fill="white" />
                      <circle cx="3.5" cy="-2" r="1.5" fill="white" opacity="0.8" />
                    </motion.g>

                    {/* Happy Arc Eye (^ shape) */}
                    <motion.g animate={{ opacity: isHappy ? 1 : 0 }} transition={{ duration: 0.15 }}>
                      <path d="M -13 2 Q 0 -18 13 2" stroke={C.pink} strokeWidth="5.5" fill="none" strokeLinecap="round" />
                      <path d="M -13 2 Q 0 -18 13 2" stroke={C.pinkHi} strokeWidth="2.2" fill="none" strokeLinecap="round" />
                    </motion.g>
                  </motion.g>
                </g>

                {/* ── RIGHT EYE (at 18, -32) ── */}
                <g transform="translate(18, -32)">
                  <motion.circle
                    r="17"
                    fill={C.pink}
                    opacity="0.15"
                    animate={{ r: [16, 19, 16], opacity: [0.1, 0.25, 0.1] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.35 }}
                  />

                  <motion.g style={{ scaleY: eyeScaleY, transformBox: 'fill-box', transformOrigin: 'center center' }}>
                    <motion.g animate={{ opacity: isHappy ? 0 : 1 }} transition={{ duration: 0.15 }}>
                      <circle r="13.5" fill="white" stroke={C.plum} strokeWidth="1.1" />
                      <motion.circle
                        r="9.5"
                        fill="url(#h-eye-grad)"
                        filter="url(#h-glow-pink)"
                        style={{ x: pupilX, y: pupilY }}
                      />
                      <motion.circle r="4.8" fill={C.plumDark} style={{ x: pupilX, y: pupilY }} />
                      <circle cx="-4" cy="-5" r="3" fill="white" />
                      <circle cx="3.5" cy="-2" r="1.5" fill="white" opacity="0.8" />
                    </motion.g>

                    <motion.g animate={{ opacity: isHappy ? 1 : 0 }} transition={{ duration: 0.15 }}>
                      <path d="M -13 2 Q 0 -18 13 2" stroke={C.pink} strokeWidth="5.5" fill="none" strokeLinecap="round" />
                      <path d="M -13 2 Q 0 -18 13 2" stroke={C.pinkHi} strokeWidth="2.2" fill="none" strokeLinecap="round" />
                    </motion.g>
                  </motion.g>
                </g>

                {/* ── ADORABLE ROBOT SMILE WITH TEETH ── */}
                <motion.g
                  style={{
                    scaleX: smileScaleX,
                    transformBox: 'fill-box',
                    transformOrigin: 'center center',
                  }}
                >
                  {/* Normal Toothy Smile (Always friendly and smiling with neat white teeth!) */}
                  <motion.g animate={{ opacity: isHappy ? 0 : 1 }} transition={{ duration: 0.18 }}>
                    {/* Mouth cavity background */}
                    <path
                      d="M -16 -15 Q 0 -15 16 -15 C 16 -15 17 -1 0 1 C -17 -1 -16 -15 -16 -15 Z"
                      fill={C.mouthBg}
                      stroke={C.plum}
                      strokeWidth="2.2"
                      strokeLinejoin="round"
                    />

                    {/* Clipped teeth and tongue */}
                    <g clipPath="url(#h-mouth-clip)">
                      {/* Upper row of bright pearly white teeth */}
                      <rect x="-16" y="-15" width="32" height="7.5" rx="2" fill={C.teeth} />
                      {/* Subtle tooth vertical separator lines */}
                      <line x1="-8" y1="-15" x2="-8" y2="-7.5" stroke="#D3C5D8" strokeWidth="0.9" />
                      <line x1="0"  y1="-15" x2="0"  y2="-7.5" stroke="#D3C5D8" strokeWidth="0.9" />
                      <line x1="8"  y1="-15" x2="8"  y2="-7.5" stroke="#D3C5D8" strokeWidth="0.9" />

                      {/* Cute pink tongue at the bottom curve */}
                      <ellipse cx="0" cy="1" rx="8" ry="4.5" fill={C.tongue} />
                      <ellipse cx="0" cy="0" rx="5" ry="2.5" fill={C.tongueHi} opacity="0.65" />
                    </g>
                  </motion.g>

                  {/* Big Excited Smile with Teeth (when clicked / joyful) */}
                  <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHappy ? 1 : 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    {/* Wider and deeper mouth opening */}
                    <path
                      d="M -19 -16 Q 0 -16 19 -16 C 19 -16 20 5 0 7 C -20 5 -19 -16 -19 -16 Z"
                      fill={C.mouthBg}
                      stroke={C.plum}
                      strokeWidth="2.4"
                      strokeLinejoin="round"
                    />

                    {/* Clipped teeth and tongue for wide smile */}
                    <g clipPath="url(#h-mouth-clip-happy)">
                      {/* Upper row of big happy white teeth */}
                      <rect x="-19" y="-16" width="38" height="9" rx="2.5" fill={C.teeth} />
                      {/* Tooth separator lines */}
                      <line x1="-10" y1="-16" x2="-10" y2="-7" stroke="#D3C5D8" strokeWidth="1" />
                      <line x1="-3.5" y1="-16" x2="-3.5" y2="-7" stroke="#D3C5D8" strokeWidth="1" />
                      <line x1="3.5"  y1="-16" x2="3.5"  y2="-7" stroke="#D3C5D8" strokeWidth="1" />
                      <line x1="10"  y1="-16" x2="10"  y2="-7" stroke="#D3C5D8" strokeWidth="1" />

                      {/* Wide happy pink tongue */}
                      <ellipse cx="0" cy="6" rx="10" ry="6" fill={C.tongue} />
                      <ellipse cx="0" cy="5" rx="6.5" ry="3.5" fill={C.tongueHi} opacity="0.75" />
                    </g>
                  </motion.g>
                </motion.g>

                {/* ── ANTENNA (Spring Sway with Mouse Physics) ── */}
                <motion.g style={{ rotate: antennaSway, transformBox: 'fill-box', transformOrigin: 'center bottom' }}>
                  <line x1="0" y1="-64" x2="0" y2="-94" stroke={C.plum} strokeWidth="3.2" strokeLinecap="round" />
                  {/* Glowing orange antenna aura */}
                  <motion.circle
                    cx="0"
                    cy="-102"
                    r="16"
                    fill={C.orangeHi}
                    opacity="0.3"
                    filter="url(#h-glow-orange)"
                    style={{ scale: antennaPulse }}
                  />
                  {/* Glossy orange antenna sphere */}
                  <motion.circle
                    cx="0"
                    cy="-102"
                    r="10.5"
                    fill="url(#h-antenna-grad)"
                    filter="url(#h-glow-orange)"
                    style={{ scale: antennaPulse }}
                  />
                  {/* Specular catchlight on antenna */}
                  <circle cx="-3.5" cy="-105" r="3.5" fill="white" opacity="0.85" />
                </motion.g>
              </motion.g>
            </g>
          </svg>
        </div>

        {/* Small "Drag me / Tap me" Pill */}
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          whileHover={{ opacity: 1, y: 0 }}
          className="mt-1 px-3 py-1 rounded-full bg-plum/70 dark:bg-cream-100/10 backdrop-blur-md border border-pink-accent/30 text-[10px] sm:text-xs font-bold text-pink-accent pointer-events-none"
        >
          Liya's AI Bot ✨ (drag me!)
        </motion.div>
      </motion.div>
    </div>
  );
};

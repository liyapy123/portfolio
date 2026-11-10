import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, animate } from 'framer-motion';

// Palette matching Liya's portfolio
const C = {
  bodyHi: '#FFFFFF',
  bodyMid: '#F5EFE6',
  bodyLo: '#D9CFC1',
  plum: '#3B1F3F',
  plumMid: '#5B3061',
  plumDark: '#1E0A24',
  pink: '#FF4F9A',
  pinkHi: '#FF8CC4',
  pinkGlow: 'rgba(255, 79, 154, 0.45)',
  orange: '#FF8A3D',
  orangeHi: '#FFAA6C',
  orangeGlow: 'rgba(255, 138, 61, 0.55)',
  cyanGlow: 'rgba(56, 189, 248, 0.45)',
  joint: '#2A142D',
  blush: 'rgba(255, 79, 154, 0.35)',
};

const PHRASES = [
  "Hi, I'm Liya's AI bot! 👋",
  "Curious minds build cool things! 🚀",
  "B.Tech CSE (AI) @ Thejus! 🎓",
  "Always building something new ✨",
  "Try dragging me around! 🤖",
  "Beep boop! You found me! 💫",
];

export const HeroRobotBackground = () => {
  const robotRef = useRef(null);
  const liveRef = useRef(true);
  const wavingRef = useRef(false);

  // Raw mouse coordinates normalized from -1 to 1 relative to robot center
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Physics spring for head look (stiff & responsive, no jitter)
  const springConfig = { stiffness: 140, damping: 15, mass: 0.6 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Physics spring for body tilt / banking into movement (inertia)
  const bodySpringConfig = { stiffness: 90, damping: 18, mass: 1.0 };
  const bodyTiltZ = useSpring(useTransform(smoothMouseX, [-1, 1], [-8, 8]), bodySpringConfig);
  const bodyShiftX = useSpring(useTransform(smoothMouseX, [-1, 1], [-12, 12]), bodySpringConfig);

  // Head rotations in 3D
  const headRotY = useTransform(smoothMouseX, [-1, 1], [-32, 32]);
  const headRotX = useTransform(smoothMouseY, [-1, 1], [20, -20]);
  const headRotZ = useTransform(smoothMouseX, [-1, 1], [-8, 8]);

  // Pupil translations (constrained 2D eyeball look)
  const pupilX = useTransform(smoothMouseX, [-1, 1], [-5.5, 5.5]);
  const pupilY = useTransform(smoothMouseY, [-1, 1], [-4.5, 4.5]);

  // Antenna dynamic sway (spring inertia based on head motion)
  const antennaSway = useTransform(smoothMouseX, [-1, 1], [-14, 14]);

  // Motion values for animations
  const rShoulder = useMotionValue(0);
  const rElbow = useMotionValue(0);
  const eyeScaleY = useMotionValue(1);
  const antennaPulse = useMotionValue(1);
  const levitationY = useMotionValue(0);
  const thrusterGlow = useMotionValue(1);

  // States
  const [bubbleText, setBubbleText] = useState(PHRASES[0]);
  const [showBubble, setShowBubble] = useState(false);
  const [isHappy, setIsHappy] = useState(false);
  const [clickSparks, setClickSparks] = useState([]);

  // Check reduced motion
  const reducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  // Global mouse tracking with rAF throttle & idle detection
  useEffect(() => {
    if (reducedMotion) return;
    liveRef.current = true;

    let rafId = null;
    let idleTimer = null;

    const handleMouseMove = (e) => {
      clearTimeout(idleTimer);
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        rafId = null;
        if (!robotRef.current) return;
        const rect = robotRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const maxRangeX = Math.max(window.innerWidth * 0.5, 300);
        const maxRangeY = Math.max(window.innerHeight * 0.5, 300);

        const nx = Math.max(-1, Math.min(1, (e.clientX - centerX) / maxRangeX));
        const ny = Math.max(-1, Math.min(1, (e.clientY - centerY) / maxRangeY));

        mouseX.set(nx);
        mouseY.set(ny);
      });

      // Reset to center after 3.5s of no mouse movement
      idleTimer = setTimeout(() => {
        mouseX.set(0);
        mouseY.set(0);
      }, 3500);
    };

    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
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
  }, [mouseX, mouseY, reducedMotion]);

  // Levitation floating physics (smooth organic hover loop)
  useEffect(() => {
    if (reducedMotion) return;
    const hoverAnim = animate(levitationY, [-10, 10, -10], {
      duration: 4.2,
      repeat: Infinity,
      ease: 'easeInOut',
    });
    const thrusterAnim = animate(thrusterGlow, [0.75, 1.35, 0.75], {
      duration: 1.8,
      repeat: Infinity,
      ease: 'easeInOut',
    });
    return () => {
      hoverAnim.stop();
      thrusterAnim.stop();
    };
  }, [levitationY, thrusterGlow, reducedMotion]);

  // Antenna soft pulse
  useEffect(() => {
    if (reducedMotion) return;
    const pulseAnim = animate(antennaPulse, [1, 1.4, 1], {
      duration: 2.2,
      repeat: Infinity,
      ease: 'easeInOut',
    });
    return () => pulseAnim.stop();
  }, [antennaPulse, reducedMotion]);

  // Natural Blinking Loop
  const doBlink = useCallback(async () => {
    if (!liveRef.current || reducedMotion) return;
    await animate(eyeScaleY, 0.05, { duration: 0.08, ease: 'easeIn' });
    if (!liveRef.current) return;
    await animate(eyeScaleY, 1, { duration: 0.1, ease: 'easeOut' });

    // 35% chance of a quick double blink
    if (Math.random() > 0.65) {
      await new Promise((r) => setTimeout(r, 140));
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
      }, 2500 + Math.random() * 3500);
    };
    scheduleNextBlink();
    return () => clearTimeout(blinkTimer);
  }, [doBlink]);

  // Waving animation
  const playWave = useCallback(async () => {
    if (wavingRef.current || reducedMotion) return;
    wavingRef.current = true;
    try {
      // Raise arm up to greeting pose
      await animate(rShoulder, -145, { duration: 0.38, ease: 'easeOut' });
      // Oscillate forearm wave 4 times
      for (let i = 0; i < 4; i++) {
        if (!liveRef.current) return;
        await animate(rElbow, 32, { duration: 0.2, ease: 'easeInOut' });
        if (!liveRef.current) return;
        await animate(rElbow, -32, { duration: 0.2, ease: 'easeInOut' });
      }
      if (!liveRef.current) return;
      await animate(rElbow, 0, { duration: 0.18, ease: 'easeOut' });
      await animate(rShoulder, 0, { duration: 0.45, ease: [0.22, 1, 0.36, 1] });
    } finally {
      wavingRef.current = false;
    }
  }, [rShoulder, rElbow, reducedMotion]);

  // Greeting on mount
  useEffect(() => {
    if (reducedMotion) return;
    const timer = setTimeout(async () => {
      if (!liveRef.current) return;
      setShowBubble(true);
      await playWave();
      setTimeout(() => {
        if (liveRef.current) setShowBubble(false);
      }, 3000);
    }, 1400);
    return () => clearTimeout(timer);
  }, [playWave, reducedMotion]);

  // Interactive Click / Tap Reaction
  const handleClick = useCallback(() => {
    if (!liveRef.current) return;

    // Pick a random funny/cute phrase
    const nextPhrase = PHRASES[Math.floor(Math.random() * PHRASES.length)];
    setBubbleText(nextPhrase);
    setShowBubble(true);
    setIsHappy(true);

    // Click sparks
    const newSparks = Array.from({ length: 6 }, (_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 60,
      y: (Math.random() - 0.5) * 60,
      color: i % 2 === 0 ? C.pink : C.orange,
    }));
    setClickSparks(newSparks);
    setTimeout(() => setClickSparks([]), 800);

    // Wave and bounce
    doBlink();
    playWave();

    setTimeout(() => {
      if (liveRef.current) {
        setIsHappy(false);
      }
    }, 2800);

    setTimeout(() => {
      if (liveRef.current) {
        setShowBubble(false);
      }
    }, 3800);
  }, [doBlink, playWave]);

  return (
    <div
      ref={robotRef}
      className="absolute right-3 sm:right-8 md:right-14 lg:right-20 top-24 sm:top-28 md:top-32 z-20 pointer-events-auto select-none"
      style={{ perspective: 1000 }}
    >
      {/* Draggable & Floating Container */}
      <motion.div
        drag
        dragConstraints={{ left: -180, right: 80, top: -60, bottom: 220 }}
        dragElastic={0.15}
        whileDrag={{ scale: 1.08, cursor: 'grabbing' }}
        whileHover={{ scale: 1.04 }}
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
              initial={{ opacity: 0, y: 12, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 350, damping: 22 }}
              className="absolute -top-14 sm:-top-16 z-50 pointer-events-none whitespace-nowrap"
            >
              <div className="relative bg-white/95 dark:bg-plum/95 backdrop-blur-md px-3.5 py-1.5 rounded-2xl shadow-xl border border-pink-accent/40 text-xs sm:text-sm font-extrabold text-plum dark:text-cream-100 flex items-center gap-1.5">
                <span>{bubbleText}</span>
                {/* Speech tail */}
                <span
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-x-[7px] border-x-transparent border-t-[8px] border-t-white/95 dark:border-t-plum/95"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Click Sparkles */}
        {clickSparks.map((spark) => (
          <motion.div
            key={spark.id}
            initial={{ opacity: 1, scale: 0.5, x: 0, y: 0 }}
            animate={{ opacity: 0, scale: 1.6, x: spark.x, y: spark.y }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="absolute top-1/2 left-1/2 w-2.5 h-2.5 rounded-full pointer-events-none z-40"
            style={{ background: spark.color, boxShadow: `0 0 10px ${spark.color}` }}
          />
        ))}

        {/* Robot Main SVG Visual */}
        <div className="relative w-36 h-48 sm:w-44 sm:h-56 md:w-52 md:h-64 drop-shadow-2xl">
          <svg
            viewBox="0 0 200 270"
            className="w-full h-full overflow-visible"
            aria-label="Interactive AI Robot Companion"
            role="img"
          >
            <defs>
              {/* Body Gradients */}
              <radialGradient id="h-body-grad" cx="40%" cy="30%" r="70%">
                <stop offset="0%" stopColor={C.bodyHi} />
                <stop offset="70%" stopColor={C.bodyMid} />
                <stop offset="100%" stopColor={C.bodyLo} />
              </radialGradient>

              {/* Glowing Pink Eye Gradient */}
              <radialGradient id="h-eye-grad" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor={C.pinkHi} />
                <stop offset="100%" stopColor={C.pink} />
              </radialGradient>

              {/* Antenna Glowing Orange Gradient */}
              <radialGradient id="h-antenna-grad" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor={C.orangeHi} />
                <stop offset="100%" stopColor={C.orange} />
              </radialGradient>

              {/* Thruster Energy Glow */}
              <radialGradient id="h-thruster-grad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={C.cyanGlow} stopOpacity="0.8" />
                <stop offset="60%" stopColor={C.pinkGlow} stopOpacity="0.4" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </radialGradient>

              {/* Glow Filters */}
              <filter id="h-glow-pink" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <filter id="h-glow-orange" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Drop Shadow */}
              <filter id="h-robot-shadow" x="-20%" y="-20%" width="140%" height="150%">
                <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="rgba(59,31,63,0.3)" />
              </filter>
            </defs>

            {/* ── THRUSTER HOVER ENERGY RING ── */}
            <motion.ellipse
              cx="100"
              cy="252"
              rx="42"
              ry="11"
              fill="url(#h-thruster-grad)"
              style={{ scale: thrusterGlow }}
            />
            {/* Soft Ambient Ground Shadow */}
            <ellipse cx="100" cy="256" rx="48" ry="8" fill="rgba(30,10,36,0.35)" />

            {/* ── LEFT ARM (Resting / Balancing) — pivot at (64, 138) ── */}
            <g transform="translate(64, 138)">
              {/* Shoulder socket */}
              <circle cx="0" cy="0" r="9" fill={C.plumMid} stroke={C.joint} strokeWidth="1.2" />
              {/* Upper arm */}
              <rect x="-8" y="0" width="16" height="34" rx="7" fill="url(#h-body-grad)" stroke={C.plum} strokeWidth="1.3" />
              <g transform="translate(0, 34)">
                {/* Elbow joint */}
                <circle cx="0" cy="0" r="7" fill={C.joint} />
                {/* Forearm */}
                <rect x="-7" y="0" width="14" height="26" rx="6" fill="url(#h-body-grad)" stroke={C.plum} strokeWidth="1.2" />
                {/* Hand / cute rounded gripper */}
                <g transform="translate(0, 26)">
                  <circle cx="0" cy="8" r="9" fill="url(#h-body-grad)" stroke={C.plum} strokeWidth="1.2" />
                  <circle cx="-3" cy="6" r="3" fill={C.bodyHi} />
                  <circle cx="3" cy="6" r="3" fill={C.bodyHi} />
                </g>
              </g>
            </g>

            {/* ── LOWER BODY & LEGS ── */}
            <g>
              {/* Cute hover legs */}
              <rect x="74" y="196" width="18" height="36" rx="7" fill="url(#h-body-grad)" stroke={C.plum} strokeWidth="1.2" />
              <rect x="108" y="196" width="18" height="36" rx="7" fill="url(#h-body-grad)" stroke={C.plum} strokeWidth="1.2" />
              {/* Leg shine highlights */}
              <rect x="77" y="200" width="5" height="18" rx="2.5" fill={C.bodyHi} opacity="0.45" />
              <rect x="111" y="200" width="5" height="18" rx="2.5" fill={C.bodyHi} opacity="0.45" />
              {/* Rounded floating feet / hover pods */}
              <ellipse cx="83" cy="235" rx="15" ry="9" fill={C.bodyLo} stroke={C.plum} strokeWidth="1.2" />
              <ellipse cx="117" cy="235" rx="15" ry="9" fill={C.bodyLo} stroke={C.plum} strokeWidth="1.2" />
              {/* Ion emitter dots */}
              <circle cx="83" cy="238" r="3.5" fill={C.cyanGlow} />
              <circle cx="117" cy="238" r="3.5" fill={C.cyanGlow} />
            </g>

            {/* ── TORSO ── */}
            <g filter="url(#h-robot-shadow)">
              <rect x="58" y="128" width="84" height="74" rx="20" fill="url(#h-body-grad)" stroke={C.plum} strokeWidth="1.6" />
              {/* Torso specular shine */}
              <ellipse cx="78" cy="142" rx="16" ry="8" fill={C.bodyHi} opacity="0.4" />

              {/* Chest Screen Display */}
              <rect x="72" y="140" width="56" height="44" rx="12" fill={C.plumDark} stroke={C.plumMid} strokeWidth="1.4" />
              
              {/* Real-time AI Soundwave / Equalizer Bars */}
              <motion.rect
                x="80"
                y="148"
                height="3.5"
                rx="1.75"
                fill={C.pink}
                animate={{ width: [32, 18, 38, 22, 32], opacity: [0.95, 0.45, 1, 0.6, 0.95] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.rect
                x="80"
                y="157"
                height="3.5"
                rx="1.75"
                fill={C.pink}
                animate={{ width: [24, 36, 16, 30, 24], opacity: [0.6, 1, 0.4, 0.85, 0.6] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
              />
              <motion.rect
                x="80"
                y="166"
                height="3.5"
                rx="1.75"
                fill={C.pink}
                animate={{ width: [30, 20, 36, 14, 30], opacity: [0.8, 0.5, 0.95, 0.35, 0.8] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
              />

              {/* Status indicator LEDs */}
              <motion.circle
                cx="110"
                cy="176"
                r="3"
                fill={C.orange}
                filter="url(#h-glow-orange)"
                animate={{ opacity: [1, 0.3, 1], scale: [1, 1.25, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.circle
                cx="118"
                cy="176"
                r="3"
                fill={C.pink}
                filter="url(#h-glow-pink)"
                animate={{ opacity: [1, 0.3, 1], scale: [1, 1.25, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
              />
            </g>

            {/* ── NECK BELLOWS ── */}
            <g>
              <rect x="88" y="112" width="24" height="18" rx="6" fill={C.bodyLo} stroke={C.plum} strokeWidth="1.2" />
              <line x1="92" y1="117" x2="108" y2="117" stroke={C.plum} strokeWidth="1" opacity="0.4" />
              <line x1="92" y1="123" x2="108" y2="123" stroke={C.plum} strokeWidth="1" opacity="0.4" />
            </g>

            {/* ── RIGHT ARM (WAVING INTERACTIVE ARM) — pivot at (136, 138) ── */}
            <g transform="translate(136, 138)">
              <motion.g
                style={{
                  rotate: rShoulder,
                  transformBox: 'fill-box',
                  transformOrigin: 'center top',
                  willChange: 'transform',
                }}
              >
                {/* Upper arm */}
                <rect x="-8" y="0" width="16" height="34" rx="7" fill="url(#h-body-grad)" stroke={C.plum} strokeWidth="1.3" />
                <g transform="translate(0, 34)">
                  {/* Elbow joint */}
                  <circle cx="0" cy="0" r="7" fill={C.joint} />
                  {/* Forearm (waves!) */}
                  <motion.g
                    style={{
                      rotate: rElbow,
                      transformBox: 'fill-box',
                      transformOrigin: 'center top',
                      willChange: 'transform',
                    }}
                  >
                    <rect x="-7" y="0" width="14" height="26" rx="6" fill="url(#h-body-grad)" stroke={C.plum} strokeWidth="1.2" />
                    {/* Waving Hand with cute fingers */}
                    <g transform="translate(0, 26)">
                      <circle cx="0" cy="8" r="9" fill="url(#h-body-grad)" stroke={C.plum} strokeWidth="1.2" />
                      <circle cx="-4" cy="4" r="3.5" fill={C.bodyHi} stroke={C.plum} strokeWidth="0.6" />
                      <circle cx="0" cy="2" r="3.5" fill={C.bodyHi} stroke={C.plum} strokeWidth="0.6" />
                      <circle cx="4" cy="4" r="3.5" fill={C.bodyHi} stroke={C.plum} strokeWidth="0.6" />
                    </g>
                  </motion.g>
                </g>
              </motion.g>
              {/* Shoulder Cap on top */}
              <circle cx="0" cy="0" r="9" fill={C.plumMid} stroke={C.joint} strokeWidth="1.2" />
            </g>

            {/* ── HEAD GROUP (Rotates 3D with Mouse Look Physics) ── neck pivot at (100, 114) */}
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
                {/* Cute Ear Sensors / Headphones */}
                <circle cx="-47" cy="-30" r="10" fill={C.bodyLo} stroke={C.plum} strokeWidth="1.3" />
                <circle cx="47" cy="-30" r="10" fill={C.bodyLo} stroke={C.plum} strokeWidth="1.3" />
                <circle cx="-47" cy="-30" r="5" fill={C.plumMid} />
                <circle cx="47" cy="-30" r="5" fill={C.plumMid} />

                {/* Main Head Box with Curvature */}
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

                {/* Head Specular Highlight */}
                <ellipse cx="-16" cy="-54" rx="16" ry="8" fill={C.bodyHi} opacity="0.45" />

                {/* Cute Pink Blush Cheeks */}
                <circle cx="-25" cy="-18" r="6.5" fill={C.blush} />
                <circle cx="25" cy="-18" r="6.5" fill={C.blush} />

                {/* ── LEFT EYE (at -18, -32) ── */}
                <g transform="translate(-18, -32)">
                  {/* Outer pink aura ring */}
                  <motion.circle
                    r="16"
                    fill={C.pink}
                    opacity="0.12"
                    animate={{ r: [15, 18, 15], opacity: [0.08, 0.22, 0.08] }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                  />

                  <motion.g style={{ scaleY: eyeScaleY, transformBox: 'fill-box', transformOrigin: 'center center' }}>
                    {/* Normal Open Eye */}
                    <motion.g animate={{ opacity: isHappy ? 0 : 1 }} transition={{ duration: 0.15 }}>
                      {/* Eyeball socket */}
                      <circle r="13" fill="white" stroke={C.plum} strokeWidth="1" />
                      {/* Glowing Pink Iris tracking mouse */}
                      <motion.circle
                        r="9.5"
                        fill="url(#h-eye-grad)"
                        filter="url(#h-glow-pink)"
                        style={{ x: pupilX, y: pupilY }}
                      />
                      {/* Deep Pupil */}
                      <motion.circle r="4.5" fill={C.plumDark} style={{ x: pupilX, y: pupilY }} />
                      {/* Glossy specular catches */}
                      <circle cx="-4" cy="-5" r="2.8" fill="white" />
                      <circle cx="3" cy="-2" r="1.4" fill="white" opacity="0.75" />
                    </motion.g>

                    {/* Happy Expression Eye (^ shape) */}
                    <motion.g animate={{ opacity: isHappy ? 1 : 0 }} transition={{ duration: 0.15 }}>
                      <path d="M -12 2 Q 0 -17 12 2" stroke={C.pink} strokeWidth="5.5" fill="none" strokeLinecap="round" />
                      <path d="M -12 2 Q 0 -17 12 2" stroke={C.pinkHi} strokeWidth="2.2" fill="none" strokeLinecap="round" />
                    </motion.g>
                  </motion.g>
                </g>

                {/* ── RIGHT EYE (at 18, -32) ── */}
                <g transform="translate(18, -32)">
                  <motion.circle
                    r="16"
                    fill={C.pink}
                    opacity="0.12"
                    animate={{ r: [15, 18, 15], opacity: [0.08, 0.22, 0.08] }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                  />

                  <motion.g style={{ scaleY: eyeScaleY, transformBox: 'fill-box', transformOrigin: 'center center' }}>
                    <motion.g animate={{ opacity: isHappy ? 0 : 1 }} transition={{ duration: 0.15 }}>
                      <circle r="13" fill="white" stroke={C.plum} strokeWidth="1" />
                      <motion.circle
                        r="9.5"
                        fill="url(#h-eye-grad)"
                        filter="url(#h-glow-pink)"
                        style={{ x: pupilX, y: pupilY }}
                      />
                      <motion.circle r="4.5" fill={C.plumDark} style={{ x: pupilX, y: pupilY }} />
                      <circle cx="-4" cy="-5" r="2.8" fill="white" />
                      <circle cx="3" cy="-2" r="1.4" fill="white" opacity="0.75" />
                    </motion.g>

                    <motion.g animate={{ opacity: isHappy ? 1 : 0 }} transition={{ duration: 0.15 }}>
                      <path d="M -12 2 Q 0 -17 12 2" stroke={C.pink} strokeWidth="5.5" fill="none" strokeLinecap="round" />
                      <path d="M -12 2 Q 0 -17 12 2" stroke={C.pinkHi} strokeWidth="2.2" fill="none" strokeLinecap="round" />
                    </motion.g>
                  </motion.g>
                </g>

                {/* ── CUTE SMILE MOUTH ── */}
                <motion.path
                  animate={{ opacity: isHappy ? 0 : 1 }}
                  transition={{ duration: 0.18 }}
                  d="M -12 -10 Q 0 -4 12 -10"
                  stroke={C.plum}
                  strokeWidth="2.8"
                  fill="none"
                  strokeLinecap="round"
                />
                {/* Big Happy Smile when clicked */}
                <motion.path
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHappy ? 1 : 0 }}
                  transition={{ duration: 0.18 }}
                  d="M -16 -10 Q 0 3 16 -10"
                  stroke={C.plum}
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />

                {/* ── ANTENNA WITH PHYSICS SWAY ── */}
                <motion.g style={{ rotate: antennaSway, transformBox: 'fill-box', transformOrigin: 'center bottom' }}>
                  <line x1="0" y1="-64" x2="0" y2="-92" stroke={C.plum} strokeWidth="3" strokeLinecap="round" />
                  {/* Glowing orange beacon */}
                  <motion.circle
                    cx="0"
                    cy="-100"
                    r="15"
                    fill={C.orangeHi}
                    opacity="0.25"
                    filter="url(#h-glow-orange)"
                    style={{ scale: antennaPulse }}
                  />
                  <motion.circle
                    cx="0"
                    cy="-100"
                    r="9.5"
                    fill="url(#h-antenna-grad)"
                    filter="url(#h-glow-orange)"
                    style={{ scale: antennaPulse }}
                  />
                  {/* Shiny beacon catch */}
                  <circle cx="-3.5" cy="-103" r="3.2" fill="white" opacity="0.8" />
                </motion.g>
              </motion.g>
            </g>
          </svg>
        </div>

        {/* Small "Drag me / Tap me" Pill on Hover */}
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

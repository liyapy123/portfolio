// src/utils/useMouseLook.js
// Tracks mouse / touch / orientation → returns spring-smoothed [-1,1] motion values.
//
// TUNE: SPRING (stiffness ↑ = snappier) · IDLE_MS (ms before returning to center)

import { useEffect, useRef, useCallback } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

const SPRING  = { stiffness: 120, damping: 14, mass: 0.8 };
const IDLE_MS = 3000;

export function useMouseLook(robotRef) {
  const rawX   = useMotionValue(0);
  const rawY   = useMotionValue(0);
  const springX = useSpring(rawX, SPRING);
  const springY = useSpring(rawY, SPRING);

  const raf      = useRef(null);
  const idleT    = useRef(null);
  const autoLoop = useRef(null);

  const goCenter = useCallback(() => { rawX.set(0); rawY.set(0); }, [rawX, rawY]);

  const resetIdle = useCallback(() => {
    clearTimeout(idleT.current);
    idleT.current = setTimeout(goCenter, IDLE_MS);
  }, [goCenter]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (isTouch) {
      // Auto look-around loop on touch devices
      const dirs = [-0.55, -0.3, 0, 0.3, 0.55, 0.3, 0, -0.3];
      let i = 0;
      autoLoop.current = setInterval(() => { rawX.set(dirs[i++ % dirs.length]); rawY.set(0); }, 1800);

      const onOrient = (e) => {
        rawX.set(Math.max(-1, Math.min(1, (e.gamma || 0) / 25)));
        rawY.set(Math.max(-1, Math.min(1, ((e.beta || 0) - 20) / 25)));
        clearInterval(autoLoop.current);
        autoLoop.current = null;
      };
      window.addEventListener('deviceorientation', onOrient);
      return () => { clearInterval(autoLoop.current); window.removeEventListener('deviceorientation', onOrient); };
    }

    // Desktop mouse tracking with rAF throttle
    const onMove = (e) => {
      if (!robotRef.current) return;
      resetIdle();
      if (raf.current) return;
      raf.current = requestAnimationFrame(() => {
        raf.current = null;
        if (!robotRef.current) return;
        const r  = robotRef.current.getBoundingClientRect();
        rawX.set(Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width  / 2)) / (window.innerWidth  * 0.45))));
        rawY.set(Math.max(-1, Math.min(1, (e.clientY - (r.top  + r.height / 2)) / (window.innerHeight * 0.45))));
      });
    };

    const onLeave = () => { cancelAnimationFrame(raf.current); raf.current = null; goCenter(); };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    resetIdle();

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf.current);
      clearTimeout(idleT.current);
    };
  }, [robotRef, rawX, rawY, goCenter, resetIdle]);

  return { springX, springY };
}


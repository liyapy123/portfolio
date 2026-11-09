import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-accent via-orange-accent to-pink-accent origin-left z-50 shadow-[0_0_12px_rgba(255,79,154,0.6)]"
      style={{ scaleX }}
    />
  );
};


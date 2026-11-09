import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import confetti from 'canvas-confetti';
import { personalData } from '../data';
import { Starburst } from './Decorations';
import { GraduationCap, MapPin, Sparkles, Heart, School, Trophy, Music, Award } from 'lucide-react';

/**
 * Animated counter that counts up smoothly when scrolled into view
 */
const Counter = ({ target, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1600;
    const stepTime = Math.abs(Math.floor(duration / target));
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      }
    }, Math.max(stepTime, 20));

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref} className="font-headline font-extrabold text-4xl sm:text-5xl text-plum dark:text-cream-100">
      {count}{suffix}
    </span>
  );
};

/**
 * Special Animated Oppana & Dance Feature Card
 * Celebrating Liya's 1st Prize in Oppana with interactive rhythm & confetti!
 */
const OppanaDanceCard = () => {
  const [isDancing, setIsDancing] = useState(false);
  const [rhythmHits, setRhythmHits] = useState(0);

  const handleRhythmTap = () => {
    setIsDancing(true);
    setRhythmHits(prev => prev + 1);

    try {
      confetti({
        particleCount: 65,
        spread: 80,
        origin: { y: 0.75 },
        colors: ['#FF4F9A', '#FF8A3D', '#FFD700', '#3B1F3F', '#FFFFFF']
      });
    } catch (e) {
      console.error(e);
    }

    setTimeout(() => setIsDancing(false), 900);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="relative overflow-hidden rounded-[28px] p-6 sm:p-7 bg-gradient-to-br from-pink-accent/15 via-orange-accent/15 to-plum/10 dark:from-pink-accent/25 dark:via-orange-accent/20 dark:to-plum-dark border-2 border-pink-accent/30 shadow-sticker"
    >
      {/* Floating animated musical notes */}
      <motion.div
        animate={{ y: [-4, -14, -4], rotate: [-6, 6, -6] }}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        className="absolute top-3 right-4 text-2xl select-none pointer-events-none"
      >
        🎶
      </motion.div>
      <motion.div
        animate={{ y: [6, -8, 6], rotate: [8, -8, 8] }}
        transition={{ repeat: Infinity, duration: 3.8, ease: 'easeInOut' }}
        className="absolute bottom-4 right-12 text-xl select-none pointer-events-none opacity-80"
      >
        💃
      </motion.div>

      {/* Header Badge */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className="px-3.5 py-1 rounded-full bg-pink-accent text-white font-extrabold text-xs uppercase tracking-wider shadow-sm flex items-center gap-1.5">
          <Trophy className="w-3.5 h-3.5" />
          <span>1st Prize in Oppana (ഒപ്പന)</span>
        </span>
        <span className="px-3 py-1 rounded-full bg-orange-accent/20 text-orange-accent dark:text-orange-sun text-xs font-bold">
          Youth Kalolsavam Champion
        </span>
      </div>

      {/* Main Title & Description */}
      <h3 className="font-headline text-2xl sm:text-3xl font-extrabold text-plum dark:text-cream-100 uppercase tracking-tight leading-snug">
        Dance, Rhythm & Team Harmony
      </h3>
      
      <p className="mt-2 text-xs sm:text-sm text-plum/80 dark:text-cream-100/80 leading-relaxed font-normal">
        Secured <strong className="text-pink-accent font-bold">First Place</strong> in the traditional Kerala Oppana dance competition with our school team at <strong>NSS HSS Mullurkara</strong>. Oppana taught me the power of synchronized rhythm, stage confidence, and collaborative flow — the very same harmony I pour into every AI and code project.
      </p>

      {/* Interactive Oppana Clapping Rhythm Visualizer */}
      <div className="mt-5 pt-4 border-t border-plum/10 dark:border-cream-100/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        
        {/* Animated Clapping Hands & Rhythmic Beat Bars */}
        <div className="flex items-center gap-3">
          <motion.div
            animate={isDancing ? { scale: [1, 1.35, 1], rotate: [-15, 15, 0] } : { scale: [1, 1.15, 1] }}
            transition={{ repeat: isDancing ? 2 : Infinity, duration: isDancing ? 0.3 : 1.2, ease: "easeInOut" }}
            className="w-12 h-12 rounded-2xl bg-white dark:bg-plum shadow-md flex items-center justify-center text-2xl select-none"
          >
            👏
          </motion.div>

          <div>
            <div className="flex items-center gap-1.5 h-5 mb-1">
              {[12, 24, 18, 30, 14, 26, 20].map((h, i) => (
                <motion.span
                  key={i}
                  animate={{ height: isDancing ? ['4px', `${h}px`, '6px'] : ['4px', `${h * 0.7}px`, '4px'] }}
                  transition={{ repeat: Infinity, duration: 0.6 + i * 0.1, ease: 'easeInOut' }}
                  className="w-1 bg-pink-accent rounded-full inline-block"
                  style={{ height: `${h * 0.5}px` }}
                />
              ))}
            </div>
            <span className="text-[11px] font-bold text-plum/70 dark:text-cream-100/70">
              Synchronized Oppana Claps: <strong className="text-pink-accent">{rhythmHits}</strong>
            </span>
          </div>
        </div>

        {/* Interactive Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleRhythmTap}
          className="px-4 py-2 rounded-full bg-plum dark:bg-cream-100 text-cream-100 dark:text-plum hover:bg-pink-accent dark:hover:bg-pink-accent dark:hover:text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all cursor-pointer"
        >
          <span>👏 Tap the Rhythm</span>
          <Sparkles className="w-3.5 h-3.5 text-orange-accent" />
        </motion.button>

      </div>
    </motion.div>
  );
};

export const About = () => {
  const { about, college, location } = personalData;

  return (
    <section id="about" className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-cream-50 dark:bg-plum/40 transition-colors duration-300">
      
      {/* Decorative background starburst */}
      <div className="absolute top-12 left-6 opacity-30 dark:opacity-15 pointer-events-none">
        <Starburst className="w-16 h-16 text-orange-accent" />
      </div>

      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 mb-3"
          >
            <span className="w-3 h-3 rounded-full bg-pink-accent"></span>
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-pink-accent">
              {about.title}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-headline text-4xl sm:text-6xl md:text-7xl font-extrabold text-plum dark:text-cream-100 uppercase tracking-tight max-w-3xl leading-[0.95]"
          >
            {about.headline}
          </motion.h2>
        </div>

        {/* 2-Column Content: Bio Text + Interactive Sticker Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Bio Story, Oppana Card & Education Grid (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-plum/85 dark:text-cream-100/85 text-base sm:text-lg leading-relaxed font-normal"
          >
            <p className="font-semibold text-lg sm:text-xl text-plum dark:text-cream-100 leading-snug">
              {about.bio1}
            </p>
            <p>{about.bio2}</p>
            <p>{about.bio3}</p>

            {/* Special Animated Oppana & Dance Feature Card */}
            <div className="pt-2">
              <OppanaDanceCard />
            </div>

            {/* Dual Education Cards: College + Schooling */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* College Card */}
              <div className="p-5 rounded-[24px] bg-white dark:bg-plum/80 border border-plum/10 dark:border-cream-100/10 shadow-sticker flex flex-col justify-between">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-2xl bg-orange-accent/15 text-orange-accent flex-shrink-0">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-extrabold tracking-wider text-pink-accent block">
                      Current Engineering Degree
                    </span>
                    <h4 className="font-bold text-sm sm:text-base text-plum dark:text-cream-100 leading-tight mt-0.5">
                      {college}
                    </h4>
                    <p className="text-xs text-plum/70 dark:text-cream-100/70 font-medium mt-1">
                      B.Tech in CSE (Artificial Intelligence)
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-plum/5 dark:border-cream-100/5 flex items-center justify-between text-xs text-plum/60 dark:text-cream-100/60 font-semibold">
                  <span>First Year (Batch 2024–28)</span>
                  <span className="flex items-center gap-1 text-pink-accent">
                    <MapPin className="w-3 h-3" /> Thrissur
                  </span>
                </div>
              </div>

              {/* School Card: NSS HSS Mullurkara */}
              <div className="p-5 rounded-[24px] bg-white dark:bg-plum/80 border border-plum/10 dark:border-cream-100/10 shadow-sticker flex flex-col justify-between">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-2xl bg-pink-accent/15 text-pink-accent flex-shrink-0">
                    <School className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-extrabold tracking-wider text-orange-accent block">
                      Higher Secondary (+1 & +2)
                    </span>
                    <h4 className="font-bold text-sm sm:text-base text-plum dark:text-cream-100 leading-tight mt-0.5">
                      NSS HSS Mullurkara
                    </h4>
                    <p className="text-xs text-plum/70 dark:text-cream-100/70 font-medium mt-1">
                      Plus One & Plus Two (Computer Science)
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-plum/5 dark:border-cream-100/5 flex items-center justify-between text-xs text-plum/60 dark:text-cream-100/60 font-semibold">
                  <span>Distinction Graduate</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">1st in Oppana 🏆</span>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Right Column: Fun Sticker Cards & Badges (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="relative">
              <div className="text-xs font-extrabold uppercase tracking-widest text-plum/50 dark:text-cream-100/50 mb-3">
                Personality & Highlights
              </div>

              {/* Grid of fun stickers */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {about.stickers.map((sticker, idx) => (
                  <motion.div
                    key={sticker.label}
                    whileHover={{ scale: 1.04, rotate: (idx % 2 === 0 ? 1.5 : -1.5) }}
                    className="p-4 rounded-[22px] bg-white dark:bg-plum/80 border border-plum/10 dark:border-cream-100/10 shadow-sm hover:shadow-sticker transition-all duration-200 cursor-default"
                  >
                    <div className="text-2xl mb-1.5">{sticker.icon}</div>
                    <div className="text-[11px] uppercase font-bold tracking-wider text-pink-accent mb-0.5">
                      {sticker.label}
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-plum dark:text-cream-100 leading-snug">
                      {sticker.value}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Handwritten small note on side */}
              <div className="mt-6 text-right">
                <span className="font-script text-2xl text-orange-accent font-bold inline-block transform -rotate-3">
                  Rhythm in dance, logic in code ✨
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Animated Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 md:mt-20 pt-10 border-t border-plum/10 dark:border-cream-100/10"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {about.stats.map((stat) => (
              <div key={stat.label} className="p-4">
                <Counter target={stat.value} suffix={stat.suffix} />
                <p className="mt-1 text-xs sm:text-sm font-bold uppercase tracking-wider text-plum/60 dark:text-cream-100/60">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, ArrowDown, Sparkles } from 'lucide-react';
import { personalData } from '../data';
import { Starburst, RotatingBadge, HandwrittenNote, RotatedSideText } from './Decorations';
import { HeroRobotBackground } from './HeroRobotBackground';

export const Hero = () => {
  const { hero } = personalData;
  const { scrollY } = useScroll();

  // Multi-speed parallax transforms on scroll
  const starburstY = useTransform(scrollY, [0, 800], [0, 120]);
  const starburstRotate = useTransform(scrollY, [0, 800], [0, 90]);
  const cardsParallaxY = useTransform(scrollY, [0, 800], [0, -40]);
  const floatingBadgeRotate = useTransform(scrollY, [0, 1000], [0, 360]);

  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Staggered text animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section className="relative min-h-screen pt-28 md:pt-36 pb-20 md:pb-32 px-4 sm:px-6 lg:px-8 flex flex-col justify-between overflow-hidden bg-plum-darkBg transition-colors duration-300">
      
      {/* Background Wallpaper Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      >
        {/* Soft overlay gradient to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-plum-darkBg/70" />
      </div>

      {/* Rotated Left Side Text */}
      <RotatedSideText text={hero.rotatedText} />

      {/* Interactive AI Robot Floating in Hero Background */}
      <HeroRobotBackground />

      {/* Decorative Starburst Sticker (Matches reference screenshot top right) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute top-24 md:top-28 right-4 sm:right-10 lg:right-24 z-10"
      >
        <Starburst className="w-12 h-12 md:w-20 md:h-20 text-orange-accent hover:scale-110 transition-transform duration-300 cursor-pointer" />
      </motion.div>

      {/* Floating Orange Starburst on Left */}
      <motion.div 
        animate={{ y: [0, -8, 0], rotate: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
        className="hidden md:block absolute top-64 left-12 lg:left-24 z-0 opacity-70 pointer-events-none"
      >
        <div className="w-8 h-8 rounded-full bg-pink-accent/20 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-pink-accent" />
        </div>
      </motion.div>

      {/* Hero Main Content */}
      <div className="max-w-6xl mx-auto w-full text-center z-10 flex flex-col items-center">
        
        {/* College Tag Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-4 sm:mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-cream-100 text-xs sm:text-sm font-semibold tracking-wide"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>{hero.badge}</span>
        </motion.div>

        {/* Massive Condensed Headline matching reference screenshot */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-5 sm:mb-6"
        >
          <motion.h1
            variants={itemVariants}
            className="font-headline text-5xl sm:text-7xl md:text-8xl lg:text-[112px] font-extrabold text-cream-100 tracking-tight leading-[0.92] uppercase drop-shadow-md"
          >
            {hero.headlinePart1}{' '}
            <span className="text-pink-accent inline-block underline decoration-pink-accent/40 decoration-wavy decoration-2">
              {hero.headlineAccent}
            </span>
          </motion.h1>
        </motion.div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="max-w-2xl text-base sm:text-lg md:text-xl text-cream-100/90 font-medium leading-relaxed mb-8 md:mb-10 px-2 drop-shadow-sm"
        >
          {hero.subtext}
        </motion.p>

        {/* CTAs: Solid Plum Button & Text Link Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="flex flex-wrap items-center justify-center gap-5 sm:gap-8 mb-14 md:mb-20"
        >
          {/* Solid Pill Button */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo('#contact')}
            className="group px-7 sm:px-8 py-3.5 sm:py-4 bg-cream-100 text-plum rounded-full font-bold text-sm sm:text-base flex items-center gap-2.5 shadow-xl hover:shadow-2xl transition-all duration-300 hover:bg-pink-accent hover:text-white"
          >
            <span>{hero.primaryCta}</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.button>

          {/* Text link with downward arrow */}
          <button
            onClick={() => scrollTo('#about')}
            className="group font-bold text-sm sm:text-base text-cream-100 flex items-center gap-2 hover:text-pink-accent transition-colors py-2"
          >
            <span>{hero.secondaryCta}</span>
            <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1 text-orange-accent" />
          </button>
        </motion.div>
      </div>

      {/* Row of 4 Tilted Polaroid-style Cards (Exact Match to Reference Layout) */}
      <div className="relative max-w-7xl mx-auto w-full px-2 sm:px-4 mt-2 sm:mt-6">
        
        {/* Handwritten note floating above Liya's photo */}
        <div className="absolute -top-14 md:-top-16 left-[68%] md:left-[36%] -translate-x-1/2 z-20 pointer-events-none">
          <HandwrittenNote text={hero.handwrittenNote} />
        </div>

        {/* Rotating Circular Badge floating on lower right of cards */}
        <div className="hidden lg:block absolute -bottom-8 md:-bottom-12 right-2 sm:right-6 z-20">
          <RotatingBadge text="LEARNING • BUILDING • REPEATING •" />
        </div>

        {/* Overlapping Orange Circle Sticker from Reference Screenshot */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          whileHover={{ scale: 1.08, rotate: 4 }}
          className="absolute -bottom-6 sm:-bottom-8 left-1/2 md:left-[68%] -translate-x-1/2 z-20 w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-orange-accent text-white p-3 flex flex-col items-center justify-center text-center shadow-lg pointer-events-auto select-none border-2 border-white/20"
        >
          <span className="text-[11px] sm:text-xs font-semibold opacity-90 leading-tight">Less scrolling.</span>
          <span className="text-xs sm:text-sm font-black uppercase tracking-tight leading-tight mt-0.5">More building.</span>
          <span className="text-base sm:text-lg mt-0.5">✨</span>
        </motion.div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 lg:gap-6 pt-4">
          {hero.cards.map((card, idx) => (
            <motion.div
              key={card.id}
              drag
              dragConstraints={{ left: -40, right: 40, top: -40, bottom: 40 }}
              dragElastic={0.2}
              dragSnapToOrigin={true}
              whileDrag={{ scale: 1.08, zIndex: 40, cursor: 'grabbing' }}
              initial={{ opacity: 0, y: 50, rotate: 0 }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                rotate: card.rotation 
              }}
              whileHover={{ 
                scale: 1.04, 
                rotate: 0, 
                zIndex: 30,
                transition: { duration: 0.25 }
              }}
              transition={{ 
                duration: 0.8, 
                delay: 0.2 + idx * 0.12, 
                ease: [0.22, 1, 0.36, 1] 
              }}
              className="group relative bg-white dark:bg-plum/90 p-2.5 sm:p-3.5 rounded-[22px] sm:rounded-28 shadow-polaroid hover:shadow-polaroid-hover transition-shadow duration-300 border border-plum/10 dark:border-cream-100/10 cursor-grab active:cursor-grabbing overflow-hidden"
            >
              {/* Image Container with rounded inner corners */}
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[16px] sm:rounded-[20px] bg-plum/5 dark:bg-cream-100/5">
                <img
                  src={card.image}
                  alt={card.alt}
                  className={`w-full h-full ${
                    card.isProfile ? 'object-cover object-top' : 'object-cover object-center'
                  } group-hover:scale-105 transition-transform duration-500`}
                  loading="eager"
                />
                
                {/* Special highlight for profile card */}
                {card.isProfile && (
                  <div className="absolute top-2.5 left-2.5 bg-pink-accent text-white text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                    Developer ✨
                  </div>
                )}
              </div>

              {/* Bottom Caption matching polaroid aesthetics */}
              <div className="pt-2.5 sm:pt-3 px-1 text-left">
                <p className="font-bold text-xs sm:text-sm text-plum dark:text-cream-100 truncate">
                  {card.title}
                </p>
                <p className="text-[11px] sm:text-xs text-plum/60 dark:text-cream-100/60 truncate font-medium">
                  {card.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

    </section>
  );
};


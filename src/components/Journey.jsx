import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { personalData } from '../data';
import { Starburst } from './Decorations';
import { Compass, Sparkles } from 'lucide-react';

export const Journey = () => {
  const { journey } = personalData;
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 70%', 'end 70%']
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="journey" ref={containerRef} className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-cream-100 dark:bg-plum-darkBg overflow-hidden transition-colors duration-300">
      
      {/* Background Starburst */}
      <div className="absolute top-20 left-10 opacity-30 dark:opacity-15 pointer-events-none">
        <Starburst className="w-16 h-16 text-orange-accent" />
      </div>

      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-3"
          >
            <Compass className="w-4 h-4 text-orange-accent" />
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-orange-accent">
              Academic & Tech Odyssey
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-headline text-4xl sm:text-6xl md:text-7xl font-extrabold text-plum dark:text-cream-100 uppercase tracking-tight leading-[0.95]"
          >
            THE JOURNEY <span className="text-pink-accent">SO FAR</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-xs sm:text-sm text-plum/70 dark:text-cream-100/70"
          >
            From the first line of code in high school to studying Artificial Intelligence at Thejus Engineering College.
          </motion.p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          
          {/* Animated Center Vertical Line on Desktop / Left on Mobile */}
          <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-1 -translate-x-1/2 bg-plum/10 dark:bg-cream-100/10 rounded-full" />
          
          {/* Active Spring Progress Line */}
          <motion.div
            style={{ scaleY }}
            className="absolute left-4 md:left-1/2 top-4 bottom-4 w-1 -translate-x-1/2 bg-gradient-to-b from-orange-accent via-pink-accent to-pink-accent origin-top rounded-full shadow-[0_0_10px_rgba(255,79,154,0.5)]"
          />

          {/* Timeline Nodes */}
          <div className="space-y-12 md:space-y-20">
            {journey.map((item, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={item.milestone}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Central Indicator Node */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-cream-100 dark:bg-plum-darkBg border-4 border-pink-accent flex items-center justify-center z-10 shadow-md">
                    <span className="w-2 h-2 rounded-full bg-orange-accent"></span>
                  </div>

                  {/* Empty Spacer Column for Desktop */}
                  <div className="hidden md:block w-1/2" />

                  {/* Card Content Column */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -40 : 40, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className={`pl-12 md:pl-0 w-full md:w-1/2 ${
                      isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'
                    }`}
                  >
                    <div className="p-6 rounded-[26px] bg-white dark:bg-plum/70 border border-plum/10 dark:border-cream-100/10 shadow-sticker hover:shadow-sticker-hover transition-all duration-300 group">
                      
                      {/* Period & Tag */}
                      <div className={`flex flex-wrap items-center gap-2 mb-2 ${
                        isEven ? 'md:justify-end' : 'md:justify-start'
                      }`}>
                        <span className="px-3 py-1 rounded-full bg-pink-accent/15 text-pink-accent text-xs font-extrabold uppercase tracking-wider">
                          {item.period}
                        </span>
                        <span className="text-xs font-bold text-orange-accent">
                          • {item.tag}
                        </span>
                      </div>

                      {/* Milestone Title */}
                      <h3 className="font-headline text-2xl sm:text-3xl font-extrabold text-plum dark:text-cream-100 uppercase tracking-tight mt-1 leading-snug">
                        {item.milestone}
                      </h3>

                      {/* Institution */}
                      <p className="text-xs sm:text-sm font-semibold text-plum/60 dark:text-cream-100/60 mb-3">
                        {item.institution}
                      </p>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-plum/80 dark:text-cream-100/80 leading-relaxed font-normal">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};


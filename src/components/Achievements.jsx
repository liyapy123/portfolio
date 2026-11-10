import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { personalData } from '../data';
import { Award, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Starburst } from './Decorations';

export const Achievements = () => {
  const { achievements } = personalData;
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="achievements" className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-cream-50 dark:bg-plum/40 overflow-hidden transition-colors duration-300">
      
      {/* Background Starburst */}
      <div className="absolute top-12 right-12 opacity-25 dark:opacity-10 pointer-events-none">
        <Starburst className="w-16 h-16 text-orange-accent" />
      </div>

      <div className="max-w-6xl mx-auto">
        
        {/* Header with Navigation Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 mb-3"
            >
              <Award className="w-4 h-4 text-pink-accent" />
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-pink-accent">
                Milestones & Badges
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-headline text-4xl sm:text-6xl md:text-7xl font-extrabold text-plum dark:text-cream-100 uppercase tracking-tight leading-[0.95]"
            >
              HONORS & <span className="text-pink-accent">CERTIFICATIONS</span>
            </motion.h2>
          </div>

          {/* Left/Right Scroll Arrows */}
          <div className="flex items-center gap-2.5 self-end sm:self-auto">
            <button
              onClick={() => scroll('left')}
              aria-label="Scroll left"
              className="p-3 rounded-full bg-white dark:bg-plum/80 border border-plum/10 dark:border-cream-100/15 text-plum dark:text-cream-100 hover:bg-pink-accent hover:text-white transition-all shadow-sm active:scale-90"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Scroll right"
              className="p-3 rounded-full bg-white dark:bg-plum/80 border border-plum/10 dark:border-cream-100/15 text-plum dark:text-cream-100 hover:bg-pink-accent hover:text-white transition-all shadow-sm active:scale-90"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Scrolling Card Track */}
        <div
          ref={scrollRef}
          className="flex gap-5 sm:gap-6 overflow-x-auto no-scrollbar pb-6 pt-2 snap-x snap-mandatory"
        >
          {achievements.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="snap-start flex-shrink-0 w-[290px] sm:w-[340px] p-6 rounded-[28px] bg-white dark:bg-plum/70 border border-plum/10 dark:border-cream-100/10 shadow-sticker hover:shadow-sticker-hover transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-orange-accent/15 text-orange-accent text-xs font-bold uppercase tracking-wider">
                    {item.badge}
                  </span>
                  <span className="text-xs font-bold text-plum/50 dark:text-cream-100/50">
                    {item.date}
                  </span>
                </div>

                <h3 className="font-headline text-2xl font-extrabold text-plum dark:text-cream-100 uppercase tracking-tight leading-snug mb-2">
                  {item.title}
                </h3>

                <p className="text-xs font-semibold text-pink-accent mb-3">
                  Issued by: {item.issuer}
                </p>

                <p className="text-xs text-plum/75 dark:text-cream-100/75 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-plum/5 dark:border-cream-100/5 flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Verified Credential</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};


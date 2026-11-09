import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalData } from '../data';
import { 
  Code2, 
  Binary, 
  FileCode, 
  Coffee, 
  Cpu, 
  Table2, 
  Eye, 
  Sparkles, 
  Layers, 
  Palette, 
  Globe, 
  PenTool, 
  GitBranch, 
  Terminal, 
  TerminalSquare, 
  Zap, 
  BookOpen
} from 'lucide-react';

// Icon mapping helper
const iconMap = {
  Code2,
  Binary,
  FileCode,
  Coffee,
  Cpu,
  Table2,
  Eye,
  Sparkles,
  Layers,
  Palette,
  Globe,
  PenTool,
  GitBranch,
  Terminal,
  TerminalSquare,
  Zap
};

export const Skills = () => {
  const { skills } = personalData;
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section id="skills" className="relative py-20 md:py-32 bg-cream-100 dark:bg-plum-darkBg overflow-hidden transition-colors duration-300">
      
      {/* 1. Infinite Marquee Strip Across Section */}
      <div className="relative w-full py-4 bg-plum dark:bg-cream-100 text-cream-100 dark:text-plum overflow-hidden -rotate-1 shadow-md mb-16 md:mb-24 select-none">
        <div className="animate-marquee-infinite flex gap-8 items-center text-sm sm:text-base font-extrabold uppercase tracking-wider">
          {skills.marquee.concat(skills.marquee).map((item, idx) => (
            <div key={idx} className="flex items-center gap-6 whitespace-nowrap">
              <span>{item}</span>
              <span className="text-pink-accent text-lg">✦</span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-3"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-orange-accent"></span>
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-orange-accent">
              {skills.title}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-headline text-4xl sm:text-6xl md:text-7xl font-extrabold text-plum dark:text-cream-100 uppercase tracking-tight leading-[0.95]"
          >
            SKILLS & <span className="text-pink-accent">SUPERPOWERS</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-sm sm:text-base text-plum/70 dark:text-cream-100/70"
          >
            {skills.subtitle}
          </motion.p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
          {skills.categories.map((category, idx) => (
            <button
              key={category.name}
              onClick={() => setActiveCategory(idx)}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                activeCategory === idx
                  ? 'bg-plum dark:bg-cream-100 text-cream-100 dark:text-plum shadow-md'
                  : 'bg-white dark:bg-plum/60 text-plum/70 dark:text-cream-100/70 hover:bg-plum/10 dark:hover:bg-cream-100/10'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16"
          >
            {skills.categories[activeCategory].items.map((skill, index) => {
              const IconComponent = iconMap[skill.icon] || Code2;
              return (
                <motion.div
                  key={skill.name}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="p-5 sm:p-6 rounded-[24px] bg-white dark:bg-plum/70 border border-plum/10 dark:border-cream-100/10 shadow-sticker hover:shadow-sticker-hover transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-orange-accent/15 dark:bg-orange-accent/20 text-orange-accent flex items-center justify-center mb-4">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    
                    <h3 className="font-bold text-base sm:text-lg text-plum dark:text-cream-100 mb-1">
                      {skill.name}
                    </h3>
                    
                    <p className="text-xs text-plum/70 dark:text-cream-100/70 leading-relaxed">
                      {skill.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-plum/5 dark:border-cream-100/5 flex items-center justify-between">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-pink-accent">
                      {skill.level}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-accent"></span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* "Currently Learning" Spotlight Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-6 sm:p-8 rounded-[28px] bg-gradient-to-br from-plum dark:from-plum-dark to-plum-deep text-cream-100 shadow-xl border border-pink-accent/20 relative overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-accent/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-md">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-accent/20 text-pink-accent text-xs font-bold uppercase tracking-wider mb-2">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Currently Leveling Up</span>
              </div>
              <h3 className="font-headline text-2xl sm:text-3xl font-extrabold text-cream-100 uppercase tracking-tight">
                {skills.currentlyLearning.headline}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full md:w-auto">
              {skills.currentlyLearning.topics.map((topic, i) => (
                <div 
                  key={i}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
                >
                  <div className="text-xs font-bold text-orange-accent mb-1">
                    0{i + 1}. {topic.title}
                  </div>
                  <div className="text-xs text-cream-100/70 leading-relaxed">
                    {topic.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};


import React, { useState, useEffect } from 'react';
import { ArrowUp, Heart, Sparkles } from 'lucide-react';

export const Footer = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      // Kerala / IST Time
      const now = new Date();
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      setTime(new Intl.DateTimeFormat('en-IN', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-plum/10 dark:border-cream-100/10 bg-cream-50 dark:bg-plum-darkBg transition-colors duration-300">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        
        {/* Left: Branding & College */}
        <div className="space-y-1">
          <div className="font-headline text-2xl font-extrabold text-plum dark:text-cream-100 uppercase tracking-tight flex items-center justify-center md:justify-start gap-1">
            <span>Liya Py</span>
            <span className="text-pink-accent">.</span>
          </div>
          <p className="text-xs text-plum/60 dark:text-cream-100/60 font-medium">
            First-Year B.Tech CSE (AI) • Thejus Engineering College, Thrissur
          </p>
        </div>

        {/* Center: Live Kerala Time */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-plum/60 border border-plum/10 dark:border-cream-100/10 text-xs font-semibold text-plum dark:text-cream-100 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Thrissur, Kerala: {time || 'IST'}</span>
        </div>

        {/* Right: Made with Love & Back to Top */}
        <div className="flex items-center gap-4">
          <p className="text-xs text-plum/70 dark:text-cream-100/70 flex items-center gap-1 font-semibold">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-pink-accent fill-pink-accent inline animate-pulse" />
            <span>by Liya Py © {new Date().getFullYear()}</span>
          </p>

          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="p-2.5 rounded-full bg-plum dark:bg-cream-100 text-cream-100 dark:text-plum hover:bg-pink-accent dark:hover:bg-pink-accent dark:hover:text-white transition-all shadow-sm active:scale-90"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};


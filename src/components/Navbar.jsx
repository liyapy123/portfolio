import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';

export const Navbar = ({ darkMode, setDarkMode }) => {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Track scroll direction for hide/show behavior
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);

      // Hide navbar when scrolling down fast, show when scrolling up
      if (currentScrollY > 200 && currentScrollY > lastScrollY && !mobileMenuOpen) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY = currentScrollY;

      // Detect active section
      const sections = ['about', 'skills', 'projects', 'journey', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250 && rect.bottom >= 250) {
            setActiveSection(section);
            break;
          }
        }
      }
      if (window.scrollY < 300) {
        setActiveSection('hero');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Journey', href: '#journey' },
    { name: 'Contact', href: '#contact' }
  ];

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: hidden ? -100 : 0, 
          opacity: 1 
        }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        className="fixed top-4 md:top-6 left-0 right-0 z-40 flex justify-center px-4 pointer-events-none"
      >
        <nav
          className={`pointer-events-auto flex items-center justify-between gap-2 md:gap-8 px-5 py-2.5 md:py-3 rounded-full transition-all duration-300 ${
            scrolled
              ? 'bg-cream-50/85 dark:bg-plum-dark/85 backdrop-blur-md shadow-sticker border border-plum/10 dark:border-cream-100/10'
              : 'bg-cream-50/70 dark:bg-plum-dark/70 backdrop-blur-sm border border-plum/5 dark:border-cream-100/5'
          }`}
        >
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group flex items-center gap-1.5 font-headline text-2xl md:text-3xl font-extrabold tracking-tight text-plum dark:text-cream-100 transition-transform active:scale-95"
          >
            <span>Liya</span>
            <span className="text-pink-accent group-hover:scale-125 inline-block transition-transform">.</span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <button
                  key={link.name}
                  onClick={() => scrollTo(link.href)}
                  className={`relative px-3.5 py-1.5 text-sm font-semibold rounded-full transition-colors duration-200 ${
                    isActive
                      ? 'text-plum dark:text-cream-100'
                      : 'text-plum/70 dark:text-cream-100/70 hover:text-plum dark:hover:text-cream-100'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 bg-pink-accent/15 dark:bg-pink-accent/25 rounded-full -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Actions: Theme Toggle + Contact CTA */}
          <div className="flex items-center gap-2">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              className="p-2 rounded-full text-plum dark:text-cream-100 hover:bg-plum/10 dark:hover:bg-cream-100/10 transition-colors"
            >
              {darkMode ? <Sun size={18} className="text-orange-accent" /> : <Moon size={18} className="text-plum" />}
            </button>

            {/* Let's Talk CTA button */}
            <button
              onClick={() => scrollTo('#contact')}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 bg-plum dark:bg-cream-100 text-cream-100 dark:text-plum rounded-full text-xs font-bold hover:bg-pink-accent dark:hover:bg-pink-accent dark:hover:text-white transition-all shadow-sm active:scale-95"
            >
              <span>Connect</span>
              <ArrowUpRight size={14} />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full text-plum dark:text-cream-100 hover:bg-plum/10 dark:hover:bg-cream-100/10"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Fullscreen Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-30 bg-cream-100/98 dark:bg-plum-dark/98 backdrop-blur-xl flex flex-col justify-center px-8 md:hidden"
          >
            <div className="flex flex-col space-y-6 text-center">
              <span className="text-xs uppercase font-extrabold tracking-widest text-pink-accent">
                Navigation
              </span>
              {navLinks.map((link, idx) => (
                <motion.button
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.06 }}
                  onClick={() => scrollTo(link.href)}
                  className="font-headline text-4xl font-extrabold text-plum dark:text-cream-100 hover:text-pink-accent dark:hover:text-pink-accent transition-colors tracking-tight"
                >
                  {link.name}
                </motion.button>
              ))}

              <div className="pt-6 border-t border-plum/10 dark:border-cream-100/10 flex flex-col items-center gap-4">
                <button
                  onClick={() => scrollTo('#contact')}
                  className="w-full max-w-xs py-3.5 bg-pink-accent text-white font-bold rounded-full text-base shadow-lg"
                >
                  Let's Connect ↗
                </button>
                <p className="text-xs text-plum/60 dark:text-cream-100/60 font-medium">
                  Thejus Engineering College • Thrissur, Kerala
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};


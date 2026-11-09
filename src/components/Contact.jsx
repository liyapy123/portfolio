import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { personalData } from '../data';
import { 
  Mail, 
  MapPin, 
  GraduationCap, 
  Send, 
  Check, 
  Copy, 
  Sparkles,
  ArrowUpRight,
  FileText
} from 'lucide-react';
import { Github, Linkedin, Instagram } from './Icons';
import { Starburst } from './Decorations';

// Map icon names
const socialIcons = {
  Github,
  Linkedin,
  Instagram,
  Mail
};

export const Contact = () => {
  const { email, location, college, socials, resumeUrl, statusText } = personalData;
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      // Fire confetti burst
      try {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FF4F9A', '#FF8A3D', '#3B1F3F', '#FFA459']
        });
      } catch (err) {
        console.error(err);
      }
    }, 700);
  };

  return (
    <section id="contact" className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-cream-100 dark:bg-plum-darkBg overflow-hidden transition-colors duration-300">
      
      {/* Decorative Starburst */}
      <div className="absolute top-10 right-10 opacity-30 dark:opacity-15 pointer-events-none">
        <Starburst className="w-20 h-20 text-orange-accent" />
      </div>

      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-14 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-3"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-pink-accent"></span>
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-pink-accent">
              Get In Touch
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-headline text-5xl sm:text-7xl md:text-8xl font-extrabold text-plum dark:text-cream-100 uppercase tracking-tight leading-[0.92] max-w-4xl"
          >
            LET'S MAKE SOMETHING <span className="text-pink-accent">AWESOME.</span>
          </motion.h2>

          <p className="mt-4 text-sm sm:text-lg text-plum/70 dark:text-cream-100/70 max-w-2xl font-medium">
            Have a project idea, hackathon invitation, or just want to chat about AI & tech? My inbox is always open.
          </p>
        </div>

        {/* 2-Column Grid: Contact Form + Direct Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Form (7 columns) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 bg-white dark:bg-plum/70 rounded-[32px] p-6 sm:p-8 md:p-10 border border-plum/10 dark:border-cream-100/10 shadow-sticker"
          >
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center text-3xl">
                  🎉
                </div>
                <h3 className="font-headline text-3xl font-extrabold uppercase text-plum dark:text-cream-100">
                  Message Sent!
                </h3>
                <p className="text-sm text-plum/75 dark:text-cream-100/75 max-w-md mx-auto">
                  Thank you! I've received your note and will get back to you as soon as I'm done with my college lectures ☕.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormState({ name: '', email: '', message: '' });
                  }}
                  className="mt-4 px-6 py-2.5 rounded-full bg-plum dark:bg-cream-100 text-cream-100 dark:text-plum font-bold text-xs uppercase hover:bg-pink-accent dark:hover:bg-pink-accent dark:hover:text-white transition-all"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-plum/70 dark:text-cream-100/70 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Johnson"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-2xl bg-cream-50 dark:bg-plum-dark/60 border border-plum/10 dark:border-cream-100/15 text-plum dark:text-cream-100 placeholder-plum/40 dark:placeholder-cream-100/40 text-sm focus:outline-none focus:ring-2 focus:ring-pink-accent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-plum/70 dark:text-cream-100/70 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@example.com"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-2xl bg-cream-50 dark:bg-plum-dark/60 border border-plum/10 dark:border-cream-100/15 text-plum dark:text-cream-100 placeholder-plum/40 dark:placeholder-cream-100/40 text-sm focus:outline-none focus:ring-2 focus:ring-pink-accent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-plum/70 dark:text-cream-100/70 mb-2">
                    Your Message
                  </label>
                  <textarea
                    required
                    rows="4"
                    placeholder="Tell me about your project, idea, or just drop a friendly hello..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-2xl bg-cream-50 dark:bg-plum-dark/60 border border-plum/10 dark:border-cream-100/15 text-plum dark:text-cream-100 placeholder-plum/40 dark:placeholder-cream-100/40 text-sm focus:outline-none focus:ring-2 focus:ring-pink-accent transition-all resize-none"
                  ></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loading}
                  type="submit"
                  className="w-full py-4 rounded-full bg-pink-accent hover:bg-pink-hover text-white font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all duration-200"
                >
                  {loading ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Direct Details & Social Links (5 columns) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Status card */}
            <div className="p-6 rounded-[28px] bg-white dark:bg-plum/70 border border-plum/10 dark:border-cream-100/10 shadow-sticker">
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Current Status</span>
              </div>
              <p className="font-semibold text-sm sm:text-base text-plum dark:text-cream-100">
                {statusText}
              </p>
            </div>

            {/* Quick Email Copy Box */}
            <div className="p-6 rounded-[28px] bg-white dark:bg-plum/70 border border-plum/10 dark:border-cream-100/10 shadow-sticker">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-plum/50 dark:text-cream-100/50 block mb-1">
                Direct Email
              </span>
              <div className="flex items-center justify-between gap-2 mt-1">
                <span className="font-bold text-sm sm:text-base text-plum dark:text-cream-100 truncate">
                  {email}
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-xl bg-cream-100 dark:bg-plum-dark text-plum dark:text-cream-100 hover:bg-pink-accent hover:text-white transition-colors flex-shrink-0"
                  aria-label="Copy email address"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Location & College info */}
            <div className="p-6 rounded-[28px] bg-white dark:bg-plum/70 border border-plum/10 dark:border-cream-100/10 shadow-sticker space-y-3">
              <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-plum dark:text-cream-100">
                <MapPin className="w-4 h-4 text-pink-accent flex-shrink-0" />
                <span>{location}</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-plum dark:text-cream-100">
                <GraduationCap className="w-4 h-4 text-orange-accent flex-shrink-0" />
                <span>{college}</span>
              </div>
            </div>

            {/* Social Links with Magnetic Hover Effect */}
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-plum/60 dark:text-cream-100/60 block mb-3">
                Social Profiles & Code
              </span>
              <div className="flex flex-wrap gap-2.5">
                {socials.map((social) => {
                  const Icon = socialIcons[social.icon] || Mail;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.08, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2.5 rounded-full bg-white dark:bg-plum/80 border border-plum/10 dark:border-cream-100/10 shadow-sm hover:shadow-sticker text-plum dark:text-cream-100 hover:text-pink-accent dark:hover:text-pink-accent text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <Icon className="w-4 h-4" />
                      <span>{social.name}</span>
                    </motion.a>
                  );
                })}

                {/* Resume Download Pill */}
                {resumeUrl && (
                  <motion.a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2.5 rounded-full bg-orange-accent text-white shadow-sm hover:shadow-sticker text-xs font-bold flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Resume (PDF)</span>
                  </motion.a>
                )}
              </div>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};

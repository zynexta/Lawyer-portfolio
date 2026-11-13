import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, ArrowRight, ChevronDown, BookOpen, Scale, X } from 'lucide-react';

interface FooterProps {
  onOpenConsultation?: () => void;
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenConsultation,
  onOpenPrivacy,
  onOpenTerms,
}) => {
  // Mobile accordion state
  const [quickLinksOpen, setQuickLinksOpen] = useState(false);
  const [practiceAreasOpen, setPracticeAreasOpen] = useState(false);

  // Legal modal state
  const [activeLegalModal, setActiveLegalModal] = useState<'privacy' | 'terms' | null>(null);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Practice Areas', href: '#practice-areas' },
    { label: 'About', href: '#about' },
    { label: 'Cases', href: '#cases' },
    { label: 'Articles', href: '#insights' },
    { label: 'Contact', href: '#contact' },
  ];

  const practiceAreasList = [
    'Legal Notice & Pre-Litigation Advisory',
    'Mediation & Dispute Resolution',
    'Criminal Cases (NDPS, POCSO & All Types)',
    'Family & Matrimonial Cases',
    'Medical Legal Cases & Malpractice',
    'Cyber Crimes & Digital Fraud Defense',
    'MACT & Motor Accident Claims',
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePrivacyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onOpenPrivacy) {
      onOpenPrivacy();
    } else {
      setActiveLegalModal('privacy');
    }
  };

  const handleTermsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onOpenTerms) {
      onOpenTerms();
    } else {
      setActiveLegalModal('terms');
    }
  };

  return (
    <footer id="contact" className="relative bg-[#001714] text-white overflow-hidden scroll-mt-14 sm:scroll-mt-20">
      
      {/* ── TOP CONSULTATION BANNER ──────────────────────────────────────── */}
      <section className="relative bg-gradient-to-b from-[#002822] via-[#00201B] to-[#001714] pt-12 sm:pt-16 lg:pt-20 pb-10 sm:pb-14 border-b border-[#D6AD69]/20 overflow-hidden">
        
        {/* Desktop Elegant Golden Wave Top Border */}
        <div className="hidden lg:block absolute top-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none z-10">
          <svg
            viewBox="0 0 1440 60"
            fill="none"
            className="w-full h-10 lg:h-12"
            preserveAspectRatio="none"
          >
            <path
              d="M0,35 C320,15 540,45 820,28 C1060,12 1240,4 1440,24 L1440,0 L0,0 Z"
              fill="#001F1B"
            />
            <path
              d="M0,35 C320,15 540,45 820,28 C1060,12 1240,4 1440,24"
              stroke="#D6AD69"
              strokeWidth="1.2"
              strokeOpacity="0.45"
            />
          </svg>
        </div>

        {/* Desktop Faint Classical Scales of Justice Graphic on Right */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none overflow-hidden hidden lg:block opacity-20 mix-blend-screen select-none">
          <picture>
            <source type="image/webp" srcSet="/cta-scales.webp" />
            <img
              src="/cta-scales.jpg"
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover object-center filter saturate-150 contrast-125"
              loading="lazy"
              decoding="async"
              width={640}
              height={480}
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-r from-[#00201B] via-[#00201B]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#001714] via-transparent to-[#002822]" />
        </div>

        {/* Ambient Subtle Green Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[200px] bg-[#004D40]/25 rounded-full blur-[90px] pointer-events-none" />

        {/* Banner Content Container */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          
          {/* Eyebrow with gold flanking lines */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2.5 sm:mb-3">
            <span className="w-5 sm:w-8 h-[1px] bg-[#D6AD69]/70" />
            <span className="text-[9.5px] sm:text-xs font-sans tracking-[0.22em] text-[#D6AD69] uppercase font-semibold">
              GET PROFESSIONAL LEGAL SUPPORT
            </span>
            <span className="w-5 sm:w-8 h-[1px] bg-[#D6AD69]/70" />
          </div>

          {/* Headline */}
          <h2 className="font-editorial text-2xl min-[360px]:text-3xl sm:text-4xl lg:text-[44px] text-white font-medium tracking-tight leading-tight mb-2 sm:mb-3">
            Need Legal Guidance?
          </h2>

          {/* Subtext */}
          <p className="text-xs sm:text-[14px] font-sans text-neutral-300 font-light max-w-md mx-auto leading-relaxed mb-5 sm:mb-7">
            Get professional legal assistance and guidance for your legal matters.
          </p>

          {/* Gold CTA Pill Button */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={onOpenConsultation}
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-full bg-gradient-to-r from-[#DFB872] via-[#D6AD69] to-[#C39A52] text-[#001F1B] font-sans text-xs sm:text-[13px] font-semibold tracking-wide shadow-[0_4px_18px_rgba(214,173,105,0.32)] hover:shadow-[0_6px_25px_rgba(214,173,105,0.5)] hover:brightness-105 transition-all duration-300 active:scale-95 cursor-pointer group"
            >
              <span>Book a Consultation</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#001F1B] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </section>

      {/* ── MAIN FOOTER BODY ────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-10 sm:pt-14 lg:pt-16 pb-8 sm:pb-12">
        
        {/* DESKTOP 3-COLUMN LAYOUT (lg:grid) */}
        <div className="hidden lg:grid grid-cols-12 gap-8 lg:gap-12">
          
          {/* Column 1 – Brand */}
          <div className="col-span-5 pr-6 xl:pr-10 border-r border-[#D6AD69]/20 flex flex-col items-start text-left">
            {/* Golden Scales of Justice Emblem */}
            <div className="mb-4">
              <svg
                className="w-10 h-10 text-[#D6AD69]"
                viewBox="0 0 48 48"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <circle cx="24" cy="8" r="2" fill="#D6AD69" strokeWidth="1" />
                <line x1="24" y1="10" x2="24" y2="41" strokeWidth="2" strokeLinecap="round" />
                {/* Crossbeam */}
                <path d="M10 16 C17 14, 31 14, 38 16" strokeWidth="2.2" strokeLinecap="round" />
                {/* Left Pan Strings & Pan */}
                <line x1="10" y1="16" x2="5.5" y2="28" strokeWidth="1.4" />
                <line x1="10" y1="16" x2="14.5" y2="28" strokeWidth="1.4" />
                <path d="M4.5 28 C4.5 32.5, 15.5 32.5, 15.5 28 Z" strokeWidth="1.6" fill="none" />
                {/* Right Pan Strings & Pan */}
                <line x1="38" y1="16" x2="33.5" y2="28" strokeWidth="1.4" />
                <line x1="38" y1="16" x2="42.5" y2="28" strokeWidth="1.4" />
                <path d="M32.5 28 C32.5 32.5, 43.5 32.5, 43.5 28 Z" strokeWidth="1.6" fill="none" />
                {/* Base Stand */}
                <path d="M16 41 L32 41 M19 37.5 L29 37.5" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>

            <span className="font-editorial text-2xl text-white font-medium tracking-wide leading-tight">
              Adv. Muhammad Ajmal KTV
            </span>
            <span className="text-[10px] font-sans font-semibold tracking-[0.24em] text-[#D6AD69] uppercase mt-1.5 mb-4">
              ADVOCATE & LEGAL CONSULTANT
            </span>
            <p className="text-xs sm:text-[13px] font-sans text-neutral-300/80 leading-relaxed max-w-sm">
              Providing practical legal solutions, strategic representation, and trusted legal counsel for individuals and businesses.
            </p>
          </div>

          {/* Column 2 – Quick Links */}
          <div className="col-span-3 px-4 xl:px-6 border-r border-[#D6AD69]/20 flex flex-col items-start text-left">
            <h3 className="font-editorial text-xl text-white font-medium mb-5">
              Quick Links
            </h3>
            <nav aria-label="Footer Quick Links" className="w-full">
              <ul className="space-y-3 text-xs sm:text-[13px] font-sans text-neutral-300">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="hover:text-[#D6AD69] transition-colors inline-block py-0.5"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Column 3 – Get in Touch */}
          <div className="col-span-4 pl-4 xl:pl-6 flex flex-col items-start text-left">
            <h3 className="font-editorial text-xl text-white font-medium mb-5">
              Get in Touch
            </h3>
            
            <div className="space-y-3.5 text-xs sm:text-[13px] font-sans text-neutral-300 mb-6">
              <a
                href="tel:+918891941998"
                className="flex items-center gap-3 hover:text-[#D6AD69] transition-colors group"
              >
                <Phone className="w-4 h-4 text-[#D6AD69] shrink-0 group-hover:scale-110 transition-transform" />
                <span>+91 88919 41998</span>
              </a>

              <a
                href="mailto:advmuhammadajmal28@gmail.com"
                className="flex items-center gap-3 hover:text-[#D6AD69] transition-colors group"
              >
                <Mail className="w-4 h-4 text-[#D6AD69] shrink-0 group-hover:scale-110 transition-transform" />
                <span>advmuhammadajmal28@gmail.com</span>
              </a>

              <div className="flex items-start gap-3 text-neutral-300/90">
                <MapPin className="w-4 h-4 text-[#D6AD69] shrink-0 mt-0.5" />
                <span className="leading-snug">High Court Junction, Ernakulam, Kerala</span>
              </div>
            </div>

            {/* Social Media Icons Row: Rounded Gold Outlined Buttons */}
            <div className="flex items-center gap-3">
              {/* WhatsApp */}
              <a
                href="https://wa.me/918891941998?text=Hello%20Adv.%20Ajmal,%20I%20would%20like%20to%20schedule%20a%20legal%20consultation."
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Contact"
                className="w-10 h-10 rounded-xl border border-[#D6AD69]/50 bg-[#00241E]/90 flex items-center justify-center text-[#D6AD69] hover:text-white hover:border-[#D6AD69] hover:bg-[#D6AD69]/20 transition-all shadow-xs active:scale-95 cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19.05 4.91A9.816 9.816 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01zm-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.06 0 1.21.89 2.39 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.07-.1-.23-.16-.48-.28z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/advmuhammadajmal?srtk=bms0MnhmYnMzcWk1"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Profile"
                className="w-10 h-10 rounded-xl border border-[#D6AD69]/50 bg-[#00241E]/90 flex items-center justify-center text-[#D6AD69] hover:text-white hover:border-[#D6AD69] hover:bg-[#D6AD69]/20 transition-all shadow-xs active:scale-95 cursor-pointer"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="w-10 h-10 rounded-xl border border-[#D6AD69]/50 bg-[#00241E]/90 flex items-center justify-center text-[#D6AD69] hover:text-white hover:border-[#D6AD69] hover:bg-[#D6AD69]/20 transition-all shadow-xs active:scale-95 cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c.96 0 1.74-.78 1.74-1.74a1.74 1.74 0 1 0-3.48 0c0 .96.78 1.74 1.74 1.74m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                </svg>
              </a>


            </div>
          </div>

        </div>

        {/* MOBILE LAYOUT (<lg) */}
        <div className="lg:hidden flex flex-col">
          
          {/* Brand Block Centered */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="mb-3">
              <svg
                className="w-9 h-9 text-[#D6AD69]"
                viewBox="0 0 48 48"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <circle cx="24" cy="8" r="2" fill="#D6AD69" strokeWidth="1" />
                <line x1="24" y1="10" x2="24" y2="41" strokeWidth="2" strokeLinecap="round" />
                <path d="M10 16 C17 14, 31 14, 38 16" strokeWidth="2.2" strokeLinecap="round" />
                <line x1="10" y1="16" x2="5.5" y2="28" strokeWidth="1.4" />
                <line x1="10" y1="16" x2="14.5" y2="28" strokeWidth="1.4" />
                <path d="M4.5 28 C4.5 32.5, 15.5 32.5, 15.5 28 Z" strokeWidth="1.6" fill="none" />
                <line x1="38" y1="16" x2="33.5" y2="28" strokeWidth="1.4" />
                <line x1="38" y1="16" x2="42.5" y2="28" strokeWidth="1.4" />
                <path d="M32.5 28 C32.5 32.5, 43.5 32.5, 43.5 28 Z" strokeWidth="1.6" fill="none" />
                <path d="M16 41 L32 41 M19 37.5 L29 37.5" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>

            <span className="font-editorial text-xl sm:text-2xl text-white font-medium tracking-wide">
              Adv. Muhammad Ajmal KTV
            </span>
            <span className="text-[8.5px] sm:text-[9.5px] font-sans font-semibold tracking-[0.22em] text-[#D6AD69] uppercase mt-1 mb-2.5">
              ADVOCATE & LEGAL CONSULTANT
            </span>
            <p className="text-[11.5px] sm:text-xs font-sans text-neutral-300/80 leading-relaxed max-w-[310px] mx-auto text-center">
              Providing practical legal solutions, strategic representation, and trusted legal counsel for individuals and businesses.
            </p>
          </div>

          {/* Collapsible Accordions: Quick Links & Practice Areas */}
          <div className="w-full space-y-2.5 mb-6">
            
            {/* 1. Quick Links Accordion */}
            <div className="border border-[#D6AD69]/20 rounded-xl overflow-hidden bg-[#00241E]/40 transition-colors">
              <button
                type="button"
                onClick={() => setQuickLinksOpen(!quickLinksOpen)}
                className="w-full px-4 py-3 flex items-center justify-between text-left cursor-pointer active:bg-[#00241E]/70"
                aria-expanded={quickLinksOpen}
              >
                <div className="flex items-center gap-2.5">
                  <BookOpen className="w-4 h-4 text-[#D6AD69]" />
                  <span className="text-xs sm:text-[13px] font-sans font-medium text-white tracking-wide">
                    Quick Links
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-[#D6AD69] transition-transform duration-300 ${
                    quickLinksOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {quickLinksOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className="overflow-hidden px-4 pb-3 pt-1 border-t border-[#D6AD69]/15"
                  >
                    <nav aria-label="Mobile Footer Quick Links" className="grid grid-cols-2 gap-2 text-[11.5px] sm:text-xs font-sans text-neutral-300">
                      {navLinks.map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          onClick={(e) => handleNavClick(e, link.href)}
                          className="py-1 hover:text-[#D6AD69] transition-colors"
                        >
                          {link.label}
                        </a>
                      ))}
                    </nav>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 2. Practice Areas Accordion */}
            <div className="border border-[#D6AD69]/20 rounded-xl overflow-hidden bg-[#00241E]/40 transition-colors">
              <button
                type="button"
                onClick={() => setPracticeAreasOpen(!practiceAreasOpen)}
                className="w-full px-4 py-3 flex items-center justify-between text-left cursor-pointer active:bg-[#00241E]/70"
                aria-expanded={practiceAreasOpen}
              >
                <div className="flex items-center gap-2.5">
                  <Scale className="w-4 h-4 text-[#D6AD69]" />
                  <span className="text-xs sm:text-[13px] font-sans font-medium text-white tracking-wide">
                    Practice Areas
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-[#D6AD69] transition-transform duration-300 ${
                    practiceAreasOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {practiceAreasOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className="overflow-hidden px-4 pb-3 pt-1 border-t border-[#D6AD69]/15"
                  >
                    <div className="flex flex-col space-y-2 text-[11.5px] sm:text-xs font-sans text-neutral-300">
                      {practiceAreasList.map((area) => (
                        <button
                          key={area}
                          type="button"
                          onClick={() => {
                            if (onOpenConsultation) {
                              onOpenConsultation();
                            }
                          }}
                          className="text-left py-0.5 hover:text-[#D6AD69] transition-colors cursor-pointer"
                        >
                          • {area}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

          {/* Mobile Get in Touch */}
          <div className="mb-6 pt-1">
            <h3 className="font-editorial text-base sm:text-lg text-white font-medium mb-3">
              Get in Touch
            </h3>
            
            <div className="space-y-2.5 text-xs font-sans text-neutral-300">
              <a
                href="tel:+918891941998"
                className="flex items-center gap-2.5 hover:text-[#D6AD69] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#D6AD69] shrink-0" />
                <span>+91 88919 41998</span>
              </a>

              <a
                href="mailto:advmuhammadajmal28@gmail.com"
                className="flex items-center gap-2.5 hover:text-[#D6AD69] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#D6AD69] shrink-0" />
                <span>advmuhammadajmal28@gmail.com</span>
              </a>

              <div className="flex items-start gap-2.5 text-neutral-300/90">
                <MapPin className="w-3.5 h-3.5 text-[#D6AD69] shrink-0 mt-0.5" />
                <span>High Court Junction, Ernakulam, Kerala</span>
              </div>
            </div>
          </div>

          {/* Centered Mobile Social Icons Row */}
          <div className="flex items-center justify-center gap-3.5 mb-6">
            {/* WhatsApp */}
            <a
              href="https://wa.me/918891941998?text=Hello%20Adv.%20Ajmal,%20I%20would%20like%20to%20schedule%20a%20legal%20consultation."
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Contact"
              className="w-10 h-10 rounded-xl border border-[#D6AD69]/50 bg-[#00241E]/90 flex items-center justify-center text-[#D6AD69] hover:text-white hover:border-[#D6AD69] hover:bg-[#D6AD69]/20 transition-all shadow-xs active:scale-95 cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19.05 4.91A9.816 9.816 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01zm-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.06 0 1.21.89 2.39 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.07-.1-.23-.16-.48-.28z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/advmuhammadajmal?srtk=bms0MnhmYnMzcWk1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Profile"
              className="w-10 h-10 rounded-xl border border-[#D6AD69]/50 bg-[#00241E]/90 flex items-center justify-center text-[#D6AD69] hover:text-white hover:border-[#D6AD69] hover:bg-[#D6AD69]/20 transition-all shadow-xs active:scale-95 cursor-pointer"
            >
              <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="w-10 h-10 rounded-xl border border-[#D6AD69]/50 bg-[#00241E]/90 flex items-center justify-center text-[#D6AD69] hover:text-white hover:border-[#D6AD69] hover:bg-[#D6AD69]/20 transition-all shadow-xs active:scale-95 cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c.96 0 1.74-.78 1.74-1.74a1.74 1.74 0 1 0-3.48 0c0 .96.78 1.74 1.74 1.74m1.39 9.74v-8.37H5.07v8.37h2.78z" />
              </svg>
            </a>


          </div>

        </div>

        {/* ── BOTTOM COPYRIGHT & LEGAL BAR ───────────────────────────────── */}
        <div className="pt-6 sm:pt-8 mt-4 sm:mt-10 border-t border-[#D6AD69]/20 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-[11px] sm:text-xs font-sans text-neutral-400 text-center sm:text-left pb-36 sm:pb-6">
          <p>© 2026 Adv. Muhammad Ajmal KTV. All Rights Reserved.</p>
          
          <div className="flex items-center gap-3 text-neutral-300">
            <button
              type="button"
              onClick={handlePrivacyClick}
              className="hover:text-[#D6AD69] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span className="text-neutral-500">|</span>
            <button
              type="button"
              onClick={handleTermsClick}
              className="hover:text-[#D6AD69] transition-colors cursor-pointer"
            >
              Terms of Use
            </button>
          </div>
        </div>

      </div>

      {/* ── LEGAL MODAL (Privacy Policy / Terms of Use) ───────────────────── */}
      <AnimatePresence>
        {activeLegalModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveLegalModal(null)}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg bg-[#00241E] border border-[#D6AD69]/40 rounded-2xl p-6 sm:p-8 text-white shadow-2xl z-10 max-h-[85vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveLegalModal(null)}
                className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-full bg-[#001815] border border-[#D6AD69]/20 transition-all cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              {activeLegalModal === 'privacy' ? (
                <div>
                  <h3 className="font-editorial text-2xl text-white font-medium mb-3">
                    Privacy Policy
                  </h3>
                  <p className="text-xs text-[#D6AD69] mb-4 font-sans tracking-wider uppercase">
                    Adv. Muhammad Ajmal KTV — Chambers of Law
                  </p>
                  <div className="space-y-3 text-xs font-sans text-neutral-300 leading-relaxed">
                    <p>
                      Your privacy is of utmost importance to our legal practice. We treat all personal and legal communications with strict attorney-client confidentiality in adherence to the Advocates Act and the Bar Council of India guidelines.
                    </p>
                    <p>
                      <strong>Information Collection:</strong> Contact details, case backgrounds, and consultation requests submitted through this website are used exclusively for scheduling legal consultations, evaluating case merits, and providing legal counsel.
                    </p>
                    <p>
                      <strong>Confidentiality:</strong> No information shared with our chambers is disclosed, rented, or transferred to third parties without prior written client consent, except as mandated by court order or applicable law.
                    </p>
                    <p>
                      For any privacy-related inquiries, reach us at <a href="mailto:advmuhammadajmal28@gmail.com" className="text-[#D6AD69] underline">advmuhammadajmal28@gmail.com</a>.
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="font-editorial text-2xl text-white font-medium mb-3">
                    Terms of Use & Disclaimer
                  </h3>
                  <p className="text-xs text-[#D6AD69] mb-4 font-sans tracking-wider uppercase">
                    Adv. Muhammad Ajmal KTV — Bar Council Compliance
                  </p>
                  <div className="space-y-3 text-xs font-sans text-neutral-300 leading-relaxed">
                    <p>
                      In compliance with the rules of the Bar Council of India, this portfolio website is intended solely for informational purposes and to facilitate client communication upon voluntary request. It does not constitute legal advertisement or solicitation.
                    </p>
                    <p>
                      <strong>No Attorney-Client Relationship:</strong> Browsing this website or submitting a preliminary consultation inquiry does not automatically establish a formal attorney-client relationship. A formal legal engagement is established only upon mutual consultation and signing of a Vakalatnama or formal engagement agreement.
                    </p>
                    <p>
                      <strong>Legal Guidance:</strong> Content published on this website, including legal articles and case summaries, represents general legal awareness and should not be construed as definitive legal advice for specific personal circumstances.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </footer>
  );
};

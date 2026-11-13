import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, Scale, Home, Briefcase, User, Gavel, BookOpen, Mail } from 'lucide-react';

interface NavbarProps {
  onOpenConsultation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenConsultation }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Active section detection
      const sections = ['home', 'practice-areas', 'about', 'cases', 'insights', 'contact'];
      const scrollPos = window.scrollY + 250;
      for (const section of [...sections].reverse()) {
        const el = document.getElementById(section);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when overlay is active
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Handle ESC key press to close overlay
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home', number: '01', icon: Home, sectionId: 'home' },
    { label: 'Practice Areas', href: '#practice-areas', number: '02', icon: Briefcase, sectionId: 'practice-areas' },
    { label: 'About', href: '#about', number: '03', icon: User, sectionId: 'about' },
    { label: 'Cases', href: '#cases', number: '04', icon: Gavel, sectionId: 'cases' },
    { label: 'Articles', href: '#insights', number: '05', icon: BookOpen, sectionId: 'insights' },
    { label: 'Contact', href: '#contact', number: '06', icon: Mail, sectionId: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Fixed Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#001F1B]/95 backdrop-blur-md border-b border-[#D6AD69]/20 shadow-2xl py-2.5 sm:py-3.5'
            : 'bg-transparent border-transparent py-2.5 sm:pt-6 sm:pb-4'
        }`}
      >
        <div className="w-full max-w-[1440px] mx-auto px-3.5 min-[360px]:px-4 sm:px-10 lg:px-20 xl:px-24 flex items-center justify-between">
          
          {/* Left: Advocate Branding with Golden Scales Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="group flex items-center gap-2 sm:gap-3 text-left focus:outline-none select-none min-w-0"
          >
            <Scale className="w-4.5 h-4.5 sm:w-6 sm:h-6 text-[#D6AD69] shrink-0" strokeWidth={1.6} />
            <div className="flex flex-col text-left truncate">
              <span className="font-editorial text-[13.5px] min-[360px]:text-[15px] sm:text-lg md:text-xl text-white font-medium tracking-wide leading-tight group-hover:text-[#F6F0E5] transition-colors whitespace-nowrap">
                Adv. Muhammad Ajmal KTV
              </span>
              <span className="text-[7.5px] min-[360px]:text-[8px] sm:text-[9.5px] font-sans font-semibold tracking-[0.18em] sm:tracking-[0.24em] text-[#D6AD69] uppercase mt-0.5 sm:mt-1">
                ADVOCATE & LEGAL CONSULTANT
              </span>
            </div>
          </a>

          {/* Right: Clean Hamburger on Mobile; Consultation CTA + Hamburger on Desktop */}
          <div className="flex items-center gap-2 sm:gap-3.5 z-20 shrink-0">
            {/* Desktop: Full "Book a Consultation" Button */}
            <button
              type="button"
              onClick={onOpenConsultation}
              className="hidden sm:inline-flex h-9 sm:h-10 px-4 sm:px-5 rounded-full bg-[#D6AD69] hover:bg-[#C59C58] text-[#171717] text-xs sm:text-[12.5px] font-sans font-semibold tracking-wide transition-all duration-300 items-center gap-1.5 sm:gap-2 shadow-[0_4px_14px_rgba(214,173,105,0.3)] active:scale-95 cursor-pointer group"
              aria-label="Book a consultation"
            >
              <span>Book a Consultation</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#171717] group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Hamburger Menu Button */}
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#003C32]/70 hover:bg-[#003C32] border border-[#D6AD69]/30 flex flex-col items-center justify-center gap-1 sm:gap-1.5 text-[#F6F0E5] hover:text-white transition-all cursor-pointer focus:outline-none"
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
            >
              <span className="w-3.5 sm:w-5 h-[1.5px] bg-[#D6AD69] rounded-full transition-all" />
              <span className="w-3.5 sm:w-5 h-[1.5px] bg-[#D6AD69] rounded-full transition-all" />
              <span className="w-2.5 sm:w-4 h-[1.5px] bg-[#D6AD69] rounded-full transition-all" />
            </button>
          </div>

        </div>
      </header>

      {/* Compact Right-Side Floating Navigation Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop Overlay with subtle blur */}
            <motion.div
              key="drawer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-[2px]"
              aria-hidden="true"
            />

            {/* Compact Right-Side Floating Drawer Card */}
            <motion.aside
              key="drawer-panel"
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="fixed top-3 right-3 sm:top-5 sm:right-6 z-50 w-[310px] sm:w-[325px] max-w-[calc(100vw-1.5rem)] bg-gradient-to-b from-[#002821] via-[#001F1B] to-[#001713] border border-[#D6AD69]/35 rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_35px_rgba(214,173,105,0.12)] flex flex-col overflow-hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation Menu"
            >
              {/* Drawer Top Header: Logo + Menu Heading + Circular Close Button */}
              <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-[#D6AD69]/20 bg-[#001A16]/50">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#003C32]/80 border border-[#D6AD69]/30 flex items-center justify-center text-[#D6AD69] shadow-inner">
                    <Scale className="w-4 h-4" strokeWidth={1.8} />
                  </div>
                  <span className="font-editorial text-[17px] text-white font-medium tracking-wide">
                    Menu
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="w-7 h-7 rounded-full bg-[#00241E] hover:bg-[#003C32] border border-[#D6AD69]/30 hover:border-[#D6AD69] flex items-center justify-center text-[#F6F0E5] hover:text-[#D6AD69] transition-all cursor-pointer shadow-sm active:scale-95"
                  aria-label="Close menu"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Navigation Items List with Small Gold Icons, Numbers, Separators & Active Highlight */}
              <nav className="px-3.5 py-2.5 flex flex-col space-y-0.5">
                {navLinks.map((link, idx) => {
                  const Icon = link.icon;
                  const isActive = activeSection === link.sectionId;
                  return (
                    <React.Fragment key={link.label}>
                      <a
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className={`group flex items-center justify-between px-3 py-2 rounded-xl transition-all duration-200 border ${
                          isActive
                            ? 'bg-[#003C32]/70 border-[#D6AD69]/40 shadow-[0_0_15px_rgba(214,173,105,0.12)] text-white'
                            : 'border-transparent hover:bg-[#003A30]/50 hover:border-[#D6AD69]/25 text-[#F6F0E5]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`text-[11px] font-sans font-bold tracking-wider w-5 transition-colors ${
                              isActive ? 'text-[#D6AD69]' : 'text-[#D6AD69]/70 group-hover:text-[#D6AD69]'
                            }`}
                          >
                            {link.number}
                          </span>
                          <Icon
                            className={`w-3.5 h-3.5 text-[#D6AD69] shrink-0 transition-all ${
                              isActive ? 'opacity-100 scale-105' : 'opacity-75 group-hover:opacity-100 group-hover:scale-110'
                            }`}
                            strokeWidth={1.8}
                          />
                          <span
                            className={`font-editorial text-[15px] sm:text-[15.5px] tracking-wide transition-colors ${
                              isActive ? 'text-[#F6F0E5] font-normal' : 'group-hover:text-white font-light'
                            }`}
                          >
                            {link.label}
                          </span>
                        </div>
                        <ArrowRight
                          className={`w-3.5 h-3.5 text-[#D6AD69] transition-all duration-200 ${
                            isActive
                              ? 'opacity-100 translate-x-0'
                              : 'opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0'
                          }`}
                        />
                      </a>
                      {idx < navLinks.length - 1 && (
                        <div className="h-px bg-gradient-to-r from-transparent via-[#D6AD69]/15 to-transparent mx-2 my-0.5" />
                      )}
                    </React.Fragment>
                  );
                })}
              </nav>

              {/* Bottom Section: Compact Gold CTA Button + Subtle Wave SVG + Chambers Tag */}
              <div className="px-4 pb-4 pt-2 border-t border-[#D6AD69]/15 flex flex-col gap-2.5 bg-[#001713]/40 relative">
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    onOpenConsultation();
                  }}
                  className="w-full py-2.5 px-4 rounded-full bg-[#D6AD69] hover:bg-[#C59C58] text-[#171717] font-sans font-bold text-[11px] uppercase tracking-[0.16em] transition-all shadow-[0_4px_16px_rgba(214,173,105,0.25)] hover:shadow-[0_6px_22px_rgba(214,173,105,0.38)] active:scale-98 flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <span>BOOK A CONSULTATION</span>
                  <ArrowRight className="w-3 h-3 text-[#171717] group-hover:translate-x-0.5 transition-transform" />
                </button>

                {/* Subtle Golden Wave Decoration */}
                <div className="flex flex-col items-center justify-center pt-0.5 opacity-65">
                  <svg
                    viewBox="0 0 160 12"
                    fill="none"
                    className="w-24 h-2 text-[#D6AD69]"
                    aria-hidden="true"
                  >
                    <path
                      d="M0 6 C 20 1, 40 11, 60 6 C 80 1, 100 11, 120 6 C 140 1, 160 11, 180 6"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="text-[8px] font-sans tracking-[0.2em] text-[#D6AD69]/75 uppercase mt-0.5">
                    Adv. Muhammad Ajmal KTV
                  </span>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import {
  FileText,
  Handshake,
  ShieldAlert,
  Users,
  Stethoscope,
  Laptop,
  Car,
  Folder,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CaseStudy } from '../types';

interface SelectedCasesProps {
  cases: CaseStudy[];
  onSelectCase: (caseItem: CaseStudy) => void;
}

export const SelectedCases: React.FC<SelectedCasesProps> = ({ cases, onSelectCase }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [animKey, setAnimKey] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isDesktopExpanded, setIsDesktopExpanded] = useState(false);

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const chipsScrollRef = useRef<HTMLDivElement | null>(null);

  // Responsive mobile detection & reduced motion
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    mediaQuery.addEventListener('change', handleMotionChange);

    return () => {
      window.removeEventListener('resize', checkMobile);
      mediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  // Auto-play timer for single-by-single mobile showcase (5.5s)
  useEffect(() => {
    if (isPaused || cases.length === 0 || prefersReducedMotion) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % cases.length);
      setAnimKey((prev) => prev + 1);
    }, 5500);

    return () => clearInterval(timer);
  }, [isPaused, cases.length, prefersReducedMotion]);

  const isFirstMountRef = useRef(true);

  // Keep active category chip scrolled into view on user change (container only, never window)
  useEffect(() => {
    if (isFirstMountRef.current) {
      isFirstMountRef.current = false;
      return;
    }
    if (!chipsScrollRef.current) return;
    const activeChip = chipsScrollRef.current.children[currentIndex] as HTMLElement;
    if (activeChip) {
      const container = chipsScrollRef.current;
      const targetLeft = activeChip.offsetLeft - (container.offsetWidth / 2) + (activeChip.offsetWidth / 2);
      container.scrollTo({
        left: Math.max(0, targetLeft),
        behavior: 'smooth',
      });
    }
  }, [currentIndex]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? cases.length - 1 : prev - 1));
    setAnimKey((prev) => prev + 1);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % cases.length);
    setAnimKey((prev) => prev + 1);
  };

  const handleSelectIndex = (idx: number) => {
    if (idx === currentIndex) return;
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
    setAnimKey((prev) => prev + 1);
  };

  // Touch swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    setIsPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setIsPaused(false);
    if (touchStartX.current === null || touchStartY.current === null) return;

    const diffX = e.changedTouches[0].clientX - touchStartX.current;
    const diffY = e.changedTouches[0].clientY - touchStartY.current;

    // Detect intentional horizontal swipe
    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  const renderCaseIcon = (title: string, className = 'w-5 h-5 text-[#D6AD69]') => {
    if (title.includes('Notice')) return <FileText className={className} strokeWidth={1.75} />;
    if (title.includes('Mediation')) return <Handshake className={className} strokeWidth={1.75} />;
    if (title.includes('Criminal')) return <ShieldAlert className={className} strokeWidth={1.75} />;
    if (title.includes('Family')) return <Users className={className} strokeWidth={1.75} />;
    if (title.includes('Medical')) return <Stethoscope className={className} strokeWidth={1.75} />;
    if (title.includes('Cyber')) return <Laptop className={className} strokeWidth={1.75} />;
    if (title.includes('MACT')) return <Car className={className} strokeWidth={1.75} />;
    return <Folder className={className} strokeWidth={1.75} />;
  };

  const handleToggleExpand = () => {
    if (isDesktopExpanded) {
      const casesSection = document.getElementById('cases');
      if (casesSection) {
        const rect = casesSection.getBoundingClientRect();
        if (rect.top < -60) {
          casesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
      setIsDesktopExpanded(false);
    } else {
      setIsDesktopExpanded(true);
    }
  };

  const renderDesktopCard = (caseItem: CaseStudy, idx: number, isAdditional = false) => (
    <motion.div
      key={caseItem.id}
      initial={
        prefersReducedMotion
          ? { opacity: 1, y: 0 }
          : isAdditional
          ? { opacity: 0, y: 16 }
          : { opacity: 0, y: 20 }
      }
      animate={isAdditional ? { opacity: 1, y: 0 } : undefined}
      whileInView={!isAdditional ? { opacity: 1, y: 0 } : undefined}
      viewport={!isAdditional ? { once: true, amount: 0.15 } : undefined}
      whileTap={{ scale: 0.985, y: -2 }}
      transition={{
        duration: 0.48,
        delay: prefersReducedMotion ? 0 : isAdditional ? idx * 0.08 : idx * 0.07,
        ease: [0.22, 1, 0.36, 1] as const,
      }}
      onClick={() => onSelectCase(caseItem)}
      className="group relative bg-[#002B24]/85 hover:bg-[#00352D] active:bg-[#003830] border border-[#D6AD69]/25 hover:border-[#D6AD69]/80 active:border-[#D6AD69] rounded-2xl p-4 sm:p-5 lg:p-4.5 xl:p-5 flex flex-col justify-between min-h-[165px] lg:min-h-[170px] xl:min-h-[175px] transition-all duration-300 cursor-pointer shadow-[0_6px_18px_rgba(0,0,0,0.3)] hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(0,0,0,0.45),0_0_20px_rgba(214,173,105,0.1)] active:shadow-[0_4px_14px_rgba(0,0,0,0.5)] outline-none select-none will-change-transform"
    >
      <div>
        {/* Top: Gold Practice Area Icon & Category Badge */}
        <div className="mb-2.5 sm:mb-3 flex items-center justify-between">
          <div className="w-8 h-8 rounded-xl bg-[#001F1B]/80 border border-[#D6AD69]/30 flex items-center justify-center transition-all duration-300 group-hover:border-[#D6AD69] group-hover:scale-105 group-active:scale-105">
            {renderCaseIcon(caseItem.title, 'w-4 h-4 text-[#D6AD69]')}
          </div>
          <span className="text-[9.5px] font-sans font-medium text-[#D6AD69] bg-[#001F1B]/80 px-2.5 py-0.5 rounded-full border border-[#D6AD69]/20 uppercase tracking-wider transition-colors duration-300 group-hover:border-[#D6AD69]/40">
            {caseItem.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-editorial text-[16px] xl:text-[17.5px] text-white font-medium tracking-tight mb-1.5 leading-snug group-hover:text-[#F6F0E5] transition-colors duration-300">
          {caseItem.title}
        </h3>

        {/* Short Scope Description */}
        <p className="text-[11.5px] xl:text-xs font-sans text-neutral-300 font-light leading-relaxed line-clamp-2">
          {caseItem.shortDescription}
        </p>
      </div>

      {/* Bottom: Gold Consultation Link */}
      <div className="pt-2.5 mt-3 border-t border-[#D6AD69]/15 flex items-center justify-between text-[11px] xl:text-xs font-sans font-semibold text-[#D6AD69] group-hover:text-white transition-colors duration-300">
        <span>Consult on Matter</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 group-active:translate-x-1.5 transition-transform duration-300" />
      </div>
    </motion.div>
  );

  const currentCase = cases[currentIndex] || cases[0];

  // Motion variants for mobile single card slide transitions
  // Next: new card slides in from right (x: +30px, y: +10px -> x: 0, y: 0)
  // Previous: new card slides in from left (x: -30px, y: +10px -> x: 0, y: 0)
  const cardSlideVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: prefersReducedMotion ? 0 : dir > 0 ? 30 : -30,
      y: prefersReducedMotion ? 0 : 10,
    }),
    center: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: prefersReducedMotion ? 0 : dir > 0 ? -30 : 30,
      y: prefersReducedMotion ? 0 : -10,
      transition: {
        duration: 0.22,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    }),
  };

  return (
    <section
      id="cases"
      className="bg-gradient-to-b from-[#00241E] via-[#001F1B] to-[#001815] text-white py-12 sm:py-20 lg:py-28 relative border-b border-[#D6AD69]/20 overflow-hidden scroll-mt-14 sm:scroll-mt-20"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Soft Emerald Lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-[#003C32]/30 rounded-full blur-[100px] sm:blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[280px] sm:w-[400px] h-[280px] sm:h-[400px] bg-[#003C32]/20 rounded-full blur-[90px] sm:blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-start text-left max-w-2xl mb-6 sm:mb-12">
          {/* Section Eyebrow */}
          <div className="flex items-center gap-2 mb-2 sm:mb-3.5">
            <span className="w-6 sm:w-7 h-[1px] bg-[#D6AD69]" />
            <span className="text-[10px] sm:text-xs font-sans tracking-[0.22em] text-[#D6AD69] uppercase font-semibold">
              CASE HIGHLIGHTS
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-editorial text-2xl min-[360px]:text-3xl sm:text-4xl lg:text-[44px] text-white leading-[1.12] tracking-tight font-medium mb-2 sm:mb-4">
            Notable Cases
          </h2>

          {/* Description */}
          <p className="text-xs sm:text-sm font-sans text-neutral-300 font-light leading-relaxed max-w-xl">
            A selection of legal services handled with a focus on strategy, diligence, and favorable outcomes.
          </p>
        </div>

        {/* ── MOBILE: ANIMATED SINGLE-BY-SINGLE CAROUSEL (<md) ───────────── */}
        <div className="md:hidden flex flex-col">
          
          {/* 1. Horizontal Category Quick Selector Pills */}
          <div
            ref={chipsScrollRef}
            className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 pt-1 -mx-4 px-4 select-none"
          >
            {cases.map((c, i) => {
              const isActive = i === currentIndex;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => handleSelectIndex(i)}
                  className={`shrink-0 px-3 py-1.5 rounded-full text-[11px] font-sans transition-colors duration-200 border cursor-pointer active:scale-95 whitespace-nowrap ${
                    isActive
                      ? 'bg-[#003830] text-[#D6AD69] border-[#D6AD69] shadow-[0_0_12px_rgba(214,173,105,0.25)] font-semibold'
                      : 'bg-[#00241E]/70 text-neutral-400 border-[#D6AD69]/20 hover:text-white hover:border-[#D6AD69]/40'
                  }`}
                >
                  <span>0{i + 1} {c.title.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>

          {/* 2. Single Animated Card with Touch Gestures & Auto-play Pause on Hover */}
          <div
            className="relative min-h-[225px] flex items-center justify-center my-2"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={`case-${currentIndex}-${animKey}`}
                custom={direction}
                variants={cardSlideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                onClick={() => onSelectCase(currentCase)}
                className="w-full relative bg-[#002B24]/95 hover:bg-[#00352D] active:bg-[#003830] border border-[#D6AD69]/40 active:border-[#D6AD69] rounded-2xl p-5 min-[360px]:p-6 flex flex-col justify-between min-h-[220px] cursor-pointer shadow-[0_12px_32px_rgba(0,0,0,0.45),0_0_24px_rgba(214,173,105,0.12)] outline-none select-none overflow-hidden"
              >
                {/* Subtle Top Progress Timer Line (visible during auto-play) */}
                {!isPaused && !prefersReducedMotion && (
                  <motion.div
                    key={`progress-${currentCase.id}-${animKey}`}
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 5.5, ease: 'linear' }}
                    className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-[#DFB872] via-[#D6AD69] to-[#C39A52] shadow-[0_0_8px_rgba(214,173,105,0.8)]"
                  />
                )}

                <div>
                  {/* Top Row: Icon & Category Badge (Clean, No duplicate numbering) */}
                  <div className="mb-3.5 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 min-[360px]:w-10 min-[360px]:h-10 rounded-xl bg-[#001F1B] border border-[#D6AD69]/40 flex items-center justify-center shadow-xs">
                        {renderCaseIcon(currentCase.title, 'w-5 h-5 text-[#D6AD69]')}
                      </div>
                      <span className="text-[10px] font-sans font-semibold text-[#D6AD69] bg-[#001F1B]/90 px-2.5 py-0.5 rounded-full border border-[#D6AD69]/25 uppercase tracking-wider">
                        {currentCase.category}
                      </span>
                    </div>
                  </div>

                  {/* Case Title */}
                  <h3 className="font-editorial text-[20px] min-[360px]:text-[22px] text-white font-medium tracking-tight mb-2 leading-snug">
                    {currentCase.title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-[12.5px] min-[360px]:text-[13px] font-sans text-neutral-300 font-light leading-relaxed mb-4">
                    {currentCase.shortDescription}
                  </p>
                </div>

                {/* Bottom: Consultation CTA Row */}
                <div className="pt-3 border-t border-[#D6AD69]/20 flex items-center justify-between text-xs font-sans font-semibold text-[#D6AD69] group">
                  <span>Consult on Matter</span>
                  <div className="flex items-center gap-1 text-[#D6AD69]">
                    <span className="text-[11px] font-normal text-neutral-400">Tap to enquire</span>
                    <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 3. Bottom Controls: Single Step Counter, Dot Indicators & Arrow Buttons */}
          <div className="flex items-center justify-between pt-3 pb-1 select-none">
            
            {/* Left: Step Counter (Primary reference indicator) */}
            <div className="flex items-center gap-1 text-xs font-sans text-neutral-400">
              <span className="font-editorial text-sm text-[#D6AD69] font-medium">0{currentIndex + 1}</span>
              <span className="text-neutral-500">/</span>
              <span>0{cases.length}</span>
            </div>

            {/* Center: 7 Pagination Dots */}
            <div className="flex items-center gap-1.5">
              {cases.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSelectIndex(i)}
                  aria-label={`Show case ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    i === currentIndex
                      ? 'w-6 bg-[#D6AD69] shadow-[0_0_8px_rgba(214,173,105,0.6)]'
                      : 'w-1.5 bg-[#D6AD69]/30 hover:bg-[#D6AD69]/60'
                  }`}
                />
              ))}
            </div>

            {/* Right: Prev & Next Arrow Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous case"
                className="w-8 h-8 rounded-full border border-[#D6AD69]/40 bg-[#00241E]/80 flex items-center justify-center text-[#D6AD69] hover:text-white hover:border-[#D6AD69] hover:bg-[#D6AD69]/20 active:scale-95 transition-all shadow-xs cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next case"
                className="w-8 h-8 rounded-full border border-[#D6AD69]/40 bg-[#00241E]/80 flex items-center justify-center text-[#D6AD69] hover:text-white hover:border-[#D6AD69] hover:bg-[#D6AD69]/20 active:scale-95 transition-all shadow-xs cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

        {/* ── DESKTOP & TABLET: COMPACT 4-COLUMN / 2-COLUMN GRID WITH PROGRESSIVE VIEW ALL (>=md) ── */}
        <div className="hidden md:flex flex-col">
          {/* Initial 4 Cards: 4 columns on desktop (lg:grid-cols-4), 2 columns on tablet (md:grid-cols-2) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-5">
            {cases.slice(0, 4).map((caseItem, idx) =>
              renderDesktopCard(caseItem, idx, false)
            )}
          </div>

          {/* Progressively Revealed Additional Cards (smooth expand & collapse) */}
          <AnimatePresence>
            {isDesktopExpanded && (
              <motion.div
                key="additional-cases"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] as const }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-5 pt-4 xl:pt-5">
                  {cases.slice(4).map((caseItem, idx) =>
                    renderDesktopCard(caseItem, idx, true)
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Centered "View All Practice Areas" Toggle Button */}
          {cases.length > 4 && (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={handleToggleExpand}
                aria-expanded={isDesktopExpanded}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#D6AD69]/40 bg-[#00241E]/90 hover:bg-[#003830] hover:border-[#D6AD69] active:scale-95 text-[#D6AD69] hover:text-[#F6F0E5] font-sans text-xs sm:text-sm font-medium tracking-wide shadow-[0_4px_14px_rgba(0,0,0,0.35)] hover:shadow-[0_0_20px_rgba(214,173,105,0.25)] transition-all duration-300 cursor-pointer group"
              >
                <span>
                  {isDesktopExpanded
                    ? 'Show Less ↑'
                    : `View All Practice Areas (${cases.length}) ↓`}
                </span>
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

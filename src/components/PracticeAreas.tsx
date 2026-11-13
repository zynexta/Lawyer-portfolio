import React, { useState, useEffect, useRef } from 'react';
import {
  Scale,
  Briefcase,
  Users,
  FileText,
  ArrowRight,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { PracticeArea } from '../types';

interface PracticeAreasProps {
  practiceAreas: PracticeArea[];
  onSelectPracticeArea: (area: PracticeArea) => void;
}

export const PracticeAreas: React.FC<PracticeAreasProps> = ({
  practiceAreas,
  onSelectPracticeArea,
}) => {
  // 4 primary practice areas matching the reference image blueprint
  const displayAreas = practiceAreas.slice(0, 4);
  const [mobileActiveIdx, setMobileActiveIdx] = useState<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // Track scroll reveal animation state on mobile
  const [revealedCards, setRevealedCards] = useState<boolean[]>([false, false, false, false]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Respect prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setRevealedCards([true, true, true, true]);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            if (!isNaN(index)) {
              setRevealedCards((prev) => {
                if (prev[index]) return prev;
                const next = [...prev];
                next[index] = true;
                return next;
              });
              // Once revealed, unobserve to keep visible and prevent replaying
              observer.unobserve(entry.target);
            }
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '120px 0px 50px 0px',
      }
    );

    cardRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [displayAreas.length]);

  const handleMobileScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, clientWidth } = scrollContainerRef.current;
    if (clientWidth === 0) return;
    const cardWidth = Math.min(310, clientWidth * 0.8) + 14;
    const idx = Math.round(scrollLeft / cardWidth);
    setMobileActiveIdx(Math.max(0, Math.min(displayAreas.length - 1, idx)));
  };

  const scrollToCard = (index: number) => {
    if (!scrollContainerRef.current) return;
    const cards = scrollContainerRef.current.children;
    if (cards[index]) {
      (cards[index] as HTMLElement).scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
    setMobileActiveIdx(index);
  };

  const renderIcon = (iconName: string) => {
    const iconClass = 'w-6 h-6 text-[#D6AD69]';
    switch (iconName) {
      case 'scales':
        return <Scale className={iconClass} strokeWidth={1.6} />;
      case 'briefcase':
        return <Briefcase className={iconClass} strokeWidth={1.6} />;
      case 'users':
        return <Users className={iconClass} strokeWidth={1.6} />;
      case 'file-text':
        return <FileText className={iconClass} strokeWidth={1.6} />;
      default:
        return <Scale className={iconClass} strokeWidth={1.6} />;
    }
  };

  const staggerDelays = [
    'delay-0',
    'delay-[120ms]',
    'delay-[240ms]',
    'delay-[360ms]',
  ];

  return (
    <section
      id="practice-areas"
      className="bg-[#F6F0E5] text-[#171717] py-12 sm:py-20 lg:py-28 relative border-b border-[#E8E1D5] overflow-hidden scroll-mt-14 sm:scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center">

          {/* Left Column: Eyebrow, Heading, Description */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-4 flex flex-col justify-start text-left"
          >
            {/* Section Eyebrow */}
            <div className="flex items-center gap-2 mb-2 sm:mb-3.5">
              <span className="w-6 sm:w-7 h-[1px] bg-[#D6AD69]" />
              <span className="text-[10px] sm:text-xs font-sans tracking-[0.22em] text-[#171717] uppercase font-bold">
                PRACTICE AREAS
              </span>
            </div>

            {/* Section Heading */}
            <h2 className="font-editorial text-2xl min-[360px]:text-3xl sm:text-4xl lg:text-[44px] text-[#171717] leading-[1.12] tracking-tight font-medium mb-2.5 sm:mb-4">
              Areas of <br />
              Legal Expertise
            </h2>

            {/* Section Description */}
            <p className="text-xs sm:text-sm font-sans text-[#5A5A5A] font-normal leading-relaxed max-w-sm">
              Focused legal support across key practice areas with practical, result-oriented solutions.
            </p>
          </motion.div>

          {/* Right Column: 4 Service Cards - Horizontal Swipeable Slider on Mobile (<lg), 4-Col Grid on Desktop (>=lg) */}
          <div className="lg:col-span-8 w-full pb-2 sm:pb-4 pt-1">
            <div
              ref={scrollContainerRef}
              onScroll={handleMobileScroll}
              className="flex lg:grid lg:grid-cols-4 gap-3.5 sm:gap-4 overflow-x-auto lg:overflow-visible snap-x snap-mandatory scroll-smooth no-scrollbar -mx-4 px-4 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0 pb-2.5 pt-1 w-auto"
            >
              {displayAreas.map((area, index) => {
                const isRevealed = revealedCards[index];

                return (
                  <div
                    key={area.id}
                    data-index={index}
                    ref={(el) => {
                      cardRefs.current[index] = el;
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label={`View details for ${area.title}`}
                    onClick={() => onSelectPracticeArea(area)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onSelectPracticeArea(area);
                      }
                    }}
                    className={`practice-card service-card-lux group relative rounded-2xl p-4 sm:p-6 flex flex-col justify-between min-h-[185px] sm:min-h-[220px] md:min-h-[260px] shrink-0 snap-center w-[82vw] min-[360px]:w-[80vw] max-w-[310px] lg:w-full cursor-pointer outline-none select-none transition-all duration-500 ease-out overflow-hidden md:opacity-100 md:translate-y-0 md:delay-0 md:duration-300 motion-reduce:opacity-100 motion-reduce:translate-y-0 motion-reduce:transition-none active:scale-[0.98] hover:-translate-y-1 hover:shadow-[0_14px_30px_-4px_rgba(0,60,50,0.28)] focus-visible:-translate-y-1 focus-visible:ring-2 focus-visible:ring-[#D6AD69] ${staggerDelays[index]} ${
                      isRevealed
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-[16px]'
                    }`}
                  >
                    {/* Flowing curved wave patterns matching reference */}
                    <svg
                      aria-hidden="true"
                      className="card-waves-svg"
                      viewBox="0 0 320 220"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      preserveAspectRatio="none"
                    >
                      <defs>
                        <linearGradient id={`topArcG-${area.id}`} x1="200" y1="0" x2="320" y2="80" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor="#E8DCCB" stopOpacity="0.45" />
                          <stop offset="60%" stopColor="#EFE6D8" stopOpacity="0.2" />
                          <stop offset="100%" stopColor="#FAF7F0" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id={`duneWaveG1-${area.id}`} x1="120" y1="220" x2="320" y2="100" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor="#FAF7F0" stopOpacity="0" />
                          <stop offset="35%" stopColor="#ECE0CE" stopOpacity="0.45" />
                          <stop offset="70%" stopColor="#E3D4C0" stopOpacity="0.45" />
                          <stop offset="100%" stopColor="#DDCDB6" stopOpacity="0.5" />
                        </linearGradient>
                        <linearGradient id={`duneWaveG2-${area.id}`} x1="175" y1="220" x2="320" y2="145" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor="#FAF7F0" stopOpacity="0" />
                          <stop offset="40%" stopColor="#E6D7C2" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#D9C8B0" stopOpacity="0.55" />
                        </linearGradient>
                      </defs>

                      {/* Top Right Subtle Curved Layers */}
                      <path d="M185 0 C215 35 255 65 320 72 L320 0 Z" fill={`url(#topArcG-${area.id})`} />
                      <path d="M185 0 C215 35 255 65 320 72" stroke="rgba(255,255,255,0.75)" strokeWidth="1.2" strokeLinecap="round" />

                      {/* Bottom Right Sweeping Dunes */}
                      <path d="M115 220 C165 210 215 175 320 105 L320 220 Z" fill={`url(#duneWaveG1-${area.id})`} />
                      <path d="M175 220 C215 210 252 175 320 145 L320 220 Z" fill={`url(#duneWaveG2-${area.id})`} />

                      {/* Graceful highlight strokes along the dune crests */}
                      <path d="M115 220 C165 210 215 175 320 105" stroke="rgba(255,255,255,0.85)" strokeWidth="1.2" strokeLinecap="round" />
                      <path d="M175 220 C215 210 252 175 320 145" stroke="rgba(255,255,255,0.7)" strokeWidth="1" strokeLinecap="round" />
                    </svg>

                    {/* Smooth emerald gradient background crossfade on hover/focus */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#003C32] to-[#001F1B] border border-[#D6AD69]/40 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300 ease-out pointer-events-none z-[5]"
                    />

                    {/* Top: Icon & Text Content */}
                    <div className="relative z-10">
                      <div className="mb-3 sm:mb-5">
                        <div className="transition-transform duration-250 ease-out group-hover:scale-105">
                          {renderIcon(area.iconName)}
                        </div>
                      </div>

                      {/* Title: Elegant editorial serif typography matching rest of the website */}
                      <h3
                        className="font-editorial text-[19px] min-[360px]:text-[20px] sm:text-[22px] font-semibold tracking-tight mb-1 sm:mb-1.5 leading-snug transition-colors duration-250 ease-out text-[#171717] group-hover:text-white group-focus-visible:text-white"
                      >
                        {area.title}
                      </h3>

                      {/* Subtitle / Description */}
                      <p
                        className="text-[12px] min-[360px]:text-[12.5px] sm:text-xs font-sans font-normal leading-relaxed transition-colors duration-250 ease-out text-[#5A5A5A] group-hover:text-[#F6F0E5]/85 group-focus-visible:text-[#F6F0E5]/85"
                      >
                        {area.subtitle}
                      </p>
                    </div>

                    {/* Bottom: Circular Arrow Button */}
                    <div className="relative z-10 pt-3 sm:pt-4 flex justify-start">
                      <div
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-300 ease-out bg-[#FBF8F2] border border-[#D6AD69]/55 text-[#171717] group-hover:bg-black/25 group-hover:border-[#D6AD69] group-hover:text-[#D6AD69] group-focus-visible:bg-black/25 group-focus-visible:border-[#D6AD69] group-focus-visible:text-[#D6AD69] shadow-xs"
                      >
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-250 ease-out group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile Pagination Dots for Horizontal Swipeable Slider */}
            <div className="lg:hidden flex items-center justify-center gap-1.5 pt-2 select-none">
              {displayAreas.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => scrollToCard(idx)}
                  aria-label={`Go to practice area ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    mobileActiveIdx === idx
                      ? 'w-6 bg-[#D6AD69]'
                      : 'w-1.5 bg-[#D5CDBC] hover:bg-[#D6AD69]/50'
                  }`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

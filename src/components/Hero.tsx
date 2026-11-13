import React from 'react';
import { ArrowRight, Play, Scale, Shield, Handshake, Calendar, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroProps {
  onOpenConsultation: () => void;
  onOpenVideo: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenConsultation, onOpenVideo }) => {
  const handleScrollDown = () => {
    const nextSection = document.getElementById('practice-areas');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative w-full bg-[#001F1B] text-white overflow-hidden scroll-mt-0"
    >
      {/* ═══════════════════════════════════════════════════════════════════════
          MOBILE HERO VIEW (< md): BESPOKE LUXURY MOBILE EDITORIAL
          ═══════════════════════════════════════════════════════════════════════ */}
      <div className="md:hidden relative w-full flex flex-col pt-14 pb-6 overflow-hidden select-none">
        
        {/* Upper Portion: Lawyer Portrait in Law Chamber */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="relative w-full overflow-hidden"
        >
          <img
            src="/advocate-desk-portrait.jpg"
            alt="Adv. Muhammad Ajmal KTV - Advocate & Legal Consultant"
            className="w-full h-auto max-h-[350px] min-[390px]:max-h-[385px] min-[430px]:max-h-[420px] object-cover object-top block select-none pointer-events-none"
            loading="eager"
            decoding="async"
            width={576}
            height={1024}
          />

          {/* Smooth gradient blending at the bottom of the portrait into deep emerald background */}
          <div className="absolute inset-x-0 bottom-0 h-24 min-[390px]:h-28 bg-gradient-to-t from-[#001F1B] via-[#001F1B]/80 to-transparent pointer-events-none" />
        </motion.div>

        {/* Hero Editorial Content: Positioned below portrait with seamless gradient transition */}
        <div className="relative z-10 px-5 flex flex-col items-center text-center -mt-7 min-[390px]:-mt-9">
          
          {/* Eyebrow: "TRUSTED LEGAL COUNSEL" with subtle gold accent lines */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center gap-2 mb-2 min-[360px]:mb-2.5"
          >
            <span className="w-5 h-[1px] bg-[#D6AD69]/70" />
            <span className="text-[10px] sm:text-[10.5px] font-sans tracking-[0.24em] text-[#D6AD69] uppercase font-semibold">
              TRUSTED LEGAL COUNSEL
            </span>
            <span className="w-5 h-[1px] bg-[#D6AD69]/70" />
          </motion.div>

          {/* Main Headline: "Your Legal Matters, Our Priority" */}
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="font-editorial text-center text-[28px] min-[360px]:text-[31px] min-[390px]:text-[34px] leading-[1.14] tracking-tight mb-2 sm:mb-2.5"
          >
            <span className="sr-only">Adv. Muhammad Ajmal KTV — High Court Advocate &amp; Legal Consultant: </span>
            <span className="block text-white font-normal">
              Your Legal Matters,
            </span>
            <span className="block italic text-[#D6AD69] font-normal mt-0.5">
              Our Priority
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="text-[12px] min-[360px]:text-[12.5px] font-sans text-neutral-200/90 font-light leading-relaxed max-w-[310px] min-[360px]:max-w-[330px] mb-4 min-[360px]:mb-5"
          >
            Practical legal solutions, strategic representation, and dedicated support for individuals and businesses.
          </motion.p>

          {/* Premium Gold Consultation CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="w-full flex justify-center mb-2"
          >
            <button
              type="button"
              onClick={onOpenConsultation}
              className="inline-flex items-center justify-center gap-2.5 h-11 min-[360px]:h-12 px-7 rounded-full bg-[#D6AD69] hover:bg-[#C59C58] active:scale-95 text-[#00241E] text-[13px] font-sans font-semibold tracking-wide transition-all duration-200 shadow-[0_6px_22px_rgba(214,173,105,0.32)] cursor-pointer group"
              aria-label="Book a Consultation"
            >
              <Calendar className="w-4 h-4 text-[#00241E] stroke-[2.2]" />
              <span>Book a Consultation</span>
              <ArrowRight className="w-4 h-4 text-[#00241E] stroke-[2.2] group-hover:translate-x-0.5 transition-transform" />
            </button>
          </motion.div>

          {/* Minimal Gold Decorative Curve near the bottom */}
          <div className="w-full max-w-[260px] h-2.5 my-1 flex items-center justify-center pointer-events-none opacity-40">
            <svg viewBox="0 0 280 12" fill="none" className="w-full h-full text-[#D6AD69]">
              <path d="M0 6C70 6 100 1 170 1C230 1 250 11 280 11" stroke="currentColor" strokeWidth="0.75" />
            </svg>
          </div>

          {/* Scroll Indicator */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            type="button"
            onClick={handleScrollDown}
            aria-label="Scroll down to practice areas"
            className="mt-1 flex flex-col items-center gap-1.5 text-[#D6AD69] hover:text-white transition-colors cursor-pointer group pb-1 select-none"
          >
            <span className="w-[1px] h-4 bg-gradient-to-b from-[#D6AD69]/80 to-transparent" />
            <div className="w-6 h-6 rounded-full border border-[#D6AD69]/40 bg-[#001F1B]/90 flex items-center justify-center shadow-xs group-hover:border-[#D6AD69] group-hover:translate-y-0.5 transition-transform">
              <ChevronDown className="w-3.5 h-3.5 text-[#D6AD69]" />
            </div>
          </motion.button>

        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          TABLET & DESKTOP HERO VIEW (>= md): UNTOUCHED EXISTING COMPOSITION
          ═══════════════════════════════════════════════════════════════════════ */}
      <div className="hidden md:flex relative w-full min-h-[580px] lg:h-[680px] xl:h-[720px] 2xl:h-[760px] items-center pt-18 lg:pt-0 pb-12 lg:pb-0">
        
        {/* Layer 1 & 2: Unified Cinematic Composition (Desktop only: full-bleed library & advocate) */}
        <div
          className="hidden lg:block absolute inset-0 z-0 bg-no-repeat pointer-events-none bg-[right_center]"
          style={{
            backgroundImage: "url('/hero-bg.jpg?v=10')",
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
          aria-hidden="true"
        />

        {/* Subtle overlay on the left to guarantee crisp text legibility without obscuring the golden curve */}
        <div
          className="absolute inset-0 z-0 bg-gradient-to-r from-[#001F1B]/40 via-transparent to-transparent pointer-events-none"
          aria-hidden="true"
        />

        {/* Subtle bottom fade blending cleanly into the section below */}
        <div
          className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-[#001F1B]/70 to-transparent z-0 pointer-events-none"
          aria-hidden="true"
        />

        {/* Content Container */}
        <div className="w-full max-w-[1440px] mx-auto px-8 sm:px-10 lg:px-16 xl:px-20 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8 w-full">
            
            {/* Tablet Portrait (md to lg): Stacked at top */}
            <div className="lg:hidden select-none order-1 w-full max-w-md mx-auto mb-4">
              <div className="relative w-full overflow-hidden">
                <img
                  src="/hero-mobile.jpg"
                  alt="Adv. Muhammad Ajmal KTV - Advocate & Legal Consultant"
                  className="w-full h-auto object-cover select-none pointer-events-none block"
                  loading="eager"
                  decoding="async"
                  width={750}
                  height={750}
                />
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#001F1B] via-[#001F1B]/60 to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Editorial Content: Tablet & Desktop */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="w-full lg:w-[45%] xl:w-[43%] flex flex-col justify-center items-center lg:items-start text-center lg:text-left select-text order-2 lg:order-1"
            >
              <div className="flex items-center justify-center lg:justify-start gap-2.5 mb-3">
                <span className="w-8 h-[1px] bg-[#D6AD69]" />
                <span className="text-xs font-sans tracking-[0.24em] text-[#D6AD69] uppercase font-semibold">
                  LEGAL CONSULTATION
                </span>
                <span className="w-8 h-[1px] bg-[#D6AD69] lg:hidden" />
              </div>

              <h1 className="font-editorial text-center lg:text-left text-4xl sm:text-5xl lg:text-[44px] xl:text-[50px] leading-[1.14] tracking-tight text-white mb-3.5 font-normal">
                <span className="sr-only">Adv. Muhammad Ajmal KTV — High Court Advocate &amp; Legal Consultant: </span>
                Legal Strategy for <br />
                <span className="italic font-editorial text-[#D6AD69] font-normal">
                  Real Solutions.
                </span>
              </h1>

              <p className="text-center lg:text-left text-sm md:text-[14px] font-sans text-neutral-300 font-light leading-relaxed max-w-[420px] mb-6 mx-auto lg:mx-0">
                Trusted legal advisory, strategic representation, and practical solutions for individuals and businesses.
              </p>

              <div className="flex flex-row items-center justify-center lg:justify-start gap-3.5 w-full mb-7 mx-auto lg:mx-0">
                <button
                  type="button"
                  onClick={onOpenConsultation}
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] px-7 py-2.5 rounded-full bg-[#D6AD69] hover:bg-[#C59C58] text-[#171717] text-[13px] font-sans font-semibold tracking-wide transition-all duration-300 shadow-[0_6px_22px_rgba(214,173,105,0.35)] group cursor-pointer active:scale-95"
                >
                  <span>Book a Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#171717] group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  type="button"
                  onClick={onOpenVideo}
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] px-6 py-2.5 rounded-full bg-[#002B24]/40 hover:bg-[#003C32] border border-[#D6AD69]/50 text-[#F6F0E5] text-[13px] font-sans font-medium tracking-wide transition-all duration-300 group cursor-pointer active:scale-95"
                >
                  <div className="w-4.5 h-4.5 rounded-full border border-[#D6AD69] flex items-center justify-center text-[#D6AD69] group-hover:scale-105 transition-transform">
                    <Play className="w-2 h-2 fill-current ml-0.5 text-[#D6AD69]" />
                  </div>
                  <span>View Portfolio</span>
                </button>
              </div>

              <div className="grid grid-cols-3 items-center max-w-[420px] w-full pt-4 lg:pt-5 lg:border-t lg:border-[#D6AD69]/20 mx-auto lg:mx-0">
                <div className="flex flex-col items-center justify-center text-center gap-1.5 border-r border-[#D6AD69]/25 pr-2">
                  <Scale className="w-4 h-4 text-[#D6AD69]" strokeWidth={1.75} />
                  <span className="text-[11px] text-[#F6F0E5] font-sans font-medium">
                    Legal Advice
                  </span>
                </div>

                <div className="flex flex-col items-center justify-center text-center gap-1.5 border-r border-[#D6AD69]/25 px-2">
                  <Shield className="w-4 h-4 text-[#D6AD69]" strokeWidth={1.75} />
                  <span className="text-[11px] text-[#F6F0E5] font-sans font-medium">
                    Case Representation
                  </span>
                </div>

                <div className="flex flex-col items-center justify-center text-center gap-1.5 pl-2">
                  <Handshake className="w-4 h-4 text-[#D6AD69]" strokeWidth={1.75} />
                  <span className="text-[11px] text-[#F6F0E5] font-sans font-medium">
                    Dispute Resolution
                  </span>
                </div>
              </div>

            </motion.div>

            {/* Desktop Spacer */}
            <div className="hidden lg:block w-full lg:w-[55%] xl:w-[57%] h-full min-h-[480px] pointer-events-none select-none order-2" />

          </div>
        </div>
      </div>
    </section>
  );
};

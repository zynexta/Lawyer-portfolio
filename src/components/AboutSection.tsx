import React from 'react';
import { ArrowRight, GraduationCap, Landmark, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

interface AboutSectionProps {
  onOpenAboutModal: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenAboutModal }) => {
  const credentials = [
    {
      title: 'Bachelor of Laws (LL.B.)',
      subtitle: 'Qualified legal education',
      icon: GraduationCap,
    },
    {
      title: 'Practicing at the High Court',
      subtitle: 'Focused on diverse legal matters',
      icon: Landmark,
    },
    {
      title: 'Client-Centric Approach',
      subtitle: 'Transparent, ethical, and result-driven',
      icon: ShieldCheck,
    },
  ];

  return (
    <section
      id="about"
      className="bg-[#F6F0E5] text-[#171717] py-12 sm:py-20 lg:py-28 relative border-b border-[#E8E1D5] overflow-hidden scroll-mt-14 sm:scroll-mt-20"
    >
      {/* Subtle Classical Indian Courthouse Architectural Illustration in Background Right */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 sm:w-96 lg:w-[480px] h-[300px] sm:h-[340px] pointer-events-none opacity-[0.07] text-[#D6AD69] select-none">
        <svg viewBox="0 0 500 400" className="w-full h-full" fill="currentColor">
          {/* Classical Colonnade, Triangular Pediment, & Dome */}
          <path d="M250 20 L480 90 L20 90 Z" />
          <rect x="30" y="95" width="440" height="15" />
          {/* 8 Classical Columns */}
          <rect x="50" y="115" width="22" height="180" />
          <rect x="105" y="115" width="22" height="180" />
          <rect x="160" y="115" width="22" height="180" />
          <rect x="215" y="115" width="22" height="180" />
          <rect x="265" y="115" width="22" height="180" />
          <rect x="320" y="115" width="22" height="180" />
          <rect x="375" y="115" width="22" height="180" />
          <rect x="430" y="115" width="22" height="180" />
          {/* Base Steps */}
          <rect x="20" y="300" width="460" height="20" />
          <rect x="5" y="325" width="490" height="25" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-8 items-center">
          
          {/* Left Column: Circular Advocate Portrait with Thin Gold Frame & Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-4 flex justify-center"
          >
            <div className="relative group">
              {/* Outer Circular Thin Gold Ring */}
              <div className="w-44 h-44 min-[360px]:w-52 min-[360px]:h-52 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full border-2 border-[#D6AD69] p-1.5 sm:p-2 bg-[#F6F0E5] shadow-[0_12px_32px_rgba(214,173,105,0.25)]">
                {/* Dark Green Circular Background Behind Portrait */}
                <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-b from-[#003C32] to-[#001F1B] relative">
                  <img
                    src="/advocate-real.jpg"
                    alt="Adv. Muhammad Ajmal KTV - Advocate High Court"
                    className="w-full h-full object-cover object-[50%_20%] transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>

              {/* Overlapping Dark Green Designation Badge */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#00241E] text-white px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-sans font-semibold tracking-wider uppercase border border-[#D6AD69]/60 shadow-md flex items-center gap-1.5 whitespace-nowrap">
                <Landmark className="w-3.5 h-3.5 text-[#D6AD69]" />
                <span>Advocate, High Court</span>
              </div>
            </div>
          </motion.div>

          {/* Center Column: Section Eyebrow, Heading, Description & Know More CTA */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="lg:col-span-4 flex flex-col justify-center text-center lg:text-left mt-2 sm:mt-4 mb-1 sm:mb-2 lg:my-0"
          >
            {/* Eyebrow */}
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-2 sm:mb-3">
              <span className="w-6 sm:w-7 h-[1px] bg-[#D6AD69]" />
              <span className="text-[10px] sm:text-xs font-sans tracking-[0.22em] text-[#171717] uppercase font-bold">
                ABOUT
              </span>
            </div>

            {/* Heading */}
            <h2 className="font-editorial text-2xl min-[360px]:text-[26px] sm:text-4xl lg:text-[40px] leading-tight text-[#171717] font-medium mb-2.5 sm:mb-4">
              Adv. Muhammad <br className="hidden sm:inline" />
              Ajmal KTV
            </h2>

            {/* Description */}
            <p className="text-xs min-[360px]:text-[13px] sm:text-[13.5px] font-sans text-[#5A5A5A] font-normal leading-relaxed mb-4 sm:mb-6 max-w-md mx-auto lg:mx-0">
              A dedicated legal professional committed to upholding justice through ethical practice, strategic counsel, and client-focused solutions.
            </p>

            {/* Know More Button: Champagne Gold */}
            <div className="flex justify-center lg:justify-start">
              <button
                type="button"
                onClick={onOpenAboutModal}
                className="w-full max-w-[280px] sm:max-w-none sm:w-auto inline-flex items-center justify-center gap-2 min-h-[44px] px-7 py-2.5 rounded-full bg-[#D6AD69] hover:bg-[#C59C58] text-[#171717] text-xs font-sans font-semibold tracking-wider transition-all duration-300 shadow-[0_4px_14px_rgba(214,173,105,0.25)] group cursor-pointer active:scale-95"
              >
                <span>Know More</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#171717] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* Right Column: 3 Professional Credentials with Gold Line Icons */}
          <div className="lg:col-span-4 flex flex-col space-y-2.5 sm:space-y-4">
            {credentials.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-[#FAF6EE] border border-[#E8E1D5] hover:border-[#D6AD69]/50 active:border-[#D6AD69] transition-all shadow-xs select-none"
                >
                  {/* Gold Line Icon */}
                  <div className="w-10 h-10 rounded-lg bg-[#F6F0E5] border border-[#D6AD69]/30 flex items-center justify-center text-[#D6AD69] shrink-0">
                    <Icon className="w-5 h-5 text-[#D6AD69]" strokeWidth={1.6} />
                  </div>

                  {/* Title & Subtitle */}
                  <div className="text-left">
                    <h3 className="font-editorial text-[15px] sm:text-[17px] text-[#171717] font-medium leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs font-sans text-[#5A5A5A] mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

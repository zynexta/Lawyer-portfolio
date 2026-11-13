import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface FinalConsultationCTAProps {
  onOpenConsultation: () => void;
}

export const FinalConsultationCTA: React.FC<FinalConsultationCTAProps> = ({
  onOpenConsultation,
}) => {
  return (
    <section className="relative bg-gradient-to-r from-[#00241E] via-[#001F1B] to-[#001815] text-white py-12 sm:py-20 lg:py-28 overflow-hidden border-b border-[#D6AD69]/20">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 right-1/4 w-[280px] sm:w-[400px] h-[280px] sm:h-[400px] bg-[#003C32]/40 rounded-full blur-[90px] sm:blur-[130px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Premium Legal Library Image with Golden Scales of Justice */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden aspect-[16/10] sm:aspect-[4/3] shadow-md sm:shadow-[0_12px_30px_rgba(0,0,0,0.5)] border border-[#D6AD69]/30">
            <img
              src="/cta-scales.jpg"
              alt="Golden Scales of Justice on Classical Law Desk"
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
              width={640}
              height={480}
            />
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#001F1B]/40 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Right Column: Centered / Left-Aligned Content */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left lg:pl-6"
          >
            {/* Section Eyebrow */}
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-2 sm:mb-3">
              <span className="w-6 sm:w-7 h-[1px] bg-[#D6AD69]" />
              <span className="text-[10px] sm:text-xs font-sans tracking-[0.22em] text-[#D6AD69] uppercase font-semibold">
                GET LEGAL SUPPORT
              </span>
            </div>

            {/* Heading */}
            <h2 className="font-editorial text-2xl min-[360px]:text-3xl sm:text-4xl lg:text-[46px] text-white leading-tight font-medium mb-2 sm:mb-4">
              Need Legal Guidance?
            </h2>

            {/* Description */}
            <p className="text-xs sm:text-sm font-sans text-neutral-300 font-light max-w-md mx-auto lg:mx-0 leading-relaxed mb-4 sm:mb-8">
              Schedule a consultation and get expert advice for your legal concern.
            </p>

            {/* Champagne Gold Consultation Button - Full width on Mobile */}
            <div className="flex justify-center lg:justify-start">
              <button
                type="button"
                onClick={onOpenConsultation}
                className="w-full max-w-[320px] min-[360px]:max-w-[350px] sm:max-w-none sm:w-auto inline-flex items-center justify-center gap-2 min-h-[44px] sm:min-h-[48px] px-7 sm:px-8 py-3 sm:py-3.5 rounded-full bg-[#D6AD69] hover:bg-[#C59C58] text-[#171717] text-xs sm:text-[13px] font-sans font-semibold tracking-wide transition-all duration-300 shadow-[0_6px_22px_rgba(214,173,105,0.35)] group cursor-pointer active:scale-95"
              >
                <span>Book a Consultation</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#171717] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

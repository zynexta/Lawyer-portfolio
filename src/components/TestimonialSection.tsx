import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialSectionProps {
  testimonials: Testimonial[];
}

export const TestimonialSection: React.FC<TestimonialSectionProps> = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [testimonials.length, isPaused]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (diff > 40) {
      handlePrev();
    } else if (diff < -40) {
      handleNext();
    }
    touchStartX.current = null;
  };

  const current = testimonials[currentIndex];

  const variants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? 30 : -30,
    }),
    center: {
      opacity: 1,
      x: 0,
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? -30 : 30,
    }),
  };

  return (
    <section
      id="testimonials"
      className="bg-[#F6F0E5] text-[#171717] py-12 sm:py-20 lg:py-28 relative border-b border-[#E8E1D5] overflow-hidden scroll-mt-14 sm:scroll-mt-20"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Eyebrow, Heading, Description */}
          <div className="lg:col-span-4 flex flex-col justify-start text-left">
            {/* Section Eyebrow */}
            <div className="flex items-center gap-2 mb-2 sm:mb-3.5">
              <span className="w-6 sm:w-7 h-[1px] bg-[#D6AD69]" />
              <span className="text-[10px] sm:text-xs font-sans tracking-[0.22em] text-[#171717] uppercase font-bold">
                TESTIMONIALS
              </span>
            </div>

            {/* Heading */}
            <h2 className="font-editorial text-2xl min-[360px]:text-3xl sm:text-4xl lg:text-[44px] text-[#171717] leading-[1.12] tracking-tight font-medium mb-2 sm:mb-4">
              Client <br />
              Experiences
            </h2>

            {/* Description */}
            <p className="text-xs sm:text-sm font-sans text-[#5A5A5A] font-normal leading-relaxed mb-4 sm:mb-8 max-w-sm">
              Real stories from clients who trusted our legal expertise and guidance.
            </p>
          </div>

          {/* Right Column: Prominent Editorial Testimonial Quotation (Touch-Swipeable Carousel on Mobile) */}
          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="lg:col-span-8 relative bg-[#FAF6EE] border border-[#E8E1D5] rounded-2xl sm:rounded-3xl p-5 sm:p-10 lg:p-12 shadow-xs sm:shadow-sm overflow-hidden select-none"
          >
            {/* Subtle Gold Quotation Mark Top Left */}
            <span className="font-editorial text-3xl sm:text-6xl text-[#D6AD69] opacity-70 leading-none select-none block mb-1.5 sm:mb-3 pointer-events-none">
              “
            </span>

            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={current.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-2xl min-h-[110px] sm:min-h-[140px] flex flex-col justify-between"
              >
                {/* Quote Text */}
                <p className="font-editorial text-[14.5px] min-[360px]:text-base sm:text-xl md:text-2xl font-normal text-[#171717] leading-relaxed tracking-tight mb-4 sm:mb-6">
                  &ldquo;{current.quote}&rdquo;
                </p>

                {/* Author Signature */}
                <div className="flex items-center gap-2 text-xs sm:text-sm font-sans font-medium text-[#5A5A5A]">
                  <span className="w-5 h-[1.5px] bg-[#D6AD69]" />
                  <span className="text-[#171717] font-semibold">{current.clientRole}</span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Subtle Gold Quotation Mark Bottom Right */}
            <span className="font-editorial text-3xl sm:text-6xl text-[#D6AD69] opacity-20 leading-none select-none absolute bottom-4 right-5 sm:bottom-6 sm:right-8 pointer-events-none">
              ”
            </span>

            {/* Navigation: Touch-Friendly Buttons & Dot Indicators */}
            <div className="flex items-center justify-between pt-4 sm:pt-8 mt-4 sm:mt-6 border-t border-[#E8E1D5]/60 select-none">
              {/* Dot Indicators */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                {testimonials.map((item, idx) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setDirection(idx > currentIndex ? 1 : -1);
                      setCurrentIndex(idx);
                    }}
                    aria-label={`Go to testimonial ${idx + 1}`}
                    className={`transition-all duration-300 rounded-full cursor-pointer active:scale-90 ${
                      currentIndex === idx
                        ? 'w-5 sm:w-6 h-1.5 sm:h-2 bg-[#D6AD69]'
                        : 'w-1.5 sm:w-2 h-1.5 sm:h-2 bg-[#D5CDBC] hover:bg-[#D6AD69]/60'
                    }`}
                  />
                ))}
              </div>

              {/* Prev / Next Arrows */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous testimonial"
                  className="w-8 h-8 rounded-full border border-[#D5CDBC] bg-white hover:bg-[#FAF6EE] text-[#171717] flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-90"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next testimonial"
                  className="w-8 h-8 rounded-full border border-[#D5CDBC] bg-white hover:bg-[#FAF6EE] text-[#171717] flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-90"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

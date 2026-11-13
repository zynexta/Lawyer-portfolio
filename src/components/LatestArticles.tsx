import React, { useState, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Article } from '../types';

interface LatestArticlesProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const LatestArticles: React.FC<LatestArticlesProps> = ({
  articles,
  onSelectArticle,
}) => {
  const [mobileActiveIdx, setMobileActiveIdx] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const handleMobileScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, clientWidth } = scrollContainerRef.current;
    if (clientWidth === 0) return;
    const cardWidth = Math.min(320, clientWidth * 0.82) + 14;
    const idx = Math.round(scrollLeft / cardWidth);
    setMobileActiveIdx(Math.max(0, Math.min(articles.length - 1, idx)));
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

  return (
    <section
      id="insights"
      className="bg-[#F6F0E5] text-[#171717] py-12 sm:py-20 lg:py-28 relative border-b border-[#E8E1D5] overflow-hidden scroll-mt-14 sm:scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-start">

          {/* Left Column: Eyebrow, Heading, Description */}
          <div className="lg:col-span-4 flex flex-col justify-start text-left">
            {/* Section Eyebrow */}
            <div className="flex items-center gap-2 mb-2 sm:mb-3.5">
              <span className="w-6 sm:w-7 h-[1px] bg-[#D6AD69]" />
              <span className="text-[10px] sm:text-xs font-sans tracking-[0.22em] text-[#171717] uppercase font-bold">
                INSIGHTS
              </span>
            </div>

            {/* Heading */}
            <h2 className="font-editorial text-2xl min-[360px]:text-3xl sm:text-4xl lg:text-[44px] text-[#171717] leading-[1.12] tracking-tight font-medium mb-2 sm:mb-4">
              Latest <br />
              Articles
            </h2>

            {/* Description */}
            <p className="text-xs sm:text-sm font-sans text-[#5A5A5A] font-normal leading-relaxed mb-4 sm:mb-8 max-w-sm">
              Practical legal insights, case updates, and informative articles on relevant topics.
            </p>
          </div>

          {/* Right Column: 3 Article Cards - Horizontal Swipeable on Mobile (<sm), 3-col Grid on Desktop (>=sm) */}
          <div className="lg:col-span-8 w-full">
            <div
              ref={scrollContainerRef}
              onScroll={handleMobileScroll}
              className="flex sm:grid sm:grid-cols-3 gap-3.5 sm:gap-5 overflow-x-auto sm:overflow-visible snap-x snap-mandatory scroll-smooth no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 pb-2.5 pt-1 w-auto"
            >
              {articles.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => onSelectArticle(article)}
                  className="group bg-[#FAF6EE] border border-[#E8E1D5] hover:border-[#D6AD69]/60 active:border-[#D6AD69] rounded-2xl p-3.5 sm:p-4 flex flex-col justify-between cursor-pointer shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 shrink-0 snap-center w-[84vw] min-[360px]:w-[82vw] max-w-[320px] sm:w-full outline-none select-none"
                >
                  <div>
                    {/* Landscape Thumbnail - Full Width within Card with subtle zoom effect */}
                    <div className="relative overflow-hidden rounded-xl bg-neutral-900 aspect-[16/10] mb-3">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 group-active:scale-105"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                    </div>

                    {/* Category & Reading Time */}
                    <div className="flex items-center justify-between text-[9.5px] sm:text-[10px] font-sans font-semibold tracking-wider uppercase mb-1.5 sm:mb-2">
                      <span className="text-[#003C32] bg-[#003C32]/10 px-2 py-0.5 rounded-md font-bold">
                        {article.category}
                      </span>
                      <span className="text-[#5A5A5A]">
                        {article.readTime}
                      </span>
                    </div>

                    {/* Article Title */}
                    <h3 className="font-editorial text-[15px] sm:text-[17px] font-medium text-[#171717] leading-snug tracking-tight group-hover:text-[#003C32] transition-colors mb-3 line-clamp-2">
                      {article.title}
                    </h3>
                  </div>

                  {/* Bottom: Read Article Action */}
                  <div className="pt-2.5 border-t border-[#E8E1D5] flex items-center justify-between text-[10.5px] sm:text-[11px] font-sans font-bold text-[#171717] tracking-wider uppercase group-hover:text-[#003C32]">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.article>
              ))}
            </div>

            {/* Mobile Pagination Dots for Article Slider */}
            <div className="sm:hidden flex items-center justify-center gap-1.5 pt-2 select-none">
              {articles.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => scrollToCard(idx)}
                  aria-label={`Go to article ${idx + 1}`}
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

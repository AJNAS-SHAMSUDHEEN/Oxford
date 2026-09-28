import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Clock, Search, Sparkles, ArrowRight, Check } from 'lucide-react';
import { TOURS_DATA, CATEGORIES } from '../data/toursData';

export default function PopularTours({ onBookTour }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Filter tours
  const filteredTours = TOURS_DATA.filter((tour) => {
    const matchesCategory =
      activeCategory === 'All' || tour.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch =
      tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tour.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const itemsPerPage = 4;
  const maxIndex = Math.max(0, filteredTours.length - itemsPerPage);

  const handleNext = () => {
    setCarouselIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const handlePrev = () => {
    setCarouselIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <section
      id="tours"
      className="py-24 lg:py-32 relative overflow-hidden bg-[#073326] text-white"
      style={{
        backgroundImage:
          'url(https://mediumpurple-eagle-702053.hostingersite.com/wp-content/uploads/2025/12/patern.png)',
        backgroundRepeat: 'repeat',
      }}
    >
      {/* Background ambient lighting with liquid blobs */}
      <div className="absolute inset-0 bg-[#073326]/90 pointer-events-none" />
      <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#ffaa0d]/15 to-[#0e674d]/25 blur-3xl pointer-events-none liquid-blob-1" />
      <div className="absolute bottom-1/4 -right-20 w-[550px] h-[550px] rounded-full bg-gradient-to-br from-[#c59a4b]/20 to-[#041a13]/30 blur-3xl pointer-events-none liquid-blob-2" />

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        {/* Section Head */}
        <div className="section-head text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 rounded-full liquid-glass-dark text-[#ffaa0d] text-xs font-bold uppercase tracking-widest mb-3 border border-amber-400/30"
          >
            Handcrafted Qatar Experiences
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white mb-4 tracking-tight leading-tight"
            style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
          >
            Explore Popular <span className="text-[#ffaa0d] italic">Tours!</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-white/80 text-base md:text-lg font-light leading-relaxed"
          >
            Destinations worth exploring! Here are our most requested private and VIP Qatar tours.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex justify-center mt-5"
          >
            <img
              src="https://oxfordadventuretourism.com/wp-content/themes/travlla/assets/images/background/Title-Separator.png"
              alt="Separator"
              className="h-4 w-auto brightness-200 opacity-90"
            />
          </motion.div>
        </div>

        {/* Filter Tabs and Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-5 mb-12">
          {/* Categories Pills */}
          <div className="flex items-center gap-2.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const count =
                cat === 'All'
                  ? TOURS_DATA.length
                  : TOURS_DATA.filter((t) => t.category.toLowerCase() === cat.toLowerCase()).length;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setCarouselIndex(0);
                  }}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap cursor-pointer flex items-center gap-2 ${activeCategory === cat
                      ? 'bg-gradient-to-r from-[#ffaa0d] to-[#c59a4b] text-gray-950 shadow-xl scale-105 border border-amber-300'
                      : 'liquid-glass-dark text-white/90 hover:text-white border border-white/15'
                    }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeCategory === cat ? 'bg-black/25 text-black' : 'bg-white/20 text-white'
                    }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60" />
            <input
              type="text"
              placeholder="Search tours..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCarouselIndex(0);
              }}
              className="w-full pl-11 pr-4 py-2.5 rounded-full liquid-glass-dark border border-white/20 text-white placeholder-white/50 text-sm focus:outline-none focus:border-[#ffaa0d] transition-all"
            />
          </div>
        </div>

        {/* Tours Carousel Grid */}
        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
            <AnimatePresence mode="popLayout">
              {filteredTours.slice(carouselIndex, carouselIndex + itemsPerPage).map((tour, index) => (
                <motion.div
                  key={tour.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  whileHover={{ y: -10 }}
                  className="group liquid-glass liquid-glass-card rounded-3xl overflow-hidden flex flex-col justify-between text-gray-900 border border-white/70"
                >
                  {/* Media Banner */}
                  <div className="relative h-60 w-full overflow-hidden bg-gray-100">
                    <img
                      src={tour.image}
                      alt={tour.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />

                    {/* Gradient shadow */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

                    {/* Category pill */}
                    <div className="absolute top-3.5 left-3.5 bg-[#0e674d]/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-white/20">
                      {tour.category}
                    </div>

                    {/* Duration badge */}
                    <div className="absolute top-3.5 right-3.5 bg-black/60 backdrop-blur-md text-white/95 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5 border border-white/15">
                      <Clock size={12} className="text-[#ffaa0d]" />
                      <span>{tour.duration}</span>
                    </div>

                    {/* Price Tag Overlay */}
                    <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-white">
                      <div>
                        <span className="text-[10px] text-white/80 block uppercase tracking-wider font-medium">Starting From</span>
                        <span className="text-xl font-black text-[#ffaa0d] font-sans">
                          {tour.currency} {tour.price}
                        </span>
                      </div>
                      <span className="text-xs text-white/80 font-medium">Private Vehicle</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-2.5">
                        <div className="flex text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={13}
                              className={i < 4 ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}
                            />
                          ))}
                        </div>
                        <span className="text-xs font-bold text-gray-800">({tour.rating})</span>
                        <span className="text-[11px] text-gray-400">({tour.reviews} reviews)</span>
                      </div>

                      {/* Title */}
                      <h3 className="font-serif text-2xl text-[#0e674d] font-bold leading-snug line-clamp-2 mb-2.5 group-hover:text-[#c59a4b] transition-colors">
                        {tour.title}
                      </h3>

                      {/* Short Description */}
                      <p className="text-gray-600 text-xs line-clamp-2 leading-relaxed mb-6 font-normal">
                        {tour.description}
                      </p>
                    </div>

                    {/* Action button */}
                    <div className="pt-4 border-t border-gray-100">
                      <button
                        onClick={() => onBookTour(tour)}
                        className="w-full py-3 px-4 rounded-full font-bold text-xs uppercase tracking-wider text-[#0e674d] border-2 border-[#0e674d] hover:bg-[#0e674d] hover:text-white transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm group/btn"
                      >
                        <span>Reserve Tour</span>
                        <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Carousel Arrows and Page Indicator */}
          <div className="flex items-center justify-between mt-12 pt-6 border-t border-white/10">
            <div className="text-xs sm:text-sm text-white/70">
              Showing <span className="font-bold text-white">{Math.min(filteredTours.length, carouselIndex + 1)}</span> to{' '}
              <span className="font-bold text-white">{Math.min(filteredTours.length, carouselIndex + itemsPerPage)}</span> of{' '}
              <span className="font-bold text-white">{filteredTours.length}</span> curated tours
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                disabled={carouselIndex === 0}
                aria-label="Previous tours"
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${carouselIndex === 0
                    ? 'bg-white/10 text-white/30 cursor-not-allowed'
                    : 'bg-[#c59a4b] hover:bg-[#ffaa0d] text-white hover:text-gray-950 cursor-pointer shadow-lg'
                  }`}
              >
                <ChevronLeft size={20} />
              </button>

              <button
                onClick={handleNext}
                disabled={carouselIndex >= maxIndex}
                aria-label="Next tours"
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${carouselIndex >= maxIndex
                    ? 'bg-white/10 text-white/30 cursor-not-allowed'
                    : 'bg-[#c59a4b] hover:bg-[#ffaa0d] text-white hover:text-gray-950 cursor-pointer shadow-lg'
                  }`}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

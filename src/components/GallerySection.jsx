import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ChevronLeft, ChevronRight, MapPin, Camera } from 'lucide-react';

const GALLERY_IMAGES = [
  {
    title: 'Katara Amphitheatre',
    category: 'Architecture',
    location: 'Katara Cultural Village',
    src: 'https://oxfordadventuretourism.com/wp-content/uploads/2026/07/katara-amphitheatre-2.webp',
  },
  {
    title: 'Historic Souq Waqif',
    category: 'Heritage',
    location: 'Central Doha',
    src: 'https://oxfordadventuretourism.com/wp-content/uploads/2026/07/qatartourism_souqwaqif1.webp',
  },
  {
    title: 'Inland Sea Dunes',
    category: 'Desert',
    location: 'Khor Al Adaid',
    src: 'https://oxfordadventuretourism.com/wp-content/uploads/2026/07/dessert-safari-600x500.webp',
  },
  {
    title: 'Doha Corniche Skyline',
    category: 'City',
    location: 'West Bay Bayfront',
    src: 'https://oxfordadventuretourism.com/wp-content/uploads/2025/12/corniche-71-1000x600.webp',
  },
  {
    title: 'Traditional Wooden Dhow',
    category: 'Culture',
    location: 'Doha Port',
    src: 'https://oxfordadventuretourism.com/wp-content/uploads/2026/07/dubai-dhow-cruise-3-600x500.webp',
  },
  {
    title: 'Old Doha Port & Marina',
    category: 'City',
    location: 'Mina District',
    src: 'https://oxfordadventuretourism.com/wp-content/uploads/2026/07/OLD-DOHA-PORT-600x500.webp',
  },
  {
    title: 'Al Zubarah Historic Fort',
    category: 'Heritage',
    location: 'Northern Coast',
    src: 'https://oxfordadventuretourism.com/wp-content/uploads/2026/07/North-Heritage-Tours-600x500.webp',
  },
  {
    title: 'Falconry Heritage',
    category: 'Culture',
    location: 'Souq Falcon Area',
    src: 'https://oxfordadventuretourism.com/wp-content/uploads/2026/07/falconryexperiencesheaderjpg-600x500.avif',
  },
];

export default function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'Desert', 'City', 'Heritage', 'Culture', 'Architecture'];

  const filtered =
    activeFilter === 'All'
      ? GALLERY_IMAGES
      : GALLERY_IMAGES.filter((img) => img.category === activeFilter);

  const handlePrev = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev > 0 ? prev - 1 : filtered.length - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : 0));
  };

  return (
    <section id="gallery" className="py-24 lg:py-32 bg-[#fcfbf9] relative overflow-hidden">
      {/* Ambient Liquid Blobs for Glass Refraction */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-[#0e674d]/10 filter blur-[90px] pointer-events-none liquid-blob-1" />
      <div className="absolute bottom-10 -right-20 w-96 h-96 rounded-full bg-[#c59a4b]/15 filter blur-[90px] pointer-events-none liquid-blob-2" />

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        {/* Section Heading */}
        <div className="section-head text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 rounded-full liquid-glass text-[#0e674d] text-xs font-bold uppercase tracking-widest mb-3 border border-[#0e674d]/20"
          >
            Visual Journey
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#0e674d] mb-4 tracking-tight leading-tight"
            style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
          >
            Qatar Adventure <span className="text-[#c59a4b] italic">Gallery</span>
          </motion.h2>

          <p className="text-gray-600 text-base md:text-lg font-light leading-relaxed">
            Immerse yourself in snapshots of luxury, golden desert expanses, and timeless Arab culture.
          </p>

          <div className="flex justify-center mt-5">
            <img
              src="https://oxfordadventuretourism.com/wp-content/themes/travlla/assets/images/background/Title-Separator.png"
              alt="Separator"
              className="h-4 w-auto opacity-80"
            />
          </div>
        </div>

        {/* Filter buttons with Liquid Glass Pills */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveFilter(cat);
                setLightboxIndex(null);
              }}
              className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${activeFilter === cat
                  ? 'bg-gradient-to-r from-[#0e674d] to-[#128060] text-white shadow-lg scale-105 border border-emerald-400/40'
                  : 'liquid-glass-pill text-gray-700 hover:text-[#0e674d] hover:border-[#0e674d]/40'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {filtered.map((item, idx) => (
              <motion.div
                key={item.title}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                whileHover={{ y: -8 }}
                onClick={() => setLightboxIndex(idx)}
                className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Always subtle top tag */}
                <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-white text-[11px] font-semibold border border-white/20">
                  {item.category}
                </div>

                {/* Hover overlay with zoom icon and title */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#083a2c]/95 via-[#083a2c]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                  <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-3">
                    <ZoomIn size={20} className="text-white" />
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-white/80 mb-1">
                    <MapPin size={12} className="text-[#ffaa0d]" />
                    <span>{item.location}</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold leading-tight">{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal with Next/Prev Controls */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Close button */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer z-50"
            >
              <X size={26} />
            </button>

            {/* Prev arrow */}
            <button
              onClick={handlePrev}
              className="absolute left-6 top-1/2 -translate-y-1/2 p-3.5 rounded-full bg-white/10 hover:bg-[#ffaa0d] text-white hover:text-gray-950 transition-all cursor-pointer z-50"
            >
              <ChevronLeft size={28} />
            </button>

            {/* Next arrow */}
            <button
              onClick={handleNext}
              className="absolute right-6 top-1/2 -translate-y-1/2 p-3.5 rounded-full bg-white/10 hover:bg-[#ffaa0d] text-white hover:text-gray-950 transition-all cursor-pointer z-50"
            >
              <ChevronRight size={28} />
            </button>

            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-5xl max-h-[88vh] overflow-hidden rounded-3xl bg-black border border-white/20 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filtered[lightboxIndex].src}
                alt={filtered[lightboxIndex].title}
                className="w-full h-auto max-h-[75vh] object-contain mx-auto"
              />
              <div className="p-5 bg-[#083a2c] text-white flex items-center justify-between border-t border-white/10">
                <div>
                  <h3 className="font-serif text-2xl text-[#ffaa0d] font-bold">
                    {filtered[lightboxIndex].title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-white/70 mt-1">
                    <span className="flex items-center gap-1">
                      <MapPin size={12} className="text-[#ffaa0d]" />
                      {filtered[lightboxIndex].location}
                    </span>
                    <span>•</span>
                    <span className="text-[#c59a4b] font-bold">
                      {filtered[lightboxIndex].category}
                    </span>
                  </div>
                </div>
                <div className="text-xs text-white/60">
                  {lightboxIndex + 1} / {filtered.length}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

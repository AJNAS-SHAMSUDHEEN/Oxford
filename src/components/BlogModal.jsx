import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, User, Tag, Share2, CheckCircle2 } from 'lucide-react';

export default function BlogModal({ blog, onClose, onBookNow }) {
  if (!blog) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-3xl liquid-glass rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col border border-white/80"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header image with close button */}
          <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-black">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2.5 rounded-full liquid-glass-dark text-white border border-white/20 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="inline-block bg-[#ffaa0d] text-gray-950 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2 shadow-sm">
                {blog.category}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                {blog.title}
              </h2>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-gray-700 text-base leading-relaxed flex-1">
            <div className="flex items-center gap-6 text-xs text-gray-500 border-b border-gray-200/60 pb-4">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} className="text-[#0e674d]" />
                {blog.date}, 2026
              </span>
              <span className="flex items-center gap-1.5">
                <User size={14} className="text-[#0e674d]" />
                {blog.author}
              </span>
            </div>

            <p className="text-lg font-medium text-gray-900 leading-relaxed">
              {blog.excerpt}
            </p>

            <p>
              Qatar seamlessly blends ancient Bedouin culture with avant-garde modern ambition. Whether venturing out into the serene desert dunes at the UNESCO Inland Sea (Khor Al Adaid) or wandering through fragrant, lantern-lit alleys of Souq Waqif, every moment reveals genuine warmth and Arabian grandeur.
            </p>

            <div className="liquid-glass-gold p-6 rounded-2xl border border-[#c59a4b]/40 space-y-2 shadow-sm">
              <h4 className="font-serif text-xl text-[#0e674d] font-bold">Key Travel Tips</h4>
              <ul className="space-y-1.5 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#0e674d]" /> Best time for desert safaris: Late afternoon to catch the sunset glow.
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#0e674d]" /> Dress comfortably and respectfully when visiting mosques and cultural institutions.
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#0e674d]" /> Always book with licensed luxury operators to ensure certified 4x4 drivers and safety gear.
                </li>
              </ul>
            </div>

            <p>
              Oxford Adventure Tourism guarantees personalized VIP hospitality, spotless vehicles, and guides who share stories that bring each historic landmark to life.
            </p>

            <div className="pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm font-semibold text-[#0e674d]">
                Ready to experience this firsthand?
              </div>
              <button
                onClick={() => {
                  onClose();
                  onBookNow(null);
                }}
                className="w-full sm:w-auto px-7 py-3 bg-[#0e674d] hover:bg-[#ffaa0d] hover:text-gray-950 text-white font-bold rounded-full text-sm transition-colors shadow-md cursor-pointer"
              >
                Inquire About Tours
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function VideoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
        onClick={onClose}
      >
        <button
          onClick={onClose}
          aria-label="Close Video Modal"
          className="absolute top-6 right-6 p-3 rounded-full liquid-glass-dark hover:bg-white/20 text-white transition-colors cursor-pointer z-50 border border-white/20"
        >
          <X size={26} />
        </button>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-4xl aspect-video rounded-3xl overflow-hidden bg-black shadow-2xl border-2 border-white/25 ring-8 ring-white/10"
          onClick={(e) => e.stopPropagation()}
        >
          <iframe
            src="https://www.youtube.com/embed/rdrKIY1osyk?autoplay=1"
            title="Oxford Adventure Tourism Qatar"
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Phone, ArrowUp, X } from 'lucide-react';

export default function FloatingWidgets({ onOpenBooking }) {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 10 }}
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="w-11 h-11 rounded-full bg-[#0e674d] text-white shadow-lg flex items-center justify-center hover:bg-[#ffaa0d] hover:text-gray-900 transition-all cursor-pointer"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Phone Call Floating Button */}
      <motion.a
        href="tel:+97472001133"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Direct Phone Call"
        className="w-13 h-13 rounded-full bg-[#03E78B] text-white shadow-xl flex items-center justify-center transition-all hover:shadow-2xl"
      >
        <Phone size={22} className="fill-current text-white" />
      </motion.a>

      {/* WhatsApp Floating Button with Chaty Greeting Tooltip */}
      <div className="relative flex items-center">
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              className="absolute right-16 bg-white text-gray-800 text-xs font-semibold px-4 py-2.5 rounded-2xl shadow-xl border border-gray-100 whitespace-nowrap flex items-center gap-2"
            >
              <span>How can I help you? :)</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowTooltip(false);
                }}
                className="text-gray-400 hover:text-gray-600 p-0.5"
              >
                <X size={12} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.a
          href="https://wa.me/97472001133?text=Hello%20Oxford%20Adventure%20Tourism!%20I%20would%20like%20to%20inquire%20about%20a%20tour."
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Chat on WhatsApp"
          className="w-14 h-14 rounded-full bg-[#49E670] text-white shadow-xl flex items-center justify-center transition-all hover:shadow-2xl border-2 border-white"
        >
          {/* Official WhatsApp SVG Icon matching Chaty */}
          <svg className="w-8 h-8 fill-white" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.54 1.761.814 2.791.814 3.18 0 5.766-2.587 5.767-5.766.001-3.181-2.586-5.766-5.767-5.766zm3.385 8.163c-.145.409-.844.757-1.164.792-.319.034-.733.155-2.456-.566-2.072-.867-3.384-2.977-3.486-3.114-.103-.136-.837-1.114-.837-2.126 0-1.012.529-1.512.716-1.717.188-.205.41-.256.546-.256.137 0 .274.001.393.007.126.006.294-.047.46.353.172.414.588 1.433.64 1.539.052.106.086.23.017.367-.07.137-.104.222-.206.342-.102.12-.215.268-.307.36-.102.103-.209.214-.09.418.119.205.529.873 1.134 1.411.779.693 1.437.907 1.643 1.01.205.102.324.085.444-.052.12-.137.512-.597.649-.801.137-.205.273-.171.46-.102.188.069 1.196.564 1.401.667.205.102.342.153.393.239.051.085.051.495-.094.904z" />
          </svg>
        </motion.a>
      </div>
    </div>
  );
}

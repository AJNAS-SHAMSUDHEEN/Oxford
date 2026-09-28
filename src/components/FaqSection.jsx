import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { FAQ_DATA } from '../data/siteData';

export default function FaqSection({ onOpenBooking }) {
  const [openId, setOpenId] = useState(1);

  const toggleFaq = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-24 lg:py-32 bg-[#fcfbf9] relative overflow-hidden">
      {/* Ambient Liquid Blobs */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 rounded-full bg-[#0e674d]/10 filter blur-[90px] pointer-events-none liquid-blob-1" />
      <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-[#c59a4b]/12 filter blur-[90px] pointer-events-none liquid-blob-2" />

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column with Title and Team Graphic */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass text-[#0e674d] text-xs font-bold uppercase tracking-widest mb-4 border border-[#0e674d]/20">
                <HelpCircle size={14} className="text-[#c59a4b]" />
                <span>Frequently Asked Questions</span>
              </div>

              <h2
                className="text-4xl sm:text-5xl font-serif text-[#0e674d] leading-[1.15] mb-5 tracking-tight"
                style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
              >
                Find <span className="text-[#c59a4b] italic">Answers</span> for Questions You Have.
              </h2>
              <p className="text-gray-600 text-base leading-relaxed font-normal">
                Everything you need to know about our luxury chauffeur services, desert tours, bookings, and cancellation policies.
              </p>
            </motion.div>

            {/* Team Illustration in liquid glass frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl liquid-glass p-4 border border-white/80"
            >
              <img
                src="https://oxfordadventuretourism.com/wp-content/uploads/2025/12/team-l-pic.png"
                alt="Oxford Adventure Tourism Team"
                className="w-full h-auto object-cover rounded-2xl"
              />

              <div className="mt-4 p-5 liquid-glass-dark text-white rounded-2xl flex items-center justify-between border border-white/20">
                <div>
                  <h4 className="font-serif text-lg font-bold">Have any other questions?</h4>
                  <p className="text-xs text-white/80">Our concierge is active 24/7 on WhatsApp</p>
                </div>
                <button
                  onClick={() => onOpenBooking(null)}
                  className="px-5 py-2.5 bg-[#ffaa0d] text-gray-950 font-bold text-xs uppercase tracking-wider rounded-full shadow hover:bg-white transition-colors cursor-pointer"
                >
                  Contact Us
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right Column with Accordion */}
          <div className="lg:col-span-7">
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
                <h3 className="font-serif text-3xl text-[#0e674d] font-bold">
                  General FAQs
                </h3>
                <span className="text-xs font-bold uppercase tracking-wider liquid-glass text-[#c59a4b] px-3.5 py-1.5 rounded-full border border-[#c59a4b]/30">
                  9 Verified Questions
                </span>
              </div>

              {FAQ_DATA.map((faq) => {
                const isOpen = openId === faq.id;
                return (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className={`liquid-glass rounded-2xl overflow-hidden shadow-sm transition-all duration-300 border ${isOpen ? 'border-[#c59a4b]/60 shadow-lg' : 'border-white/80 hover:border-[#0e674d]/40'
                      }`}
                  >
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 transition-colors cursor-pointer"
                    >
                      <span className="font-serif text-lg sm:text-xl text-[#0e674d] font-semibold pr-2">
                        <span className="text-[#c59a4b] font-sans font-bold mr-2 text-sm sm:text-base">
                          {faq.id} -
                        </span>
                        {faq.question}
                      </span>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-colors shadow-sm ${isOpen ? 'bg-[#0e674d] text-white' : 'liquid-glass text-[#0e674d] border border-white/80'
                          }`}
                      >
                        <ChevronDown size={18} />
                      </motion.div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <div className="px-5 sm:px-6 pb-6 pt-1 text-gray-700 text-sm sm:text-base leading-relaxed border-t border-gray-200/50 font-normal">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

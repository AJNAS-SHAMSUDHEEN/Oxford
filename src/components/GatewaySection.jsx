import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, CheckCircle2, Star, Sparkles, Compass } from 'lucide-react';

export default function GatewaySection() {
  const highlights = [
    'Qatar Tourism Licensed & Insured Fleet',
    'Certified Multilingual Desert Chauffeurs',
    'VIP Meet & Greet at Hamad International',
    '100% Guaranteed Private Departures',
    'Transparent Pricing with Zero Hidden Fees',
    '24/7 Dedicated Trip Concierge Support'
  ];

  return (
    <section id="about" className="relative bg-[#fcfbf9] overflow-hidden py-20 lg:py-32">
      {/* Top shadowbar divider */}
      <div
        className="w-full h-6 bg-repeat-x bg-top opacity-50 absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          backgroundImage:
            'url(https://oxfordadventuretourism.com/wp-content/uploads/2025/12/shadow-top.png)',
        }}
      />

      {/* Ambient Liquid Blobs */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 rounded-full bg-[#0e674d]/10 filter blur-[90px] pointer-events-none liquid-blob-1" />
      <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-[#c59a4b]/15 filter blur-[90px] pointer-events-none liquid-blob-2" />

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Content Column */}
          <div className="lg:col-span-6 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass text-[#0e674d] text-xs font-bold uppercase tracking-wider mb-5 border border-[#0e674d]/20">
                <Sparkles size={14} className="text-[#c59a4b]" />
                <span>Premier Destination Management</span>
              </div>

              <h2
                className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#0e674d] leading-[1.12] mb-6"
                style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
              >
                Your Gateway to Extraordinary{' '}
                <span className="text-[#c59a4b] italic">Qatar Experiences</span>
              </h2>

              <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8 font-normal">
                Oxford Adventure Tourism specializes in premium guided tours that combine luxury, comfort, adventure, and authentic Qatari culture. We believe every traveller deserves more than sightseeing—they deserve immersive experiences that reveal the true beauty of Qatar.
              </p>
            </motion.div>

            {/* Feature Cards with Liquid Glass */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Feature 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ y: -4 }}
                className="liquid-glass liquid-glass-card border border-white/80 p-6 rounded-3xl flex items-center gap-4 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-2xl bg-[#0e674d] text-white font-bold flex items-center justify-center text-sm flex-shrink-0 group-hover:bg-[#c59a4b] transition-colors shadow-sm">
                  1
                </div>

                <div className="w-14 h-14 rounded-2xl liquid-glass p-2.5 shadow-sm border border-white/90 flex items-center justify-center flex-shrink-0">
                  <img
                    src="https://oxfordadventuretourism.com/wp-content/uploads/2025/12/01-safety.png"
                    alt="Safety First Always"
                    className="w-full h-full object-contain"
                  />
                </div>

                <div>
                  <h4 className="font-serif text-xl text-[#0e674d] font-bold group-hover:text-[#c59a4b] transition-colors">
                    Safety First Always
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5">Strict safety protocols</p>
                </div>
              </motion.div>

              {/* Feature 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ y: -4 }}
                className="liquid-glass liquid-glass-card border border-white/80 p-6 rounded-3xl flex items-center gap-4 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-2xl bg-[#0e674d] text-white font-bold flex items-center justify-center text-sm flex-shrink-0 group-hover:bg-[#c59a4b] transition-colors shadow-sm">
                  2
                </div>

                <div className="w-14 h-14 rounded-2xl liquid-glass p-2.5 shadow-sm border border-white/90 flex items-center justify-center flex-shrink-0">
                  <img
                    src="https://oxfordadventuretourism.com/wp-content/uploads/2025/12/02-exclusive.png"
                    alt="Exclusive Trip"
                    className="w-full h-full object-contain"
                  />
                </div>

                <div>
                  <h4 className="font-serif text-xl text-[#0e674d] font-bold group-hover:text-[#c59a4b] transition-colors">
                    Exclusive Trip
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5">Tailored private luxury</p>
                </div>
              </motion.div>
            </div>

            {/* Checklist Highlights */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
              {highlights.map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-[#0e674d] flex-shrink-0" />
                  <span className="font-medium text-xs sm:text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image Mask Column */}
          <div className="lg:col-span-6 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative max-w-lg w-full"
            >
              {/* Back subtle glow */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#0e674d]/15 to-[#c59a4b]/20 rounded-3xl blur-2xl -z-10" />

              {/* Main Image from Site with gold luxury frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white group">
                <img
                  src="https://oxfordadventuretourism.com/wp-content/uploads/2026/07/025.webp"
                  alt="Qatar Tourism Adventure"
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                />

                {/* Floating Rating Pill with Liquid Glass */}
                <div className="absolute top-6 left-6 liquid-glass px-4 py-2 rounded-2xl shadow-xl border border-white/90 flex items-center gap-2">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-gray-900">4.9 / 5 Rating</span>
                </div>

                {/* Bottom Overlay Card in Liquid Glass Dark */}
                <div className="absolute bottom-6 left-6 right-6 liquid-glass-dark p-5 rounded-2xl border border-white/20 shadow-2xl flex items-center justify-between text-white">
                  <div>
                    <span className="text-xs font-bold text-[#ffaa0d] uppercase tracking-wider block">
                      Authentic Qatar
                    </span>
                    <h5 className="font-serif text-lg font-bold text-white">
                      Curated by Local Experts
                    </h5>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-[#ffaa0d] text-gray-950 flex items-center justify-center font-bold text-sm shadow-md flex-shrink-0">
                    VIP
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom shadowbar divider */}
      <div
        className="w-full h-6 bg-repeat-x bg-bottom opacity-50 absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          backgroundImage:
            'url(https://oxfordadventuretourism.com/wp-content/uploads/2025/12/shadow-bottom.png)',
        }}
      />
    </section>
  );
}

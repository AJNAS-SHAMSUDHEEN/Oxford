import React from 'react';
import { motion } from 'framer-motion';
import { Star, CheckCircle, Quote } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/siteData';

export default function TestimonialsSection() {
  return (
    <section className="py-24 lg:py-32 bg-[#fcfbf9] relative overflow-hidden">
      {/* Ambient Liquid Blobs */}
      <div className="absolute top-1/3 -left-20 w-96 h-96 rounded-full bg-[#0e674d]/10 filter blur-[90px] pointer-events-none liquid-blob-1" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#c59a4b]/15 filter blur-[90px] pointer-events-none liquid-blob-2" />

      {/* Floating Hot Air Balloon on Right */}
      <motion.div
        animate={{ y: [0, -25, 0], rotate: [0, 1.5, 0] }}
        transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
        className="absolute -right-8 top-16 md:top-24 w-40 sm:w-52 md:w-64 pointer-events-none opacity-80 z-0"
      >
        <img
          src="https://oxfordadventuretourism.com/wp-content/themes/travlla/assets/images/hotballon-right.png"
          alt="Hot Air Balloon"
          className="w-full h-auto object-contain drop-shadow-xl"
        />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        {/* Section Heading */}
        <div className="section-head text-center max-w-2xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 rounded-full liquid-glass text-[#0e674d] text-xs font-bold uppercase tracking-widest mb-3 border border-[#0e674d]/20"
          >
            Guest Impressions
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#0e674d] mb-4 tracking-tight leading-tight"
            style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
          >
            Our Client <span className="text-[#c59a4b] italic">Says!</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-gray-600 text-base md:text-lg font-light leading-relaxed"
          >
            Read authentic stories from corporate partners, delegates, and international travellers who discovered Qatar with us.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center mt-5"
          >
            <img
              src="https://oxfordadventuretourism.com/wp-content/themes/travlla/assets/images/background/Title-Separator.png"
              alt="Separator"
              className="h-4 w-auto opacity-80"
            />
          </motion.div>
        </div>

        {/* Testimonials Grid with Liquid Glass */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {TESTIMONIALS_DATA.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              whileHover={{ y: -6 }}
              className="liquid-glass liquid-glass-card rounded-3xl p-8 lg:p-10 shadow-xl border border-white/80 relative group flex flex-col justify-between"
            >
              {/* Header with Avatar, Name, Position & Quote Icon */}
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-gray-200/60 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#c59a4b] shadow-md flex-shrink-0 bg-gray-200">
                      <img
                        src={item.avatar}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div>
                      <h4 className="font-serif text-2xl text-[#0e674d] font-bold leading-tight group-hover:text-[#c59a4b] transition-colors">
                        {item.name}
                      </h4>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-xs font-bold text-[#c59a4b] uppercase tracking-wider">
                          {item.position}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-gray-300" />
                        <span className="text-[11px] text-emerald-700 flex items-center gap-1 font-semibold">
                          <CheckCircle size={11} /> Verified Booking
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="w-11 h-11 p-2 rounded-2xl liquid-glass border border-white/80 shadow-md group-hover:scale-110 transition-transform flex-shrink-0">
                    <img
                      src="https://oxfordadventuretourism.com/wp-content/themes/travlla/assets/images/trv-icon/Quote.png"
                      alt="Quote icon"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* Text */}
                <p className="text-gray-700 text-base leading-relaxed italic mb-8 font-normal">
                  "{item.text}"
                </p>
              </div>

              {/* Stars & Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200/50">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">5.0 Star Rating</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const STEPS = [
  {
    num: '01',
    title: 'Choose Your Tour',
    icon: 'https://oxfordadventuretourism.com/wp-content/uploads/2025/12/destination.png',
    text: 'Browse our collection of exciting tours and experiences, select the destination or activity that interests you, and choose your preferred date and group size.',
    tag: 'Step 1'
  },
  {
    num: '02',
    title: 'Book & Confirm',
    icon: 'https://oxfordadventuretourism.com/wp-content/uploads/2025/12/make-payment.png',
    text: 'Submit your booking request online or contact our team via WhatsApp, phone, or email. We\'ll confirm availability, finalize the details, and provide your booking confirmation.',
    tag: 'Step 2'
  },
  {
    num: '03',
    title: 'Enjoy Your Adventure',
    icon: 'https://oxfordadventuretourism.com/wp-content/uploads/2025/12/travelling-1.png',
    text: 'Meet your professional guide or driver at the designated pickup location and embark on an unforgettable journey, enjoying a seamless and memorable travel experience from start to finish.',
    tag: 'Step 3'
  }
];

export default function EasySteps({ onSelectStep }) {
  return (
    <section className="py-24 lg:py-32 bg-[#fcfbf9] relative overflow-hidden">
      {/* Ambient Floating Liquid Blobs for Glass Refraction */}
      <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-gradient-to-tr from-[#0e674d]/15 to-[#ffaa0d]/15 blur-3xl pointer-events-none liquid-blob-1" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] rounded-full bg-gradient-to-br from-[#c59a4b]/15 to-[#083a2c]/15 blur-3xl pointer-events-none liquid-blob-2" />

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        {/* Section Heading */}
        <div className="section-head text-center max-w-2xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 rounded-full liquid-glass text-[#0e674d] text-xs font-bold uppercase tracking-widest mb-3 border border-amber-500/20"
          >
            How It Works
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#0e674d] tracking-tight leading-tight"
            style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
          >
            Easy Steps <span className="text-[#c59a4b] italic">For Bookings</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-gray-600 text-base md:text-lg mt-4 leading-relaxed font-normal"
          >
            Planning your next journey has never been easier. Follow these simple steps to reserve your tour and get ready to experience Qatar's most unforgettable destinations.
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
              className="h-4 w-auto opacity-80"
            />
          </motion.div>
        </div>

        {/* Steps Grid with Liquid Glass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 relative">
          {STEPS.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              whileHover={{ y: -10 }}
              className="group liquid-glass liquid-glass-card rounded-3xl p-8 lg:p-10 relative flex flex-col justify-between cursor-pointer"
            >
              <div>
                {/* Header of card */}
                <div className="flex items-center justify-between mb-8">
                  {/* Step Number Tag */}
                  <span className="text-4xl font-serif font-black text-[#c59a4b]/40 group-hover:text-[#c59a4b] transition-colors">
                    {step.num}
                  </span>

                  {/* Icon Container with glossy liquid ring */}
                  <div className="w-20 h-20 rounded-2xl bg-white/70 backdrop-blur-md border border-white/60 flex items-center justify-center p-4 transition-all duration-500 group-hover:bg-[#0e674d] group-hover:rotate-6 shadow-[0_8px_20px_rgba(0,0,0,0.06)]">
                    <img
                      src={step.icon}
                      alt={step.title}
                      className="w-10 h-10 object-contain transition-transform duration-300 group-hover:scale-110 group-hover:brightness-0 group-hover:invert"
                    />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-serif text-[#0e674d] font-bold mb-3 group-hover:text-[#c59a4b] transition-colors">
                  {step.title}
                </h3>

                {/* Text */}
                <p className="text-gray-600 text-sm leading-relaxed font-normal">
                  {step.text}
                </p>
              </div>

              {/* Bottom accent pill */}
              <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-[#0e674d]">
                <span className="text-gray-400 group-hover:text-[#0e674d] transition-colors">
                  {step.tag}
                </span>
                <span className="w-8 h-8 rounded-full bg-[#f4f7f5] group-hover:bg-[#ffaa0d] group-hover:text-gray-950 flex items-center justify-center transition-all">
                  <ArrowRight size={14} />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

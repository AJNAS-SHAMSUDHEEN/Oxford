import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Play, Sparkles } from 'lucide-react';
import { STATS_DATA } from '../data/siteData';

function CounterItem({ stat, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = stat.count;
    const duration = 2000;
    const increment = Math.ceil(end / (duration / 25));
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 25);
    return () => clearInterval(timer);
  }, [isInView, stat.count]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className="flex items-center gap-5 p-5 rounded-3xl liquid-glass-dark liquid-glass-card border border-white/20 hover:border-[#ffaa0d]/60 transition-all shadow-xl group"
    >
      <div className="w-16 h-16 rounded-2xl bg-white/10 p-3.5 flex items-center justify-center flex-shrink-0 shadow-inner border border-white/15 group-hover:scale-110 group-hover:bg-[#ffaa0d]/20 transition-all">
        <img src={stat.icon} alt={stat.label} className="w-full h-full object-contain" />
      </div>

      <div className="text-left">
        <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white flex items-center tracking-tight font-sans">
          <span>{count}</span>
          <span className="text-[#ffaa0d] font-bold ml-1">{stat.suffix}</span>
        </div>
        <p className="text-xs sm:text-sm text-white/85 font-semibold uppercase tracking-wider mt-1">
          {stat.label}
        </p>
      </div>
    </motion.div>
  );
}

export default function VideoCounterSection({ onOpenVideo }) {
  return (
    <section className="relative overflow-hidden py-28 sm:py-36 bg-[#041a13] text-white">
      {/* Background Image with Parallax look */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed opacity-50 scale-105 pointer-events-none"
        style={{
          backgroundImage:
            'url(https://oxfordadventuretourism.com/wp-content/uploads/2026/07/ChatGPT-Image-Jun-29-2026-06_33_32-PM-e1782923889224.webp)',
        }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#06241b]/95 via-black/60 to-black/80" />

      {/* Ambient liquid blobs in dark background */}
      <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full bg-[#0e674d]/30 filter blur-[100px] pointer-events-none liquid-blob-1" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#c59a4b]/20 filter blur-[100px] pointer-events-none liquid-blob-2" />

      <div className="container mx-auto px-6 relative z-10 text-center max-w-6xl">
        {/* Play Video Trigger */}
        <div className="mb-14 flex flex-col items-center">
          <div className="relative inline-block cursor-pointer" onClick={onOpenVideo}>
            <div className="pulse-ripple" />
            <div className="pulse-ripple-2" />

            <motion.button
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Play Video"
              className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-[#ffaa0d] to-[#ffd166] text-gray-950 flex items-center justify-center shadow-2xl transition-all duration-300 hover:shadow-amber-500/50"
            >
              <Play size={36} className="fill-current ml-1 text-gray-950" />
            </motion.button>
          </div>

          {/* Say Yes Titles */}
          <div className="mt-8 space-y-2">
            <h3
              className="text-4xl sm:text-6xl md:text-7xl font-serif text-white tracking-tight"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
              Say <span className="text-[#ffaa0d] italic font-light">Yes!</span>
            </h3>
            <p className="text-2xl sm:text-4xl font-serif text-white/90 italic font-light">
              To New Adventure
            </p>
          </div>
        </div>

        {/* Counter Bar with 4 stats in liquid-glass-dark */}
        <div className="mt-16 max-w-6xl mx-auto rounded-3xl p-6 sm:p-10 liquid-glass-dark border border-white/25 shadow-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS_DATA.map((stat, idx) => (
              <CounterItem key={stat.label} stat={stat} index={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Play, ArrowUpRight, MapPin, Compass, Wind, Sparkles } from 'lucide-react';

export default function HeroSlider({ onOpenVideo, onExploreClick, onQuickBook }) {
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // 3D Mouse Parallax Movement
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for fluid camera drift
  const springConfig = { damping: 25, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [3, -3]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-4, 4]);
  const planeX = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const planeY = useTransform(smoothY, [-0.5, 0.5], [-8, 8]);
  const planeRotate = useTransform(smoothX, [-0.5, 0.5], [-1.5, 1.5]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen w-full flex items-end overflow-hidden bg-[#07131b] select-none"
    >
      {/* ================= 3D PARALLAX SCENE CONTAINER ================= */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none scale-[1.03]"
      >
        {/* Base Pristine Scene Image (Open Air Exact Visual) */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center sm:bg-top"
          style={{
            backgroundImage: `url('/open_air_hero_ref.png')`,
            backgroundPosition: 'center 45%',
          }}
        />

        {/* Ambient Top Vignette to integrate seamlessly with the navbar */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#102d41]/70 via-[#102d41]/20 to-transparent pointer-events-none" />

        {/* Soft Bottom Shadow Vignette to blend into catalog */}
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#07100c] via-[#07100c]/60 to-transparent pointer-events-none" />

        {/* ================= ANIMATED ENGINE CONTRAILS (VAPOR STREAM) ================= */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Engine 1 Contrail (Left Wing Jet) */}
          <motion.div
            animate={{
              opacity: [0.6, 0.9, 0.6],
              scaleX: [0.98, 1.03, 0.98],
            }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-[48%] left-[24%] sm:left-[27%] w-[280px] sm:w-[380px] h-[3px] bg-gradient-to-l from-white/90 via-cyan-100/50 to-transparent blur-[1.5px] -rotate-[16deg] origin-right"
          />

          {/* Engine 2 Contrail (Right Wing Jet) */}
          <motion.div
            animate={{
              opacity: [0.5, 0.85, 0.5],
              scaleX: [0.97, 1.02, 0.97],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="absolute top-[49%] left-[44%] sm:left-[47%] w-[220px] sm:w-[320px] h-[2.5px] bg-gradient-to-l from-white/90 via-cyan-100/50 to-transparent blur-[1.5px] -rotate-[16deg] origin-right"
          />

          {/* Drifting Soft Cloud Whisps across the Upper Sky */}
          <motion.div
            animate={{
              x: ['-5vw', '105vw'],
              opacity: [0, 0.45, 0.45, 0],
            }}
            transition={{
              duration: 32,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute top-[18%] w-[380px] h-[100px] rounded-full bg-white/40 blur-3xl pointer-events-none"
          />

          <motion.div
            animate={{
              x: ['105vw', '-10vw'],
              opacity: [0, 0.35, 0.35, 0],
            }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: 'linear',
              delay: 8,
            }}
            className="absolute top-[26%] w-[480px] h-[120px] rounded-full bg-cyan-100/30 blur-3xl pointer-events-none"
          />
        </div>

        {/* ================= AERODYNAMIC HOVER LAYER ON AIRPLANE ================= */}
        <motion.div
          style={{
            x: planeX,
            y: planeY,
            rotate: planeRotate,
          }}
          animate={{
            y: [-3, 4, -3],
            rotate: [-0.4, 0.5, -0.4],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute inset-0 pointer-events-none"
        >
          {/* Specular Glint Shimmer along the Aircraft Fuselage */}
          <motion.div
            animate={{
              x: ['-50%', '150%'],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatDelay: 4,
              ease: 'easeInOut',
            }}
            className="absolute top-[32%] left-[45%] w-[160px] h-[30px] bg-gradient-to-r from-transparent via-white/40 to-transparent -rotate-[18deg] blur-md pointer-events-none"
          />
        </motion.div>
      </motion.div>

      {/* ================= INTERACTIVE RADAR PIN ON THE ADVENTURERS ================= */}
      <div className="absolute right-[12%] sm:right-[15%] bottom-[20%] sm:bottom-[23%] z-30 pointer-events-auto">
        <div
          className="relative group cursor-pointer"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onClick={onOpenVideo}
        >
          {/* Animated Radar Pulse Ping */}
          <span className="absolute -top-2 -left-2 flex h-5 w-5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-80" />
            <span className="relative inline-flex rounded-full h-5 w-5 bg-white border-2 border-[#164666] shadow-[0_0_12px_rgba(255,255,255,0.9)]" />
          </span>

          {/* Tooltip Card */}
          <div
            className={`absolute bottom-6 right-0 min-w-[210px] p-3 rounded-2xl bg-[#0f2e42]/90 backdrop-blur-xl border border-white/20 shadow-2xl text-white transition-all duration-300 pointer-events-none ${
              showTooltip ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95'
            }`}
          >
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#98d3f1] mb-1">
              <MapPin size={11} className="text-white" />
              <span>Summit Viewpoint · 3,450m</span>
            </div>
            <div className="text-xs font-bold text-white leading-tight">
              Khor Al Adaid Overlook
            </div>
            <div className="text-[10px] text-white/70 mt-1 flex items-center gap-1">
              <Play size={8} className="fill-current text-[#98d3f1]" />
              <span>Click to watch documentary</span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= BOTTOM-LEFT CONTENT BLOCK (EXACT MATCH) ================= */}
      <div className="relative z-30 w-full max-w-[1400px] mx-auto px-6 sm:px-12 pb-14 sm:pb-20 pointer-events-auto">
        <div className="max-w-[620px]">
          {/* Eyebrow: Your Next Adventure Awaits */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] leading-tight"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Your Next Adventure Awaits
          </motion.h2>

          {/* Subtitle: Let’s Go Camping Together */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-base sm:text-xl md:text-2xl font-normal text-white/95 tracking-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] mt-1 sm:mt-2 mb-6 sm:mb-8"
          >
            Let’s Go Camping Together
          </motion.p>

          {/* Interactive CTA Buttons (Journey Beyond & Wander the Globe.) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex items-center gap-6 flex-wrap"
          >
            {/* Journey Beyond - Solid White Pill Button with Dark Teal Text */}
            <button
              onClick={() => onQuickBook ? onQuickBook(null) : onExploreClick()}
              className="px-7 sm:px-8 py-3.5 rounded-full bg-white hover:bg-neutral-100 text-[#173e57] text-sm sm:text-[15px] font-bold tracking-wide shadow-[0_12px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.5)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center gap-2 group"
            >
              <span>Journey Beyond</span>
              <ArrowUpRight
                size={16}
                className="text-[#173e57] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>

            {/* Wander the Globe. - Underlined Interactive Link */}
            <button
              onClick={onOpenVideo}
              className="text-white hover:text-white/80 font-semibold text-sm sm:text-[15px] tracking-wide underline underline-offset-8 decoration-white/70 hover:decoration-white transition-all cursor-pointer flex items-center gap-1.5 group drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]"
            >
              <span>Wander the Globe.</span>
              <Play
                size={11}
                className="opacity-0 group-hover:opacity-100 transition-opacity fill-current text-white ml-0.5"
              />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, User, Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar({ onOpenBooking, activeSection = 'Home', setActiveSection }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'News', href: '#news' },
    { name: 'About', href: '#story' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href, name) => {
    if (setActiveSection) setActiveSection(name);
    setMobileMenuOpen(false);

    if (href === '#contact') {
      const el = document.getElementById('contact');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      {/* Top Navbar Header matching Open Air Dribbble Shot */}
      <header className="fixed top-0 left-0 w-full z-50 bg-[#163f59]/80 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_rgba(10,25,35,0.35)] transition-all">
        <div className="w-full flex items-center justify-between h-[64px] sm:h-[70px] pr-5 sm:pr-8">
          {/* Left Angled Ribbon Brand Badge */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#home', 'Home');
            }}
            className="relative h-full flex items-center bg-gradient-to-r from-[#173e57] via-[#1f506f] to-[#255f84] pl-6 sm:pl-8 pr-12 sm:pr-14 transition-all group cursor-pointer"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 82% 100%, 0% 100%)',
            }}
          >
            <div className="flex items-center gap-3">
              {/* Airplane Icon */}
              <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-white fill-current -rotate-45"
                >
                  <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                </svg>
              </div>

              {/* Brand Typography */}
              <div className="flex flex-col">
                <span className="font-heading font-extrabold text-lg sm:text-xl text-white tracking-tight leading-tight">
                  Open Air
                </span>
                <span className="text-[8px] font-bold text-[#98d3f1] tracking-[0.2em] uppercase leading-none hidden sm:block">
                  Oxford Adventure
                </span>
              </div>
            </div>
          </a>

          {/* Center Navigation Links */}
          <ul className="hidden md:flex items-center gap-9 lg:gap-14 list-none m-0 p-0">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href, link.name);
                  }}
                  className={`text-[15px] font-semibold tracking-wide transition-all ${
                    activeSection === link.name
                      ? 'text-white font-bold drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]'
                      : 'text-white/85 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]'
                  }`}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          {/* Right Action Icons & Register Pill Button */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Search Icon */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-white/90 hover:text-white transition-colors cursor-pointer"
              aria-label="Search tours"
            >
              <Search size={18} />
            </button>

            {/* Register / Plan Trip Pill Button (Solid White with Dark Teal Text) */}
            <button
              onClick={() => onOpenBooking(null)}
              className="px-5 sm:px-6 py-2 rounded-full bg-white hover:bg-neutral-100 text-[#173e57] text-xs sm:text-[13px] font-bold tracking-wide shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              Register
            </button>

            {/* User Profile Icon */}
            <button
              onClick={() => onOpenBooking(null)}
              className="hidden sm:inline-flex p-2 text-white/90 hover:text-white transition-colors cursor-pointer"
              aria-label="User Account"
            >
              <User size={19} />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors ml-1"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Search Overlay dropdown */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-[#123348] border-t border-white/10 px-6 py-3 overflow-hidden flex items-center justify-between"
            >
              <input
                type="text"
                placeholder="Search expeditions, tours, desert safaris..."
                autoFocus
                className="w-full bg-transparent text-sm text-white placeholder-white/50 focus:outline-none"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="text-white/70 hover:text-white text-xs font-semibold ml-4"
              >
                Close
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[64px] left-0 w-full z-40 md:hidden bg-[#163f59]/95 backdrop-blur-2xl border-b border-white/15 p-6 shadow-2xl"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href, link.name);
                  }}
                  className={`text-lg font-bold py-2 border-b border-white/10 flex items-center justify-between ${
                    activeSection === link.name ? 'text-white' : 'text-white/80 hover:text-white'
                  }`}
                >
                  <span>{link.name}</span>
                  <ArrowUpRight size={16} className="text-[#98d3f1]" />
                </a>
              ))}

              <div className="pt-4 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBooking(null);
                  }}
                  className="w-full py-3 rounded-full bg-white text-[#173e57] font-bold text-sm text-center shadow-lg"
                >
                  Register / Book Now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

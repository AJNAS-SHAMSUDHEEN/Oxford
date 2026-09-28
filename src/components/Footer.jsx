import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, ArrowRight, ShieldCheck, Clock, Award } from 'lucide-react';

export default function Footer({ onSelectTour }) {
  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Tour Packages', href: '#tours' },
    { name: 'Services', href: '#services' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact Us', href: '#contact' },
  ];

  const popularTours = [
    'Education City Tour (4 Hrs)',
    'Doha City Tour (8 Hrs)',
    'Desert Safari (4 Hrs)',
    'Sheikh Faisal Museum & Mathaf',
    'North Heritage Tour (6 Hrs)',
    'Kayaking Purple Island (5 Hrs)',
  ];

  const handleScroll = (href) => {
    const el = document.querySelector(href);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className="bg-[#052219] text-white pt-24 pb-12 relative overflow-hidden border-t border-amber-500/20">
      {/* Decorative ambient lighting */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#ffaa0d]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        {/* Top Trust Badges Bar */}
        <div className="pb-16 mb-16 border-b border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">
          <div className="flex items-center gap-4 justify-center sm:justify-start">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0 text-[#ffaa0d]">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h5 className="font-bold text-sm text-white">100% Licensed & Insured</h5>
              <p className="text-xs text-white/60">Qatar Tourism approved luxury operator</p>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center sm:justify-start">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0 text-[#ffaa0d]">
              <Clock size={24} />
            </div>
            <div>
              <h5 className="font-bold text-sm text-white">24/7 VIP Concierge</h5>
              <p className="text-xs text-white/60">Round-the-clock WhatsApp & phone support</p>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center sm:justify-start">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0 text-[#ffaa0d]">
              <Award size={24} />
            </div>
            <div>
              <h5 className="font-bold text-sm text-white">5-Star Excellence</h5>
              <p className="text-xs text-white/60">Consistent top ratings across corporate & leisure tours</p>
            </div>
          </div>
        </div>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Column 1: Brand Info & Socials */}
          <div className="lg:col-span-4 space-y-6">
            <a href="#home" className="inline-block">
              <img
                src="https://oxfordadventuretourism.com/wp-content/uploads/2026/07/LOGO-FINAL--e1784298834286.png"
                alt="Oxford Adventure Tourism"
                className="h-20 w-auto object-contain brightness-110"
              />
            </a>

            <p className="text-white/70 text-sm leading-relaxed max-w-sm font-normal">
              Driven by the Emir’s mother Sheikha Moza bint Nasser, Education City is an initiative of Qatar Foundation for Science, Technology, Education and Community Development. Oxford Adventure Tourism provides peerless luxury experiences across Qatar.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/oxfordadventuretourism/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#ffaa0d] hover:text-gray-950 flex items-center justify-center transition-all duration-300"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="X (Twitter)"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#ffaa0d] hover:text-gray-950 flex items-center justify-center transition-all duration-300"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#ffaa0d] hover:text-gray-950 flex items-center justify-center transition-all duration-300"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-serif text-2xl text-[#ffaa0d] font-bold">Quick Links</h3>
            <ul className="space-y-3 text-sm text-white/80">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleScroll(link.href)}
                    className="hover:text-[#ffaa0d] transition-colors flex items-center gap-2 group cursor-pointer text-left"
                  >
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#ffaa0d]" />
                    <span>{link.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Popular Tour Packages */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-serif text-2xl text-[#ffaa0d] font-bold">Popular Tours</h3>
            <ul className="space-y-3 text-sm text-white/80">
              {popularTours.map((tourName) => (
                <li key={tourName}>
                  <button
                    onClick={() => {
                      handleScroll('#tours');
                      if (onSelectTour) onSelectTour({ title: tourName });
                    }}
                    className="hover:text-[#ffaa0d] transition-colors flex items-center gap-2 group cursor-pointer text-left"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c59a4b] group-hover:bg-[#ffaa0d] transition-colors" />
                    <span className="line-clamp-1">{tourName}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-serif text-2xl text-[#ffaa0d] font-bold">Contact Concierge</h3>
            <div className="space-y-4 text-sm text-white/80">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 text-[#ffaa0d]">
                  <MapPin size={16} />
                </div>
                <div>
                  <span className="font-semibold text-white block text-xs uppercase tracking-wider">Location</span>
                  <p className="text-white/70">Doha - State of Qatar</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 text-[#ffaa0d]">
                  <Phone size={16} />
                </div>
                <div>
                  <span className="font-semibold text-white block text-xs uppercase tracking-wider">Phone / WhatsApp</span>
                  <a href="tel:+97472001133" className="text-white/90 hover:text-[#ffaa0d] transition-colors font-medium">
                    +974 7200 1133
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 text-[#ffaa0d]">
                  <Mail size={16} />
                </div>
                <div>
                  <span className="font-semibold text-white block text-xs uppercase tracking-wider">Email Inquiries</span>
                  <a
                    href="mailto:Tourism@oxfordadventuretourism.com"
                    className="text-white/90 hover:text-[#ffaa0d] transition-colors break-all"
                  >
                    Tourism@oxfordadventuretourism.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/60 gap-4">
          <p>© Copyright 2026 Oxford Adventure Tourism. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-white transition-colors cursor-pointer">Official Licensed Tour Operator</span>
            <span>•</span>
            <span className="hover:text-white transition-colors cursor-pointer">State of Qatar</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

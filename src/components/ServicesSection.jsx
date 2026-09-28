import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Car, Shield, Briefcase, Plane, Wifi, Droplets, UserCheck, Sparkles } from 'lucide-react';
import { SERVICES_DATA } from '../data/siteData';

export default function ServicesSection({ onSelectService }) {
  const getServiceIcon = (id) => {
    switch (id) {
      case 'fleet-services':
        return <Car size={24} className="text-[#0e674d]" />;
      case 'corporate-transportation':
        return <Briefcase size={24} className="text-[#0e674d]" />;
      case 'luxury-transportation':
        return <Shield size={24} className="text-[#0e674d]" />;
      case 'airport-transportation':
        return <Plane size={24} className="text-[#0e674d]" />;
      default:
        return <Car size={24} className="text-[#0e674d]" />;
    }
  };

  const amenities = [
    { icon: <Wifi size={14} />, text: 'Complimentary High-Speed Wi-Fi' },
    { icon: <Droplets size={14} />, text: 'Chilled Evian Mineral Water' },
    { icon: <UserCheck size={14} />, text: 'Suited Executive Chauffeur' },
    { icon: <Sparkles size={14} />, text: 'Pristine Sanitized Interiors' }
  ];

  return (
    <section id="services" className="py-24 lg:py-32 bg-[#fcfbf9] relative overflow-hidden">
      {/* Ambient Liquid Glass Blobs for Dynamic Refraction */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-[#0e674d]/10 filter blur-[90px] pointer-events-none liquid-blob-1" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-[#c59a4b]/15 filter blur-[90px] pointer-events-none liquid-blob-2" />
      <div className="absolute top-2/3 left-1/3 w-80 h-80 rounded-full bg-[#ffaa0d]/10 filter blur-[80px] pointer-events-none liquid-blob-3" />

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        {/* Section Heading */}
        <div className="section-head text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 rounded-full liquid-glass text-[#0e674d] text-xs font-bold uppercase tracking-widest mb-3 border border-[#0e674d]/20"
          >
            Chauffeur & Fleet Solutions
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#0e674d] mb-4 tracking-tight leading-tight"
            style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
          >
            <span className="text-[#c59a4b] italic">Our Amazing</span> Services
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-gray-600 text-base md:text-lg font-light leading-relaxed"
          >
            First-class travel logistics, VIP airport transfers, and tailored corporate executive solutions across Qatar.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center mt-4"
          >
            <img
              src="https://oxfordadventuretourism.com/wp-content/themes/travlla/assets/images/background/Title-Separator.png"
              alt="Separator"
              className="h-4 w-auto opacity-80"
            />
          </motion.div>
        </div>

        {/* Liquid Glass Amenities Bar */}
        <div className="liquid-glass rounded-2xl p-4.5 max-w-4xl mx-auto mb-16 flex flex-wrap items-center justify-around gap-4 text-xs font-semibold text-gray-800 shadow-xl border border-white/90">
          {amenities.map((amenity, idx) => (
            <div key={idx} className="flex items-center gap-2.5 text-[#0e674d]">
              <span className="text-[#c59a4b] p-1.5 rounded-lg bg-[#c59a4b]/10">{amenity.icon}</span>
              <span className="text-gray-800 tracking-wide font-medium">{amenity.text}</span>
            </div>
          ))}
        </div>

        {/* Services Cards Grid with Liquid Glass */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES_DATA.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              whileHover={{ y: -10 }}
              className="group liquid-glass liquid-glass-card rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between border border-white/80"
            >
              {/* Image banner */}
              <div className="relative h-64 w-full overflow-hidden bg-gray-100">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

                {/* Floating liquid glass service icon */}
                <div className="absolute top-4 right-4 w-12 h-12 rounded-2xl liquid-glass shadow-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-[#ffaa0d] border border-white/80">
                  {getServiceIcon(service.id)}
                </div>

                {/* Card Subtitle Overlay */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[11px] font-bold text-[#ffaa0d] uppercase tracking-wider block">
                    {service.subtitle}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-white leading-tight">
                    {service.title}
                  </h3>
                </div>
              </div>

              {/* Info Container */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <p className="text-gray-700 text-sm leading-relaxed mb-6 font-normal">
                  {service.description}
                </p>

                <button
                  onClick={() => onSelectService(service)}
                  className="w-full py-3 px-4 rounded-full border-2 border-[#0e674d] text-[#0e674d] text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 group-hover:bg-[#0e674d] group-hover:text-white transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
                >
                  <span>Inquire Service</span>
                  <ArrowUpRight size={15} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Banner from Site */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 text-center border-t border-gray-200 pt-12"
        >
          <span className="text-[#0e674d] font-script text-2xl sm:text-3xl tracking-wide block mb-1">
            Wonderful Services For You
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#c59a4b] tracking-tight">
            Services We Offer
          </h2>
        </motion.div>
      </div>
    </section>
  );
}

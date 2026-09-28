import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Users, Phone, Mail, User, CheckCircle2, MessageSquare, Send, Clock, ShieldCheck, Sparkles } from 'lucide-react';
import { TOURS_DATA } from '../data/toursData';

export default function BookingModal({ isOpen, onClose, selectedTour }) {
  const [formData, setFormData] = useState({
    tourId: selectedTour ? selectedTour.id : TOURS_DATA[0].id,
    fullName: '',
    phone: '',
    email: '',
    date: '',
    guests: 2,
    vehicleType: 'Luxury SUV (4x4)',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (selectedTour) {
      setFormData((prev) => ({
        ...prev,
        tourId: selectedTour.id,
      }));
    }
  }, [selectedTour]);

  if (!isOpen) return null;

  const currentTour = TOURS_DATA.find((t) => t.id === formData.tourId) || TOURS_DATA[0];
  const totalPrice = currentTour.price * (formData.guests > 2 ? 1 + (formData.guests - 2) * 0.35 : 1);

  const handleWhatsAppSend = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) {
      alert('Please enter your Name and Phone/WhatsApp number.');
      return;
    }

    const message = `*NEW BOOKING INQUIRY — OXFORD ADVENTURE TOURISM*
---------------------------------------
• *Tour Package:* ${currentTour.title}
• *Duration:* ${currentTour.duration}
• *Preferred Date:* ${formData.date || 'Flexible / To Be Decided'}
• *Number of Guests:* ${formData.guests}
• *Vehicle Preference:* ${formData.vehicleType}
• *Estimated Total:* QR ${Math.round(totalPrice)}
---------------------------------------
• *Guest Name:* ${formData.fullName}
• *Contact Number:* ${formData.phone}
• *Email:* ${formData.email || 'Not provided'}
• *Special Requests:* ${formData.notes || 'None'}
---------------------------------------
_Sent via oxfordadventuretourism.com online concierge_`;

    const url = `https://wa.me/97472001133?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    setSubmitted(true);
  };

  const handleStandardSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
        {/* Ambient liquid orbs behind modal */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-[#0e674d]/25 filter blur-[90px] pointer-events-none liquid-blob-1" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#c59a4b]/25 filter blur-[90px] pointer-events-none liquid-blob-2" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-2xl liquid-glass rounded-3xl shadow-2xl overflow-hidden border border-white/80 max-h-[92vh] flex flex-col z-10"
        >
          {/* Header */}
          <div className="liquid-glass-dark text-white p-6 sm:p-7 relative flex items-center justify-between border-b border-white/15">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles size={14} className="text-[#ffaa0d]" />
                <span className="text-xs uppercase font-bold tracking-widest text-[#ffaa0d]">
                  VIP Reservation Concierge
                </span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
                Reserve Your Experience
              </h3>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full liquid-glass-dark hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8 overflow-y-auto flex-1">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10 space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#0e674d] mx-auto flex items-center justify-center shadow-inner">
                  <CheckCircle2 size={36} />
                </div>
                <h4 className="font-serif text-3xl text-[#0e674d] font-bold">
                  Reservation Inquiry Confirmed!
                </h4>
                <p className="text-gray-700 text-sm max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="font-bold text-gray-900">{formData.fullName || 'Valued Guest'}</span>! Your inquiry for <span className="font-bold text-[#0e674d]">{currentTour.title}</span> has been dispatched to our VIP Concierge team. We will contact you via WhatsApp (+974 7200 1133) promptly.
                </p>

                <div className="liquid-glass p-5 rounded-2xl border border-white/80 max-w-sm mx-auto text-xs text-gray-700 space-y-1 text-left mt-4 shadow-sm">
                  <p><span className="font-bold">Tour:</span> {currentTour.title}</p>
                  <p><span className="font-bold">Estimated Rate:</span> QR {Math.round(totalPrice)}</p>
                  <p><span className="font-bold">Guests:</span> {formData.guests} persons</p>
                  <p><span className="font-bold">Vehicle:</span> {formData.vehicleType}</p>
                </div>

                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="mt-6 px-9 py-3 bg-[#0e674d] text-white font-bold rounded-full text-xs uppercase tracking-wider hover:bg-[#084332] transition-colors shadow-lg cursor-pointer"
                >
                  Return to Site
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleStandardSubmit} className="space-y-5">
                {/* Selected Tour Summary Card */}
                <div className="p-4 rounded-2xl liquid-glass-gold border border-[#c59a4b]/40 flex items-center gap-4">
                  <img
                    src={currentTour.image}
                    alt={currentTour.title}
                    className="w-20 h-16 rounded-xl object-cover flex-shrink-0 shadow-md border border-white/60"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#c59a4b] block">
                      Selected Experience
                    </span>
                    <h4 className="font-serif text-lg font-bold text-[#0e674d] truncate">
                      {currentTour.title}
                    </h4>
                    <div className="flex items-center gap-3 text-xs text-gray-700 mt-0.5">
                      <span className="flex items-center gap-1"><Clock size={12} /> {currentTour.duration}</span>
                      <span>•</span>
                      <span className="font-bold text-[#0e674d]">From QR {currentTour.price}</span>
                    </div>
                  </div>
                </div>

                {/* Switch Tour Package */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Change Package (Optional)
                  </label>
                  <select
                    value={formData.tourId}
                    onChange={(e) => setFormData({ ...formData, tourId: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl liquid-glass-input text-gray-800 text-sm focus:outline-none transition-colors cursor-pointer"
                  >
                    {TOURS_DATA.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.title} — QR {t.price} ({t.duration})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl liquid-glass-input text-sm text-gray-900 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Phone / WhatsApp *
                    </label>
                    <div className="relative">
                      <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                      <input
                        type="tel"
                        required
                        placeholder="+974 7200 1133"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl liquid-glass-input text-sm text-gray-900 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Date & Guests & Vehicle */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Tour Date
                    </label>
                    <div className="relative">
                      <Calendar size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl liquid-glass-input text-sm text-gray-900 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Guests
                    </label>
                    <div className="relative">
                      <Users size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                      <select
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl liquid-glass-input text-sm text-gray-900 focus:outline-none cursor-pointer"
                      >
                        <option value={1}>1 Guest</option>
                        <option value={2}>2 Guests</option>
                        <option value={3}>3 Guests</option>
                        <option value={4}>4 Guests</option>
                        <option value={6}>6 Guests (Family)</option>
                        <option value={10}>10+ VIP Group</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Vehicle Preference
                    </label>
                    <select
                      value={formData.vehicleType}
                      onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl liquid-glass-input text-sm text-gray-900 focus:outline-none cursor-pointer"
                    >
                      <option value="Luxury SUV (4x4)">Luxury SUV (4x4)</option>
                      <option value="Executive Sedan">Executive Sedan</option>
                      <option value="VIP Mercedes Sprinter">VIP Sprinter</option>
                      <option value="Luxury Coach">Luxury Coach</option>
                    </select>
                  </div>
                </div>

                {/* Special Request */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Pickup Location / Notes
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Hotel pickup (e.g. Ritz-Carlton, St. Regis, Hamad Airport)..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl liquid-glass-input text-sm text-gray-900 focus:outline-none"
                  />
                </div>

                {/* Price Estimate Strip */}
                <div className="p-3.5 rounded-xl liquid-glass-gold border border-[#c59a4b]/40 flex items-center justify-between text-xs text-amber-950 shadow-sm">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={16} className="text-[#0e674d]" />
                    <span>No deposit required today. Free cancellation up to 24 hrs prior.</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-sm text-[#0e674d]">Est. QR {Math.round(totalPrice)}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={handleWhatsAppSend}
                    className="flex-1 py-3.5 px-6 rounded-full bg-[#25D366] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#20ba59] transition-all shadow-md cursor-pointer"
                  >
                    <MessageSquare size={16} />
                    <span>Instant WhatsApp Reservation</span>
                  </button>

                  <button
                    type="submit"
                    className="flex-1 py-3.5 px-6 rounded-full bg-[#0e674d] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#084332] transition-all shadow-md cursor-pointer"
                  >
                    <Send size={15} />
                    <span>Send Online Request</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

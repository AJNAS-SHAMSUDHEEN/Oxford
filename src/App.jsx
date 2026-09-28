import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSlider from './components/HeroSlider';
import EasySteps from './components/EasySteps';
import GatewaySection from './components/GatewaySection';
import PopularTours from './components/PopularTours';
import ServicesSection from './components/ServicesSection';
import VideoCounterSection from './components/VideoCounterSection';
import TestimonialsSection from './components/TestimonialsSection';
import FaqSection from './components/FaqSection';
import NewsBlogSection from './components/NewsBlogSection';
import GallerySection from './components/GallerySection';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import VideoModal from './components/VideoModal';
import BlogModal from './components/BlogModal';
import FloatingWidgets from './components/FloatingWidgets';

export default function App() {
  const [activeSection, setActiveSection] = useState('Home');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedTour, setSelectedTour] = useState(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const handleOpenBooking = (tour = null) => {
    setSelectedTour(tour);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setSelectedTour(null);
  };

  const handleExploreTours = () => {
    const el = document.getElementById('tours');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#07100c] text-[#f4f7f5] font-sans antialiased selection:bg-[#C1933E] selection:text-black">
      {/* Top Navigation */}
      <Navbar
        onOpenBooking={() => handleOpenBooking(null)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Content */}
      <main>
        {/* Hero Slider with Ken Burns animations */}
        <HeroSlider
          onExploreClick={handleExploreTours}
          onOpenVideo={() => setIsVideoOpen(true)}
          onQuickBook={handleOpenBooking}
        />

        {/* Easy Steps For Bookings */}
        <EasySteps onSelectStep={handleExploreTours} />

        {/* Gateway Section - About Us */}
        <GatewaySection />

        {/* Explore Popular Tours Carousel */}
        <PopularTours onBookTour={handleOpenBooking} />

        {/* Our Amazing Services */}
        <ServicesSection
          onSelectService={(service) =>
            handleOpenBooking({ title: service.title, price: 650, duration: 'Flexible', id: service.id })
          }
        />

        {/* Video & Counter Stats Section */}
        <VideoCounterSection onOpenVideo={() => setIsVideoOpen(true)} />

        {/* Testimonials */}
        <TestimonialsSection />

        {/* Qatar Photo Gallery */}
        <GallerySection />

        {/* FAQ Accordion */}
        <FaqSection onOpenBooking={() => handleOpenBooking(null)} />

        {/* Latest News & Blog Section */}
        <NewsBlogSection onSelectBlog={(blog) => setSelectedBlog(blog)} />
      </main>

      {/* Footer */}
      <Footer onSelectTour={handleOpenBooking} />

      {/* Floating Action Buttons */}
      <FloatingWidgets onOpenBooking={() => handleOpenBooking(null)} />

      {/* Interactive Reservation / Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        selectedTour={selectedTour}
      />

      {/* Fullscreen Video Modal */}
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
      />

      {/* Full Blog Article Modal */}
      <BlogModal
        blog={selectedBlog}
        onClose={() => setSelectedBlog(null)}
        onBookNow={handleOpenBooking}
      />
    </div>
  );
}

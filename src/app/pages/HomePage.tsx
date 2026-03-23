import { useEffect } from 'react';
import { useLocation } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import HeroSection from '../components/home/HeroSection';
import WelcomeSection from '../components/home/WelcomeSection';
import FeaturedDishes from '../components/home/FeaturedDishes';
import WhyDineWithUs from '../components/home/WhyDineWithUs';
import MenuPreview from '../components/home/MenuPreview';
import GallerySection from '../components/home/GallerySection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import ContactSection from '../components/home/ContactSection';

export default function HomePage() {
  const location = useLocation();

  // Scroll to a section when navigating here from another page (e.g. Menu → About/Gallery)
  useEffect(() => {
    const target = (location.state as { scrollTo?: string } | null)?.scrollTo;
    if (target) {
      // Small delay to let the page paint first
      const timer = setTimeout(() => {
        const el = document.querySelector(target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <WelcomeSection />
      <FeaturedDishes />
      <WhyDineWithUs />
      <MenuPreview />
      <GallerySection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
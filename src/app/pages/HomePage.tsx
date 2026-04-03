import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { Helmet } from 'react-helmet-async';
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
  const siteUrl = 'https://kalikaresturant.co.in';
  const pageUrl = `${siteUrl}/`;
  const ogImage = `${siteUrl}/assets/images/common.jpg`;

  // Scroll behavior when arriving on the home route
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
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.key, location.state]);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Kalika Restaurant (Kalika Resturant) | Majitar, Sikkim</title>
        <meta
          name="description"
          content="Kalika Restaurant (Kalika Resturant) in Majitar, Sikkim (737136) — authentic Sikkimese flavors, momos, thukpa, and more. View our menu and reserve a table on WhatsApp."
        />

        <link rel="canonical" href={pageUrl} />

        <meta property="og:title" content="Kalika Restaurant | Majitar, Sikkim" />
        <meta property="og:description" content="Authentic flavors of Sikkim, served with love. Explore our menu and reserve a table." />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content="Kalika Restaurant" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kalika Restaurant | Majitar, Sikkim" />
        <meta name="twitter:description" content="Authentic flavors of Sikkim, served with love. Explore our menu and reserve a table." />
        <meta name="twitter:image" content={ogImage} />

        <script type="application/ld+json">
          {JSON.stringify(
            {
              '@context': 'https://schema.org',
              '@type': 'Restaurant',
              '@id': `${siteUrl}/#restaurant`,
              name: 'Kalika Restaurant',
              alternateName: ['Kalika Resturant', 'KALIKA RESTURANT'],
              url: pageUrl,
              image: ogImage,
              description: 'Authentic flavors of Sikkim, served with love.',
              telephone: '+91 87689 76350',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Majitar',
                addressRegion: 'Sikkim',
                postalCode: '737136',
                addressCountry: 'IN',
              },
              hasMap: 'https://maps.app.goo.gl/k9QM4D9VufNNrPBL8',
              sameAs: [
                'https://instagram.com/kalika4184',
                'https://facebook.com/bikashlimbu',
              ],
            },
            null,
            0
          )}
        </script>
      </Helmet>
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
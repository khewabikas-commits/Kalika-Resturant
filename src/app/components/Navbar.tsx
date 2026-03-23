import { Link, useLocation, useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { Menu, X, UtensilsCrossed, MessageCircle } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const navLinks = [
    { label: 'Home', to: '/', type: 'router' },
    { label: 'Menu', to: '/menu', type: 'router' },
    { label: 'About', to: '/#about', type: 'hash' },
    { label: 'Gallery', to: '/#gallery', type: 'hash' },
  ];

  const scrollTo = (hash: string) => {
    setMobileOpen(false);
    if (isHome) {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Navigate home and pass the scroll target via route state
      navigate('/', { state: { scrollTo: hash } });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled || mobileOpen
            ? 'bg-[#FDF6EC] shadow-lg shadow-[#1B3A2D]/10'
            : 'bg-[#FDF6EC]/95 backdrop-blur-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-12 h-12 bg-[#1B3A2D] rounded-xl shadow-md group-hover:bg-[#E8882A] transition-colors duration-300">
              <UtensilsCrossed className="w-6 h-6 text-[#E8882A] group-hover:text-white transition-colors duration-300" />
            </div>
            <div>
              <div className="text-[#1B3A2D] tracking-widest uppercase" style={{ fontFamily: 'Lora, serif', fontWeight: 700, fontSize: '1.1rem' }}>
                KALIKA
              </div>
              <div className="text-[#E8882A] tracking-widest uppercase" style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 600, fontSize: '0.65rem', letterSpacing: '0.2em' }}>
                RESTAURANT
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) =>
              link.type === 'router' ? (
                <Link
                  key={link.label}
                  to={link.to}
                  className={`relative font-semibold transition-colors duration-200 group ${
                    location.pathname === link.to ? 'text-[#E8882A]' : 'text-[#2C1810] hover:text-[#E8882A]'
                  }`}
                >
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#E8882A] transition-all duration-300 ${
                    location.pathname === link.to ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </Link>
              ) : (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.to.replace('/', ''))}
                  className="relative font-semibold text-[#2C1810] hover:text-[#E8882A] transition-colors duration-200 group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#E8882A] group-hover:w-full transition-all duration-300" />
                </button>
              )
            )}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://wa.me/918768976350?text=Hello%20Kalika%20Restaurant!%20%F0%9F%99%8F%20I%20would%20like%20to%20reserve%20a%20table.%0A%0AName%3A%20%0ADate%3A%20%0ATime%3A%20%0ANo.%20of%20Guests%3A%20%0A%0APlease%20confirm%20my%20booking.%20Thank%20you!"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#E8882A] text-white px-5 py-2.5 rounded-full font-semibold hover:bg-[#d17a24] transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              Reserve a Table
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-[#1B3A2D] hover:bg-[#1B3A2D]/10 transition-colors"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-[#FDF6EC] border-t border-[#E8882A]/20 px-6 py-6 space-y-4">
            {navLinks.map((link) =>
              link.type === 'router' ? (
                <Link
                  key={link.label}
                  to={link.to}
                  className="block font-semibold text-[#2C1810] hover:text-[#E8882A] py-2 border-b border-[#E8882A]/10"
                >
                  {link.label}
                </Link>
              ) : (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.to.replace('/', ''))}
                  className="block w-full text-left font-semibold text-[#2C1810] hover:text-[#E8882A] py-2 border-b border-[#E8882A]/10"
                >
                  {link.label}
                </button>
              )
            )}
            <a
              href="https://wa.me/918768976350?text=Hello%20Kalika%20Restaurant!%20%F0%9F%99%8F%20I%20would%20like%20to%20reserve%20a%20table.%0A%0AName%3A%20%0ADate%3A%20%0ATime%3A%20%0ANo.%20of%20Guests%3A%20%0A%0APlease%20confirm%20my%20booking.%20Thank%20you!"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-[#E8882A] text-white py-3 rounded-full font-semibold text-center hover:bg-[#d17a24] transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Reserve a Table
            </a>
          </div>
        )}
      </nav>
    </>
  );
}
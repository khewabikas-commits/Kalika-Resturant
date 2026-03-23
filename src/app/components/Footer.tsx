import { Link, useLocation, useNavigate } from 'react-router';
import { UtensilsCrossed, Instagram, Facebook, MessageCircle, Mail, Phone, MapPin, Clock, ArrowUp, Lock } from 'lucide-react';

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const scrollToSection = (hash: string) => {
    if (isHome) {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/', { state: { scrollTo: hash } });
    }
  };

  return (
    <footer className="bg-[#0F2419] text-white relative overflow-hidden">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#E8882A] to-transparent opacity-60" />

      {/* Decorative circles */}
      <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#E8882A]/5 rounded-full" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#1B3A2D]/40 rounded-full" />

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 bg-[#E8882A] rounded-xl flex items-center justify-center flex-shrink-0">
                <UtensilsCrossed className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-bold tracking-widest text-lg" style={{ fontFamily: 'Lora, serif' }}>KALIKA</div>
                <div className="text-[#E8882A] text-xs tracking-[0.2em] uppercase">Restaurant</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm italic leading-relaxed mb-5">
              "Authentic Flavors of Sikkim, Served with Love"
            </p>
            <div className="flex gap-3">
              {[
                { icon: Instagram, href: 'https://instagram.com/kalika4184', title: 'Instagram' },
                { icon: Facebook, href: 'https://facebook.com/bikashlimbu', title: 'Facebook' },
                { icon: MessageCircle, href: 'https://wa.me/918768976350', title: 'WhatsApp' },
              ].map(({ icon: Icon, href, title }) => (
                <a
                  key={title}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={title}
                  className="w-9 h-9 bg-[#1B3A2D] rounded-lg flex items-center justify-center hover:bg-[#E8882A] transition-colors duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-5 text-[#E8882A] uppercase tracking-wider text-sm">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', to: '/', type: 'router' },
                { label: 'Full Menu', to: '/menu', type: 'router' },
                { label: 'Gallery', hash: '#gallery', type: 'hash' },
                { label: 'Contact Us', hash: '#contact', type: 'hash' },
                { label: 'Admin', to: '/admin', type: 'router' },
              ].map((link) => (
                <li key={link.label}>
                  {link.type === 'router' ? (
                    <Link to={link.to!} className="text-gray-400 hover:text-[#E8882A] transition-colors text-sm flex items-center gap-2 group">
                      <span className="w-1 h-1 rounded-full bg-[#E8882A]/40 group-hover:bg-[#E8882A] transition-colors" />
                      {link.label === 'Admin' && <Lock className="w-3 h-3 opacity-60" />}
                      {link.label}
                    </Link>
                  ) : (
                    <button
                      onClick={() => scrollToSection(link.hash!)}
                      className="text-gray-400 hover:text-[#E8882A] transition-colors text-sm flex items-center gap-2 group w-full text-left"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#E8882A]/40 group-hover:bg-[#E8882A] transition-colors" />
                      {link.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Hours & CTA */}
          <div>
            <h4 className="font-bold mb-5 text-[#E8882A] uppercase tracking-wider text-sm">Visit Us</h4>
            <div className="bg-[#1B3A2D] rounded-2xl p-5 border border-[#E8882A]/20">
              <p className="text-white font-semibold mb-3" style={{ fontFamily: 'Lora, serif' }}>Opening Hours</p>
              <div className="space-y-2 text-sm text-gray-400 mb-5">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#E8882A] flex-shrink-0" />
                  Open Daily: 8:00 AM – 10:00 PM
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#E8882A] flex-shrink-0" />
                  Lower Mazhitar, East Sikkim
                </div>
              </div>
              <a
                href="https://wa.me/918768976350?text=Hello%20Kalika%20Restaurant!%20%F0%9F%99%8F%20I%20would%20like%20to%20reserve%20a%20table.%0A%0AName%3A%20%0ADate%3A%20%0ATime%3A%20%0ANo.%20of%20Guests%3A%20%0A%0APlease%20confirm%20my%20booking.%20Thank%20you!"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-[#E8882A] text-white py-3 rounded-xl font-bold text-sm hover:bg-[#d17a24] transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 flex-shrink-0"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Reserve a Table
              </a>
            </div>
          </div>
        </div>

        {/* Decorative divider */}
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-[#E8882A] text-lg">🌿</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm text-center">
            © 2026 Kalika Restaurant, Lower Mazhitar, East Sikkim. All rights reserved.
          </p>
          <button
            onClick={scrollTop}
            className="flex items-center gap-2 text-gray-500 hover:text-[#E8882A] transition-colors text-sm"
          >
            Back to top <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
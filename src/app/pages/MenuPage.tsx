import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { useMenu, publicMenuCategoryGroups } from '../context/MenuContext';
import { UtensilsCrossed, Search, Filter } from 'lucide-react';

export default function MenuPage() {
  const { menuItems } = useMenu();
  const navigate = useNavigate();
  const groupNames = publicMenuCategoryGroups.map((g) => g.name);
  const [activeCategory, setActiveCategory] = useState(groupNames[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [vegFilter, setVegFilter] = useState<'all' | 'veg' | 'nonveg'>('all');
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const tabBarRef = useRef<HTMLDivElement>(null);

  const scrollToCategory = (category: string) => {
    setActiveCategory(category);
    const el = categoryRefs.current[category];
    if (el) {
      const offset = 130;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  // Scroll spy
  useEffect(() => {
    const handleScroll = () => {
      for (const cat of groupNames) {
        const el = categoryRefs.current[cat];
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom > 160) {
            setActiveCategory(cat);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Group items by category
  const grouped = publicMenuCategoryGroups.reduce<Record<string, typeof menuItems>>((acc, group) => {
    let items = menuItems.filter((item) => group.categories.includes(item.category));
    if (searchTerm) {
      items = items.filter((i) =>
        i.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        i.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (vegFilter === 'veg') items = items.filter((i) => i.veg);
    if (vegFilter === 'nonveg') items = items.filter((i) => !i.veg);
    acc[group.name] = items;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-[#FDF6EC]">
      <Navbar />

      {/* Page Header */}
      <section className="bg-[#1B3A2D] pt-36 pb-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#E8882A] rounded-full" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-[#E8882A] rounded-full" />
        </div>
        <div className="max-w-7xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-[#E8882A]" />
            <UtensilsCrossed className="w-5 h-5 text-[#E8882A]" />
            <span className="h-px w-10 bg-[#E8882A]" />
          </div>
          <h1 style={{ fontFamily: 'Lora, serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#E8882A' }} className="mb-3">
            Our Menu
          </h1>
          <p className="text-white/70 text-lg">Fresh ingredients, authentic flavors — crafted with love</p>
        </div>
      </section>

      {/* Sticky Category Tabs */}
      <div
        ref={tabBarRef}
        className="sticky top-[72px] z-40 bg-[#FDF6EC] border-b-2 border-[#E8882A]/20 shadow-md"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-2 py-3 overflow-x-auto scrollbar-hide">
            {publicMenuCategoryGroups.map((group) => (
              <button
                key={group.name}
                onClick={() => scrollToCategory(group.name)}
                className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full font-semibold whitespace-nowrap transition-all duration-200 text-sm flex-shrink-0 ${
                  activeCategory === group.name
                    ? 'bg-[#E8882A] text-white shadow-md'
                    : 'bg-white text-[#2C1810] hover:bg-[#E8882A]/10 border border-[#E8882A]/20 hover:border-[#E8882A]/50'
                }`}
              >
                <span>{group.emoji}</span>
                {group.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7A6652]" />
            <input
              type="text"
              placeholder="Search dishes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-[#E8882A]/20 rounded-xl bg-white focus:border-[#E8882A] focus:outline-none transition-colors text-[#2C1810]"
            />
          </div>
          <div className="flex gap-2">
            {(['all', 'veg', 'nonveg'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setVegFilter(f)}
                className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 border-2 ${
                  vegFilter === f
                    ? f === 'veg'
                      ? 'bg-green-600 text-white border-green-600'
                      : f === 'nonveg'
                      ? 'bg-red-600 text-white border-red-600'
                      : 'bg-[#1B3A2D] text-white border-[#1B3A2D]'
                    : 'bg-white text-[#2C1810] border-[#E8882A]/20 hover:border-[#E8882A]/50'
                }`}
              >
                {f === 'all' ? 'All' : f === 'veg' ? '🟢 Veg' : '🔴 Non-Veg'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Content */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        {publicMenuCategoryGroups.map((group) => {
          const cat = group.name;
          const items = grouped[cat];
          if (!items || items.length === 0) return null;
          return (
            <div
              key={cat}
              id={cat}
              ref={(el) => { categoryRefs.current[cat] = el; }}
              className="mb-14"
            >
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{group.emoji}</span>
                  <h2 className="text-[#1B3A2D]" style={{ fontFamily: 'Lora, serif', fontSize: '1.8rem' }}>
                    {cat}
                  </h2>
                </div>
                <div className="flex-1 h-px bg-[#E8882A]/20" />
                <span className="text-[#7A6652] text-sm font-medium">{items.length} items</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-[#E8882A]/10 hover:border-[#E8882A]/30 flex"
                  >
                    {/* Image */}
                    <div className="w-28 h-28 flex-shrink-0 overflow-hidden m-3 rounded-xl">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-4 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between mb-1 gap-2">
                          <h3 className="text-[#1B3A2D] flex-1" style={{ fontFamily: 'Lora, serif', fontSize: '1.1rem', fontWeight: 600 }}>
                            {item.name}
                          </h3>
                          {/* Veg/Non-veg indicator */}
                          <div className={`flex-shrink-0 w-5 h-5 border-2 ${item.veg ? 'border-green-600' : 'border-red-600'} rounded-sm flex items-center justify-center mt-0.5`}>
                            <div className={`w-2.5 h-2.5 rounded-full ${item.veg ? 'bg-green-600' : 'bg-red-600'}`} />
                          </div>
                        </div>
                        <p className="text-[#7A6652] text-sm leading-relaxed line-clamp-2">{item.description}</p>
                      </div>
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#E8882A]/10">
                        <span className="text-[#E8882A] text-xl font-bold" style={{ fontFamily: 'Lora, serif' }}>
                          ₹{item.price}
                        </span>
                        <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${item.veg ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                          {item.veg ? 'Vegetarian' : 'Non-Veg'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* No results */}
        {publicMenuCategoryGroups.every((group) => !grouped[group.name] || grouped[group.name].length === 0) && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-[#1B3A2D] text-xl mb-2">No dishes found</h3>
            <p className="text-[#7A6652]">Try a different search term or filter</p>
          </div>
        )}
      </div>

      {/* Bottom CTA Banner */}
      <section className="bg-gradient-to-r from-[#E8882A] to-[#d17a24] py-14 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-white text-2xl mb-2" style={{ fontFamily: 'Lora, serif' }}>
            Want to Dine In?
          </h3>
          <p className="text-white/80 mb-8 text-lg">Reserve your table on WhatsApp — we'll confirm your booking right away!</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/918768976350?text=Hello%20Kalika%20Restaurant!%20%F0%9F%99%8F%20I%20would%20like%20to%20reserve%20a%20table.%0A%0AName%3A%20%0ADate%3A%20%0ATime%3A%20%0ANo.%20of%20Guests%3A%20%0A%0APlease%20confirm%20my%20booking.%20Thank%20you!"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-[#E8882A] px-10 py-4 rounded-full text-lg font-bold hover:bg-[#FDF6EC] transition-colors shadow-xl"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Reserve a Table
            </a>
            <a
              href="tel:8768976350"
              className="inline-flex items-center gap-2 border-2 border-white text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-white hover:text-[#E8882A] transition-colors"
            >
              📞 Call Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
import { Instagram, ExternalLink } from 'lucide-react';
import { ImageWithFallback } from '../ImageWithFallback';
import { motion } from 'motion/react';
import { useState } from 'react';

const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1646197523131-7b69d5458ffa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    label: 'Steamed Momos',
    category: 'Food',
  },
  {
    src: 'https://images.unsplash.com/photo-1701773169812-750e47f0ab19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    label: 'Authentic Thukpa',
    category: 'Food',
  },
  {
    src: 'https://images.unsplash.com/photo-1764699486769-fc9a8b03130a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    label: 'Traditional Dal Bhat',
    category: 'Food',
  },
  {
    src: 'https://images.unsplash.com/photo-1669043962012-a5b8496cd664?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    label: 'Warm Ambiance',
    category: 'Ambiance',
  },
  {
    src: 'https://images.unsplash.com/photo-1591814252471-068b545dff62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    label: 'Wok Fried Rice',
    category: 'Food',
  },
  {
    src: 'https://images.unsplash.com/photo-1648192312898-838f9b322f47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    label: 'Masala Chai',
    category: 'Drinks',
  },
];

export default function GallerySection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="gallery" className="bg-[#FDF6EC] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-[#E8882A]" />
            <span className="text-[#E8882A] uppercase tracking-[0.2em] text-sm font-bold">Visual Story</span>
            <span className="h-px w-10 bg-[#E8882A]" />
          </div>
          <h2 className="text-[#1B3A2D]" style={{ fontFamily: 'Lora, serif', fontSize: 'clamp(2rem, 4vw, 2.8rem)' }}>
            A Glimpse of <span className="text-[#E8882A] italic">Kalika</span>
          </h2>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={`relative group rounded-2xl overflow-hidden shadow-lg cursor-pointer ${
                index === 0 || index === 3 ? 'md:row-span-1' : ''
              }`}
              style={{ aspectRatio: index === 0 || index === 5 ? '4/3' : '1/1' }}
              onMouseEnter={() => setHoveredIdx(index)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <ImageWithFallback
                src={image.src}
                alt={image.label}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {/* Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t from-[#1B3A2D]/90 via-[#1B3A2D]/30 to-transparent transition-opacity duration-300 ${
                hoveredIdx === index ? 'opacity-100' : 'opacity-0'
              }`} />

              {/* Label */}
              <div className={`absolute bottom-0 left-0 right-0 p-4 transition-all duration-300 ${
                hoveredIdx === index ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}>
                <span className="text-[#E8882A] text-xs font-bold uppercase tracking-wide block mb-1">{image.category}</span>
                <p className="text-white font-bold text-lg" style={{ fontFamily: 'Lora, serif' }}>{image.label}</p>
              </div>

              {/* Category badge */}
              <div className="absolute top-3 left-3 bg-[#1B3A2D]/80 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {image.category}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Instagram CTA */}
        <div className="text-center">
          <a
            href="https://instagram.com/kalika4184"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white px-8 py-3 rounded-full font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
          >
            <Instagram className="w-5 h-5" />
            View More on Instagram @Kalika4184
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

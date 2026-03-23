import { Link } from 'react-router';
import { ImageWithFallback } from '../ImageWithFallback';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const dishes = [
  {
    name: 'Thukpa',
    emoji: '🍜',
    description: 'Traditional Tibetan noodle soup simmered with fresh mountain vegetables and aromatic spices',
    price: '₹100',
    tag: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1701773169812-750e47f0ab19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
  },
  {
    name: 'Steamed Momo',
    emoji: '🥟',
    description: 'Delicate handmade dumplings filled with your choice of vegetables or tender chicken',
    price: '₹80',
    tag: 'Must Try',
    image: 'https://images.unsplash.com/photo-1646197523131-7b69d5458ffa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
  },
  {
    name: 'Dal Bhat Set',
    emoji: '🍛',
    description: 'Complete Nepali meal with fragrant rice, lentil soup, seasonal vegetables, and pickle',
    price: '₹150',
    tag: 'Chef\'s Pick',
    image: 'https://images.unsplash.com/photo-1764699486769-fc9a8b03130a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
  },
  {
    name: 'Wai Wai Special',
    emoji: '🍲',
    description: 'Beloved local noodles elevated with fresh vegetables, egg, and our secret spice blend',
    price: '₹90',
    tag: 'Local Fav',
    image: 'https://images.unsplash.com/photo-1591814252471-068b545dff62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
  },
];

export default function FeaturedDishes() {
  return (
    <section className="bg-[#1B3A2D] py-24 px-6 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-[#E8882A] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#E8882A] translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 mb-4"
          >
            <span className="h-px w-10 bg-[#E8882A]" />
            <span className="text-[#E8882A] uppercase tracking-[0.2em] text-sm font-bold">Our Specialties</span>
            <span className="h-px w-10 bg-[#E8882A]" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white"
            style={{ fontFamily: 'Lora, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#ffffff' }}
          >
            Chef's <span style={{ color: '#E8882A' }} className="italic">Specialties</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dishes.map((dish, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-[#0F2419] rounded-2xl overflow-hidden border border-[#E8882A]/20 hover:border-[#E8882A]/60 transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(232,136,42,0.25)]"
            >
              {/* Tag */}
              <div className="absolute top-4 left-4 z-10 bg-[#E8882A] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                {dish.tag}
              </div>

              {/* Image */}
              <div className="h-52 overflow-hidden">
                <ImageWithFallback
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 h-52 bg-gradient-to-t from-[#0F2419] to-transparent opacity-40" />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="text-3xl mb-3">{dish.emoji}</div>
                <h3 style={{ fontFamily: 'Lora, serif', color: '#ffffff' }} className="text-xl mb-2">{dish.name}</h3>
                <p className="text-white/60 text-sm mb-5 leading-relaxed">
                  {dish.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[#E8882A] text-2xl font-bold" style={{ fontFamily: 'Lora, serif' }}>{dish.price}</span>
                  <Link
                    to="/menu"
                    className="flex items-center gap-1 text-[#E8882A]/70 text-sm hover:text-[#E8882A] transition-colors group/link"
                  >
                    Full Menu
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Bottom glow */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#E8882A] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/menu"
            className="inline-flex items-center gap-3 border-2 border-[#E8882A] text-[#E8882A] px-8 py-3 rounded-full font-bold hover:bg-[#E8882A] hover:text-white transition-all duration-300"
          >
            Explore Full Menu
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
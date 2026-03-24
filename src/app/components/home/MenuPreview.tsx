import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useMenu, publicMenuCategoryGroups } from '../../context/MenuContext';

export default function MenuPreview() {
  const { menuItems } = useMenu();

  const categories = publicMenuCategoryGroups
    .map((group) => ({
      name: group.name,
      emoji: group.emoji,
      count: menuItems.filter((i) => group.categories.includes(i.category)).length,
    }))
    .filter((c) => c.count > 0)
    .slice(0, 9);

  return (
    <section className="bg-[#1B3A2D] py-24 px-6 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#E8882A]/5 rounded-full translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#E8882A]/5 rounded-full -translate-x-1/3 translate-y-1/3" />

      <div className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Categories */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-[#E8882A]" />
              <span className="text-[#E8882A] uppercase tracking-[0.2em] text-sm font-bold">Browse by Category</span>
              <span className="h-px w-8 bg-[#E8882A]" />
            </div>

            <h2 className="text-white mb-8" style={{ fontFamily: 'Lora, serif', fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: '#ffffff' }}>
              Explore Our <span style={{ color: '#E8882A' }} className="italic">Menu</span>
            </h2>

            <div className="flex flex-wrap gap-3">
              {categories.map((cat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={`/menu#${cat.name}`}
                    className="group flex items-center gap-2 bg-[#0F2419] border border-[#E8882A]/30 px-5 py-2.5 rounded-full text-white hover:bg-[#E8882A] hover:border-[#E8882A] transition-all duration-200 hover:-translate-y-0.5"
                  >
                    <span className="text-lg">{cat.emoji}</span>
                    <span className="font-medium text-sm">{cat.name}</span>
                    <span className="text-white/40 text-xs group-hover:text-white/70">({cat.count})</span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 mt-10">
              <span className="h-px flex-1 bg-[#E8882A]/20" />
              <span className="text-[#E8882A]">🍃</span>
              <span className="h-px flex-1 bg-[#E8882A]/20" />
            </div>
          </motion.div>

          {/* Right: CTA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-[#0F2419] rounded-3xl p-10 border border-[#E8882A]/20 text-center relative overflow-hidden"
          >
            {/* Corner decorations */}
            <div className="absolute top-4 left-4 text-[#E8882A]/20 text-3xl">✦</div>
            <div className="absolute top-4 right-4 text-[#E8882A]/20 text-3xl">✦</div>
            <div className="absolute bottom-4 left-4 text-[#E8882A]/20 text-3xl">✦</div>
            <div className="absolute bottom-4 right-4 text-[#E8882A]/20 text-3xl">✦</div>

            <div className="text-7xl mb-6">🍽️</div>
            <h3 style={{ fontFamily: 'Lora, serif', color: '#ffffff' }} className="text-2xl mb-3">
              Ready to Order?
            </h3>
            <p className="text-white/60 mb-8 leading-relaxed">
              Discover our full selection of authentic Sikkimese, Nepali, Indian, and Chinese dishes — 
              fresh ingredients, bold flavors.
            </p>

            <Link
              to="/menu"
              className="inline-flex items-center gap-3 bg-[#E8882A] text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-[#d17a24] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 group"
            >
              Explore Full Menu
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <p className="text-white/40 text-sm mt-6">
              {menuItems.length}+ dishes across {publicMenuCategoryGroups.length} categories
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
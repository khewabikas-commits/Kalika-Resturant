import { Mountain, ChefHat, Flame, Phone } from 'lucide-react';
import { motion } from 'motion/react';

const features = [
  {
    icon: Mountain,
    emoji: '🏔️',
    title: 'Fresh Mountain Ingredients',
    description: 'Locally sourced ingredients from the pristine mountains and valleys of Sikkim',
    color: 'from-emerald-500 to-green-700',
  },
  {
    icon: ChefHat,
    emoji: '👨‍🍳',
    title: 'Authentic Local Recipes',
    description: 'Traditional recipes passed down through generations, preserving Sikkimese culture',
    color: 'from-amber-500 to-orange-600',
  },
  {
    icon: Flame,
    emoji: '🕯️',
    title: 'Cozy Dine-in Atmosphere',
    description: 'Warm, welcoming ambiance perfect for family gatherings and memorable moments',
    color: 'from-rose-500 to-red-700',
  },
  {
    icon: Phone,
    emoji: '📞',
    title: 'Easy Table Reservation',
    description: 'Quick and simple reservation process — online or just give us a call',
    color: 'from-blue-500 to-indigo-700',
  },
];

export default function WhyDineWithUs() {
  return (
    <section className="bg-[#FDF6EC] py-24 px-6 relative overflow-hidden">
      {/* Decorative leaf motifs */}
      <div className="absolute top-10 left-10 text-6xl opacity-5 rotate-12">🍃</div>
      <div className="absolute bottom-10 right-10 text-6xl opacity-5 -rotate-12">🌿</div>
      <div className="absolute top-1/2 left-0 w-48 h-48 bg-[#E8882A]/5 rounded-full -translate-x-1/2" />
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-[#1B3A2D]/5 rounded-full translate-x-1/3" />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 mb-4"
          >
            <span className="h-px w-10 bg-[#E8882A]" />
            <span className="text-[#E8882A] uppercase tracking-[0.2em] text-sm font-bold">Our Promise</span>
            <span className="h-px w-10 bg-[#E8882A]" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[#1B3A2D]"
            style={{ fontFamily: 'Lora, serif', fontSize: 'clamp(2rem, 4vw, 2.8rem)' }}
          >
            Why <span className="italic text-[#E8882A]">Dine</span> With Us
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-[#E8882A]/10 hover:border-[#E8882A]/30 text-center overflow-hidden"
              >
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#E8882A] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Icon */}
                <div className="relative inline-flex items-center justify-center w-20 h-20 mb-6">
                  <div className="absolute inset-0 bg-[#E8882A]/10 rounded-2xl group-hover:bg-[#E8882A]/20 transition-colors duration-300" />
                  <div className="relative">
                    <span className="text-3xl block mb-1">{feature.emoji}</span>
                  </div>
                </div>

                <h3 className="text-[#1B3A2D] text-xl mb-3" style={{ fontFamily: 'Lora, serif', fontWeight: 600 }}>
                  {feature.title}
                </h3>
                <p className="text-[#7A6652] leading-relaxed text-sm">{feature.description}</p>

                {/* Decorative corner */}
                <div className="absolute bottom-3 right-3 text-[#E8882A]/10 text-4xl group-hover:text-[#E8882A]/20 transition-colors">
                  ✦
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

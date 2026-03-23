import { Star, Quote } from 'lucide-react';
import { motion } from 'motion/react';

const testimonials = [
  {
    name: 'Priya Sharma',
    location: 'Gangtok, Sikkim',
    date: 'March 2026',
    rating: 5,
    review: 'The momos here are absolutely authentic! Reminds me of home. The ambiance is cozy and the staff is incredibly welcoming. The Jhol Momo was a revelation — will definitely bring the whole family next time!',
    initials: 'PS',
    color: 'bg-rose-500',
  },
  {
    name: 'Rajesh Kumar',
    location: 'Siliguri, WB',
    date: 'February 2026',
    rating: 5,
    review: 'Best dal bhat set in the entire area! The portions are generous and everything is freshly prepared. Great value for money. The thukpa on a cold evening was absolutely perfect.',
    initials: 'RK',
    color: 'bg-blue-500',
  },
  {
    name: 'Sarah Chen',
    location: 'Kolkata, WB',
    date: 'March 2026',
    rating: 5,
    review: 'Discovered this gem while traveling through Sikkim. The authentic flavors, the warm service, and the beautiful mountain view make this a must-visit. Kalika Restaurant is truly special!',
    initials: 'SC',
    color: 'bg-emerald-500',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-[#FDF6EC] py-24 px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 border-4 border-[#E8882A]/20 rounded-full" />
        <div className="absolute bottom-20 right-10 w-48 h-48 border-4 border-[#1B3A2D]/10 rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-[#E8882A]" />
            <span className="text-[#E8882A] uppercase tracking-[0.2em] text-sm font-bold">Guest Reviews</span>
            <span className="h-px w-10 bg-[#E8882A]" />
          </div>
          <h2 className="text-[#1B3A2D]" style={{ fontFamily: 'Lora, serif', fontSize: 'clamp(2rem, 4vw, 2.8rem)' }}>
            What Our <span className="text-[#E8882A] italic">Guests</span> Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-[#E8882A]/10 relative overflow-hidden"
            >
              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#E8882A] to-transparent" />

              {/* Quote icon */}
              <div className="absolute top-6 right-6 opacity-10">
                <Quote className="w-14 h-14 text-[#1B3A2D]" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#E8882A] text-[#E8882A]" />
                ))}
              </div>

              {/* Review */}
              <p className="text-[#2C1810] mb-6 leading-relaxed italic relative" style={{ fontFamily: 'Lora, serif' }}>
                "{t.review}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-[#E8882A]/10">
                <div className={`w-10 h-10 ${t.color} rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                  {t.initials}
                </div>
                <div>
                  <p className="font-bold text-[#1B3A2D]">{t.name}</p>
                  <p className="text-xs text-[#7A6652]">{t.location} · {t.date}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Overall rating */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-4 bg-[#1B3A2D] text-white px-8 py-4 rounded-2xl">
            <div className="text-right">
              <div className="text-3xl font-bold" style={{ fontFamily: 'Lora, serif' }}>4.9</div>
              <div className="text-white/60 text-sm">Average Rating</div>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div>
              <div className="flex gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#E8882A] text-[#E8882A]" />
                ))}
              </div>
              <div className="text-white/60 text-sm">Based on 100+ reviews</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

import { ArrowRight, Award, Heart, Leaf } from 'lucide-react';
import { ImageWithFallback } from '../ImageWithFallback';
import { motion } from 'motion/react';

const INTERIOR_IMG = 'https://images.unsplash.com/photo-1669043962012-a5b8496cd664?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800';

const badges = [
  { icon: Award, text: 'Est. 2018' },
  { icon: Leaf, text: 'Fresh Local' },
  { icon: Heart, text: 'Made with Love' },
];

export default function WelcomeSection() {
  return (
    <section id="about" className="bg-[#FDF6EC] py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image with decorative frame */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Decorative background shape */}
            <div className="absolute -top-6 -left-6 w-full h-full bg-[#E8882A]/10 rounded-3xl" />
            <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-[#1B3A2D]/15 rounded-3xl" />

            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src={INTERIOR_IMG}
                alt="Kalika Restaurant warm interior"
                className="w-full h-[480px] object-cover"
              />
              {/* Overlay with badges */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#1B3A2D]/90 to-transparent p-8">
                <div className="flex gap-4 flex-wrap">
                  {badges.map((b, i) => {
                    const Icon = b.icon;
                    return (
                      <div key={i} className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2">
                        <Icon className="w-4 h-4 text-[#E8882A]" />
                        <span className="text-white text-sm font-semibold">{b.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-[#E8882A]" />
              <p className="text-[#E8882A] font-bold uppercase tracking-[0.2em] text-sm">Our Story</p>
            </div>

            <h2 className="text-[#1B3A2D] mb-6" style={{ fontFamily: 'Lora, serif', fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', lineHeight: 1.25 }}>
              Where Every Meal<br />
              <span className="italic text-[#E8882A]">Feels Like Home</span>
            </h2>

            <p className="text-[#2C1810] mb-5 leading-relaxed text-lg">
              Welcome to <strong>Kalika Restaurant</strong>, nestled in the heart of Majitar, Sikkim (737136). 
              Founded by <strong>Bikash Limbu</strong>, our restaurant brings you the authentic flavors of 
              Sikkimese, Nepali, and Chinese cuisine — prepared with love and traditional recipes 
              passed down through generations.
            </p>
            <p className="text-[#7A6652] mb-8 leading-relaxed">
              We pride ourselves on using fresh mountain ingredients and maintaining the warmth of 
              Sikkimese hospitality. Whether you're craving traditional momos, hearty thukpa, or a 
              comforting dal bhat set, every dish is crafted to make you feel at home.
            </p>

            {/* Divider motif */}
            <div className="flex items-center gap-3 mb-8">
              <span className="h-px flex-1 bg-[#E8882A]/20" />
              <span className="text-[#E8882A] text-xl">🌿</span>
              <span className="h-px flex-1 bg-[#E8882A]/20" />
            </div>

            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="inline-flex items-center gap-2 text-[#E8882A] font-bold hover:gap-4 transition-all duration-300 text-lg group"
            >
              Learn More About Us
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

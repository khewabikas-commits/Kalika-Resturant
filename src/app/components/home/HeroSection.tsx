import { Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from '../ImageWithFallback';
import { ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';

const HERO_IMG = 'https://images.unsplash.com/photo-1729884903500-24977e82ed21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920';

const leaves = [
  { left: '10%', duration: 12, delay: 0, size: 28 },
  { left: '25%', duration: 15, delay: 2, size: 22 },
  { left: '40%', duration: 11, delay: 4, size: 32 },
  { left: '60%', duration: 14, delay: 1, size: 20 },
  { left: '75%', duration: 13, delay: 3, size: 26 },
  { left: '88%', duration: 10, delay: 5, size: 24 },
  { left: '50%', duration: 16, delay: 7, size: 18 },
  { left: '18%', duration: 12, delay: 8, size: 30 },
];

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src={HERO_IMG}
          alt="Himalayan landscape"
          className="w-full h-full object-cover scale-105"
        />
        {/* Layered overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1f14]/80 via-[#1B3A2D]/70 to-[#0a1f14]/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1B3A2D]/30 to-transparent" />
      </div>

      {/* Animated leaves */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {leaves.map((leaf, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: leaf.left, fontSize: leaf.size }}
            initial={{ top: '-5%', opacity: 0, rotate: -20 }}
            animate={{ top: '105%', opacity: [0, 0.6, 0.6, 0], rotate: [0, 30, -20, 10] }}
            transition={{
              duration: leaf.duration,
              repeat: Infinity,
              delay: leaf.delay,
              ease: 'linear',
            }}
          >
            🍃
          </motion.div>
        ))}
      </div>

      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#E8882A] to-transparent opacity-60" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-8"
        >
          <span className="h-px w-6 sm:w-12 bg-[#E8882A]" />
          <span className="text-[#E8882A] uppercase tracking-[0.25em] text-xs sm:text-sm font-semibold text-center">
            Majitar, Sikkim 737136
          </span>
          <span className="h-px w-6 sm:w-12 bg-[#E8882A]" />
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="text-white mb-6"
          style={{ fontFamily: 'Lora, serif', fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1.2 }}
        >
          A Taste of Sikkim,
          <br />
          <span className="text-[#E8882A] italic">Close to Home</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-white/80 text-xl md:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Authentic Sikkimese, Nepali & Chinese Cuisine — served with warmth and love
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/menu"
            className="group relative bg-[#E8882A] text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-[#d17a24] transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 overflow-hidden"
          >
            <span className="relative z-10">View Our Menu</span>
            <div className="absolute inset-0 bg-white/10 translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
          </Link>
          <a
            href="https://wa.me/918768976350?text=Hello%20Kalika%20Restaurant!%20%F0%9F%99%8F%20I%20would%20like%20to%20reserve%20a%20table.%0A%0AName%3A%20%0ADate%3A%20%0ATime%3A%20%0ANo.%20of%20Guests%3A%20%0A%0APlease%20confirm%20my%20booking.%20Thank%20you!"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-white/80 text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-white hover:text-[#1B3A2D] transition-all duration-300 backdrop-blur-sm hover:-translate-y-1"
          >
            Reserve a Table
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="flex items-center justify-center gap-10 mt-16"
        >
          {[
            { value: '4+', label: 'Cuisines' },
            { value: '50+', label: 'Menu Items' },
            { value: '8AM', label: 'Opens Daily' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-white text-2xl font-bold" style={{ fontFamily: 'Lora, serif' }}>{stat.value}</div>
              <div className="text-white/60 text-sm tracking-wide">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-1 text-white/50 hover:text-white/80 transition-colors cursor-pointer"
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
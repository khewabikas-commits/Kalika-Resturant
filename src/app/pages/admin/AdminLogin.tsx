import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { Eye, EyeOff, UtensilsCrossed, Lock, ArrowLeft, Shield } from 'lucide-react';
import { motion } from 'motion/react';

// Admin credentials (in a real app these would be server-side validated)
const ADMIN_EMAIL = 'subbabikash50@gmail.com';
const ADMIN_PASSWORD = 'azmjny#51@Kalika';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800)); // Simulated auth delay

    if (formData.email === ADMIN_EMAIL && formData.password === ADMIN_PASSWORD) {
      sessionStorage.setItem('kalika_admin_auth', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Invalid email or password. Please try again.');
    }
    setIsLoading(false);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 py-16 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0F1923 0%, #0a1612 50%, #0F1923 100%)', color: '#ffffff' }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-80 h-80 bg-[#1B3A2D] rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#E8882A]/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#1B3A2D]/30 rounded-full blur-3xl" />
      </div>

      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle, #E8882A 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Back link */}
      <Link
        to="/"
        className="absolute top-8 left-8 flex items-center gap-2 text-white/40 hover:text-white/80 transition-colors text-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Website
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative"
      >
        {/* Glow effect behind card */}
        <div className="absolute inset-0 bg-[#E8882A]/10 rounded-3xl blur-2xl scale-105" />

        {/* Login Card */}
        <div className="relative bg-[#0F1923] border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
          {/* Card top accent */}
          <div className="h-1 bg-gradient-to-r from-transparent via-[#E8882A] to-transparent" />

          <div className="p-10">
            {/* Logo */}
            <div className="text-center mb-10">
              <div className="relative inline-flex items-center justify-center mb-5">
                <div className="absolute inset-0 bg-[#E8882A]/20 rounded-2xl blur-lg scale-150" />
                <div className="relative w-18 h-18 bg-[#1B3A2D] border-2 border-[#E8882A]/40 rounded-2xl p-4">
                  <UtensilsCrossed className="w-10 h-10 text-[#E8882A]" />
                </div>
              </div>

              <h1
                style={{ fontFamily: 'Lora, serif', fontWeight: 700, color: '#ffffff', fontSize: '1.6rem' }}
              >
                KALIKA RESTAURANT
              </h1>
              <div className="flex items-center justify-center gap-2 mt-3">
                <Shield className="w-4 h-4 text-[#E8882A]" />
                <span className="text-[#E8882A] text-sm font-semibold uppercase tracking-widest">Admin Panel</span>
              </div>
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/15 border border-red-500/30 rounded-xl px-4 py-3 mb-6 text-red-400 text-sm"
              >
                ⚠️ {error}
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-white/70 text-sm font-semibold mb-2 uppercase tracking-wide">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:border-[#E8882A]/60 focus:outline-none focus:bg-white/8 transition-all"
                  placeholder="admin@email.com"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
              </div>

              <div>
                <label className="block text-white/70 text-sm font-semibold mb-2 uppercase tracking-wide">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:border-[#E8882A]/60 focus:outline-none focus:bg-white/8 transition-all pr-12"
                    placeholder="Enter your password"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#E8882A] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#d17a24] transition-all duration-300 shadow-lg hover:shadow-[#E8882A]/30 hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    Login to Dashboard
                  </>
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-white/10 text-center">
              <p className="text-white/30 text-xs flex items-center justify-center gap-2">
                <Shield className="w-3.5 h-3.5 text-[#E8882A]/50" />
                Authorized personnel only — All access is logged
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
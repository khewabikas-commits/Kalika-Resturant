import { useState } from 'react';
import { Calendar, Clock, Users, MessageSquare, Phone, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const timeSlots = [
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
  '1:00 PM', '1:30 PM', '2:00 PM', '6:00 PM',
  '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM',
  '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM',
];

export default function ReservationSection() {
  const [formData, setFormData] = useState({
    name: '', phone: '', date: '', time: '', guests: 2, specialRequests: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: '', phone: '', date: '', time: '', guests: 2, specialRequests: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const inputClass = "w-full px-4 py-3 border-2 border-[#E8882A]/20 bg-[#FDF6EC] rounded-xl focus:border-[#E8882A] focus:outline-none transition-all duration-200 text-[#2C1810] placeholder-[#7A6652]/50 hover:border-[#E8882A]/40";
  const labelClass = "block text-[#1B3A2D] font-semibold mb-2 text-sm uppercase tracking-wide";

  return (
    <section id="reservation" className="bg-[#1B3A2D] py-24 px-6 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#E8882A] to-transparent opacity-40" />
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 text-9xl">🍃</div>
        <div className="absolute bottom-10 right-10 text-9xl">🌿</div>
      </div>

      <div className="max-w-5xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-[#E8882A]" />
            <span className="text-[#E8882A] uppercase tracking-[0.2em] text-sm font-bold">Reservations</span>
            <span className="h-px w-10 bg-[#E8882A]" />
          </div>
          <h2 className="text-white mb-3" style={{ fontFamily: 'Lora, serif', fontSize: 'clamp(2rem, 4vw, 2.8rem)' }}>
            Reserve Your <span className="text-[#E8882A] italic">Table</span>
          </h2>
          <p className="text-white/60 text-lg">
            Book your table in advance for a guaranteed dining experience
          </p>
        </div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Card header stripe */}
          <div className="bg-gradient-to-r from-[#E8882A] to-[#d17a24] px-8 py-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-bold">Table Reservation</p>
                <p className="text-white/70 text-sm">Kalika Restaurant • Open 8AM–10PM Daily</p>
              </div>
            </div>
            <div className="text-white/80 text-sm hidden md:block">
              📞 <a href="tel:8768976350" className="hover:text-white">8768976350</a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            <AnimatePresence>
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-green-50 border-2 border-green-400 rounded-xl p-4 mb-6 flex items-center gap-3"
                >
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <div>
                    <p className="text-green-800 font-bold">Reservation Submitted!</p>
                    <p className="text-green-700 text-sm">We'll confirm your booking at {formData.phone || 'your number'} shortly.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Full Name */}
              <div>
                <label className={labelClass}>Full Name</label>
                <input
                  type="text" name="name" value={formData.name}
                  onChange={handleChange} required
                  className={inputClass} placeholder="e.g. Priya Sharma"
                />
              </div>

              {/* Phone */}
              <div>
                <label className={labelClass}>Phone Number</label>
                <input
                  type="tel" name="phone" value={formData.phone}
                  onChange={handleChange} required
                  className={inputClass} placeholder="e.g. 9876543210"
                />
              </div>

              {/* Date */}
              <div>
                <label className={labelClass}>
                  <Calendar className="inline w-4 h-4 mr-1 mb-0.5" />
                  Preferred Date
                </label>
                <input
                  type="date" name="date" value={formData.date}
                  onChange={handleChange} required
                  className={inputClass}
                />
              </div>

              {/* Time */}
              <div>
                <label className={labelClass}>
                  <Clock className="inline w-4 h-4 mr-1 mb-0.5" />
                  Preferred Time
                </label>
                <select
                  name="time" value={formData.time}
                  onChange={handleChange} required
                  className={inputClass}
                >
                  <option value="">Select a time slot</option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Guests - styled stepper */}
            <div className="mb-6">
              <label className={labelClass}>
                <Users className="inline w-4 h-4 mr-1 mb-0.5" />
                Number of Guests
              </label>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setFormData(p => ({ ...p, guests: Math.max(1, p.guests - 1) }))}
                  className="w-10 h-10 rounded-full border-2 border-[#E8882A] text-[#E8882A] flex items-center justify-center text-xl font-bold hover:bg-[#E8882A] hover:text-white transition-colors"
                >
                  −
                </button>
                <span className="text-[#1B3A2D] text-2xl font-bold w-10 text-center" style={{ fontFamily: 'Lora, serif' }}>
                  {formData.guests}
                </span>
                <button
                  type="button"
                  onClick={() => setFormData(p => ({ ...p, guests: Math.min(20, p.guests + 1) }))}
                  className="w-10 h-10 rounded-full border-2 border-[#E8882A] text-[#E8882A] flex items-center justify-center text-xl font-bold hover:bg-[#E8882A] hover:text-white transition-colors"
                >
                  +
                </button>
                <span className="text-[#7A6652] text-sm">guests (max 20)</span>
              </div>
            </div>

            {/* Special Requests */}
            <div className="mb-8">
              <label className={labelClass}>
                <MessageSquare className="inline w-4 h-4 mr-1 mb-0.5" />
                Special Requests <span className="text-[#7A6652] normal-case tracking-normal font-normal">(optional)</span>
              </label>
              <textarea
                name="specialRequests" value={formData.specialRequests}
                onChange={handleChange} rows={3}
                className={`${inputClass} resize-none`}
                placeholder="Birthday celebration? Dietary requirements? Let us know..."
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-[#E8882A] text-white py-4 rounded-full text-lg font-bold hover:bg-[#d17a24] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Confirm Reservation
            </button>

            <p className="text-center text-[#7A6652] mt-6 text-sm">
              <Phone className="inline w-4 h-4 mr-1" />
              Or call us directly:{' '}
              <a href="tel:8768976350" className="text-[#E8882A] font-bold hover:underline">
                8768976350
              </a>
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

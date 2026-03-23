import { Phone, Mail, MapPin, Clock, Instagram, Facebook, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

const contactItems = [
  {
    icon: Phone,
    label: 'Phone',
    value: '8768976350',
    href: 'tel:8768976350',
    display: '+91 8768 976 350',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'subbabikash50@gmail.com',
    href: 'mailto:subbabikash50@gmail.com',
    display: 'subbabikash50@gmail.com',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: '',
    href: 'https://maps.google.com/?q=Lower+Mazhitar+East+Sikkim',
    display: 'Lower Mazhitar, East Sikkim',
  },
  {
    icon: Clock,
    label: 'Open Daily',
    value: '',
    href: '',
    display: '8:00 AM – 10:00 PM',
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="bg-[#1B3A2D] py-24 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#E8882A] to-transparent opacity-40" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-[#E8882A]" />
            <span className="text-[#E8882A] uppercase tracking-[0.2em] text-sm font-bold">Find Us</span>
            <span className="h-px w-10 bg-[#E8882A]" />
          </div>
          <h2 style={{ fontFamily: 'Lora, serif', fontSize: 'clamp(2rem, 4vw, 2.8rem)', color: '#ffffff' }}>
            Contact & <span style={{ color: '#E8882A' }} className="italic">Location</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#0F2419] rounded-3xl p-8 border border-[#E8882A]/20"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-[#E8882A] rounded-xl flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white text-xl" style={{ fontFamily: 'Lora, serif' }}>Get in Touch</h3>
                <p className="text-white/50 text-sm">We'd love to hear from you</p>
              </div>
            </div>

            <div className="space-y-5">
              {contactItems.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-start gap-4 group">
                    <div className="w-11 h-11 bg-[#1B3A2D] border border-[#E8882A]/30 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#E8882A] transition-colors duration-200">
                      <Icon className="w-5 h-5 text-[#E8882A] group-hover:text-white transition-colors duration-200" />
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="text-white/50 text-xs uppercase tracking-wide font-semibold mb-1">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith('http') ? '_blank' : undefined}
                          rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="text-white font-medium hover:text-[#E8882A] transition-colors flex items-center gap-1.5"
                        >
                          {item.display}
                          {item.href.startsWith('http') && <ExternalLink className="w-3 h-3 opacity-50" />}
                        </a>
                      ) : (
                        <p className="text-white font-medium">{item.display}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Divider */}
            <div className="my-7 border-t border-white/10" />

            {/* Social Links */}
            <div>
              <p className="text-white/50 text-xs uppercase tracking-wide font-semibold mb-4">Follow Us</p>
              <div className="flex gap-3">
                <a
                  href="https://instagram.com/kalika4184"
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white px-4 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  <Instagram className="w-4 h-4" />
                  @Kalika4184
                </a>
                <a
                  href="https://facebook.com/bikashlimbu"
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#1877F2] text-white px-4 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  <Facebook className="w-4 h-4" />
                  Bikash Limbu
                </a>
              </div>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden border border-[#E8882A]/20 shadow-xl"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.3!2d88.5!3d27.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e6a56c7b!2sLower+Mazhitar%2C+East+Sikkim!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '420px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Kalika Restaurant Location"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
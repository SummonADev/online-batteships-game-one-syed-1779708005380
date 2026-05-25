import { Mail, MapPin, Instagram, Linkedin, Twitter } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-32 bg-[#0a0a0a] relative overflow-hidden">
      {/* bg word */}
      <div
        className="absolute left-0 bottom-0 select-none pointer-events-none leading-none"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '30vw',
          fontWeight: 900,
          color: 'transparent',
          WebkitTextStroke: '1px rgba(201,168,76,0.03)',
          lineHeight: 0.9,
        }}
      >
        CONTACT
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20">
          {/* Left */}
          <div>
            <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-4 font-medium">Let's Talk</p>
            <h2 className="font-['Playfair_Display'] text-5xl lg:text-6xl font-black text-[#f5f0eb] leading-tight mb-8">
              Start a Project
            </h2>
            <div className="w-16 h-[2px] bg-[#c9a84c] mb-8" />
            <p className="text-[#f5f0eb]/50 leading-relaxed mb-12 font-light">
              Have a project in mind? I'd love to hear about it. Let's create something
              extraordinary together.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 border border-[#c9a84c]/30 flex items-center justify-center flex-shrink-0">
                  <Mail size={16} className="text-[#c9a84c]" />
                </div>
                <div>
                  <p className="text-[#f5f0eb]/40 text-xs tracking-widest uppercase mb-1">Email</p>
                  <p className="text-[#f5f0eb] text-sm">hello@rogeduke.co.za</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 border border-[#c9a84c]/30 flex items-center justify-center flex-shrink-0">
                  <MapPin size={16} className="text-[#c9a84c]" />
                </div>
                <div>
                  <p className="text-[#f5f0eb]/40 text-xs tracking-widest uppercase mb-1">Location</p>
                  <p className="text-[#f5f0eb] text-sm">Johannesburg, South Africa</p>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="mt-12">
              <p className="text-[#f5f0eb]/30 text-xs tracking-[0.3em] uppercase mb-4">Follow My Work</p>
              <div className="flex gap-4">
                {[
                  { Icon: Instagram, label: 'Instagram' },
                  { Icon: Linkedin, label: 'LinkedIn' },
                  { Icon: Twitter, label: 'Twitter' },
                ].map(({ Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="w-10 h-10 border border-[#2a2a2a] flex items-center justify-center hover:border-[#c9a84c] hover:text-[#c9a84c] text-[#f5f0eb]/40 transition-all duration-300"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div>
            {sent ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 border-2 border-[#c9a84c] flex items-center justify-center mx-auto mb-6">
                    <span className="text-[#c9a84c] text-2xl">✓</span>
                  </div>
                  <h3 className="font-['Playfair_Display'] text-2xl font-bold text-[#f5f0eb] mb-2">Message Sent!</h3>
                  <p className="text-[#f5f0eb]/40 text-sm">I'll get back to you shortly.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="text-[#f5f0eb]/40 text-xs tracking-widest uppercase block mb-2">Your Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-transparent border border-[#2a2a2a] focus:border-[#c9a84c] text-[#f5f0eb] px-5 py-4 text-sm outline-none transition-colors duration-300 placeholder:text-[#f5f0eb]/20"
                    placeholder="Roge Duke"
                  />
                </div>
                <div>
                  <label className="text-[#f5f0eb]/40 text-xs tracking-widest uppercase block mb-2">Email Address</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-transparent border border-[#2a2a2a] focus:border-[#c9a84c] text-[#f5f0eb] px-5 py-4 text-sm outline-none transition-colors duration-300 placeholder:text-[#f5f0eb]/20"
                    placeholder="you@email.com"
                  />
                </div>
                <div>
                  <label className="text-[#f5f0eb]/40 text-xs tracking-widest uppercase block mb-2">Message</label>
                  <textarea
                    required
                    rows={6}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-transparent border border-[#2a2a2a] focus:border-[#c9a84c] text-[#f5f0eb] px-5 py-4 text-sm outline-none transition-colors duration-300 placeholder:text-[#f5f0eb]/20 resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#c9a84c] text-[#0a0a0a] font-semibold tracking-widest uppercase text-sm py-5 hover:bg-[#e2c97e] transition-colors duration-300"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

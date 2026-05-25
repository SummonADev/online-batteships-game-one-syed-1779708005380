import { Palette, Layout, FileText, Layers, Camera, Zap } from 'lucide-react';

const services = [
  {
    icon: Palette,
    title: 'Brand Identity',
    desc: 'Logo design, colour systems, typography, and complete visual identity packages that define who you are.',
  },
  {
    icon: FileText,
    title: 'Print Design',
    desc: 'Brochures, catalogues, packaging, posters — crafted for print with meticulous attention to detail.',
  },
  {
    icon: Layout,
    title: 'Digital Design',
    desc: 'Social media kits, email templates, digital ads, and UI design that captivates across every screen.',
  },
  {
    icon: Layers,
    title: 'Brand Strategy',
    desc: 'Positioning, tone of voice, and brand guidelines to ensure consistency across every touchpoint.',
  },
  {
    icon: Camera,
    title: 'Art Direction',
    desc: 'Creative direction for photo shoots, campaigns, and visual content that tells your brand story.',
  },
  {
    icon: Zap,
    title: 'Motion Graphics',
    desc: 'Animated logos, social reels, and motion content that brings your brand to life with energy.',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-32 bg-[#0a0a0a] relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-20">
          <div>
            <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-4 font-medium">What I Do</p>
            <h2 className="font-['Playfair_Display'] text-5xl lg:text-6xl font-black text-[#f5f0eb] leading-tight">
              Services &amp;<br />
              <span className="text-[#c9a84c]">Expertise</span>
            </h2>
          </div>
          <p className="text-[#f5f0eb]/40 max-w-xs text-sm leading-relaxed mt-6 lg:mt-0">
            End-to-end design solutions tailored to elevate your brand and make every interaction memorable.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#1a1a1a]">
          {services.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group bg-[#0a0a0a] p-10 hover:bg-[#111111] transition-all duration-300 relative overflow-hidden"
            >
              {/* hover gold line */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c9a84c] scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />

              <div className="w-12 h-12 border border-[#c9a84c]/30 group-hover:border-[#c9a84c] flex items-center justify-center mb-8 transition-colors duration-300">
                <Icon size={20} className="text-[#c9a84c]/60 group-hover:text-[#c9a84c] transition-colors duration-300" />
              </div>

              <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#f5f0eb] mb-3">{title}</h3>
              <p className="text-[#f5f0eb]/40 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

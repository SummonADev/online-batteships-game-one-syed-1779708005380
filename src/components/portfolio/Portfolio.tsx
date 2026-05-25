import { useState } from 'react';
import { ExternalLink } from 'lucide-react';

const categories = ['All', 'Branding', 'Print', 'Digital', 'Motion'];

const projects = [
  {
    id: 1,
    title: 'Savanna Brew Co.',
    category: 'Branding',
    tags: ['Logo', 'Identity', 'Packaging'],
    year: '2024',
    color: '#1a1a0a',
    accent: '#c9a84c',
  },
  {
    id: 2,
    title: 'Ubuntu Magazine',
    category: 'Print',
    tags: ['Editorial', 'Layout', 'Typography'],
    year: '2024',
    color: '#0a0a1a',
    accent: '#4c6ec9',
  },
  {
    id: 3,
    title: 'Joburg Fashion Week',
    category: 'Digital',
    tags: ['Campaign', 'Social', 'Digital Ads'],
    year: '2023',
    color: '#1a0a0a',
    accent: '#c94c4c',
  },
  {
    id: 4,
    title: 'Kaya Spirits',
    category: 'Branding',
    tags: ['Brand Identity', 'Packaging'],
    year: '2023',
    color: '#0a1a0a',
    accent: '#4cc94c',
  },
  {
    id: 5,
    title: 'Cape Noir Film Fest',
    category: 'Print',
    tags: ['Poster', 'Programme', 'Signage'],
    year: '2023',
    color: '#0f0f0f',
    accent: '#c9c9c9',
  },
  {
    id: 6,
    title: 'Pulse Motion Reel',
    category: 'Motion',
    tags: ['Animation', 'Brand Motion'],
    year: '2022',
    color: '#0a0a1a',
    accent: '#c94c8c',
  },
];

export default function Portfolio() {
  const [active, setActive] = useState('All');

  const filtered = active === 'All' ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="work" className="py-32 bg-[#0f0f0f] relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16">
          <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-4 font-medium">Selected Work</p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <h2 className="font-['Playfair_Display'] text-5xl lg:text-6xl font-black text-[#f5f0eb] leading-tight">
              My Portfolio
            </h2>

            {/* Filter tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`text-xs tracking-widest uppercase px-5 py-2.5 border transition-all duration-300 ${
                    active === cat
                      ? 'bg-[#c9a84c] border-[#c9a84c] text-[#0a0a0a] font-semibold'
                      : 'border-[#2a2a2a] text-[#f5f0eb]/40 hover:border-[#c9a84c]/50 hover:text-[#c9a84c]/70'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <div
              key={project.id}
              className="group relative overflow-hidden cursor-pointer"
            >
              {/* Project card visual */}
              <div
                className="relative h-72 flex flex-col items-center justify-center"
                style={{ background: project.color }}
              >
                {/* Abstract design placeholder */}
                <div className="absolute inset-0 opacity-20">
                  <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                    style={{
                      width: '180px',
                      height: '180px',
                      border: `40px solid ${project.accent}`,
                    }}
                  />
                  <div
                    className="absolute top-4 right-4 w-16 h-16"
                    style={{ background: project.accent, opacity: 0.3 }}
                  />
                  <div
                    className="absolute bottom-4 left-4 w-24 h-[2px]"
                    style={{ background: project.accent }}
                  />
                </div>

                {/* Project name on card */}
                <p
                  className="relative z-10 font-['Playfair_Display'] text-2xl font-bold text-center px-6"
                  style={{ color: project.accent }}
                >
                  {project.title}
                </p>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[#0a0a0a]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col items-center justify-center gap-4">
                  <p className="font-['Playfair_Display'] text-xl font-bold text-[#f5f0eb]">{project.title}</p>
                  <div className="flex gap-2 flex-wrap justify-center px-4">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-[10px] tracking-widest uppercase border border-[#c9a84c]/40 text-[#c9a84c] px-2 py-1">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <ExternalLink size={16} className="text-[#c9a84c] mt-2" />
                </div>
              </div>

              {/* Card footer */}
              <div className="bg-[#111111] px-6 py-4 flex items-center justify-between border-t border-[#1a1a1a] group-hover:border-[#c9a84c]/30 transition-colors">
                <div>
                  <p className="text-[#f5f0eb] text-sm font-medium">{project.title}</p>
                  <p className="text-[#f5f0eb]/35 text-xs tracking-wider mt-0.5">{project.category}</p>
                </div>
                <span className="text-[#c9a84c]/40 text-xs font-mono">{project.year}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

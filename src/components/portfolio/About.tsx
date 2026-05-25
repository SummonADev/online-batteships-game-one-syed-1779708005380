export default function About() {
  return (
    <section id="about" className="py-32 bg-[#0f0f0f] relative overflow-hidden">
      {/* Decorative large letter */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '40vw',
          fontWeight: 900,
          color: 'transparent',
          WebkitTextStroke: '1px rgba(201,168,76,0.04)',
          lineHeight: 1,
          userSelect: 'none',
        }}
      >
        R
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left — text */}
          <div>
            <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-4 font-medium">About Me</p>
            <h2 className="font-['Playfair_Display'] text-5xl lg:text-6xl font-black text-[#f5f0eb] leading-tight mb-8">
              Design is how I<br />
              <span className="text-[#c9a84c]">speak to the world</span>
            </h2>
            <div className="w-16 h-[2px] bg-[#c9a84c] mb-8" />
            <p className="text-[#f5f0eb]/55 leading-relaxed mb-6 font-light">
              I'm Roge Duke, a passionate graphic designer based in South Africa with over 8 years
              of experience building brands that stand out. My work blends bold typography,
              strategic thinking, and cultural nuance to create identities that resonate.
            </p>
            <p className="text-[#f5f0eb]/55 leading-relaxed mb-10 font-light">
              From Cape Town's creative scene to international projects, I've collaborated with
              startups, agencies, and established brands — always pushing for work that is not
              just beautiful, but meaningful.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {[
                ['Brand Identity', 'Strategic & visual brand systems'],
                ['Print Design', 'Editorial, packaging & more'],
                ['Digital Design', 'UI, social & motion graphics'],
                ['Typography', 'Custom lettering & type design'],
              ].map(([title, desc]) => (
                <div key={title} className="border-l-2 border-[#c9a84c]/30 pl-4">
                  <p className="text-[#f5f0eb] text-sm font-semibold tracking-wide mb-1">{title}</p>
                  <p className="text-[#f5f0eb]/40 text-xs">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — skills */}
          <div className="space-y-6">
            {[
              { skill: 'Brand Identity Design', pct: 95 },
              { skill: 'Print & Editorial', pct: 90 },
              { skill: 'Digital & UI Design', pct: 82 },
              { skill: 'Motion Graphics', pct: 74 },
              { skill: 'Photography Direction', pct: 78 },
            ].map(({ skill, pct }) => (
              <div key={skill}>
                <div className="flex justify-between mb-2">
                  <span className="text-[#f5f0eb]/70 text-sm tracking-wide">{skill}</span>
                  <span className="text-[#c9a84c] text-sm font-semibold">{pct}%</span>
                </div>
                <div className="h-[2px] bg-[#2a2a2a] w-full">
                  <div
                    className="h-full bg-gradient-to-r from-[#c9a84c] to-[#e2c97e] transition-all duration-1000"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            ))}

            {/* Tools */}
            <div className="pt-8">
              <p className="text-[#f5f0eb]/40 text-xs tracking-[0.3em] uppercase mb-4">Tools &amp; Software</p>
              <div className="flex flex-wrap gap-3">
                {['Adobe Illustrator', 'Photoshop', 'InDesign', 'Figma', 'After Effects', 'Procreate'].map((tool) => (
                  <span
                    key={tool}
                    className="border border-[#c9a84c]/25 text-[#c9a84c]/70 text-xs tracking-widest uppercase px-3 py-2 hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

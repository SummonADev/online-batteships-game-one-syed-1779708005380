export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#0a0a0a]"
    >
      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 40px, #c9a84c 40px, #c9a84c 41px),
          repeating-linear-gradient(90deg, transparent, transparent 40px, #c9a84c 40px, #c9a84c 41px)`
      }} />

      {/* Gold accent line left */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-transparent via-[#c9a84c] to-transparent opacity-60" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full grid lg:grid-cols-2 gap-16 items-center pt-24 pb-16">
        {/* Text side */}
        <div className="order-2 lg:order-1" style={{ animation: 'fadeUp 0.9s ease forwards' }}>
          <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-6 font-medium">
            Graphic Designer &nbsp;·&nbsp; South Africa
          </p>

          <h1 className="font-['Playfair_Display'] text-6xl lg:text-8xl font-black leading-none text-[#f5f0eb] mb-4">
            Roge
          </h1>
          <h1 className="font-['Playfair_Display'] text-6xl lg:text-8xl font-black leading-none mb-8">
            <span className="text-transparent" style={{ WebkitTextStroke: '2px #c9a84c' }}>Duke</span>
          </h1>

          <p className="text-[#f5f0eb]/55 text-lg leading-relaxed max-w-md mb-12 font-light">
            Crafting visual identities, brand stories, and design experiences
            that leave a lasting impression. Bold. Purposeful. Timeless.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#work"
              className="inline-block bg-[#c9a84c] text-[#0a0a0a] text-sm font-semibold tracking-widest uppercase px-8 py-4 hover:bg-[#e2c97e] transition-colors duration-300"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="inline-block border border-[#c9a84c]/50 text-[#c9a84c] text-sm font-semibold tracking-widest uppercase px-8 py-4 hover:border-[#c9a84c] hover:bg-[#c9a84c]/10 transition-all duration-300"
            >
              Get In Touch
            </a>
          </div>

          {/* Stats */}
          <div className="mt-16 flex gap-12">
            {[['8+', 'Years Experience'], ['120+', 'Projects Delivered'], ['40+', 'Happy Clients']].map(([num, label]) => (
              <div key={label}>
                <p className="font-['Playfair_Display'] text-3xl font-bold text-[#c9a84c]">{num}</p>
                <p className="text-[#f5f0eb]/40 text-xs tracking-widest uppercase mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Image side */}
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end" style={{ animation: 'fadeIn 1.2s ease forwards' }}>
          <div className="relative">
            {/* Gold frame offset */}
            <div className="absolute -top-4 -right-4 w-full h-full border-2 border-[#c9a84c]/40" />
            <div className="absolute -bottom-4 -left-4 w-full h-full border border-[#c9a84c]/20" />

            <div className="relative w-72 h-96 lg:w-96 lg:h-[520px] overflow-hidden bg-[#1a1a1a]">
              <img
                src="https://storage.googleapis.com/summon-assets/demo/designer-portrait.jpg"
                alt="Roge Duke"
                className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `<div class="w-full h-full flex flex-col items-center justify-center bg-[#1a1a1a]">
                      <div class="w-24 h-24 rounded-full bg-[#c9a84c]/20 flex items-center justify-center mb-4">
                        <span style="font-size:2.5rem;color:#c9a84c;font-family:'Playfair Display',serif;font-weight:900">RD</span>
                      </div>
                      <p style="color:#f5f0eb;opacity:0.4;font-size:0.75rem;letter-spacing:0.2em;text-transform:uppercase">Roge Duke</p>
                    </div>`;
                  }
                }}
              />
            </div>

            {/* Badge */}
            <div className="absolute -bottom-6 -left-6 bg-[#c9a84c] text-[#0a0a0a] px-5 py-3">
              <p className="font-['Playfair_Display'] text-xs font-bold tracking-widest uppercase">Based in</p>
              <p className="font-['Playfair_Display'] text-sm font-black">South Africa</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-[10px] tracking-[0.3em] uppercase text-[#f5f0eb]">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-[#c9a84c] to-transparent" />
      </div>
    </section>
  );
}

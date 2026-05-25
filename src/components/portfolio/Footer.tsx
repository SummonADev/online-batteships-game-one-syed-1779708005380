export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#060606] border-t border-[#1a1a1a] py-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-['Playfair_Display'] text-lg font-bold text-[#f5f0eb]">
          Roge Duke<span className="text-[#c9a84c]">.</span>
        </p>
        <p className="text-[#f5f0eb]/25 text-xs tracking-widest">
          © {year} Roge Duke. All rights reserved. Johannesburg, South Africa.
        </p>
        <div className="flex gap-6">
          {['About', 'Work', 'Contact'].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="text-[#f5f0eb]/30 text-xs tracking-widest uppercase hover:text-[#c9a84c] transition-colors"
            >
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

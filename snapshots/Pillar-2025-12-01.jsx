function Pillar({ position = 'left', style = 'ionic' }) {
  console.log(`Rendering pillar: ${position}`);
  const isLeft = position === 'left';

  return (
    <div
      className={`fixed ${isLeft ? 'left-6' : 'right-6'} top-0 h-screen w-40 pointer-events-none z-40`}
      style={{
        opacity: 0.95,
        background: 'linear-gradient(180deg, rgba(121,107,95,0.55), rgba(77,67,60,0.35))',
        border: '1px solid rgba(47,41,37,0.35)',
        boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
        backdropFilter: 'blur(2px)'
      }}
      aria-hidden
    >
      {/* Stone column shell so the silhouette is clearly visible even on light backgrounds */}
      <div className="relative w-full h-full">
        
        {/* Capital (top decorative part) */}
        <div className="absolute top-24 w-full">
          {/* Ionic volutes (scrolls) */}
          <div className="relative h-24 bg-gradient-to-b from-stone-200 via-stone-100 to-stone-200 rounded-t-2xl shadow-2xl">
            {/* Left scroll */}
            <div className="absolute left-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-4 border-stone-400" />
            {/* Right scroll */}
            <div className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-4 border-stone-400" />
            {/* Center decoration */}
            <div className="absolute left-1/2 -translate-x-1/2 top-2 w-12 h-2 bg-stone-400 rounded" />
          </div>
          
          {/* Abacus (square block below capital) */}
          <div className="h-4 bg-gradient-to-r from-stone-300 via-stone-200 to-stone-300" />
        </div>

        {/* Column shaft (main body) */}
        <div className="absolute top-52 bottom-32 w-full">
          <div className="relative w-full h-full bg-gradient-to-r from-stone-200 via-stone-100 to-stone-200 shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
            {/* Flutes (vertical grooves) - 8 grooves */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute top-0 bottom-0 bg-gradient-to-r from-transparent via-stone-400/30 to-transparent"
                style={{
                  left: `${i * 12.5}%`,
                  width: '10%'
                }}
              />
            ))}
            
            {/* Highlight (light catching edge) */}
            <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-white/50 via-white/20 to-transparent" />
            
            {/* Shadow (depth) */}
            <div className="absolute top-0 bottom-0 right-0 w-2 bg-gradient-to-b from-black/20 via-black/10 to-transparent" />
          </div>
        </div>

        {/* Base (bottom platform) */}
        <div className="absolute bottom-24 w-full">
          {/* Plinth (base block) */}
          <div className="h-6 bg-gradient-to-b from-stone-300 to-stone-400" />
          
          {/* Torus (rounded base molding) */}
          <div className="h-4 bg-gradient-to-r from-stone-400 via-stone-300 to-stone-400 rounded-b-lg shadow-xl" />
        </div>

        {/* Ground platform (ruins on ground) */}
        <div className="absolute bottom-0 w-full h-24">
          <div className="w-full h-full bg-gradient-to-t from-stone-500 via-stone-400 to-stone-300 opacity-50 rounded-b-2xl">
            {/* Cracks/weathering */}
            <div className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `
                  linear-gradient(90deg, transparent 30%, rgba(0,0,0,0.2) 31%, transparent 31%),
                  linear-gradient(45deg, transparent 60%, rgba(0,0,0,0.15) 61%, transparent 62%)
                `
              }}
            />
          </div>
        </div>

        {/* Weathering effects */}
        <div className="absolute inset-0 opacity-20 mix-blend-multiply"
          style={{
            background: `
              radial-gradient(circle at 20% 40%, rgba(139,115,85,0.3), transparent 40%),
              radial-gradient(circle at 80% 70%, rgba(139,115,85,0.2), transparent 30%)
            `
          }}
        />
      </div>
    </div>
  );
}

export default Pillar;

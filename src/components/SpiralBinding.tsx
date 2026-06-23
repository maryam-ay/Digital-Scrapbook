import React from 'react';

export default function SpiralBinding() {
  // We generate 22 evenly spaced metal ring loops down the vertical spine
  const ringsCount = 22;
  
  return (
    <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-12 z-30 pointer-events-none flex flex-col justify-between py-6">
      {/* Subtle center crease line */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] bg-black/25 z-10" />
      
      {/* Shadow overlays representing paper curvature near the spine */}
      <div className="absolute inset-y-0 right-1/2 w-6 bg-gradient-to-r from-transparent via-black/[0.01] to-black/[0.12]" />
      <div className="absolute inset-y-0 left-1/2 w-6 bg-gradient-to-l from-transparent via-black/[0.01] to-black/[0.12]" />

      {/* Render individual physical spiral wire rings */}
      {Array.from({ length: ringsCount }).map((_, idx) => (
        <div key={idx} className="relative w-full h-3.5 flex items-center justify-between px-1.5">
          {/* Left Punch Hole */}
          <div className="w-1.5 h-1.5 rounded-full bg-neutral-950/90 shadow-[inset_0_1px_2.5px_rgba(0,0,0,0.95)]" />
          
          {/* The Metal Ring Wire bridging Left to Right */}
          <div className="absolute left-2.5 right-2.5 h-1.5 bg-gradient-to-b from-[#FCFCFC] via-[#CBCBCB] to-[#7B7B7B] rounded-full border border-neutral-950/40 shadow-[0_1.5px_3px_rgba(0,0,0,0.35)] flex items-center justify-center transform -rotate-[1.5deg] z-20">
            {/* Metal gloss reflection highlight */}
            <div className="w-full h-[0.5px] bg-white/50 absolute top-[0.5px] rounded-full" />
          </div>
          
          {/* Right Punch Hole */}
          <div className="w-1.5 h-1.5 rounded-full bg-neutral-950/90 shadow-[inset_0_1px_2.5px_rgba(0,0,0,0.95)]" />
        </div>
      ))}
    </div>
  );
}

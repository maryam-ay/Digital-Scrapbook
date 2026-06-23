import React from 'react';

export default function SpiralBinding() {
  // Let's create about 18 spiral rings spaced out vertically
  const ringCount = 16;
  const rings = Array.from({ length: ringCount });

  return (
    <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 flex flex-col justify-between py-6 z-30 pointer-events-none">
      {rings.map((_, index) => (
        <div key={index} className="relative w-full h-5 flex items-center justify-center">
          {/* Shadow of the metal ring */}
          <div className="absolute w-12 h-2.5 bg-black/35 rounded-full blur-[1px] translate-y-1 -translate-x-[1px]" />
          
          {/* The ring loop (looks like 3D coil ring going in/out of sheet holes) */}
          <div className="relative w-11 h-3 rounded-full border-2 border-neutral-600 bg-linear-to-b from-neutral-400 via-neutral-200 to-neutral-700 shadow-inner flex items-center justify-between px-1">
            {/* Inner holes look on left and right page edge */}
            <div className="w-1 h-1 rounded-full bg-neutral-900 border border-neutral-500" />
            <div className="w-1 h-1 rounded-full bg-neutral-900 border border-neutral-500" />
          </div>

          {/* Little metal coil detail */}
          <div className="absolute w-2 h-4 border-r-2 border-neutral-400 rotate-12 -translate-x-3 opacity-60" />
          <div className="absolute w-2 h-4 border-l-2 border-neutral-400 rotate-12 translate-x-3 opacity-60" />
        </div>
      ))}
    </div>
  );
}

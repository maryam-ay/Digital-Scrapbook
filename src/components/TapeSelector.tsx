import React from 'react';
import { TAPE_PATTERNS, TapePattern } from '../data/tapePatterns';
import { X, Sparkles } from 'lucide-react';

interface TapeSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTape: (tapeId: string) => void;
}

export default function TapeSelector({ isOpen, onClose, onAddTape }: TapeSelectorProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 bg-neutral-950/95 border-t border-neutral-800 text-white shadow-2xl z-45 flex flex-col h-[200px] transition-transform duration-300">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-neutral-800">
        <h3 className="font-mono text-sm uppercase tracking-widest text-teal-400 font-bold flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#3B82B0]" /> Washi Tape Dispenser
        </h3>
        <button
          onClick={onClose}
          className="p-1 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Tape Strip Grid */}
      <div className="flex-1 overflow-x-auto p-4 flex items-center gap-6 scrollbar-thin scroll-smooth whitespace-nowrap">
        {TAPE_PATTERNS.map((tape) => (
          <button
            key={tape.id}
            onClick={() => onAddTape(tape.id)}
            className="flex flex-col items-center gap-3 cursor-pointer group active:scale-95 transition-transform"
            title={tape.name}
          >
            {/* Display Tape Strip Preview with torn-like edges */}
            <div 
              className={`w-32 h-8 relative transition-shadow group-hover:shadow-md ${tape.className || ''}`}
              style={{
                ...tape.style,
                clipPath: 'polygon(0% 12%, 3% 0%, 7% 10%, 12% 2%, 18% 11%, 23% 4%, 28% 12%, 34% 1%, 40% 11%, 46% 3%, 52% 13%, 58% 2%, 63% 10%, 68% 4%, 74% 12%, 80% 2%, 86% 11%, 91% 3%, 97% 13%, 100% 5%, 100% 88%, 97% 100%, 92% 90%, 86% 98%, 81% 89%, 75% 97%, 69% 88%, 64% 96%, 58% 87%, 52% 98%, 46% 89%, 41% 97%, 35% 88%, 29% 99%, 23% 90%, 17% 98%, 12% 87%, 6% 96%, 2% 88%, 0% 95%)'
              }}
            />
            
            <span className="text-xs font-mono text-neutral-400 group-hover:text-white">
              {tape.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

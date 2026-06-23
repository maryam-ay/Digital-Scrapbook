import React from 'react';
import { SpreadState } from '../types';
import { Plus, Trash2, Layers } from 'lucide-react';

interface ThumbnailStripProps {
  isOpen: boolean;
  spreads: SpreadState[];
  currentSpreadIndex: number;
  onSelectSpread: (index: number) => void;
  onAddSpread: () => void;
  onAddChapter: () => void;
  onDeleteSpread: (index: number) => void;
}

export default function ThumbnailStrip({
  isOpen,
  spreads,
  currentSpreadIndex,
  onSelectSpread,
  onAddSpread,
  onAddChapter,
  onDeleteSpread
}: ThumbnailStripProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 bg-neutral-950/95 border-t border-neutral-800 text-white shadow-2xl z-45 flex flex-col h-[200px] transition-transform duration-300">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-800">
        <h3 className="font-mono text-xs uppercase tracking-widest text-amber-500 font-bold flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#E8341A]" /> Page Spreads ({spreads.length})
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={onAddChapter}
            className="px-2.5 py-1 bg-neutral-900 border border-neutral-800 hover:border-amber-400 font-mono text-[10px] text-amber-400 uppercase font-bold rounded-md transition-colors"
          >
            + Chapter Divider
          </button>
          <button
            onClick={onAddSpread}
            className="px-2.5 py-1 bg-[#E8341A] hover:bg-red-600 font-mono text-[10px] uppercase font-bold rounded-md transition-colors"
          >
            + Blank Spread
          </button>
        </div>
      </div>

      {/* Spreads Scroll List */}
      <div className="flex-1 overflow-x-auto p-4 flex gap-4 scrollbar-thin scroll-smooth items-center">
        {spreads.map((spread, index) => {
          const isSelected = index === currentSpreadIndex;
          
          return (
            <div
              key={spread.id}
              className={`relative flex flex-col items-center gap-1.5 shrink-0 select-none group`}
            >
              {/* Spread Frame */}
              <button
                onClick={() => onSelectSpread(index)}
                className={`w-28 h-20 bg-neutral-900 border-2 rounded-lg flex relative overflow-hidden transition-all duration-200 shadow-md ${
                  isSelected 
                    ? 'border-[#E8341A] ring-2 ring-[#E8341A]/20 scale-105 shadow-lg' 
                    : 'border-neutral-800 hover:border-neutral-600'
                }`}
              >
                {spread.isChapterDivider ? (
                  // Chapter Divider Preview
                  <div 
                    className="w-full h-full flex items-center justify-center p-1.5 font-mono text-center overflow-hidden"
                    style={{ backgroundColor: spread.chapterColor || '#E8341A' }}
                  >
                    <span className="text-[10px] font-black text-white uppercase tracking-tight line-clamp-2">
                      {spread.chapterTitle || 'CHAPTER'}
                    </span>
                  </div>
                ) : (
                  // Regular Two-Page Spread Preview
                  <>
                    {/* Left Page Preview */}
                    <div className="flex-1 bg-[#F8F6F2] border-r border-neutral-300 flex items-center justify-center relative">
                      <div className="absolute inset-0 grid-paper opacity-30" />
                      {spread.leftPage.items.length > 0 && (
                        <div className="w-2.5 h-2.5 rounded-full bg-neutral-800/40" />
                      )}
                    </div>
                    {/* Spine */}
                    <div className="w-1 bg-neutral-400 h-full z-10 shadow-inner" />
                    {/* Right Page Preview */}
                    <div className="flex-1 bg-[#F8F6F2] flex items-center justify-center relative">
                      <div className="absolute inset-0 grid-paper opacity-30" />
                      {spread.rightPage.items.length > 0 && (
                        <div className="w-2.5 h-2.5 rounded-full bg-neutral-800/40" />
                      )}
                    </div>
                  </>
                )}

                {/* Index label badge */}
                <div className="absolute top-1 left-1 bg-black/60 px-1 py-0.5 rounded text-[8px] font-mono font-bold text-white">
                  Spread {index + 1}
                </div>
              </button>

              {/* Sub-label and Delete button */}
              <div className="w-28 flex items-center justify-between px-1 text-[10px] font-mono text-neutral-400">
                <span className="truncate max-w-[70px]">
                  {spread.isChapterDivider ? 'Divider' : `Items: ${spread.leftPage.items.length + spread.rightPage.items.length}`}
                </span>
                
                {/* Delete button (disabled if only 1 spread left) */}
                {spreads.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteSpread(index);
                    }}
                    className="p-1 hover:text-[#E8341A] opacity-0 group-hover:opacity-100 transition-opacity rounded hover:bg-neutral-900"
                    title="Delete Spread"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

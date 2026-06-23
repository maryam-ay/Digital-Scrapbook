import React, { useState } from 'react';
import { STICKER_TEMPLATES, StickerTemplate } from '../data/stickers';
import { X, Globe, Utensils, Heart, Type, Sparkles, Leaf } from 'lucide-react';

interface StickerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSticker: (stickerId: string) => void;
}

export default function StickerDrawer({ isOpen, onClose, onAddSticker }: StickerDrawerProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'travel' | 'food' | 'cute' | 'text' | 'stars' | 'botanical'>('all');

  if (!isOpen) return null;

  const categories = [
    { id: 'all', label: 'All Stickers', icon: Sparkles },
    { id: 'travel', label: 'Travel Stamps', icon: Globe },
    { id: 'food', label: 'Food Labels', icon: Utensils },
    { id: 'cute', label: 'Cute Icons', icon: Heart },
    { id: 'text', label: 'Text Badges', icon: Type },
    { id: 'stars', label: 'Stars & Foil', icon: Sparkles },
    { id: 'botanical', label: 'Botanical', icon: Leaf },
  ];

  const filteredStickers = activeTab === 'all'
    ? STICKER_TEMPLATES
    : STICKER_TEMPLATES.filter(sticker => sticker.category === activeTab);

  return (
    <div className="fixed inset-x-0 bottom-0 bg-neutral-950/95 border-t border-neutral-800 text-white shadow-2xl z-45 flex flex-col h-[280px] md:h-[320px] transition-transform duration-300">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-800">
        <h3 className="font-mono text-sm uppercase tracking-widest text-amber-400 font-bold flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#E8341A]" /> Sticker Collection
        </h3>
        <button
          onClick={onClose}
          className="p-1 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-2 overflow-x-auto border-b border-neutral-900 scrollbar-thin">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id as any)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-all ${
                activeTab === cat.id
                  ? 'bg-[#E8341A] text-white font-bold'
                  : 'bg-neutral-900 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-850'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Stickers Grid */}
      <div className="flex-1 overflow-y-auto p-4 scrollbar-thin">
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4">
          {filteredStickers.map((sticker) => (
            <button
              key={sticker.id}
              onClick={() => {
                onAddSticker(sticker.id);
                // Flash scale feedback
              }}
              className="aspect-square bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg p-2 flex flex-col items-center justify-center cursor-pointer hover:border-[#E8341A] transition-all duration-200 group active:scale-95"
              title={sticker.name}
            >
              <div 
                className="w-12 h-12 flex items-center justify-center group-hover:scale-110 transition-transform duration-200"
                dangerouslySetInnerHTML={{
                  __html: `<svg viewBox="${sticker.viewBox}" class="w-full h-full select-none pointer-events-none">${sticker.svgContent}</svg>`
                }}
              />
              <span className="text-[9px] text-neutral-500 truncate w-full text-center mt-1 font-mono">
                {sticker.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

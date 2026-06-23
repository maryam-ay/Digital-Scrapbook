import React, { useState, useEffect } from 'react';
import { ScrapItem, RansomWord } from '../types';
import { X, Sparkles, Plus, Check } from 'lucide-react';

interface RansomTextCreatorProps {
  isOpen: boolean;
  onClose: () => void;
  onAddText: (text: string, mode: 'ransom' | 'handwriting' | 'typewriter', customWords?: RansomWord[]) => void;
  editingItem?: ScrapItem | null;
  onUpdateText?: (id: string, updates: Partial<ScrapItem>) => void;
}

const FONTS = [
  'Anton',
  'Righteous',
  'Special Elite',
  'Permanent Marker',
  'Alfa Slab One',
  'VT323',
  'Bebas Neue',
  'Lilita One'
];

// Predefined high-contrast sticker styles
const BLOCK_STYLES = [
  { bg: '#1A1A1A', text: '#F8F6F2' }, // Black sticker, white text
  { bg: '#E8341A', text: '#F8F6F2' }, // Red sticker, white text
  { bg: '#F5C842', text: '#1A1A1A' }, // Gold sticker, black text
  { bg: '#F8F6F2', text: '#1A1A1A' }, // White sticker, black text
  { bg: '#3B82B0', text: '#F8F6F2' }, // Teal sticker, white text
  { bg: '#2D5A27', text: '#F5C842' }, // Forest green sticker, gold text
  { bg: '#F2ECD8', text: '#E8341A' }, // Aged cream sticker, red text
  { bg: '#1A1A1A', text: '#F5C842' }, // Black sticker, gold text
];

export default function RansomTextCreator({
  isOpen,
  onClose,
  onAddText,
  editingItem,
  onUpdateText
}: RansomTextCreatorProps) {
  const [text, setText] = useState('');
  const [mode, setMode] = useState<'ransom' | 'handwriting' | 'typewriter'>('ransom');
  const [previewWords, setPreviewWords] = useState<RansomWord[]>([]);

  // Load editing item if provided
  useEffect(() => {
    if (editingItem) {
      setText(editingItem.text || '');
      setMode(editingItem.textMode || 'ransom');
      if (editingItem.ransomWords) {
        setPreviewWords(editingItem.ransomWords);
      }
    } else {
      setText('');
      setMode('ransom');
      setPreviewWords([]);
    }
  }, [editingItem, isOpen]);

  // Generate ransom word block styles from typed text
  const generateRansomBlocks = (inputText: string) => {
    const words = inputText.trim().split(/\s+/).filter(Boolean);
    
    return words.map((word, index) => {
      // Pick random styles from pools
      const font = FONTS[Math.floor(Math.random() * FONTS.length)];
      const style = BLOCK_STYLES[Math.floor(Math.random() * BLOCK_STYLES.length)];
      
      // Random rotation between -8 and +8 degrees for slight offsets
      const rotation = Math.floor(Math.random() * 16) - 8;
      // Random size between 16 and 24
      const size = Math.floor(Math.random() * 9) + 16;

      return {
        id: Math.random().toString(36).substring(2, 9),
        text: word.toUpperCase(), // Collage notes usually look punchy in uppercase!
        font,
        color: style.text,
        bg: style.bg,
        rotation,
        size
      };
    });
  };

  // Re-generate preview words whenever text changes in ransom mode
  useEffect(() => {
    if (mode === 'ransom' && !editingItem) {
      setPreviewWords(generateRansomBlocks(text));
    }
  }, [text, mode]);

  // Click on a single word inside the preview to cycle its style
  const restyleWord = (wordId: string) => {
    setPreviewWords(prev =>
      prev.map(word => {
        if (word.id === wordId) {
          const currentStyleIndex = BLOCK_STYLES.findIndex(
            s => s.bg === word.bg && s.text === word.color
          );
          const nextStyleIndex = (currentStyleIndex + 1) % BLOCK_STYLES.length;
          const nextStyle = BLOCK_STYLES[nextStyleIndex];

          const currentFontIndex = FONTS.indexOf(word.font);
          const nextFontIndex = (currentFontIndex + 1) % FONTS.length;
          const nextFont = FONTS[nextFontIndex];

          // Set random rotation and scale
          const rotation = Math.floor(Math.random() * 16) - 8;
          const size = Math.floor(Math.random() * 9) + 16;

          return {
            ...word,
            font: nextFont,
            bg: nextStyle.bg,
            color: nextStyle.text,
            rotation,
            size
          };
        }
        return word;
      })
    );
  };

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    if (editingItem && onUpdateText) {
      if (mode === 'ransom') {
        onUpdateText(editingItem.id, {
          text,
          textMode: mode,
          ransomWords: previewWords
        });
      } else {
        onUpdateText(editingItem.id, {
          text,
          textMode: mode
        });
      }
    } else {
      if (mode === 'ransom') {
        onAddText(text, mode, previewWords);
      } else {
        onAddText(text, mode);
      }
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-neutral-900 border border-neutral-800 text-white rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#E8341A]" />
            <h3 className="font-mono text-sm uppercase tracking-wider font-bold">
              {editingItem ? 'Edit Collage Text' : 'Cut-and-Paste Typography'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5 overflow-y-auto">
          {/* Mode selector */}
          <div className="flex gap-2 p-1 bg-neutral-950 rounded-lg border border-neutral-800">
            <button
              type="button"
              onClick={() => setMode('ransom')}
              className={`flex-1 py-2 text-xs font-mono rounded-md transition-all ${
                mode === 'ransom'
                  ? 'bg-[#E8341A] text-white font-bold shadow'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              ✂️ Ransom Note
            </button>
            <button
              type="button"
              onClick={() => setMode('handwriting')}
              className={`flex-1 py-2 text-xs font-mono rounded-md transition-all ${
                mode === 'handwriting'
                  ? 'bg-[#E8341A] text-white font-bold shadow'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              ✍️ Handwriting
            </button>
            <button
              type="button"
              onClick={() => setMode('typewriter')}
              className={`flex-1 py-2 text-xs font-mono rounded-md transition-all ${
                mode === 'typewriter'
                  ? 'bg-[#E8341A] text-white font-bold shadow'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              ⌨️ Typewriter
            </button>
          </div>

          {/* Text Input */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono uppercase text-neutral-400 tracking-wider">
              Enter your message:
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={
                mode === 'ransom'
                  ? 'Type city names or trip highlights (e.g. "TOKYO SHIBUYA 2026")'
                  : 'Type diary entries or ticket details...'
              }
              className="bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:border-amber-400 font-sans focus:ring-1 focus:ring-amber-400 min-h-[80px] text-white placeholder-neutral-600 resize-none"
              maxLength={200}
              required
            />
          </div>

          {/* Dynamic Preview area */}
          <div className="flex flex-col gap-2 bg-neutral-950/50 border border-neutral-800 rounded-xl p-4 min-h-[120px]">
            <span className="text-[10px] font-mono uppercase text-amber-500 tracking-widest font-bold">
              Live Preview:
            </span>
            
            {text.trim() === '' ? (
              <div className="flex-1 flex items-center justify-center text-xs text-neutral-600 font-mono italic">
                Aesthetic preview will appear here...
              </div>
            ) : mode === 'ransom' ? (
              <div className="flex-1 flex flex-wrap gap-2 items-center justify-center p-2">
                {previewWords.map((word) => (
                  <span
                    key={word.id}
                    type="button"
                    onClick={() => restyleWord(word.id)}
                    className="px-2.5 py-1.5 font-bold shadow-xs select-none inline-block border border-black/10 cursor-pointer hover:scale-105 active:scale-95 transition-all"
                    style={{
                      fontFamily: word.font,
                      color: word.color,
                      backgroundColor: word.bg,
                      fontSize: `${word.size}px`,
                      transform: `rotate(${word.rotation}deg)`
                    }}
                    title="Click to cycle typography"
                  >
                    {word.text}
                  </span>
                ))}
              </div>
            ) : mode === 'handwriting' ? (
              <div className="flex-1 flex items-center justify-center text-center font-caveat text-2xl text-neutral-200 whitespace-pre-wrap leading-tight max-w-[90%] mx-auto py-2">
                {text}
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-center font-special-elite text-sm text-neutral-200 bg-amber-50/5 border border-neutral-800 p-4 rounded shadow-2xs whitespace-pre-wrap leading-relaxed">
                {text}
              </div>
            )}

            {mode === 'ransom' && text.trim() !== '' && (
              <span className="text-[9px] font-mono text-neutral-500 text-center mt-2">
                💡 Tap individual blocks to cycle their layout, colors & fonts!
              </span>
            )}
          </div>

          {/* Submit action buttons */}
          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 bg-neutral-800 hover:bg-neutral-750 font-mono text-xs rounded-xl font-bold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 bg-[#E8341A] hover:bg-red-600 text-white font-mono text-xs rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-1.5"
            >
              {editingItem ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              {editingItem ? 'Save Updates' : 'Add to Journal'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export { FONTS, BLOCK_STYLES };

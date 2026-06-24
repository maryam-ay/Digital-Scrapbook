import React, { useState, useRef, useEffect } from 'react';
import { ScrapItem, RansomWord } from '../types';
import { STICKER_TEMPLATES } from '../data/stickers';
import { TAPE_PATTERNS } from '../data/tapePatterns';
import { Trash2, ChevronUp, ChevronDown, RotateCcw, Type, Sparkles } from 'lucide-react';

interface ScrapbookItemProps {
  item: ScrapItem;
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (id: string, updates: Partial<ScrapItem>) => void;
  onDelete: (id: string) => void;
  onBringToFront: (id: string) => void;
  onSendToBack: (id: string) => void;
  onRestyleRansomWord?: (itemId: string, wordId: string) => void;
}

export default function ScrapbookItem({
  item,
  isSelected,
  onSelect,
  onUpdate,
  onDelete,
  onBringToFront,
  onSendToBack,
  onRestyleRansomWord
}: ScrapbookItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);
  const [localTransform, setLocalTransform] = useState({
    x: item.x,
    y: item.y,
    width: item.width,
    height: item.height,
    rotation: item.rotation
  });

  // Sync state with parent when item changes externally
  useEffect(() => {
    setLocalTransform({
      x: item.x,
      y: item.y,
      width: item.width,
      height: item.height,
      rotation: item.rotation
    });
  }, [item.x, item.y, item.width, item.height, item.rotation]);

  const dragStartRef = useRef({ pointerX: 0, pointerY: 0, itemX: 0, itemY: 0 });
  const rotateStartRef = useRef({ pointerX: 0, pointerY: 0, itemRotation: 0, centerX: 0, centerY: 0 });
  const resizeStartRef = useRef({ pointerX: 0, pointerY: 0, itemWidth: 0, itemHeight: 0 });

  // Handle Dragging
  const handleDragStart = (e: React.PointerEvent) => {
    // Only drag on left click
    if (e.button !== 0) return;
    
    // Check if clicking a button inside context menu or handles
    if ((e.target as HTMLElement).closest('.item-controls') || (e.target as HTMLElement).closest('.handle')) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();
    onSelect();

    dragStartRef.current = {
      pointerX: e.clientX,
      pointerY: e.clientY,
      itemX: localTransform.x,
      itemY: localTransform.y
    };

    const handlePointerMove = (moveEvent: PointerEvent) => {
      const dx = moveEvent.clientX - dragStartRef.current.pointerX;
      const dy = moveEvent.clientY - dragStartRef.current.pointerY;
      
      setLocalTransform(prev => ({
        ...prev,
        x: dragStartRef.current.itemX + dx,
        y: dragStartRef.current.itemY + dy
      }));
    };

    const handlePointerUp = (upEvent: PointerEvent) => {
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerUp);
      
      const finalX = dragStartRef.current.itemX + (upEvent.clientX - dragStartRef.current.pointerX);
      const finalY = dragStartRef.current.itemY + (upEvent.clientY - dragStartRef.current.pointerY);
      
      onUpdate(item.id, { x: finalX, y: finalY });
    };

    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerup', handlePointerUp);
  };

  // Handle Rotating
  const handleRotateStart = (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!itemRef.current) return;
    
    const rect = itemRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    rotateStartRef.current = {
      pointerX: e.clientX,
      pointerY: e.clientY,
      itemRotation: localTransform.rotation,
      centerX,
      centerY
    };

    const handlePointerMove = (moveEvent: PointerEvent) => {
      // Calculate angle from item center to pointer position
      const dx = moveEvent.clientX - rotateStartRef.current.centerX;
      const dy = moveEvent.clientY - rotateStartRef.current.centerY;
      
      // Calculate angle in degrees, add 90 because handle is at top (0, -height/2)
      let angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
      
      // Normalize angle
      if (angle < 0) angle += 360;
      if (angle > 180) angle -= 360;

      setLocalTransform(prev => ({
        ...prev,
        rotation: Math.round(angle)
      }));
    };

    const handlePointerUp = (upEvent: PointerEvent) => {
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerUp);

      const dx = upEvent.clientX - rotateStartRef.current.centerX;
      const dy = upEvent.clientY - rotateStartRef.current.centerY;
      let angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
      if (angle < 0) angle += 360;
      if (angle > 180) angle -= 360;

      onUpdate(item.id, { rotation: Math.round(angle) });
    };

    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerup', handlePointerUp);
  };

  // Handle Resizing
  const handleResizeStart = (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();

    resizeStartRef.current = {
      pointerX: e.clientX,
      pointerY: e.clientY,
      itemWidth: localTransform.width,
      itemHeight: localTransform.height
    };

    const handlePointerMove = (moveEvent: PointerEvent) => {
      // Delta movement along screen axes
      const dx = moveEvent.clientX - resizeStartRef.current.pointerX;
      const dy = moveEvent.clientY - resizeStartRef.current.pointerY;
      
      // Simple scaling: combine horizontally/vertically or focus on dx
      let newWidth = resizeStartRef.current.itemWidth + dx;
      let newHeight = resizeStartRef.current.itemHeight + dy;

      // Keep minimum size
      newWidth = Math.max(40, newWidth);
      newHeight = Math.max(20, newHeight);

      // If image or sticker, let's keep aspect ratio locked
      if (item.aspectRatio) {
        newHeight = Math.round(newWidth / item.aspectRatio);
      }

      setLocalTransform(prev => ({
        ...prev,
        width: newWidth,
        height: newHeight
      }));
    };

    const handlePointerUp = (upEvent: PointerEvent) => {
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerUp);

      const dx = upEvent.clientX - resizeStartRef.current.pointerX;
      const dy = upEvent.clientY - resizeStartRef.current.pointerY;
      let newWidth = Math.max(40, resizeStartRef.current.itemWidth + dx);
      let newHeight = Math.max(20, resizeStartRef.current.itemHeight + dy);

      if (item.aspectRatio) {
        newHeight = Math.round(newWidth / item.aspectRatio);
      }

      onUpdate(item.id, { width: newWidth, height: newHeight });
    };

    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerup', handlePointerUp);
  };

  // Render content based on item type
  const renderItemContent = () => {
    switch (item.type) {
      case 'image':
        const polaroidClass = item.src ? 'p-3 pb-10 bg-white border border-neutral-200' : '';
        return (
          <div 
            className={`w-full h-full relative select-none overflow-hidden transition-shadow duration-300 ${polaroidClass}`}
            style={{
              boxShadow: '3px 5px 14px rgba(0,0,0,0.22)',
              border: '3px solid #ffffff'
            }}
          >
            {item.src ? (
              <img 
                src={item.src} 
                alt="Scrapbook snap" 
                className="w-full h-full object-cover select-none pointer-events-none"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-full h-full bg-neutral-200 flex items-center justify-center border border-dashed border-neutral-400">
                <span className="text-xs text-neutral-500 font-mono">Empty Photo</span>
              </div>
            )}
            
            {/* Hand-written styled caption helper inside polaroid border */}
            {item.text && (
              <div className="absolute bottom-2 left-0 right-0 text-center font-caveat text-sm text-neutral-800 truncate px-2 select-none pointer-events-none">
                {item.text}
              </div>
            )}
          </div>
        );

      case 'sticker':
        const stickerTemplate = STICKER_TEMPLATES.find(t => t.id === item.stickerId);
        if (!stickerTemplate) return null;
        return (
          <div 
            className="w-full h-full select-none select-none pointer-events-none active:scale-95 transition-transform"
            dangerouslySetInnerHTML={{ __html: `<svg viewBox="${stickerTemplate.viewBox}" class="w-full h-full select-none pointer-events-none">${stickerTemplate.svgContent}</svg>` }}
          />
        );

      case 'tape':
        const tapePattern = TAPE_PATTERNS.find(t => t.id === item.tapeId);
        const tapeStyle = tapePattern ? tapePattern.style : { backgroundColor: 'rgba(59, 130, 176, 0.7)' };
        return (
          <div 
            className={`w-full h-full relative select-none ${tapePattern?.className || ''}`}
            style={{
              ...tapeStyle,
              // Jagged torn edges left and right
              clipPath: 'polygon(0% 12%, 3% 0%, 7% 10%, 12% 2%, 18% 11%, 23% 4%, 28% 12%, 34% 1%, 40% 11%, 46% 3%, 52% 13%, 58% 2%, 63% 10%, 68% 4%, 74% 12%, 80% 2%, 86% 11%, 91% 3%, 97% 13%, 100% 5%, 100% 88%, 97% 100%, 92% 90%, 86% 98%, 81% 89%, 75% 97%, 69% 88%, 64% 96%, 58% 87%, 52% 98%, 46% 89%, 41% 97%, 35% 88%, 29% 99%, 23% 90%, 17% 98%, 12% 87%, 6% 96%, 2% 88%, 0% 95%)'
            }}
          />
        );

      case 'text':
        if (item.textMode === 'ransom' && item.ransomWords) {
          return (
            <div className="w-full h-full flex flex-wrap gap-2 items-center justify-center p-1 font-sans select-none overflow-hidden">
              {item.ransomWords.map((word) => (
                <span
                  key={word.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isSelected && onRestyleRansomWord) {
                      onRestyleRansomWord(item.id, word.id);
                    }
                  }}
                  className="px-2.5 py-1.5 font-bold shadow-xs select-none inline-block border border-black/15 cursor-pointer active:scale-95 transition-transform"
                  style={{
                    fontFamily: word.font,
                    color: word.color,
                    backgroundColor: word.bg,
                    fontSize: `${word.size}px`,
                    transform: `rotate(${word.rotation}deg)`
                  }}
                >
                  {word.text}
                </span>
              ))}
            </div>
          );
        }

        // Handwriting or Typewriter font styling
        let textFont = 'font-sans';
        let customClasses = '';
        if (item.textMode === 'handwriting') {
          textFont = 'font-caveat text-xl font-bold tracking-wide text-neutral-800 leading-tight';
        } else if (item.textMode === 'typewriter') {
          textFont = 'font-special-elite text-sm text-neutral-800 tracking-wider bg-amber-50/40 p-2 border border-neutral-300 shadow-2xs';
        }

        return (
          <div 
            className={`w-full h-full flex items-center justify-center text-center select-none ${textFont}`}
            style={{
              color: item.textColor || '#1A1A1A',
              backgroundColor: item.textBg || 'transparent',
              fontFamily: item.fontFamily
            }}
          >
            <p className="whitespace-pre-wrap select-none p-1 break-words w-full">
              {item.text}
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  // Styles for selection outline
  const outlineStyle = isSelected 
    ? { border: '2px dashed #E8341A', padding: '2px', zIndex: 100 }
    : {};

  return (
    <div
      ref={itemRef}
      onPointerDown={handleDragStart}
      className={`absolute select-none cursor-grab active:cursor-grabbing ${isSelected ? 'z-50' : ''}`}
      data-scrapbook-item="true"
      style={{
        left: `${localTransform.x}px`,
        top: `${localTransform.y}px`,
        width: `${localTransform.width}px`,
        height: `${localTransform.height}px`,
        transform: `rotate(${localTransform.rotation}deg)`,
        zIndex: item.zIndex,
        touchAction: 'none'
      }}
      id={`scrap-item-${item.id}`}
    >
      {/* Outer Selection Border */}
      <div className="w-full h-full relative" style={outlineStyle}>
        {renderItemContent()}

        {/* INTERACTION HANDLES (only visible when item is selected) */}
        {isSelected && (
          <>
            {/* Rotation Handle (Arc above the top edge) */}
            <div
              onPointerDown={handleRotateStart}
              className="handle absolute -top-10 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-neutral-900 border border-neutral-700 text-white flex items-center justify-center shadow-md cursor-alias hover:scale-115 active:scale-95 transition-transform z-50"
              title="Drag to Rotate"
            >
              <RotateCcw className="w-4 h-4 text-white" />
              {/* Stem line connecting to item */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2 w-0.5 h-3.5 bg-neutral-900" />
            </div>

            {/* Resize Handle (Bottom-Right corner) */}
            <div
              onPointerDown={handleResizeStart}
              className="handle absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-[#E8341A] text-white flex items-center justify-center shadow-md cursor-se-resize hover:scale-115 active:scale-95 transition-transform z-50 border border-white"
              title="Drag to Resize"
            >
              <svg viewBox="0 0 100 100" className="w-3.5 h-3.5 fill-white">
                <polygon points="100,0 100,100 0,100" />
              </svg>
            </div>

            {/* Quick Actions Floating Toolbar */}
            <div className="item-controls absolute -bottom-14 left-1/2 -translate-x-1/2 flex items-center bg-neutral-900 text-white rounded-lg shadow-xl px-2 py-1 gap-1 text-xs whitespace-nowrap z-50 border border-neutral-800">
              <button
                onClick={(e) => { e.stopPropagation(); onBringToFront(item.id); }}
                className="p-1 hover:bg-neutral-800 rounded text-neutral-300 hover:text-white"
                title="Bring to Front"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onSendToBack(item.id); }}
                className="p-1 hover:bg-neutral-800 rounded text-neutral-300 hover:text-white"
                title="Send to Back"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {/* Ransom restyle notification helper */}
              {item.type === 'text' && item.textMode === 'ransom' && (
                <div className="px-1.5 py-0.5 text-[10px] text-amber-400 font-mono flex items-center gap-1 border-r border-neutral-800">
                  <Sparkles className="w-3 h-3" /> Click words to restyle
                </div>
              )}

              <button
                onClick={(e) => { e.stopPropagation(); onDelete(item.id); }}
                className="p-1 hover:bg-red-950/40 rounded text-red-400 hover:text-red-300"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

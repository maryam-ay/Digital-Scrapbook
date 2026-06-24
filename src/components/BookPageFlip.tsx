import React, { useEffect, useRef } from 'react';
import { PageFlip } from 'page-flip';

interface BookPageFlipProps {
  children: React.ReactNode;
  currentPageIndex: number; // 0-based index of individual page in PageFlip
  onPageChange: (index: number) => void;
}

export default function BookPageFlip({
  children,
  currentPageIndex,
  onPageChange
}: BookPageFlipProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pageFlipRef = useRef<PageFlip | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Destory existing instance if any
    if (pageFlipRef.current) {
      try {
        pageFlipRef.current.destroy();
      } catch (err) {
        console.warn('Error destroying page flip instance:', err);
      }
      pageFlipRef.current = null;
    }

    // Initialize PageFlip with specified parameters
    const pageFlip = new PageFlip(container, {
      width: 550, // Base page width
      height: 687, // Base page height
      size: 'stretch',
      minWidth: 300,
      maxWidth: 800,
      minHeight: 400,
      maxHeight: 1000,
      drawShadow: true,
      flippingTime: 700,
      usePortrait: true,
      useMouseEvents: true,
      showCover: true
    });

    pageFlipRef.current = pageFlip;

    // Load pages from elements inside the container with class .page
    try {
      const pageElements = container.querySelectorAll('.page');
      if (pageElements.length > 0) {
        pageFlip.loadFromHTML(pageElements as any);
      }
    } catch (err) {
      console.error('Error loading pages into PageFlip:', err);
    }

    // Handle page turning event
    const handleFlip = (e: any) => {
      onPageChange(e.data);
    };

    pageFlip.on('flip', handleFlip);

    // Turn to the initial page index
    if (currentPageIndex >= 0 && currentPageIndex < pageFlip.getPageCount()) {
      try {
        pageFlip.turnToPage(currentPageIndex);
      } catch (_) {}
    }

    return () => {
      pageFlip.off('flip', handleFlip);
      try {
        pageFlip.destroy();
      } catch (_) {}
      pageFlipRef.current = null;
    };
  }, [children]); // Re-initialize if the children (list of pages) change

  // Synchronize external currentPageIndex changes
  useEffect(() => {
    const pageFlip = pageFlipRef.current;
    if (pageFlip) {
      try {
        const currentInFlip = pageFlip.getCurrentPageIndex();
        if (currentPageIndex !== currentInFlip && currentPageIndex >= 0 && currentPageIndex < pageFlip.getPageCount()) {
          pageFlip.turnToPage(currentPageIndex);
        }
      } catch (_) {}
    }
  }, [currentPageIndex]);

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <div 
        ref={containerRef} 
        className="w-full h-full relative"
      >
        {children}
      </div>
    </div>
  );
}

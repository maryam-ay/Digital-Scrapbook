import React, { useState, useEffect, useRef } from 'react';

interface ZoomableBookProps {
  children: React.ReactNode;
  isDisabled?: boolean;
}

export default function ZoomableBook({ children, isDisabled = false }: ZoomableBookProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [transformOrigin, setTransformOrigin] = useState('center center');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Drag pan tracking
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const translateStart = useRef({ x: 0, y: 0 });

  // Double tap tracking
  const lastTap = useRef(0);

  // Pinch-to-zoom tracking
  const activePointers = useRef<Map<number, PointerEvent>>(new Map());
  const initialDistance = useRef(0);
  const initialScale = useRef(1);
  const isPinchActive = useRef(false);

  // Wheel zoom handler
  useEffect(() => {
    if (isDisabled) return;
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = container.getBoundingClientRect();

      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // Determine new scale
      const delta = e.deltaY < 0 ? 0.15 : -0.15;
      const nextScale = Math.max(1, Math.min(2.5, scale + delta));

      if (nextScale === 1) {
        setScale(1);
        setTranslateX(0);
        setTranslateY(0);
        setTransformOrigin('center center');
        return;
      }

      // Calculate current origin in pixels
      let currentOx = rect.width / 2;
      let currentOy = rect.height / 2;
      if (transformOrigin !== 'center center') {
        const parts = transformOrigin.split(' ');
        currentOx = parseFloat(parts[0]);
        currentOy = parseFloat(parts[1]);
      }

      // Find the unscaled coordinate of the mouse position
      const unscaledX = (mouseX - translateX - currentOx) / scale + currentOx;
      const unscaledY = (mouseY - translateY - currentOy) / scale + currentOy;

      // Compensate translation for the origin shift
      const nextTx = translateX - (unscaledX - currentOx) * (scale - 1);
      const nextTy = translateY - (unscaledY - currentOy) * (scale - 1);

      setIsTransitioning(false); // seamless wheel zoom
      setTransformOrigin(`${unscaledX}px ${unscaledY}px`);
      setTranslateX(nextTx);
      setTranslateY(nextTy);
      setScale(nextScale);
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [scale, translateX, translateY, transformOrigin]);

  // Reset zoom back to 100%
  const resetZoom = () => {
    setIsTransitioning(true);
    setScale(1);
    setTranslateX(0);
    setTranslateY(0);
    setTransformOrigin('center center');
  };

  // Double tap handler (toggles between 1x and 1.8x)
  const handleDoubleTap = (clientX: number, clientY: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    setIsTransitioning(true);

    if (scale > 1.05) {
      // Zoom out
      setScale(1);
      setTranslateX(0);
      setTranslateY(0);
      setTransformOrigin('center center');
    } else {
      // Zoom in to 1.8x at tap position
      const mouseX = clientX - rect.left;
      const mouseY = clientY - rect.top;

      setTransformOrigin(`${mouseX}px ${mouseY}px`);
      setTranslateX(0);
      setTranslateY(0);
      setScale(1.8);
    }
  };

  // Pointer event handlers for mobile pinch-to-zoom and dragging (panning)
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Add to active pointers
    activePointers.current.set(e.pointerId, e.nativeEvent);

    // Double tap detection
    const now = Date.now();
    if (now - lastTap.current < 300) {
      e.preventDefault();
      handleDoubleTap(e.clientX, e.clientY);
      lastTap.current = 0;
      return;
    }
    lastTap.current = now;

    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    if (activePointers.current.size === 2) {
      // Pinch to zoom starts
      isPinchActive.current = true;
      isDragging.current = false;

      const pointers = Array.from(activePointers.current.values()) as PointerEvent[];
      const p1 = pointers[0];
      const p2 = pointers[1];

      const dx = p1.clientX - p2.clientX;
      const dy = p1.clientY - p2.clientY;
      initialDistance.current = Math.sqrt(dx * dx + dy * dy);
      initialScale.current = scale;

      // Set origin to pinch center
      const centerX = (p1.clientX + p2.clientX) / 2;
      const centerY = (p1.clientY + p2.clientY) / 2;

      const mouseX = centerX - rect.left;
      const mouseY = centerY - rect.top;

      let currentOx = rect.width / 2;
      let currentOy = rect.height / 2;
      if (transformOrigin !== 'center center') {
        const parts = transformOrigin.split(' ');
        currentOx = parseFloat(parts[0]);
        currentOy = parseFloat(parts[1]);
      }

      const unscaledX = (mouseX - translateX - currentOx) / scale + currentOx;
      const unscaledY = (mouseY - translateY - currentOy) / scale + currentOy;

      const nextTx = translateX - (unscaledX - currentOx) * (scale - 1);
      const nextTy = translateY - (unscaledY - currentOy) * (scale - 1);

      setIsTransitioning(false);
      setTransformOrigin(`${unscaledX}px ${unscaledY}px`);
      setTranslateX(nextTx);
      setTranslateY(nextTy);
    } else if (activePointers.current.size === 1 && scale > 1) {
      // Panning starts (only if zoomed in)
      const target = e.target as HTMLElement;
      // Do not pan if dragging scrapbook elements or interactive buttons
      if (
        target.closest('[data-scrapbook-item="true"]') ||
        target.closest('button') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('[data-no-pan="true"]')
      ) {
        return;
      }

      isDragging.current = true;
      dragStart.current = { x: e.clientX, y: e.clientY };
      translateStart.current = { x: translateX, y: translateY };
      containerRef.current?.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    // Update active pointers
    if (activePointers.current.has(e.pointerId)) {
      activePointers.current.set(e.pointerId, e.nativeEvent);
    }

    if (isPinchActive.current && activePointers.current.size === 2) {
      const pointers = Array.from(activePointers.current.values()) as PointerEvent[];
      const p1 = pointers[0];
      const p2 = pointers[1];

      const dx = p1.clientX - p2.clientX;
      const dy = p1.clientY - p2.clientY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (initialDistance.current > 0) {
        const nextScale = Math.max(1, Math.min(2.5, initialScale.current * (distance / initialDistance.current)));
        setScale(nextScale);
      }
    } else if (isDragging.current && scale > 1) {
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      setTranslateX(translateStart.current.x + dx);
      setTranslateY(translateStart.current.y + dy);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    activePointers.current.delete(e.pointerId);

    if (isPinchActive.current && activePointers.current.size < 2) {
      isPinchActive.current = false;
      initialDistance.current = 0;
    }

    if (isDragging.current) {
      isDragging.current = false;
      containerRef.current?.releasePointerCapture(e.pointerId);
    }
  };

  if (isDisabled) {
    return (
      <div
        ref={containerRef}
        className="relative w-full h-full select-none flex items-center justify-center overflow-hidden"
        id="zoomable-book-container-disabled"
      >
        <div className="w-full h-full select-none">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className="relative w-full h-full overflow-hidden select-none flex items-center justify-center touch-none"
      id="zoomable-book-container"
    >
      <div
        style={{
          transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
          transformOrigin: transformOrigin,
          transition: isTransitioning ? 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1), transform-origin 0.3s cubic-bezier(0.25, 1, 0.5, 1)' : 'none',
        }}
        className="w-full h-full select-none"
      >
        {children}
      </div>

      {scale > 1.01 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            resetZoom();
          }}
          className="absolute top-4 right-4 bg-black/85 hover:bg-neutral-900 text-[#FBF9F4] text-xs font-mono font-bold px-3 py-1.5 rounded-full border border-white/10 hover:border-white/20 shadow-2xl z-50 cursor-pointer flex items-center gap-1 active:scale-95 transition-all"
        >
          <span>100%</span>
        </button>
      )}
    </div>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { ScrapbookState, SpreadState, ScrapItem, PageState, RansomWord } from './types';
import { STICKER_TEMPLATES } from './data/stickers';
import { TAPE_PATTERNS } from './data/tapePatterns';
import SpiralBinding from './components/SpiralBinding';
import ScrapbookItem from './components/ScrapbookItem';
import StickerDrawer from './components/StickerDrawer';
import TapeSelector from './components/TapeSelector';
import RansomTextCreator from './components/RansomTextCreator';
import CameraOverlay from './components/CameraOverlay';
import ThumbnailStrip from './components/ThumbnailStrip';
import html2canvas from 'html2canvas';

import {
  Plus,
  Sparkles,
  Camera,
  Image as ImageIcon,
  FolderPlus,
  BookOpen,
  Download,
  Trash2,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Star,
  Info,
  Calendar,
  X,
  Type
} from 'lucide-react';

// Pre-seeded initial state for a gorgeous first load
const createDefaultSpreads = (): SpreadState[] => [
  {
    id: 'spread-1',
    isChapterDivider: false,
    leftPage: {
      id: 'page-1-l',
      title: 'Arrival',
      items: [
        {
          id: 'init-title',
          type: 'text',
          text: 'TOKYO TRIP 2026',
          textMode: 'ransom',
          ransomWords: [
            { id: 'w1', text: 'TOKYO', font: 'Anton', color: '#F8F6F2', bg: '#E8341A', rotation: -4, size: 28 },
            { id: 'w2', text: 'ZINE', font: 'Permanent Marker', color: '#1A1A1A', bg: '#F5C842', rotation: 6, size: 24 },
            { id: 'w3', text: 'JOURNAL', font: 'Special Elite', color: '#F8F6F2', bg: '#3B82B0', rotation: -2, size: 20 }
          ],
          x: 60,
          y: 70,
          width: 380,
          height: 100,
          rotation: -2,
          zIndex: 1
        },
        {
          id: 'init-stamp-1',
          type: 'sticker',
          stickerId: 'postage-stamp-fuji',
          x: 290,
          y: 190,
          width: 110,
          height: 110,
          rotation: 8,
          zIndex: 2,
          aspectRatio: 1
        },
        {
          id: 'init-sticker-2',
          type: 'sticker',
          stickerId: 'lucky-cat',
          x: 40,
          y: 400,
          width: 110,
          height: 110,
          rotation: -8,
          zIndex: 3,
          aspectRatio: 1
        },
        {
          id: 'init-text-note',
          type: 'text',
          text: 'Land of late night ramen, neon vending machines, and pixel art alleys. Collecting tickets, stamps, and snaps.',
          textMode: 'handwriting',
          x: 180,
          y: 420,
          width: 280,
          height: 120,
          rotation: 3,
          zIndex: 4
        },
        {
          id: 'init-star-1',
          type: 'sticker',
          stickerId: 'star-gold-md',
          x: 140,
          y: 220,
          width: 40,
          height: 40,
          rotation: 15,
          zIndex: 5,
          aspectRatio: 1
        },
        {
          id: 'init-tape-1',
          type: 'tape',
          tapeId: 'gingham-red',
          x: 260,
          y: 160,
          width: 120,
          height: 30,
          rotation: -20,
          zIndex: 6
        }
      ]
    },
    rightPage: {
      id: 'page-1-r',
      items: [
        {
          id: 'init-polaroid',
          type: 'image',
          src: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80',
          aspectRatio: 0.75,
          isPolaroid: true,
          text: 'Neon Lights in Shinjuku ⚡',
          x: 80,
          y: 60,
          width: 220,
          height: 293,
          rotation: -4,
          zIndex: 2
        },
        {
          id: 'init-ticket-stamp',
          type: 'sticker',
          stickerId: 'passport-entry',
          x: 50,
          y: 410,
          width: 130,
          height: 87,
          rotation: 5,
          zIndex: 3,
          aspectRatio: 1.5
        },
        {
          id: 'init-tape-2',
          type: 'tape',
          tapeId: 'solid-teal',
          x: 130,
          y: 40,
          width: 120,
          height: 30,
          rotation: 12,
          zIndex: 4
        },
        {
          id: 'init-banana',
          type: 'sticker',
          stickerId: 'banana-sticker',
          x: 280,
          y: 430,
          width: 110,
          height: 77,
          rotation: -15,
          zIndex: 5,
          aspectRatio: 1.42
        },
        {
          id: 'init-star-2',
          type: 'sticker',
          stickerId: 'star-gold-sm',
          x: 350,
          y: 100,
          width: 30,
          height: 30,
          rotation: -35,
          zIndex: 6,
          aspectRatio: 1
        }
      ]
    }
  },
  {
    id: 'spread-2',
    isChapterDivider: true,
    chapterTitle: 'SHIBUYA STREET CODES',
    chapterColor: '#E8341A',
    leftPage: { id: 'page-2-l', items: [] },
    rightPage: { id: 'page-2-r', items: [] }
  },
  {
    id: 'spread-3',
    isChapterDivider: false,
    leftPage: {
      id: 'page-3-l',
      items: [
        {
          id: 's3-typewriter',
          type: 'text',
          text: 'VENDING MACHINE STUDY\n- Pocari Sweat\n- Melon Soda Can\n- Boss Hot Coffee\n\nAll found within 10 meters of our hotel entrance.',
          textMode: 'typewriter',
          x: 60,
          y: 90,
          width: 320,
          height: 180,
          rotation: -2,
          zIndex: 1
        },
        {
          id: 's3-onigiri',
          type: 'sticker',
          stickerId: 'sushi-cute',
          x: 290,
          y: 350,
          width: 120,
          height: 120,
          rotation: 12,
          zIndex: 2,
          aspectRatio: 1
        },
        {
          id: 's3-stripe-tape',
          type: 'tape',
          tapeId: 'stripe-diagonal',
          x: 160,
          y: 70,
          width: 140,
          height: 32,
          rotation: -5,
          zIndex: 3
        }
      ]
    },
    rightPage: {
      id: 'page-3-r',
      items: [
        {
          id: 's3-food-stamp',
          type: 'sticker',
          stickerId: 'cherry-sticker',
          x: 80,
          y: 100,
          width: 130,
          height: 130,
          rotation: -10,
          zIndex: 1,
          aspectRatio: 1
        },
        {
          id: 's3-daisy',
          type: 'sticker',
          stickerId: 'flower-pressed-1',
          x: 230,
          y: 280,
          width: 110,
          height: 110,
          rotation: 25,
          zIndex: 2,
          aspectRatio: 1
        },
        {
          id: 's3-leaf',
          type: 'sticker',
          stickerId: 'leaf-sketch-1',
          x: 50,
          y: 380,
          width: 110,
          height: 141,
          rotation: -15,
          zIndex: 3,
          aspectRatio: 0.78
        }
      ]
    }
  }
];

const JOURNAL_PROMPTS = [
  "Two things that are the exact same color",
  "Gathering color stories from everyday objects",
  "A ticket stub or receipt from a memorable meal",
  "A pressed flower or leaf collected today",
  "Sketch a tiny object on your desk right now",
  "Write down three words that describe the weather today",
  "Your favorite corner in your home at golden hour",
  "The song lyric that was stuck in your head today",
  "Something you held in your hand that felt warm",
  "A memory of your favorite snack",
  "A color combination that feels like peace",
  "Write a single sentence from a book you love",
  "A sketch of your current mood as a weather icon",
  "A list of songs playing on repeat this week",
  "Something small that made you feel grateful today",
  "Find a piece of discarded paper or packaging and capture it",
  "What is a texture that you touched today?"
];

export default function App() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const leftPageRef = useRef<HTMLDivElement>(null);
  const rightPageRef = useRef<HTMLDivElement>(null);

  // Daily Prompt State
  const [currentPrompt, setCurrentPrompt] = useState(() => {
    try {
      const saved = localStorage.getItem('scrapbook-daily-prompt');
      if (saved) return saved;
    } catch (_) {}
    return JOURNAL_PROMPTS[0];
  });

  const handleShufflePrompt = () => {
    const currentIndex = JOURNAL_PROMPTS.indexOf(currentPrompt);
    let nextIndex = Math.floor(Math.random() * JOURNAL_PROMPTS.length);
    while (nextIndex === currentIndex && JOURNAL_PROMPTS.length > 1) {
      nextIndex = Math.floor(Math.random() * JOURNAL_PROMPTS.length);
    }
    const newPrompt = JOURNAL_PROMPTS[nextIndex];
    setCurrentPrompt(newPrompt);
    try {
      localStorage.setItem('scrapbook-daily-prompt', newPrompt);
    } catch (_) {}
  };

  // Core Scrapbook State
  const [spreads, setSpreads] = useState<SpreadState[]>([]);
  const [currentSpreadIndex, setCurrentSpreadIndex] = useState(0);

  // Selection state
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [selectedItemPage, setSelectedItemPage] = useState<'left' | 'right' | null>(null);

  // Modal & Panel toggles
  const [isStickerOpen, setIsStickerOpen] = useState(false);
  const [isTapeOpen, setIsTapeOpen] = useState(false);
  const [isTextCreatorOpen, setIsTextCreatorOpen] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isThumbstripOpen, setIsThumbstripOpen] = useState(false);
  const [isAddOptionOpen, setIsAddOptionOpen] = useState(false);

  // Editing state for Text Items
  const [editingItem, setEditingItem] = useState<ScrapItem | null>(null);

  // Page Flip State
  const [isFlipping, setIsFlipping] = useState<'forward' | 'backward' | null>(null);

  // Chapter Divider Settings
  const [isChapterModalOpen, setIsChapterModalOpen] = useState(false);
  const [chapterTitleInput, setChapterTitleInput] = useState('');
  const [chapterColorInput, setChapterColorInput] = useState('#E8341A');

  // Load state on mount
  useEffect(() => {
    try {
      const savedState = localStorage.getItem('digital-scrapbook-v1');
      if (savedState) {
        const parsed = JSON.parse(savedState);
        if (parsed.spreads && parsed.spreads.length > 0) {
          setSpreads(parsed.spreads);
          setCurrentSpreadIndex(parsed.currentSpreadIndex ?? 0);
          return;
        }
      }
    } catch (e) {
      console.warn('Could not load scrapbook from local storage', e);
    }
    setSpreads(createDefaultSpreads());
  }, []);

  // Auto-save helper
  const saveToLocalStorage = (currentSpreads = spreads, index = currentSpreadIndex) => {
    if (currentSpreads.length === 0) return;
    try {
      const stateToSave = {
        spreads: currentSpreads,
        currentSpreadIndex: index
      };
      localStorage.setItem('digital-scrapbook-v1', JSON.stringify(stateToSave));
    } catch (e) {
      console.error('LocalStorage write failed:', e);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't flip page if user is editing text in an input or textarea
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') {
        return;
      }
      if (e.key === 'ArrowRight') {
        triggerPageTurn('forward');
      } else if (e.key === 'ArrowLeft') {
        triggerPageTurn('backward');
      } else if (e.key === 'Escape') {
        setSelectedItemId(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [spreads, currentSpreadIndex, isFlipping]);

  // Page Turn Animation Trigger
  const triggerPageTurn = (direction: 'forward' | 'backward') => {
    if (isFlipping) return;

    if (direction === 'forward' && currentSpreadIndex < spreads.length - 1) {
      setSelectedItemId(null);
      setIsFlipping('forward');
      // Sync on navigate
      saveToLocalStorage(spreads, currentSpreadIndex + 1);
      setTimeout(() => {
        setCurrentSpreadIndex(prev => prev + 1);
        setIsFlipping(null);
      }, 600);
    } else if (direction === 'backward' && currentSpreadIndex > 0) {
      setSelectedItemId(null);
      setIsFlipping('backward');
      // Sync on navigate
      saveToLocalStorage(spreads, currentSpreadIndex - 1);
      setTimeout(() => {
        setCurrentSpreadIndex(prev => prev - 1);
        setIsFlipping(null);
      }, 600);
    }
  };

  // Calculate high-water zIndex for layering on page
  const getNextZIndex = (pageSide: 'left' | 'right') => {
    const currentSpread = spreads[currentSpreadIndex];
    if (!currentSpread) return 1;
    const page = pageSide === 'left' ? currentSpread.leftPage : currentSpread.rightPage;
    if (page.items.length === 0) return 1;
    return Math.max(...page.items.map(item => item.zIndex)) + 1;
  };

  // Add Item to active page
  const addItemToPage = (pageSide: 'left' | 'right', newItem: ScrapItem) => {
    const updatedSpreads = spreads.map((spread, index) => {
      if (index !== currentSpreadIndex) return spread;

      const page = pageSide === 'left' ? spread.leftPage : spread.rightPage;
      const updatedPage: PageState = {
        ...page,
        items: [...page.items, newItem]
      };

      return {
        ...spread,
        [pageSide === 'left' ? 'leftPage' : 'rightPage']: updatedPage
      };
    });

    setSpreads(updatedSpreads);
    setSelectedItemId(newItem.id);
    setSelectedItemPage(pageSide);
    saveToLocalStorage(updatedSpreads);
  };

  // Update item dimensions/positions/etc
  const handleUpdateItem = (itemId: string, updates: Partial<ScrapItem>) => {
    const updatedSpreads = spreads.map((spread, index) => {
      if (index !== currentSpreadIndex) return spread;

      const updatePageItems = (page: PageState) => {
        const itemExists = page.items.some(it => it.id === itemId);
        if (!itemExists) return page;

        return {
          ...page,
          items: page.items.map(item => 
            item.id === itemId ? { ...item, ...updates } : item
          )
        };
      };

      return {
        ...spread,
        leftPage: updatePageItems(spread.leftPage),
        rightPage: updatePageItems(spread.rightPage)
      };
    });

    setSpreads(updatedSpreads);
    saveToLocalStorage(updatedSpreads);
  };

  // Delete item
  const handleDeleteItem = (itemId: string) => {
    const updatedSpreads = spreads.map((spread, index) => {
      if (index !== currentSpreadIndex) return spread;

      return {
        ...spread,
        leftPage: {
          ...spread.leftPage,
          items: spread.leftPage.items.filter(item => item.id !== itemId)
        },
        rightPage: {
          ...spread.rightPage,
          items: spread.rightPage.items.filter(item => item.id !== itemId)
        }
      };
    });

    setSpreads(updatedSpreads);
    setSelectedItemId(null);
    saveToLocalStorage(updatedSpreads);
  };

  // Layer order: Bring item to front
  const handleBringToFront = (itemId: string) => {
    const side = selectedItemPage;
    if (!side) return;

    const nextZ = getNextZIndex(side);
    handleUpdateItem(itemId, { zIndex: nextZ });
  };

  // Layer order: Send item to back
  const handleSendToBack = (itemId: string) => {
    const side = selectedItemPage;
    if (!side) return;

    const currentSpread = spreads[currentSpreadIndex];
    const page = side === 'left' ? currentSpread.leftPage : currentSpread.rightPage;
    const minZ = Math.min(...page.items.map(item => item.zIndex), 1);
    
    // Decrement and re-normalize zIndexes so this one goes lowest
    const baseZ = minZ - 1;
    handleUpdateItem(itemId, { zIndex: baseZ });
  };

  // Restyle a ransom word inside a text block on click
  const handleRestyleRansomWord = (itemId: string, wordId: string) => {
    const currentSpread = spreads[currentSpreadIndex];
    if (!currentSpread) return;
    
    // Find item
    const item = [...currentSpread.leftPage.items, ...currentSpread.rightPage.items].find(it => it.id === itemId);
    if (!item || !item.ransomWords) return;

    const fonts = [
      'Anton', 'Righteous', 'Special Elite', 'Permanent Marker', 'Alfa Slab One', 'VT323', 'Bebas Neue', 'Lilita One'
    ];
    const styles = [
      { bg: '#1A1A1A', text: '#F8F6F2' },
      { bg: '#E8341A', text: '#F8F6F2' },
      { bg: '#F5C842', text: '#1A1A1A' },
      { bg: '#F8F6F2', text: '#1A1A1A' },
      { bg: '#3B82B0', text: '#F8F6F2' },
      { bg: '#2D5A27', text: '#F5C842' },
      { bg: '#F2ECD8', text: '#E8341A' },
      { bg: '#1A1A1A', text: '#F5C842' }
    ];

    const updatedWords = item.ransomWords.map(word => {
      if (word.id === wordId) {
        const nextFont = fonts[Math.floor(Math.random() * fonts.length)];
        const nextStyle = styles[Math.floor(Math.random() * styles.length)];
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
    });

    handleUpdateItem(itemId, { ransomWords: updatedWords });
  };

  // Add sticker from panel
  const handleAddSticker = (stickerId: string) => {
    const targetPageSide = selectedItemPage || 'left';
    const template = STICKER_TEMPLATES.find(t => t.id === stickerId);
    if (!template) return;

    const nextZ = getNextZIndex(targetPageSide);
    const stickerWidth = template.defaultWidth;
    const stickerHeight = template.defaultHeight;
    const aspectRatio = stickerWidth / stickerHeight;

    const newItem: ScrapItem = {
      id: Math.random().toString(36).substring(2, 9),
      type: 'sticker',
      stickerId,
      x: 250 - stickerWidth / 2,
      y: 325 - stickerHeight / 2,
      width: stickerWidth,
      height: stickerHeight,
      rotation: Math.floor(Math.random() * 24) - 12,
      zIndex: nextZ,
      aspectRatio
    };

    addItemToPage(targetPageSide, newItem);
    setIsStickerOpen(false);
  };

  // Add tape strip from panel
  const handleAddTape = (tapeId: string) => {
    const targetPageSide = selectedItemPage || 'left';
    const nextZ = getNextZIndex(targetPageSide);

    const newItem: ScrapItem = {
      id: Math.random().toString(36).substring(2, 9),
      type: 'tape',
      tapeId,
      x: 250 - 75,
      y: 325 - 16,
      width: 150,
      height: 32,
      rotation: Math.floor(Math.random() * 20) - 10,
      zIndex: nextZ
    };

    addItemToPage(targetPageSide, newItem);
    setIsTapeOpen(false);
  };

  // Add text block
  const handleAddText = (textVal: string, textMode: 'ransom' | 'handwriting' | 'typewriter', customWords?: RansomWord[]) => {
    const targetPageSide = selectedItemPage || 'left';
    const nextZ = getNextZIndex(targetPageSide);

    const newItem: ScrapItem = {
      id: Math.random().toString(36).substring(2, 9),
      type: 'text',
      text: textVal,
      textMode,
      ransomWords: customWords,
      x: 250 - 140,
      y: 325 - 40,
      width: 280,
      height: textMode === 'ransom' ? 100 : 120,
      rotation: Math.floor(Math.random() * 10) - 5,
      zIndex: nextZ
    };

    addItemToPage(targetPageSide, newItem);
  };

  // Quick gold star scatter button
  const handleScatterStars = () => {
    const targetPageSide = selectedItemPage || 'left';
    const starCount = 3 + Math.floor(Math.random() * 3); // 3 to 5 stars
    
    const updatedSpreads = spreads.map((spread, index) => {
      if (index !== currentSpreadIndex) return spread;

      const page = targetPageSide === 'left' ? spread.leftPage : spread.rightPage;
      let nextZ = getNextZIndex(targetPageSide);
      
      const newStars: ScrapItem[] = Array.from({ length: starCount }).map((_, i) => {
        const starTemplates = ['star-gold-lg', 'star-gold-md', 'star-gold-sm'];
        const starId = starTemplates[Math.floor(Math.random() * starTemplates.length)];
        const size = starId === 'star-gold-lg' ? 45 : starId === 'star-gold-md' ? 35 : 25;
        
        return {
          id: Math.random().toString(36).substring(2, 9),
          type: 'sticker',
          stickerId: starId,
          x: 50 + Math.random() * 350, // distribute on page canvas (50 to 400)
          y: 50 + Math.random() * 500, // distribute vertically (50 to 550)
          width: size,
          height: size,
          rotation: Math.floor(Math.random() * 60) - 30, // rot -30 to +30
          zIndex: nextZ++,
          aspectRatio: 1
        };
      });

      return {
        ...spread,
        [targetPageSide === 'left' ? 'leftPage' : 'rightPage']: {
          ...page,
          items: [...page.items, ...newStars]
        }
      };
    });

    setSpreads(updatedSpreads);
    saveToLocalStorage(updatedSpreads);

    // Cute visual or audio pop feedback
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.14);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      }
    } catch (_) {}
  };

  // Image Upload handler
  const handleImageFile = (file: File, pageSide: 'left' | 'right', dropX?: number, dropY?: number) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      const img = new Image();
      img.onload = () => {
        const aspectRatio = img.width / img.height;
        const defaultWidth = 190;
        const defaultHeight = Math.round(defaultWidth / aspectRatio);
        const nextZ = getNextZIndex(pageSide);

        const newItem: ScrapItem = {
          id: Math.random().toString(36).substring(2, 9),
          type: 'image',
          src,
          aspectRatio,
          isPolaroid: true,
          text: 'Tokyo Memory 📸',
          x: dropX ?? (250 - defaultWidth / 2),
          y: dropY ?? (325 - defaultHeight / 2),
          width: defaultWidth,
          height: defaultHeight,
          rotation: Math.floor(Math.random() * 24) - 12,
          zIndex: nextZ
        };

        addItemToPage(pageSide, newItem);
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  };

  // File picker handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageFile(file, selectedItemPage || 'left');
    }
  };

  // Drag and drop events
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, pageSide: 'left' | 'right') => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    
    if (file && file.type.startsWith('image/')) {
      const pageEl = pageSide === 'left' ? leftPageRef.current : rightPageRef.current;
      if (pageEl) {
        const rect = pageEl.getBoundingClientRect();
        const dropX = e.clientX - rect.left;
        const dropY = e.clientY - rect.top;
        handleImageFile(file, pageSide, dropX, dropY);
      }
    }
  };

  // Chapter Divider creation logic
  const handleAddChapterDivider = () => {
    const newSpread: SpreadState = {
      id: `chapter-${Math.random().toString(36).substring(2, 9)}`,
      isChapterDivider: true,
      chapterTitle: chapterTitleInput.trim() || 'ARRIVAL IN PARADISE',
      chapterColor: chapterColorInput,
      leftPage: { id: `chapter-l-${Math.random()}`, items: [] },
      rightPage: { id: `chapter-r-${Math.random()}`, items: [] }
    };

    const newIndex = currentSpreadIndex + 1;
    const updatedSpreads = [
      ...spreads.slice(0, newIndex),
      newSpread,
      ...spreads.slice(newIndex)
    ];

    setSpreads(updatedSpreads);
    setCurrentSpreadIndex(newIndex);
    setIsChapterModalOpen(false);
    setChapterTitleInput('');
    saveToLocalStorage(updatedSpreads, newIndex);
  };

  // Add blank spread
  const handleAddBlankSpread = () => {
    const newSpread: SpreadState = {
      id: `spread-${Math.random().toString(36).substring(2, 9)}`,
      isChapterDivider: false,
      leftPage: { id: `page-l-${Math.random()}`, items: [] },
      rightPage: { id: `page-r-${Math.random()}`, items: [] }
    };

    const newIndex = currentSpreadIndex + 1;
    const updatedSpreads = [
      ...spreads.slice(0, newIndex),
      newSpread,
      ...spreads.slice(newIndex)
    ];

    setSpreads(updatedSpreads);
    setCurrentSpreadIndex(newIndex);
    saveToLocalStorage(updatedSpreads, newIndex);
  };

  // Delete current spread
  const handleDeleteCurrentSpread = (indexToDelete = currentSpreadIndex) => {
    if (spreads.length <= 1) return;
    const updatedSpreads = spreads.filter((_, idx) => idx !== indexToDelete);
    const nextIndex = Math.max(0, indexToDelete - 1);
    
    setSpreads(updatedSpreads);
    setCurrentSpreadIndex(nextIndex);
    saveToLocalStorage(updatedSpreads, nextIndex);
  };

  // Trigger spreadsheet PNG capture
  const exportSpreadAsPNG = async () => {
    const element = document.getElementById('scrapbook-book');
    if (!element) return;

    // Deselect selected items
    setSelectedItemId(null);
    
    // Tiny delay to ensure outlines are completely gone
    await new Promise(resolve => setTimeout(resolve, 80));

    try {
      const canvas = await html2canvas(element, {
        scale: 2, // 2x resolution
        useCORS: true,
        backgroundColor: '#111111', // laid on dark table
        logging: false
      });

      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');

      const dateStr = new Date().toISOString().split('T')[0];
      const spreadNum = currentSpreadIndex + 1;
      const currentSpread = spreads[currentSpreadIndex];
      const chapterName = currentSpread?.isChapterDivider
        ? currentSpread.chapterTitle?.replace(/\s+/g, '-').toLowerCase()
        : `spread-${spreadNum}`;

      link.download = 'journal-spread.png';
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Export failed:', err);
    }
  };

  const currentSpread = spreads[currentSpreadIndex];

  // Visual stack markers for page indicators
  const totalSpreads = spreads.length;
  const rightPagesRemaining = totalSpreads - currentSpreadIndex - 1;
  const leftPagesPassed = currentSpreadIndex;

  return (
    <div className="h-screen max-h-screen overflow-hidden bg-[#1A1A18] text-white flex flex-col font-sans select-none relative">
      
      {/* HEADER BAR */}
      <header className="px-6 py-2.5 bg-neutral-950/85 backdrop-blur-md border-b border-white/5 flex items-center justify-between select-none shrink-0 z-10">
        {/* LEFT BRANDING */}
        <div className="flex items-center gap-3 shrink-0">
          <BookOpen className="w-5 h-5 text-[#E8341A]" />
          <div>
            <h1 className="font-mono text-sm font-black uppercase tracking-widest text-[#F8F6F2]">
              Digital Scrapbook
            </h1>
            <p className="text-[10px] text-neutral-500 font-mono hidden sm:block">Creative Journal & Collage Space</p>
          </div>
        </div>

        {/* CENTER DAILY PROMPT BAR */}
        <div className="hidden lg:flex items-center justify-center flex-1 max-w-lg mx-6">
          <div className="border border-white/15 rounded-full px-4 py-1.5 flex items-center justify-between gap-3 text-xs w-full bg-transparent">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="bg-[#E8341A] text-white text-[9px] font-black font-mono px-2.5 py-0.5 rounded-full uppercase tracking-wider shrink-0 shadow-xs">
                DAILY PROMPT
              </span>
              <span className="italic text-neutral-200 font-medium truncate text-left text-[11px] sm:text-xs select-text">
                "{currentPrompt}"
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-white/10 font-mono">|</span>
              <button
                onClick={handleShufflePrompt}
                className="text-neutral-400 hover:text-[#E8341A] transition-colors font-mono font-bold text-[10px] cursor-pointer hover:underline uppercase shrink-0"
              >
                Shuffle
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT TOP ACTION BAR */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center bg-black/40 px-3.5 py-1 rounded-full text-xs font-mono border border-white/10 text-neutral-300">
            <span className="text-[#E8341A] font-bold mr-1">{currentSpreadIndex + 1}</span> / {spreads.length} SPREADS
          </div>

          <div className="flex items-center gap-2">
            {/* Quick scatter */}
            <button
              onClick={handleScatterStars}
              className="p-2 bg-black/40 border border-white/10 hover:border-amber-400/50 rounded-lg text-amber-400 hover:text-amber-300 transition-all active:scale-95 flex items-center gap-1 text-xs font-mono cursor-pointer"
              title="Scatter Gold Stars"
            >
              <Star className="w-4 h-4 fill-amber-400" />
              <span className="hidden lg:inline">Scatter Stars</span>
            </button>

            {/* Thumbnail toggle */}
            <button
              onClick={() => {
                setIsThumbstripOpen(!isThumbstripOpen);
                setIsStickerOpen(false);
                setIsTapeOpen(false);
              }}
              className={`p-2 rounded-lg text-xs font-mono flex items-center gap-1.5 cursor-pointer border transition-all ${
                isThumbstripOpen
                  ? 'bg-black/80 text-[#E8341A] border-[#E8341A]/50'
                  : 'bg-black/40 text-neutral-300 border-white/10 hover:border-white/20'
              }`}
            >
              <span>Pages</span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN SCRAPBOOK WORKSPACE */}
      <main className="flex-1 flex items-center justify-center px-12 py-4 md:px-16 relative select-none overflow-hidden bg-[#1A1A18]" style={{ minHeight: 0 }}>
        
        {/* Left Page Page-Turn Button (Sits OUTSIDE the book on the far left edge) */}
        {currentSpreadIndex > 0 && !isFlipping && (
          <button
            onClick={() => triggerPageTurn('backward')}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-11 h-11 bg-[#FBF9F4] text-[#C2513C] hover:text-[#E8341A] rounded-full flex items-center justify-center shadow-2xl border border-neutral-300/30 transition-all z-35 hover:scale-110 active:scale-95 cursor-pointer"
            title="Previous Page (Left Arrow)"
          >
            <ChevronLeft className="w-6 h-6 stroke-[3px]" />
          </button>
        )}

        {/* Right Page Page-Turn Button (Sits OUTSIDE the book on the far right edge) */}
        {currentSpreadIndex < spreads.length - 1 && !isFlipping && (
          <button
            onClick={() => triggerPageTurn('forward')}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-11 h-11 bg-[#FBF9F4] text-[#C2513C] hover:text-[#E8341A] rounded-full flex items-center justify-center shadow-2xl border border-neutral-300/30 transition-all z-35 hover:scale-110 active:scale-95 cursor-pointer"
            title="Next Page (Right Arrow)"
          >
            <ChevronRight className="w-6 h-6 stroke-[3px]" />
          </button>
        )}

        {/* THE WIDE FLAT BOOK SPREAD CONTAINER */}
        <div 
          className="relative w-[96%] max-w-[1240px] h-full max-h-[calc(100vh-220px)] aspect-[1.6] select-none flex items-center justify-center z-10"
          onClick={() => setSelectedItemId(null)}
        >
          {/* THE BOOK PHYSICAL SIDES LAYOUT */}
          {currentSpread && (
            <div 
              id="scrapbook-book"
              className="w-full h-full relative flex z-10"
            >
              
              {/* FLAT CARDBOARD BACKING COVER (sleek board with no rounded book crease/bevels, soft shadows) */}
              <div className="absolute inset-[-8px] rounded-xl bg-[#2E3430] border border-[#1E2220]/40 shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.05)] z-0 pointer-events-none" />

              {/* 1. CHAPTER DIVIDER DISPLAY MODE */}
              {currentSpread.isChapterDivider ? (
                <div 
                  className="w-full h-full rounded-2xl p-8 md:p-16 flex flex-col justify-between relative shadow-2xl overflow-hidden border border-neutral-950/45 select-none animate-[peel-in_0.5s_ease-out] z-10"
                  style={{ backgroundColor: currentSpread.chapterColor || '#E8341A' }}
                >
                  {/* Decorative stamp grid paper backdrop overlay */}
                  <div className="absolute inset-0 grid-paper opacity-5 pointer-events-none" />
                  
                  {/* Mini stamp detail */}
                  <div className="flex justify-between font-mono text-xs uppercase tracking-widest text-white/50 border-b border-white/25 pb-4 select-none">
                    <span>TOKYO ZINE VOLUME. 01</span>
                    <span>SPREAD {currentSpreadIndex + 1}</span>
                  </div>

                  {/* Huge Ransom-Note Style Chapter Title */}
                  <div className="my-auto text-center flex flex-col items-center justify-center gap-4 py-8">
                    <span className="text-xs font-mono uppercase bg-white text-neutral-950 font-bold px-3 py-1 tracking-widest rounded shadow-md select-none animate-pulse">
                      NOW ENTERING CHAPTER
                    </span>
                    <h2 
                      className="font-sans font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-wider uppercase leading-none break-words max-w-2xl text-shadow-lg"
                      style={{ fontFamily: 'Anton, sans-serif' }}
                    >
                      {currentSpread.chapterTitle}
                    </h2>
                  </div>

                  {/* Footer details */}
                  <div className="flex justify-between items-end border-t border-white/25 pt-4">
                    <div className="font-mono text-[10px] text-white/50 flex flex-col uppercase">
                      <span>STAMPS & EPHEMERA INC.</span>
                      <span>LOCAL TIME SEEDED</span>
                    </div>
                    
                    {/* Delete Chapter Spread */}
                    {spreads.length > 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteCurrentSpread();
                        }}
                        className="px-3 py-1.5 bg-black/40 hover:bg-black/60 rounded-lg text-[10px] font-mono uppercase text-red-300 hover:text-red-200 border border-red-500/30 cursor-pointer flex items-center gap-1 transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete Divider
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                /* 2. REGULAR TWO-PAGE SPREAD COLLAGE MODE */
                <>
                  {/* LEFT PAGE CANVASES */}
                  <div 
                    ref={leftPageRef}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, 'left')}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedItemPage('left');
                      setSelectedItemId(null);
                    }}
                    className={`w-1/2 h-full rounded-l-2xl shadow-lg relative overflow-hidden select-none border-r border-neutral-300/70 flex flex-col justify-between p-4 z-10 bg-[#FBF9F4] grid-paper`}
                  >
                    {/* Tiny watermark branding */}
                    <div className="absolute top-3 left-3 select-none flex items-center gap-1 opacity-25">
                      <div className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
                      <span className="text-[8px] font-mono uppercase tracking-wider text-neutral-950">LEFT_VERSO</span>
                    </div>

                    {/* Left Page Items */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      {currentSpread.leftPage.items.map((item) => (
                        <div key={item.id} className="pointer-events-auto">
                          <ScrapbookItem
                            item={item}
                            isSelected={selectedItemId === item.id}
                            onSelect={() => {
                              setSelectedItemId(item.id);
                              setSelectedItemPage('left');
                            }}
                            onUpdate={handleUpdateItem}
                            onDelete={handleDeleteItem}
                            onBringToFront={handleBringToFront}
                            onSendToBack={handleSendToBack}
                            onRestyleRansomWord={handleRestyleRansomWord}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Page Empty Hint */}
                    {currentSpread.leftPage.items.length === 0 && (
                      <div className="m-auto flex flex-col items-center justify-center p-6 text-center select-none opacity-40 pointer-events-none">
                        <span className="text-xl">🎟️</span>
                        <p className="font-caveat text-base text-neutral-800 font-bold mt-1">What happened today?</p>
                        <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mt-0.5">Drop everything in.</p>
                      </div>
                    )}
                  </div>

                  {/* REALISTIC CREASED SPINE GUTTER (No heavy wire/spirals, beautiful parallel shading) */}
                  <SpiralBinding />

                  {/* RIGHT PAGE CANVASES */}
                  <div 
                    ref={rightPageRef}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, 'right')}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedItemPage('right');
                      setSelectedItemId(null);
                    }}
                    className={`w-1/2 h-full rounded-r-2xl shadow-lg relative overflow-hidden select-none flex flex-col justify-between p-4 z-10 bg-[#FBF9F4] grid-paper`}
                  >
                    {/* Tiny watermark branding */}
                    <div className="absolute top-3 right-3 select-none flex items-center gap-1 opacity-25">
                      <span className="text-[8px] font-mono uppercase tracking-wider text-neutral-950">RIGHT_VERSO</span>
                      <div className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
                    </div>

                    {/* Right Page Items */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      {currentSpread.rightPage.items.map((item) => (
                        <div key={item.id} className="pointer-events-auto">
                          <ScrapbookItem
                            item={item}
                            isSelected={selectedItemId === item.id}
                            onSelect={() => {
                              setSelectedItemId(item.id);
                              setSelectedItemPage('right');
                            }}
                            onUpdate={handleUpdateItem}
                            onDelete={handleDeleteItem}
                            onBringToFront={handleBringToFront}
                            onSendToBack={handleSendToBack}
                            onRestyleRansomWord={handleRestyleRansomWord}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Page Empty Hint */}
                    {currentSpread.rightPage.items.length === 0 && (
                      <div className="m-auto flex flex-col items-center justify-center p-6 text-center select-none opacity-40 pointer-events-none">
                        <span className="text-xl">🌸</span>
                        <p className="font-caveat text-base text-neutral-800 font-bold mt-1">Empty grid page</p>
                        <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mt-0.5">Place photo or washi tape.</p>
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* 3. FLIPPING PAGE OVERLAY (CSS 3D ANIMATION - DUAL SIDED WITH CORNER PEELING) */}
              {isFlipping && (
                <>
                  {/* Under-sheet cast shadows */}
                  {isFlipping === 'forward' && (
                    <div className="absolute top-0 bottom-0 left-0 right-0 z-15 pointer-events-none bg-neutral-950/40 rounded-2xl animate-shadow-forward" />
                  )}
                  {isFlipping === 'backward' && (
                    <div className="absolute top-0 bottom-0 left-0 right-0 z-15 pointer-events-none bg-neutral-950/40 rounded-2xl animate-shadow-backward" />
                  )}

                  {/* Flipping double-sided sheet */}
                  <div 
                    className={`absolute top-0 bottom-0 w-1/2 z-40 preserve-3d pointer-events-none ${
                      isFlipping === 'forward' 
                        ? 'left-1/2 origin-left animate-flip-forward' 
                        : 'left-0 origin-right animate-flip-backward'
                    }`}
                    style={{
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    {/* Front side of the flipping page */}
                    <div className="absolute inset-0 bg-[#FBF9F4] shadow-lg rounded-2xl border border-neutral-300/40 backface-hidden flex flex-col justify-between p-4 overflow-hidden">
                      <div className="absolute inset-0 grid-paper opacity-50" />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10 mix-blend-multiply" />
                      {/* Interactive darkening overlay */}
                      <div className="absolute inset-0 bg-neutral-900/40 mix-blend-multiply animate-shading" />
                    </div>
                    
                    {/* Back side of the flipping page (visible after rotating 90deg) */}
                    <div className="absolute inset-0 bg-[#FBF9F4] shadow-lg rounded-2xl border border-neutral-300/40 backface-hidden rotate-y-180 flex flex-col justify-between p-4 overflow-hidden">
                      <div className="absolute inset-0 grid-paper opacity-50" />
                      <div className="absolute inset-0 bg-gradient-to-l from-black/10 via-transparent to-black/10 mix-blend-multiply" />
                      {/* Interactive darkening overlay */}
                      <div className="absolute inset-0 bg-neutral-900/40 mix-blend-multiply animate-shading" />
                    </div>
                  </div>
                </>
              )}

            </div>
          )}
        </div>
      </main>

      {/* FLOAT BAR TOOLBAR */}
      <footer className="py-6 px-4 bg-transparent flex justify-center shrink-0 z-40 select-none">
        
        {/* ADD ACTION PANEL / FLOATING RADIAL */}
        <div className="flex items-center gap-6 px-8 py-3 bg-[#111111]/95 backdrop-blur-md rounded-full border border-white/10 shadow-2xl flex-wrap justify-center max-w-2xl">
          
          {/* Quick-add camera & photo option button */}
          <div className="relative">
            <button
              onClick={() => setIsAddOptionOpen(!isAddOptionOpen)}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div className="w-6 h-6 flex items-center justify-center border-2 border-white/80 rounded-md mb-1.5 group-hover:bg-white group-hover:text-black group-hover:border-white text-white font-bold text-base transition-all duration-200">
                <Plus className="w-3.5 h-3.5" strokeWidth={3} />
              </div>
              <span className="text-[9px] text-neutral-400 uppercase tracking-widest font-mono font-medium">Add Scrap</span>
            </button>
            
            {/* Quick dropdown for upload type */}
            {isAddOptionOpen && (
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-[#141414] border border-white/10 rounded-xl p-1.5 shadow-2xl flex flex-col gap-1 min-w-[160px] z-50">
                <button
                  onClick={() => {
                    setIsCameraOpen(true);
                    setIsAddOptionOpen(false);
                  }}
                  className="flex items-center gap-2 px-3 py-2 text-xs font-mono text-left rounded-lg text-neutral-300 hover:text-white hover:bg-white/5 cursor-pointer"
                >
                  <Camera className="w-4 h-4 text-amber-500" /> Polaroid Snap
                </button>
                <button
                  onClick={() => {
                    fileInputRef.current?.click();
                    setIsAddOptionOpen(false);
                  }}
                  className="flex items-center gap-2 px-3 py-2 text-xs font-mono text-left rounded-lg text-[#E8341A] hover:text-[#ff553a] hover:bg-white/5 cursor-pointer"
                >
                  <ImageIcon className="w-4 h-4 text-[#E8341A]" /> Upload Image
                </button>
                <button
                  onClick={() => {
                    setIsChapterModalOpen(true);
                    setIsAddOptionOpen(false);
                  }}
                  className="flex items-center gap-2 px-3 py-2 text-xs font-mono text-left rounded-lg text-blue-400 hover:text-blue-300 hover:bg-white/5 cursor-pointer border-t border-white/5"
                >
                  <FolderPlus className="w-4 h-4 text-blue-500" /> + Chapter Tab
                </button>
              </div>
            )}
          </div>

          <span className="h-6 w-[1px] bg-white/10 hidden sm:block" />

          {/* Stickers category drawer toggle */}
          <button
            onClick={() => {
              setIsStickerOpen(!isStickerOpen);
              setIsTapeOpen(false);
              setIsThumbstripOpen(false);
            }}
            className={`flex flex-col items-center group cursor-pointer transition-colors ${
              isStickerOpen ? 'text-amber-400' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <div className="w-6 h-6 flex items-center justify-center mb-1.5 text-base group-hover:scale-110 transition-transform">
              🎨
            </div>
            <span className={`text-[9px] uppercase tracking-widest font-mono font-medium ${isStickerOpen ? 'text-amber-400' : 'text-neutral-400'}`}>Stickers</span>
          </button>

          {/* Tape dispenser select toggle */}
          <button
            onClick={() => {
              setIsTapeOpen(!isTapeOpen);
              setIsStickerOpen(false);
              setIsThumbstripOpen(false);
            }}
            className={`flex flex-col items-center group cursor-pointer transition-colors ${
              isTapeOpen ? 'text-teal-400' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <div className="w-6 h-6 flex items-center justify-center mb-1.5 text-base group-hover:scale-110 transition-transform">
              🎗️
            </div>
            <span className={`text-[9px] uppercase tracking-widest font-mono font-medium ${isTapeOpen ? 'text-teal-400' : 'text-neutral-400'}`}>Washi</span>
          </button>

          {/* Text block tool creator toggle */}
          <button
            onClick={() => {
              setEditingItem(null);
              setIsTextCreatorOpen(true);
            }}
            className="flex flex-col items-center group cursor-pointer text-neutral-400 hover:text-white transition-colors"
          >
            <div className="w-6 h-6 flex items-center justify-center mb-1.5 text-base group-hover:scale-110 transition-transform">
              ✂️
            </div>
            <span className="text-[9px] text-neutral-400 uppercase tracking-widest font-mono font-medium">Text</span>
          </button>

          {/* Stars Scatter Shortcut */}
          <button
            onClick={handleScatterStars}
            className="flex flex-col items-center group cursor-pointer text-neutral-400 hover:text-white transition-colors"
          >
            <div className="w-6 h-6 flex items-center justify-center mb-1.5 text-base text-[#F5C842] group-hover:scale-120 transition-transform">
              ★
            </div>
            <span className="text-[9px] text-neutral-400 uppercase tracking-widest font-mono font-medium">Scatter</span>
          </button>

          <span className="h-6 w-[1px] bg-white/10 hidden sm:block" />

          {/* Export button */}
          <button
            onClick={exportSpreadAsPNG}
            className="flex flex-col items-center group cursor-pointer text-neutral-400 hover:text-white transition-colors"
          >
            <div className="w-6 h-6 flex items-center justify-center mb-1.5 text-base group-hover:scale-110 transition-transform">
              💾
            </div>
            <span className="text-[9px] text-neutral-400 uppercase tracking-widest font-mono font-medium">Export</span>
          </button>

        </div>
      </footer>

      {/* MODALS & BOTTOM SHEETS */}
      
      {/* Hidden inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Stickers Slide-up bottom panel */}
      <StickerDrawer
        isOpen={isStickerOpen}
        onClose={() => setIsStickerOpen(false)}
        onAddSticker={handleAddSticker}
      />

      {/* Tape dispenser slide-up bottom panel */}
      <TapeSelector
        isOpen={isTapeOpen}
        onClose={() => setIsTapeOpen(false)}
        onAddTape={handleAddTape}
      />

      {/* Ransom / Handwriting Text block creator modal */}
      <RansomTextCreator
        isOpen={isTextCreatorOpen}
        onClose={() => {
          setIsTextCreatorOpen(false);
          setEditingItem(null);
        }}
        onAddText={handleAddText}
        editingItem={editingItem}
        onUpdateText={handleUpdateItem}
      />

      {/* Polaroid Viewfinder camera snapshot modal */}
      <CameraOverlay
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={(base64Src) => {
          // Drops Polaroid image centered on page
          handleImageFile(
            /* convert base64 to Blob file object */
            new File(
              [
                (() => {
                  const byteString = atob(base64Src.split(',')[1]);
                  const mimeString = base64Src.split(',')[0].split(':')[1].split(';')[0];
                  const ab = new ArrayBuffer(byteString.length);
                  const ia = new Uint8Array(ab);
                  for (let i = 0; i < byteString.length; i++) {
                    ia[i] = byteString.charCodeAt(i);
                  }
                  return new Blob([ab], { type: mimeString });
                })()
              ],
              'polaroid-snap.jpg',
              { type: 'image/jpeg' }
            ),
            selectedItemPage || 'left'
          );
        }}
      />

      {/* Thumbnail spreads strip list slider */}
      <ThumbnailStrip
        isOpen={isThumbstripOpen}
        spreads={spreads}
        currentSpreadIndex={currentSpreadIndex}
        onSelectSpread={(idx) => {
          setCurrentSpreadIndex(idx);
          setSelectedItemId(null);
          saveToLocalStorage(spreads, idx);
        }}
        onAddSpread={handleAddBlankSpread}
        onAddChapter={() => setIsChapterModalOpen(true)}
        onDeleteSpread={handleDeleteCurrentSpread}
        onClose={() => setIsThumbstripOpen(false)}
      />

      {/* Chapter Divider details configuration popup */}
      {isChapterModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-55 animate-fade-in">
          <div className="bg-neutral-900 border border-neutral-800 text-white rounded-2xl max-w-sm w-full p-6 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="font-mono text-xs uppercase tracking-widest text-amber-500 font-bold flex items-center gap-1.5">
                <FolderPlus className="w-4 h-4 text-[#E8341A]" /> Add Chapter Divider
              </h3>
              <button
                onClick={() => setIsChapterModalOpen(false)}
                className="p-1 text-neutral-400 hover:text-white rounded-full hover:bg-neutral-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-mono uppercase text-neutral-400">Chapter Theme / Title</label>
                <input
                  type="text"
                  value={chapterTitleInput}
                  onChange={(e) => setChapterTitleInput(e.target.value)}
                  placeholder="e.g. SHIBUYA NOON, KYOTO GOLD"
                  className="bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs focus:border-amber-400 text-white"
                  maxLength={35}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-mono uppercase text-neutral-400">Divider Background Color</label>
                <div className="flex gap-2.5 mt-1">
                  {[
                    { hex: '#E8341A', label: 'Red' },
                    { hex: '#3B82B0', label: 'Teal' },
                    { hex: '#2D5A27', label: 'Green' },
                    { hex: '#F5C842', label: 'Gold' },
                    { hex: '#1A1A1A', label: 'Ink' }
                  ].map((color) => (
                    <button
                      key={color.hex}
                      type="button"
                      onClick={() => setChapterColorInput(color.hex)}
                      className={`w-7 h-7 rounded-full border-2 transition-all ${
                        chapterColorInput === color.hex 
                          ? 'border-white scale-110 shadow-lg' 
                          : 'border-transparent hover:scale-105'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.label}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-2">
              <button
                type="button"
                onClick={() => setIsChapterModalOpen(false)}
                className="flex-1 py-2 bg-neutral-800 hover:bg-neutral-750 font-mono text-[10px] font-bold rounded-lg uppercase"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddChapterDivider}
                className="flex-1 py-2 bg-[#E8341A] hover:bg-red-600 font-mono text-[10px] font-bold rounded-lg uppercase text-white shadow-lg"
              >
                Insert Divider
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

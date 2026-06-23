export type ScrapItemType = 'image' | 'sticker' | 'tape' | 'text';

export interface RansomWord {
  id: string;
  text: string;
  font: string;
  color: string;
  bg: string;
  rotation: number; // offset rotation for this word
  size: number; // custom font size
}

export interface ScrapItem {
  id: string;
  type: ScrapItemType;
  x: number; // pixel distance from left of page (0 to 500)
  y: number; // pixel distance from top of page (0 to 650)
  width: number;
  height: number;
  rotation: number; // overall item rotation in degrees
  zIndex: number;
  
  // Type-specific properties
  src?: string; // For images
  aspectRatio?: number; // For keeping image proportions
  isPolaroid?: boolean; // For polaroid border styling
  stickerId?: string; // For stickers
  tapeId?: string; // For washi tape
  text?: string; // For simple text or raw string
  textMode?: 'ransom' | 'handwriting' | 'typewriter';
  ransomWords?: RansomWord[]; // For ransom note text
  textColor?: string;
  textBg?: string;
  fontFamily?: string;
}

export interface PageState {
  id: string;
  title?: string;
  items: ScrapItem[];
}

export interface SpreadState {
  id: string;
  leftPage: PageState;
  rightPage: PageState;
  isChapterDivider?: boolean;
  chapterTitle?: string;
  chapterColor?: string; // full-bleed background color for divider pages
}

export interface ScrapbookState {
  spreads: SpreadState[];
  currentSpreadIndex: number;
}

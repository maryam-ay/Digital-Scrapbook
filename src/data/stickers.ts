export interface StickerTemplate {
  id: string;
  name: string;
  category: 'travel' | 'food' | 'cute' | 'text' | 'stars' | 'botanical';
  viewBox: string;
  svgContent: string;
  defaultWidth: number;
  defaultHeight: number;
}

export const STICKER_TEMPLATES: StickerTemplate[] = [
  // --- TRAVEL STAMPS & BADGES ---
  {
    id: 'postage-stamp-fuji',
    name: 'Fuji Postage Stamp',
    category: 'travel',
    viewBox: '0 0 100 100',
    svgContent: `
      <rect x="5" y="5" width="90" height="90" fill="#F2ECD8" stroke="#1A1A1A" stroke-width="3" stroke-dasharray="4,4" />
      <rect x="12" y="12" width="76" height="76" fill="#E8341A" stroke="#1A1A1A" stroke-width="2" />
      <path d="M20 75 L35 50 L48 65 L65 35 L80 75 Z" fill="#F8F6F2" stroke="#1A1A1A" stroke-width="2" />
      <circle cx="65" cy="30" r="10" fill="#F5C842" stroke="#1A1A1A" stroke-width="1.5" />
      <text x="50" y="82" font-family="monospace" font-size="8" font-weight="bold" fill="#F8F6F2" text-anchor="middle">JAPAN NIPPON</text>
    `,
    defaultWidth: 100,
    defaultHeight: 100
  },
  {
    id: 'postage-stamp-tokyo',
    name: 'Tokyo Postmark',
    category: 'travel',
    viewBox: '0 0 100 100',
    svgContent: `
      <circle cx="50" cy="50" r="45" fill="none" stroke="#E8341A" stroke-width="2.5" />
      <circle cx="50" cy="50" r="41" fill="none" stroke="#E8341A" stroke-width="1" stroke-dasharray="3,2" />
      <path d="M15 50 L85 50" stroke="#E8341A" stroke-width="2" />
      <path d="M20 40 L80 40" stroke="#E8341A" stroke-width="1" />
      <path d="M20 60 L80 60" stroke="#E8341A" stroke-width="1" />
      <text x="50" y="32" font-family="monospace" font-size="9" font-weight="bold" fill="#E8341A" text-anchor="middle" letter-spacing="2">TOKYO</text>
      <text x="50" y="48" font-family="monospace" font-size="7" font-weight="bold" fill="#E8341A" text-anchor="middle">23.JUN.26</text>
      <text x="50" y="73" font-family="monospace" font-size="8" fill="#E8341A" text-anchor="middle">NRT DEPARTED</text>
    `,
    defaultWidth: 90,
    defaultHeight: 90
  },
  {
    id: 'passport-entry',
    name: 'Narita Entry Permit',
    category: 'travel',
    viewBox: '0 0 120 80',
    svgContent: `
      <rect x="5" y="5" width="110" height="70" rx="10" fill="#F8F6F2" stroke="#3B82B0" stroke-width="3" />
      <text x="60" y="24" font-family="sans-serif" font-size="9" font-weight="900" fill="#3B82B0" text-anchor="middle" letter-spacing="1">LANDING PERMISSION</text>
      <line x1="15" y1="30" x2="105" y2="30" stroke="#3B82B0" stroke-width="1" />
      <text x="20" y="45" font-family="monospace" font-size="8" fill="#1A1A1A">DATE: 23-06-2026</text>
      <text x="20" y="58" font-family="monospace" font-size="8" fill="#1A1A1A">PORT: NARITA (NRT)</text>
      <text x="20" y="69" font-family="monospace" font-size="7" font-weight="bold" fill="#3B82B0">STATUS: 90 DAYS / SHORT-TERM</text>
      <rect x="85" y="40" width="20" height="20" fill="none" stroke="#E8341A" stroke-width="1.5" transform="rotate(15 95 50)" />
      <text x="95" y="53" font-family="sans-serif" font-size="10" font-weight="bold" fill="#E8341A" text-anchor="middle" transform="rotate(15 95 50)">入国</text>
    `,
    defaultWidth: 120,
    defaultHeight: 80
  },
  {
    id: 'airplane-badge',
    name: 'Retro Airline Seal',
    category: 'travel',
    viewBox: '0 0 100 100',
    svgContent: `
      <polygon points="50,5 95,30 95,80 50,98 5,80 5,30" fill="#3B82B0" stroke="#1A1A1A" stroke-width="3" />
      <polygon points="50,11 88,33 88,76 50,91 12,76 12,33" fill="#F8F6F2" stroke="#1A1A1A" stroke-width="1.5" />
      <path d="M25,55 C35,35 65,35 75,55" fill="none" stroke="#1A1A1A" stroke-width="2" />
      <path d="M30,50 L42,47 L50,30 L58,47 L70,50 L58,54 L50,75 L42,54 Z" fill="#E8341A" stroke="#1A1A1A" stroke-width="1.5" />
      <text x="50" y="85" font-family="monospace" font-size="8" font-weight="black" fill="#3B82B0" text-anchor="middle">PAN-ASIA</text>
    `,
    defaultWidth: 90,
    defaultHeight: 90
  },

  // --- FOOD LABELS ---
  {
    id: 'cherry-sticker',
    name: 'Sweet Cherry Seal',
    category: 'food',
    viewBox: '0 0 100 100',
    svgContent: `
      <circle cx="50" cy="50" r="45" fill="#2D5A27" stroke="#1A1A1A" stroke-width="2" />
      <circle cx="50" cy="50" r="41" fill="#F5C842" />
      <path d="M40,65 C35,65 30,60 30,52 C30,44 40,44 40,52 Z" fill="#E8341A" stroke="#1A1A1A" stroke-width="2" />
      <path d="M60,65 C55,65 50,60 50,52 C50,44 60,44 60,52 Z" fill="#E8341A" stroke="#1A1A1A" stroke-width="2" />
      <path d="M40,48 C42,32 50,28 50,28 C50,28 56,35 60,48" fill="none" stroke="#2D5A27" stroke-width="3.5" stroke-linecap="round" />
      <path d="M47,28 C52,22 62,25 62,25" fill="none" stroke="#2D5A27" stroke-width="2.5" />
      <text x="50" y="82" font-family="sans-serif" font-weight="900" font-size="8" fill="#2D5A27" text-anchor="middle">SUPER SWEET</text>
      <text x="50" y="16" font-family="sans-serif" font-weight="900" font-size="7" fill="#E8341A" text-anchor="middle">SELECT FRUIT</text>
    `,
    defaultWidth: 85,
    defaultHeight: 85
  },
  {
    id: 'banana-sticker',
    name: 'Chiquita Style Banana',
    category: 'food',
    viewBox: '0 0 100 70',
    svgContent: `
      <ellipse cx="50" cy="35" rx="45" ry="30" fill="#3B82B0" stroke="#1A1A1A" stroke-width="2" />
      <ellipse cx="50" cy="35" rx="41" ry="26" fill="#F5C842" />
      <path d="M25,28 Q50,48 75,28" fill="none" stroke="#1A1A1A" stroke-width="4" stroke-linecap="round" />
      <path d="M25,28 Q50,48 75,28" fill="none" stroke="#2D5A27" stroke-width="2" stroke-linecap="round" />
      <text x="50" y="20" font-family="sans-serif" font-weight="bold" font-size="8" fill="#E8341A" text-anchor="middle">PREMIUM BUNCH</text>
      <text x="50" y="58" font-family="sans-serif" font-weight="bold" font-size="9" fill="#1A1A1A" text-anchor="middle">TOKYO BANANA</text>
    `,
    defaultWidth: 100,
    defaultHeight: 70
  },
  {
    id: 'peach-sticker',
    name: 'Vintage Peachy',
    category: 'food',
    viewBox: '0 0 100 100',
    svgContent: `
      <path d="M50,10 C25,10 10,25 10,50 C10,75 25,90 50,90 C75,90 90,75 90,50 C90,25 75,10 50,10 Z" fill="#F2ECD8" stroke="#1A1A1A" stroke-width="2" />
      <path d="M50,85 C32,85 18,72 18,50 C18,28 32,15 50,15 C68,15 82,28 82,50 C82,72 68,85 50,85 Z" fill="#F5C842" opacity="0.3" />
      <circle cx="50" cy="50" r="30" fill="#E8341A" opacity="0.8" />
      <circle cx="45" cy="45" r="28" fill="#F5C842" opacity="0.9" />
      <text x="50" y="48" font-family="sans-serif" font-weight="900" font-size="11" fill="#1A1A1A" text-anchor="middle" letter-spacing="1">PEACHY</text>
      <text x="50" y="60" font-family="monospace" font-size="6" font-weight="bold" fill="#2D5A27" text-anchor="middle">FINEST SPECIMEN</text>
      <rect x="25" y="65" width="50" height="12" fill="#1A1A1A" rx="4" />
      <text x="50" y="74" font-family="sans-serif" font-size="7" font-weight="bold" fill="#F8F6F2" text-anchor="middle">YAMANASHI</text>
    `,
    defaultWidth: 90,
    defaultHeight: 90
  },

  // --- CUTE CHARACTERS ---
  {
    id: 'lucky-cat',
    name: 'Maneki Neko',
    category: 'cute',
    viewBox: '0 0 100 100',
    svgContent: `
      <rect width="100" height="100" rx="20" fill="#F2ECD8" stroke="#1A1A1A" stroke-width="3" />
      <!-- Cat body -->
      <path d="M25,85 C25,45 75,45 75,85 Z" fill="#F8F6F2" stroke="#1A1A1A" stroke-width="2" />
      <!-- Ears -->
      <polygon points="28,50 18,28 40,38" fill="#F8F6F2" stroke="#1A1A1A" stroke-width="2" />
      <polygon points="28,50 18,28 40,38" fill="#E8341A" scale="0.6" transform="translate(4, 5)" />
      <polygon points="72,50 82,28 60,38" fill="#F8F6F2" stroke="#1A1A1A" stroke-width="2" />
      <polygon points="72,50 82,28 60,38" fill="#E8341A" scale="0.6" transform="translate(-4, 5)" />
      <!-- Eyes -->
      <circle cx="38" cy="52" r="3" fill="#1A1A1A" />
      <circle cx="62" cy="52" r="3" fill="#1A1A1A" />
      <!-- Whiskers -->
      <line x1="18" y1="56" x2="28" y2="58" stroke="#1A1A1A" stroke-width="1.5" />
      <line x1="18" y1="62" x2="28" y2="62" stroke="#1A1A1A" stroke-width="1.5" />
      <line x1="82" y1="56" x2="72" y2="58" stroke="#1A1A1A" stroke-width="1.5" />
      <line x1="82" y1="62" x2="72" y2="62" stroke="#1A1A1A" stroke-width="1.5" />
      <!-- Left Paw up (beckoning) -->
      <path d="M26,62 C22,62 18,52 24,48 C30,44 32,54 28,60" fill="#F8F6F2" stroke="#1A1A1A" stroke-width="2" />
      <!-- Bib -->
      <path d="M38,72 Q50,82 62,72" fill="none" stroke="#E8341A" stroke-width="4" stroke-linecap="round" />
      <circle cx="50" cy="78" r="5" fill="#F5C842" stroke="#1A1A1A" stroke-width="1.5" />
      <!-- Text -->
      <text x="50" y="24" font-family="sans-serif" font-weight="900" font-size="8" fill="#E8341A" text-anchor="middle" letter-spacing="1">千客万来</text>
    `,
    defaultWidth: 90,
    defaultHeight: 90
  },
  {
    id: 'sushi-cute',
    name: 'Happy Onigiri',
    category: 'cute',
    viewBox: '0 0 100 100',
    svgContent: `
      <!-- Outer Die Cut -->
      <path d="M50,12 L88,72 C92,79 87,88 78,88 L22,88 C13,88 8,79 12,72 Z" fill="#F8F6F2" stroke="#1A1A1A" stroke-width="4" />
      <!-- Rice body -->
      <path d="M50,15 L85,73 C88,78 84,85 78,85 L22,85 C16,85 12,78 15,73 Z" fill="#F8F6F2" />
      <!-- Nori wrap -->
      <rect x="38" y="65" width="24" height="20" fill="#1A1A1A" rx="2" />
      <!-- Blushing Cheeks -->
      <ellipse cx="32" cy="62" rx="4" ry="2" fill="#E8341A" opacity="0.6" />
      <ellipse cx="68" cy="62" rx="4" ry="2" fill="#E8341A" opacity="0.6" />
      <!-- Eyes -->
      <path d="M32,54 Q36,50 40,54" fill="none" stroke="#1A1A1A" stroke-width="2.5" stroke-linecap="round" />
      <path d="M60,54 Q64,50 68,54" fill="none" stroke="#1A1A1A" stroke-width="2.5" stroke-linecap="round" />
      <!-- Smiling mouth -->
      <path d="M47,60 Q50,64 53,60" fill="none" stroke="#1A1A1A" stroke-width="2" stroke-linecap="round" />
    `,
    defaultWidth: 80,
    defaultHeight: 80
  },
  {
    id: 'kawaii-strawberry',
    name: 'Strawberry Chan',
    category: 'cute',
    viewBox: '0 0 100 100',
    svgContent: `
      <!-- White background backing for sticker look -->
      <path d="M50,10 C25,10 20,40 20,60 C20,82 35,92 50,92 C65,92 80,82 80,60 C80,40 75,10 50,10 Z" fill="#F8F6F2" stroke="#1A1A1A" stroke-width="3.5" />
      <!-- Strawberry body -->
      <path d="M50,15 C28,15 24,42 24,60 C24,78 36,88 50,88 C64,88 76,78 76,60 C76,42 72,15 50,15 Z" fill="#E8341A" />
      <!-- Leaves -->
      <path d="M50,22 L40,12 L50,16 L60,12 Z" fill="#2D5A27" stroke="#1A1A1A" stroke-width="1.5" />
      <path d="M50,22 L30,16 L42,20 L50,16 L58,20 L70,16 Z" fill="#2D5A27" stroke="#1A1A1A" stroke-width="1.5" />
      <!-- Eyes -->
      <circle cx="38" cy="52" r="3" fill="#F8F6F2" />
      <circle cx="38" cy="52" r="1.5" fill="#1A1A1A" />
      <circle cx="62" cy="52" r="3" fill="#F8F6F2" />
      <circle cx="62" cy="52" r="1.5" fill="#1A1A1A" />
      <!-- Blushes -->
      <ellipse cx="32" cy="58" rx="3" ry="1.5" fill="#F5C842" />
      <ellipse cx="68" cy="58" rx="3" ry="1.5" fill="#F5C842" />
      <!-- Seeds -->
      <circle cx="34" cy="38" r="1" fill="#F5C842" />
      <circle cx="66" cy="38" r="1" fill="#F5C842" />
      <circle cx="50" cy="45" r="1" fill="#F5C842" />
      <circle cx="32" cy="70" r="1" fill="#F5C842" />
      <circle cx="68" cy="70" r="1" fill="#F5C842" />
      <circle cx="50" cy="68" r="1" fill="#F5C842" />
      <!-- Mouth -->
      <path d="M48,56 Q50,59 52,56" fill="none" stroke="#F8F6F2" stroke-width="1.5" stroke-linecap="round" />
    `,
    defaultWidth: 80,
    defaultHeight: 80
  },

  // --- TEXT STICKERS ---
  {
    id: 'stamp-have-nice',
    name: 'Nice Forever Sticker',
    category: 'text',
    viewBox: '0 0 150 45',
    svgContent: `
      <rect x="2" y="2" width="146" height="41" rx="8" fill="#1A1A1A" stroke="#F8F6F2" stroke-width="1.5" />
      <rect x="5" y="5" width="140" height="35" rx="5" fill="none" stroke="#F5C842" stroke-width="1.5" />
      <text x="75" y="27" font-family="sans-serif" font-weight="900" font-size="11" fill="#F8F6F2" text-anchor="middle" letter-spacing="1.5">HAVE A NICE FOREVER</text>
    `,
    defaultWidth: 150,
    defaultHeight: 45
  },
  {
    id: 'stamp-good-luck',
    name: 'Good Luck Charm',
    category: 'text',
    viewBox: '0 0 130 50',
    svgContent: `
      <polygon points="5,25 20,5 110,5 125,25 110,45 20,45" fill="#F5C842" stroke="#1A1A1A" stroke-width="2.5" />
      <polygon points="9,25 22,8 108,8 121,25 108,42 22,42" fill="#F8F6F2" />
      <text x="65" y="30" font-family="sans-serif" font-weight="900" font-size="9" fill="#E8341A" text-anchor="middle" letter-spacing="1">★ GOOD LUCK CHARM ★</text>
    `,
    defaultWidth: 130,
    defaultHeight: 50
  },
  {
    id: 'label-arrivals',
    name: 'Arrivals Terminal Block',
    category: 'text',
    viewBox: '0 0 120 40',
    svgContent: `
      <rect x="2" y="2" width="116" height="36" fill="#E8341A" stroke="#1A1A1A" stroke-width="2" />
      <rect x="6" y="6" width="108" height="28" fill="none" stroke="#F8F6F2" stroke-width="1" />
      <text x="60" y="25" font-family="sans-serif" font-weight="900" font-size="11" fill="#F8F6F2" text-anchor="middle" letter-spacing="3">ARRIVALS</text>
    `,
    defaultWidth: 120,
    defaultHeight: 40
  },
  {
    id: 'label-premium',
    name: 'Premium quality Starburst',
    category: 'text',
    viewBox: '0 0 90 90',
    svgContent: `
      <path d="M45,2 L53,15 L67,11 L71,25 L84,26 L82,40 L91,49 L84,59 L87,73 L74,77 L72,91 L58,89 L50,98 L42,89 L28,91 L26,77 L13,73 L16,59 L9,49 L18,40 L16,26 L29,25 L33,11 L47,15 Z" fill="#F5C842" stroke="#1A1A1A" stroke-width="2" />
      <circle cx="45" cy="45" r="28" fill="#F8F6F2" stroke="#1A1A1A" stroke-width="1.5" />
      <text x="45" y="42" font-family="sans-serif" font-weight="900" font-size="7" fill="#1A1A1A" text-anchor="middle">PREMIUM</text>
      <text x="45" y="52" font-family="sans-serif" font-weight="900" font-size="7" fill="#E8341A" text-anchor="middle">TOKYO</text>
      <text x="45" y="60" font-family="sans-serif" font-weight="900" font-size="6" fill="#1A1A1A" text-anchor="middle">EDIT.</text>
    `,
    defaultWidth: 90,
    defaultHeight: 90
  },
  {
    id: 'label-valid',
    name: 'Valid ticket seal',
    category: 'text',
    viewBox: '0 0 110 60',
    svgContent: `
      <rect x="3" y="3" width="104" height="54" fill="#F2ECD8" stroke="#1A1A1A" stroke-width="2" />
      <line x1="3" y1="20" x2="107" y2="20" stroke="#1A1A1A" stroke-width="1.5" stroke-dasharray="2,2" />
      <text x="55" y="15" font-family="monospace" font-size="7" font-weight="bold" fill="#3B82B0" text-anchor="middle">VALID ADMIT ONE</text>
      <text x="55" y="38" font-family="sans-serif" font-weight="900" font-size="11" fill="#1A1A1A" text-anchor="middle" letter-spacing="1">NO. 849204</text>
      <text x="55" y="50" font-family="monospace" font-size="7" fill="#E8341A" text-anchor="middle">UNLIMITED PASS</text>
    `,
    defaultWidth: 110,
    defaultHeight: 60
  },

  // --- STARS & CONFETTI ---
  {
    id: 'star-gold-lg',
    name: 'Big Gold Star',
    category: 'stars',
    viewBox: '0 0 50 50',
    svgContent: `
      <polygon points="25,2 32,16 47,18 36,29 39,44 25,37 11,44 14,29 3,18 18,16" fill="#F5C842" stroke="#1A1A1A" stroke-width="2" />
      <polygon points="25,8 30,18 41,19 33,27 35,38 25,33 15,38 17,27 9,19 20,18" fill="#F8F6F2" opacity="0.4" />
    `,
    defaultWidth: 50,
    defaultHeight: 50
  },
  {
    id: 'star-gold-md',
    name: 'Medium Gold Star',
    category: 'stars',
    viewBox: '0 0 40 40',
    svgContent: `
      <polygon points="20,2 25,13 37,15 28,24 30,36 20,30 10,36 12,24 3,15 15,13" fill="#F5C842" stroke="#1A1A1A" stroke-width="1.5" />
    `,
    defaultWidth: 40,
    defaultHeight: 40
  },
  {
    id: 'star-gold-sm',
    name: 'Small Gold Star',
    category: 'stars',
    viewBox: '0 0 30 30',
    svgContent: `
      <polygon points="15,1 19,10 29,11 22,18 24,28 15,23 6,28 8,18 1,11 11,10" fill="#F5C842" stroke="#1A1A1A" stroke-width="1.2" />
    `,
    defaultWidth: 30,
    defaultHeight: 30
  },

  // --- BOTANICAL & DECORATIVE ---
  {
    id: 'flower-pressed-1',
    name: 'Pressed Daisy',
    category: 'botanical',
    viewBox: '0 0 80 80',
    svgContent: `
      <circle cx="40" cy="40" r="10" fill="#F5C842" stroke="#1A1A1A" stroke-width="1.5" />
      <!-- Petals -->
      <ellipse cx="40" cy="18" rx="7" ry="14" fill="#F8F6F2" stroke="#1A1A1A" stroke-width="1.5" />
      <ellipse cx="40" cy="62" rx="7" ry="14" fill="#F8F6F2" stroke="#1A1A1A" stroke-width="1.5" />
      <ellipse cx="18" cy="40" rx="14" ry="7" fill="#F8F6F2" stroke="#1A1A1A" stroke-width="1.5" />
      <ellipse cx="62" cy="40" rx="14" ry="7" fill="#F8F6F2" stroke="#1A1A1A" stroke-width="1.5" />
      <!-- Diagonal Petals -->
      <g transform="rotate(45 40 40)">
        <ellipse cx="40" cy="18" rx="6" ry="14" fill="#F2ECD8" stroke="#1A1A1A" stroke-width="1.5" />
        <ellipse cx="40" cy="62" rx="6" ry="14" fill="#F2ECD8" stroke="#1A1A1A" stroke-width="1.5" />
        <ellipse cx="18" cy="40" rx="14" ry="6" fill="#F2ECD8" stroke="#1A1A1A" stroke-width="1.5" />
        <ellipse cx="62" cy="40" rx="14" ry="6" fill="#F2ECD8" stroke="#1A1A1A" stroke-width="1.5" />
      </g>
      <circle cx="40" cy="40" r="7" fill="#1A1A1A" opacity="0.1" />
    `,
    defaultWidth: 80,
    defaultHeight: 80
  },
  {
    id: 'leaf-sketch-1',
    name: 'Leaf Branch Sketch',
    category: 'botanical',
    viewBox: '0 0 70 90',
    svgContent: `
      <!-- Stem -->
      <path d="M35,80 Q35,40 50,15" fill="none" stroke="#1A1A1A" stroke-width="2.5" stroke-linecap="round" />
      <!-- Leaves -->
      <path d="M42,55 Q55,50 50,40 Q38,45 42,55" fill="#2D5A27" stroke="#1A1A1A" stroke-width="1.5" />
      <path d="M36,65 Q20,60 25,50 Q35,55 36,65" fill="#2D5A27" stroke="#1A1A1A" stroke-width="1.5" />
      <path d="M46,35 Q60,30 54,20 Q42,25 46,35" fill="#2D5A27" stroke="#1A1A1A" stroke-width="1.5" />
      <path d="M38,45 Q22,40 28,30 Q38,35 38,45" fill="#2D5A27" stroke="#1A1A1A" stroke-width="1.5" />
      <path d="M48,18 Q55,10 48,5 Q40,10 48,18" fill="#2D5A27" stroke="#1A1A1A" stroke-width="1.5" />
    `,
    defaultWidth: 70,
    defaultHeight: 90
  },
  {
    id: 'bow-gingham',
    name: 'Red Gingham Ribbon',
    category: 'botanical',
    viewBox: '0 0 100 80',
    svgContent: `
      <!-- Bow loops -->
      <path d="M50,35 C30,10 10,25 22,42 C30,50 45,40 50,35 Z" fill="#E8341A" stroke="#1A1A1A" stroke-width="2" />
      <path d="M50,35 C70,10 90,25 78,42 C70,50 55,40 50,35 Z" fill="#E8341A" stroke="#1A1A1A" stroke-width="2" />
      <!-- Ribbons tails -->
      <path d="M45,40 L25,75 L38,72 L48,45 Z" fill="#E8341A" stroke="#1A1A1A" stroke-width="2" />
      <path d="M55,40 L75,75 L62,72 L52,45 Z" fill="#E8341A" stroke="#1A1A1A" stroke-width="2" />
      <!-- Center knot -->
      <rect x="44" y="31" width="12" height="10" rx="3" fill="#F5C842" stroke="#1A1A1A" stroke-width="2" />
      <!-- White stripe overlay to mimic gingham look -->
      <path d="M15,25 Q30,40 50,35" fill="none" stroke="#F8F6F2" stroke-width="2" stroke-dasharray="3,3" />
      <path d="M85,25 Q70,40 50,35" fill="none" stroke="#F8F6F2" stroke-width="2" stroke-dasharray="3,3" />
    `,
    defaultWidth: 90,
    defaultHeight: 70
  }
];

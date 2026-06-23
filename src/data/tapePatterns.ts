import React from 'react';

export interface TapePattern {
  id: string;
  name: string;
  className: string; // Tailwind + inline style combinations
  style: React.CSSProperties;
}

export const TAPE_PATTERNS: TapePattern[] = [
  {
    id: 'gingham-red',
    name: 'Red Gingham',
    className: 'border-l border-r border-red-800/10 shadow-sm',
    style: {
      backgroundColor: '#ffb3b3',
      backgroundImage: `
        linear-gradient(90deg, rgba(232, 52, 26, 0.25) 50%, transparent 50%),
        linear-gradient(rgba(232, 52, 26, 0.25) 50%, transparent 50%)
      `,
      backgroundSize: '12px 12px',
      opacity: 0.8
    }
  },
  {
    id: 'gingham-blue',
    name: 'Blue Gingham',
    className: 'border-l border-r border-blue-800/10 shadow-sm',
    style: {
      backgroundColor: '#b3d1ff',
      backgroundImage: `
        linear-gradient(90deg, rgba(59, 130, 176, 0.25) 50%, transparent 50%),
        linear-gradient(rgba(59, 130, 176, 0.25) 50%, transparent 50%)
      `,
      backgroundSize: '12px 12px',
      opacity: 0.8
    }
  },
  {
    id: 'gingham-pink',
    name: 'Pink Gingham',
    className: 'border-l border-r border-pink-800/10 shadow-sm',
    style: {
      backgroundColor: '#ffd1e8',
      backgroundImage: `
        linear-gradient(90deg, rgba(236, 72, 153, 0.2) 50%, transparent 50%),
        linear-gradient(rgba(236, 72, 153, 0.2) 50%, transparent 50%)
      `,
      backgroundSize: '12px 12px',
      opacity: 0.8
    }
  },
  {
    id: 'dot-dark',
    name: 'Ink Dot',
    className: 'border-l border-r border-neutral-900/10 shadow-sm',
    style: {
      backgroundColor: '#1a1a1a',
      backgroundImage: `
        radial-gradient(circle, #f8f6f2 15%, transparent 15%),
        radial-gradient(circle, #f8f6f2 15%, transparent 15%)
      `,
      backgroundSize: '10px 10px',
      backgroundPosition: '0 0, 5px 5px',
      opacity: 0.75
    }
  },
  {
    id: 'dot-light',
    name: 'Cream Dot',
    className: 'border-l border-r border-neutral-300/10 shadow-sm',
    style: {
      backgroundColor: '#f2ecd8',
      backgroundImage: `
        radial-gradient(circle, #1a1a1a 15%, transparent 15%),
        radial-gradient(circle, #1a1a1a 15%, transparent 15%)
      `,
      backgroundSize: '10px 10px',
      backgroundPosition: '0 0, 5px 5px',
      opacity: 0.85
    }
  },
  {
    id: 'stripe-diagonal',
    name: 'Diagonal Stripe',
    className: 'border-l border-r border-neutral-800/10 shadow-sm',
    style: {
      backgroundColor: '#f5c842',
      backgroundImage: `
        linear-gradient(45deg, #1a1a1a 25%, transparent 25%, transparent 50%, #1a1a1a 50%, #1a1a1a 75%, transparent 75%, transparent)
      `,
      backgroundSize: '14px 14px',
      opacity: 0.75
    }
  },
  {
    id: 'solid-teal',
    name: 'Matte Teal',
    className: 'border-l border-r border-teal-800/10 shadow-sm',
    style: {
      backgroundColor: '#3b82b0',
      opacity: 0.7
    }
  },
  {
    id: 'solid-coral',
    name: 'Matte Coral',
    className: 'border-l border-r border-red-800/10 shadow-sm',
    style: {
      backgroundColor: '#e8341a',
      opacity: 0.7
    }
  },
  {
    id: 'floral-sketch',
    name: 'Floral sketch',
    className: 'border-l border-r border-green-800/10 shadow-sm',
    style: {
      backgroundColor: '#f8f6f2',
      backgroundImage: `
        radial-gradient(circle at 20% 30%, #2d5a27 10%, transparent 10%),
        radial-gradient(circle at 80% 70%, #2d5a27 10%, transparent 10%),
        linear-gradient(45deg, #2d5a27 5%, transparent 5%)
      `,
      backgroundSize: '15px 15px',
      opacity: 0.8
    }
  }
];

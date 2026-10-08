import React from 'react';

interface TruckArtBorderProps {
  className?: string;
  height?: number;
}

export const TruckArtBorder: React.FC<TruckArtBorderProps> = ({ className = '', height = 18 }) => {
  return (
    <div 
      className={`w-full overflow-hidden select-none relative z-10 ${className}`}
      style={{ height: `${height}px`, backgroundColor: '#1B3A6B' }}
      aria-hidden="true"
    >
      <svg 
        className="w-full h-full"
        viewBox="0 0 400 18" 
        preserveAspectRatio="none"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="truck-art-pattern" width="80" height="18" patternUnits="userSpaceOnUse">
            {/* Background strip */}
            <rect width="80" height="18" fill="#1B3A6B" />

            {/* Top Chevron line */}
            <path d="M0 2 L20 6 L40 2 L60 6 L80 2" stroke="#F5C400" strokeWidth="1.5" fill="none" />

            {/* Central Stylized Lotus Petals */}
            <path d="M20 9 C15 5 12 12 20 14 C28 12 25 5 20 9 Z" fill="#F4741F" />
            <circle cx="20" cy="10.5" r="2" fill="#F5C400" />
            
            <path d="M60 9 C55 5 52 12 60 14 C68 12 65 5 60 9 Z" fill="#F4741F" />
            <circle cx="60" cy="10.5" r="2" fill="#F5C400" />

            {/* Chevrons and accent diamonds */}
            <polygon points="40,5 44,9 40,13 36,9" fill="#F5C400" />
            <polygon points="0,5 4,9 0,13" fill="#F4741F" />
            <polygon points="80,5 80,13 76,9" fill="#F4741F" />

            {/* Bottom road trim line */}
            <line x1="0" y1="16.5" x2="80" y2="16.5" stroke="#F4741F" strokeWidth="1.5" />
          </pattern>
        </defs>
        <rect width="100%" height="18" fill="url(#truck-art-pattern)" />
      </svg>
    </div>
  );
};

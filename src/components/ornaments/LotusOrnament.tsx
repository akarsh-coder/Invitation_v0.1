import React from 'react';

interface LotusOrnamentProps {
  className?: string;
  size?: number;
}

export const LotusOrnament: React.FC<LotusOrnamentProps> = ({ className = '', size = 64 }) => {
  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size * 0.75}
        viewBox="0 0 100 75"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="filter drop-shadow-sm"
      >
        <defs>
          <linearGradient id="lotusCenter" x1="0.5" y1="1" x2="0.5" y2="0">
            <stop offset="0%" stopColor="#C2185B" />
            <stop offset="50%" stopColor="#E91E63" />
            <stop offset="90%" stopColor="#F8BBD0" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>
          <linearGradient id="lotusSide" x1="0.5" y1="1" x2="0.5" y2="0">
            <stop offset="0%" stopColor="#AD1457" />
            <stop offset="60%" stopColor="#D81B60" />
            <stop offset="100%" stopColor="#F48FB1" />
          </linearGradient>
          <linearGradient id="lotusGoldCore" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFE082" />
            <stop offset="100%" stopColor="#FFA000" />
          </linearGradient>
        </defs>

        {/* Outer side petals */}
        <path
          d="M50 62 C22 62 10 46 8 32 C18 36 32 44 50 62 Z"
          fill="url(#lotusSide)"
          stroke="#880E4F"
          strokeWidth="0.8"
        />
        <path
          d="M50 62 C78 62 90 46 92 32 C82 36 68 44 50 62 Z"
          fill="url(#lotusSide)"
          stroke="#880E4F"
          strokeWidth="0.8"
        />

        {/* Mid petals */}
        <path
          d="M50 62 C26 55 18 30 22 18 C32 28 42 42 50 62 Z"
          fill="url(#lotusCenter)"
          stroke="#880E4F"
          strokeWidth="0.8"
        />
        <path
          d="M50 62 C74 55 82 30 78 18 C68 28 58 42 50 62 Z"
          fill="url(#lotusCenter)"
          stroke="#880E4F"
          strokeWidth="0.8"
        />

        {/* Inner petals */}
        <path
          d="M50 62 C36 48 34 20 40 8 C46 22 48 44 50 62 Z"
          fill="url(#lotusSide)"
          stroke="#880E4F"
          strokeWidth="0.8"
        />
        <path
          d="M50 62 C64 48 66 20 60 8 C54 22 52 44 50 62 Z"
          fill="url(#lotusSide)"
          stroke="#880E4F"
          strokeWidth="0.8"
        />

        {/* Center core upright petal */}
        <path
          d="M50 62 C43 45 42 16 50 2 C58 16 57 45 50 62 Z"
          fill="url(#lotusCenter)"
          stroke="#880E4F"
          strokeWidth="0.9"
        />

        {/* Golden seed pod / pericarp at base */}
        <ellipse cx="50" cy="56" rx="8" ry="3.5" fill="url(#lotusGoldCore)" stroke="#C59B27" strokeWidth="0.6" />
        <circle cx="47" cy="56" r="0.8" fill="#5A1818" />
        <circle cx="50" cy="55.5" r="0.8" fill="#5A1818" />
        <circle cx="53" cy="56" r="0.8" fill="#5A1818" />
      </svg>
    </div>
  );
};

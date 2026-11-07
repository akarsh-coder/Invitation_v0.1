import React from 'react';

interface BananaLeafCornerProps {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}

export const BananaLeafCorner: React.FC<BananaLeafCornerProps> = ({ position, className = '' }) => {
  const getTransforms = () => {
    switch (position) {
      case 'top-left':
        return 'top-0 left-0';
      case 'top-right':
        return 'top-0 right-0 -scale-x-100';
      case 'bottom-left':
        return 'bottom-0 left-0 -scale-y-100';
      case 'bottom-right':
        return 'bottom-0 right-0 -scale-x-100 -scale-y-100';
    }
  };

  return (
    <div
      className={`absolute ${getTransforms()} pointer-events-none select-none z-10 w-28 md:w-44 lg:w-56 h-28 md:h-44 lg:h-56 opacity-90 transition-transform ${className}`}
    >
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
        <defs>
          <linearGradient id="leafGradMain" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3E7D32" />
            <stop offset="50%" stopColor="#2E6627" />
            <stop offset="100%" stopColor="#1B4D1B" />
          </linearGradient>
          <linearGradient id="leafGradSub" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#559942" />
            <stop offset="60%" stopColor="#387A29" />
            <stop offset="100%" stopColor="#24591B" />
          </linearGradient>
          <linearGradient id="leafSpine" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A8D879" />
            <stop offset="50%" stopColor="#75B649" />
            <stop offset="100%" stopColor="#438525" />
          </linearGradient>
          <linearGradient id="goldVein" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFE89E" />
            <stop offset="100%" stopColor="#C59B27" />
          </linearGradient>
        </defs>

        {/* Back secondary banana leaf */}
        <g opacity="0.85">
          <path
            d="M-10,-10 C40,40 120,60 160,110 C140,125 100,120 70,105 C35,90 10,60 -10,-10 Z"
            fill="url(#leafGradSub)"
            stroke="#1B4D1B"
            strokeWidth="1"
          />
          <path d="M-10,-10 Q80,60 160,110" stroke="url(#leafSpine)" strokeWidth="2.5" fill="none" />
        </g>

        {/* Primary broad banana leaf */}
        <path
          d="M-15,-15 C20,30 90,80 145,145 C120,165 75,160 45,135 C15,110 -5,60 -15,-15 Z"
          fill="url(#leafGradMain)"
          stroke="#143B14"
          strokeWidth="1.2"
        />

        {/* Central Rib / Spine */}
        <path
          d="M-15,-15 Q65,65 145,145"
          stroke="url(#leafSpine)"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Natural leaf veins with subtle gold sheen */}
        <g stroke="url(#goldVein)" strokeWidth="0.9" opacity="0.6">
          <line x1="20" y1="20" x2="10" y2="45" />
          <line x1="45" y1="45" x2="30" y2="75" />
          <line x1="70" y1="70" x2="50" y2="105" />
          <line x1="95" y1="95" x2="75" y2="130" />
          <line x1="120" y1="120" x2="100" y2="150" />

          <line x1="20" y1="20" x2="45" y2="25" />
          <line x1="45" y1="45" x2="80" y2="50" />
          <line x1="70" y1="70" x2="110" y2="78" />
          <line x1="95" y1="95" x2="130" y2="105" />
        </g>

        {/* Small auspicious gold corner accent flourish */}
        <path
          d="M5 5 C15 5 25 15 25 25"
          stroke="#D4AF37"
          strokeWidth="1.5"
          fill="none"
        />
        <circle cx="25" cy="25" r="2" fill="#D4AF37" />
      </svg>
    </div>
  );
};

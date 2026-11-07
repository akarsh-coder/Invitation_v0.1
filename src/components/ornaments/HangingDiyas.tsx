import React from 'react';

interface HangingDiyaProps {
  side: 'left' | 'right';
  className?: string;
  delay?: number;
}

export const HangingDiya: React.FC<HangingDiyaProps> = ({ side, className = '', delay = 0 }) => {
  return (
    <div
      className={`absolute top-0 ${side === 'left' ? 'left-6 md:left-16' : 'right-6 md:right-16'} pointer-events-none select-none z-20 flex flex-col items-center animate-float-slow ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Brass Chain Links */}
      <svg width="12" height="110" viewBox="0 0 12 110" fill="none">
        <defs>
          <linearGradient id="brassGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFE89E" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#8C6D18" />
          </linearGradient>
        </defs>
        {Array.from({ length: 9 }).map((_, i) => (
          <ellipse
            key={i}
            cx="6"
            cy={8 + i * 11}
            rx="4"
            ry="6"
            fill="none"
            stroke="url(#brassGrad)"
            strokeWidth="1.8"
          />
        ))}
      </svg>

      {/* Traditional Brass Lamp (Thooku Vilakku) */}
      <div className="relative -mt-1 flex flex-col items-center">
        {/* Glow halo behind flame */}
        <div className="absolute -top-7 w-14 h-14 rounded-full bg-amber-400/35 blur-md animate-pulse-slow pointer-events-none" />

        <svg width="56" height="74" viewBox="0 0 56 74" fill="none">
          <defs>
            <linearGradient id="flameGrad" x1="0.5" y1="1" x2="0.5" y2="0">
              <stop offset="0%" stopColor="#FF3D00" />
              <stop offset="35%" stopColor="#FF9100" />
              <stop offset="70%" stopColor="#FFD700" />
              <stop offset="100%" stopColor="#FFF9C4" />
            </linearGradient>
            <linearGradient id="lampGold" x1="0" y1="0" x2="1" y2="0.8">
              <stop offset="0%" stopColor="#FFF1B8" />
              <stop offset="30%" stopColor="#D4AF37" />
              <stop offset="70%" stopColor="#C59B27" />
              <stop offset="100%" stopColor="#7E5F11" />
            </linearGradient>
            <filter id="flameFilter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Animated Flame */}
          <g className="animate-flame-flicker origin-bottom" style={{ transformOrigin: '28px 22px' }}>
            {/* Outer flame */}
            <path
              d="M28 2 C22 10 21 16 25 22 C27 24 29 24 31 22 C35 16 34 10 28 2 Z"
              fill="url(#flameGrad)"
              filter="url(#flameFilter)"
            />
            {/* Inner intense flame */}
            <path
              d="M28 8 C25 13 25 17 27 20 C28 21 29 21 30 20 C32 17 31 13 28 8 Z"
              fill="#FFFFFF"
              opacity="0.9"
            />
          </g>

          {/* Diya Wick */}
          <rect x="27.2" y="21" width="1.6" height="4" fill="#3E2723" rx="0.8" />

          {/* Diya Spout & Bowl */}
          <path
            d="M8 26 C16 24 40 24 48 26 C46 38 38 44 28 44 C18 44 10 38 8 26 Z"
            fill="url(#lampGold)"
            stroke="#8C6D18"
            strokeWidth="1.2"
          />
          {/* Bowl rim detail */}
          <ellipse cx="28" cy="26" rx="20" ry="3.5" fill="#B8860B" stroke="#FFE89E" strokeWidth="0.8" />
          <ellipse cx="28" cy="26" rx="16" ry="2.2" fill="#8C6D18" />

          {/* Center pillar / stem */}
          <path d="M25 44 H31 V54 H25 Z" fill="url(#lampGold)" stroke="#8C6D18" strokeWidth="0.8" />
          <circle cx="28" cy="49" r="4.5" fill="url(#lampGold)" stroke="#FFE89E" strokeWidth="0.6" />

          {/* Base of hanging diya with drop pendant */}
          <path
            d="M20 54 C24 53 32 53 36 54 C35 59 32 63 28 65 C24 63 21 59 20 54 Z"
            fill="url(#lampGold)"
            stroke="#8C6D18"
            strokeWidth="0.8"
          />
          {/* Bottom hanging droplet bell */}
          <circle cx="28" cy="69" r="3" fill="url(#lampGold)" stroke="#8C6D18" strokeWidth="0.8" />
        </svg>
      </div>
    </div>
  );
};

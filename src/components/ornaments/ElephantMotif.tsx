import React from 'react';

interface ElephantMotifProps {
  className?: string;
  size?: number;
  direction?: 'left' | 'right';
}

export const ElephantMotif: React.FC<ElephantMotifProps> = ({
  className = '',
  size = 64,
  direction = 'left'
}) => {
  return (
    <div
      className={`inline-flex items-center justify-center ${direction === 'right' ? '-scale-x-100' : ''} ${className}`}
    >
      <svg
        width={size}
        height={size * 0.8}
        viewBox="0 0 100 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="filter drop-shadow-sm"
      >
        <defs>
          <linearGradient id="eleGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFF2A3" />
            <stop offset="40%" stopColor="#D4AF37" />
            <stop offset="70%" stopColor="#C59B27" />
            <stop offset="100%" stopColor="#7E5F11" />
          </linearGradient>
          <linearGradient id="eleSaddle" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#B91C1C" />
            <stop offset="100%" stopColor="#7F1D1D" />
          </linearGradient>
        </defs>

        {/* Elephant Body Silhouette in Antique Brass/Gold */}
        <path
          d="M80 65 L76 45 C76 34 68 22 52 22 C42 22 34 26 28 32 C24 30 18 32 14 36 C10 40 8 48 8 56 C8 60 11 65 14 65 C16 65 18 60 18 55 C18 46 22 43 25 43 L26 65 H36 L36 50 H46 L46 65 H56 L56 48 H68 L68 65 H80 Z"
          fill="url(#eleGold)"
          stroke="#7E5F11"
          strokeWidth="1.2"
        />

        {/* Upraised Auspicious Trunk holding pink lotus */}
        <path
          d="M14 42 C6 38 4 28 8 20 C10 16 14 16 15 20 C16 26 18 32 24 36"
          stroke="url(#eleGold)"
          strokeWidth="4.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Lotus in Trunk */}
        <circle cx="10" cy="16" r="4.5" fill="#EC4899" />
        <circle cx="10" cy="16" r="2" fill="#FDE047" />

        {/* Tusks */}
        <path d="M18 42 C14 44 11 42 10 38" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" fill="none" />

        {/* Ear & Eye */}
        <path
          d="M32 30 C30 24 38 20 42 24 C44 28 40 38 34 38 Z"
          fill="#B45309"
          stroke="#7E5F11"
          strokeWidth="0.8"
        />
        <circle cx="24" cy="28" r="1.5" fill="#3E2723" />

        {/* Golden Nettipattam (Forehead Ornament) */}
        <polygon points="20,24 28,24 24,32" fill="#FACC15" stroke="#B45309" strokeWidth="0.5" />

        {/* Ornate Ceremonial Saddle Cloth (Ambari / Jhool) */}
        <path
          d="M44 32 H66 C68 32 70 34 70 38 V48 C70 50 68 52 66 52 H44 C42 52 40 50 40 48 V38 C40 34 42 32 44 32 Z"
          fill="url(#eleSaddle)"
          stroke="#FACC15"
          strokeWidth="1.2"
        />
        {/* Saddle Gold Trim & Tassels */}
        <line x1="42" y1="52" x2="68" y2="52" stroke="#FACC15" strokeWidth="1.5" strokeDasharray="2 1.5" />
        <circle cx="55" cy="42" r="3.5" fill="#FACC15" />
        <circle cx="55" cy="42" r="1.5" fill="#7F1D1D" />

        {/* Brass Bell around neck */}
        <circle cx="34" cy="45" r="2.5" fill="#FACC15" stroke="#7E5F11" strokeWidth="0.6" />
      </svg>
    </div>
  );
};

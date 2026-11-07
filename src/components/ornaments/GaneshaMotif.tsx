import React from 'react';

interface GaneshaMotifProps {
  className?: string;
  size?: number;
}

export const GaneshaMotif: React.FC<GaneshaMotifProps> = ({ className = '', size = 58 }) => {
  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="filter drop-shadow-md"
      >
        <defs>
          <linearGradient id="ganeshaGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFF2A3" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#8C6D18" />
          </linearGradient>
        </defs>

        {/* Auspicious golden aura */}
        <circle cx="50" cy="50" r="46" stroke="#D4AF37" strokeWidth="1" strokeDasharray="4 2" opacity="0.4" />
        <circle cx="50" cy="50" r="42" fill="#FEF08A" opacity="0.08" />

        {/* Crown (Mukuta) */}
        <path
          d="M40 24 L50 8 L60 24 L50 20 Z"
          fill="url(#ganeshaGold)"
          stroke="#7E5F11"
          strokeWidth="1.2"
        />
        <circle cx="50" cy="12" r="2" fill="#B91C1C" />

        {/* Forehead & Sacred Tilak (Trishula / Namam) */}
        <path
          d="M36 28 C42 26 58 26 64 28 C64 36 60 42 50 44 C40 42 36 36 36 28 Z"
          fill="url(#ganeshaGold)"
          stroke="#7E5F11"
          strokeWidth="1.2"
        />
        {/* Red Tilak */}
        <path d="M50 26 V36" stroke="#B91C1C" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="50" cy="38" r="1.5" fill="#EAB308" />

        {/* Ears */}
        {/* Left Ear */}
        <path
          d="M36 30 C20 30 18 48 30 54 C34 50 36 44 36 36"
          stroke="url(#ganeshaGold)"
          strokeWidth="3.2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Right Ear */}
        <path
          d="M64 30 C80 30 82 48 70 54 C66 50 64 44 64 36"
          stroke="url(#ganeshaGold)"
          strokeWidth="3.2"
          strokeLinecap="round"
          fill="none"
        />

        {/* Elephant Trunk curving gracefully to left (Modaka in hand) */}
        <path
          d="M50 42 C54 54 52 68 40 76 C32 80 24 74 26 64 C28 58 34 58 38 62"
          stroke="url(#ganeshaGold)"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />

        {/* Tusk */}
        <path d="M42 46 L38 52" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />

        {/* Modaka / Laddu on trunk tip */}
        <circle cx="38" cy="62" r="4.5" fill="#F59E0B" stroke="#B45309" strokeWidth="0.8" />
        <circle cx="37" cy="61" r="1.5" fill="#FEF08A" />
      </svg>
    </div>
  );
};

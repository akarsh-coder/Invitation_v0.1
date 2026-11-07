import React from 'react';

interface KalashaIconProps {
  className?: string;
  size?: number;
}

export const KalashaIcon: React.FC<KalashaIconProps> = ({ className = '', size = 52 }) => {
  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size * 1.15}
        viewBox="0 0 60 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="filter drop-shadow-md"
      >
        <defs>
          <linearGradient id="potGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFF2A3" />
            <stop offset="35%" stopColor="#D4AF37" />
            <stop offset="70%" stopColor="#C59B27" />
            <stop offset="100%" stopColor="#7E5F11" />
          </linearGradient>
          <linearGradient id="coconutGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#A16207" />
            <stop offset="60%" stopColor="#78350F" />
            <stop offset="100%" stopColor="#451A03" />
          </linearGradient>
          <linearGradient id="mangoLeafGrad" x1="0" y1="0" x2="0.8" y2="1">
            <stop offset="0%" stopColor="#4ADE80" />
            <stop offset="50%" stopColor="#16A34A" />
            <stop offset="100%" stopColor="#14532D" />
          </linearGradient>
        </defs>

        {/* Halo Glow */}
        <circle cx="30" cy="35" r="24" fill="#FEF08A" opacity="0.18" />

        {/* Coconut (Top) */}
        <path
          d="M30 4 C21 15 21 27 30 33 C39 27 39 15 30 4 Z"
          fill="url(#coconutGrad)"
          stroke="#451A03"
          strokeWidth="1"
        />
        {/* Coconut Tufts / fibers */}
        <path d="M30 4 L28 1" stroke="#A16207" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M30 4 L32 1.5" stroke="#A16207" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M30 4 L30 0" stroke="#78350F" strokeWidth="1.5" strokeLinecap="round" />

        {/* Mango Leaves radiating outwards */}
        {/* Left outer leaf */}
        <path
          d="M26 28 C16 25 8 18 4 10 C12 16 22 22 27 28 Z"
          fill="url(#mangoLeafGrad)"
          stroke="#14532D"
          strokeWidth="0.8"
        />
        {/* Left inner leaf */}
        <path
          d="M27 28 C20 22 16 12 14 5 C22 14 26 20 28 28 Z"
          fill="url(#mangoLeafGrad)"
          stroke="#14532D"
          strokeWidth="0.8"
        />
        {/* Right outer leaf */}
        <path
          d="M34 28 C44 25 52 18 56 10 C48 16 38 22 33 28 Z"
          fill="url(#mangoLeafGrad)"
          stroke="#14532D"
          strokeWidth="0.8"
        />
        {/* Right inner leaf */}
        <path
          d="M33 28 C40 22 44 12 46 5 C38 14 34 20 32 28 Z"
          fill="url(#mangoLeafGrad)"
          stroke="#14532D"
          strokeWidth="0.8"
        />

        {/* Pot Neck / Rim */}
        <ellipse cx="30" cy="30" rx="15" ry="3.8" fill="url(#potGold)" stroke="#7E5F11" strokeWidth="1.2" />
        <ellipse cx="30" cy="30" rx="12" ry="2.2" fill="#FFE89E" />

        {/* Pot Belly (Kumbha) */}
        <path
          d="M17 33 C10 40 8 54 18 63 C22 66 38 66 42 63 C52 54 50 40 43 33 Z"
          fill="url(#potGold)"
          stroke="#7E5F11"
          strokeWidth="1.2"
        />

        {/* Pot Base */}
        <ellipse cx="30" cy="63" rx="12" ry="2.8" fill="url(#potGold)" stroke="#7E5F11" strokeWidth="1" />

        {/* Auspicious Kumkuma Tilak / Swastika motif on pot belly */}
        <circle cx="30" cy="48" r="4.5" fill="#B91C1C" />
        <circle cx="30" cy="48" r="2.2" fill="#FACC15" />

        {/* Sacred red thread (moli) around neck */}
        <line x1="17" y1="33" x2="43" y2="33" stroke="#DC2626" strokeWidth="2.2" />
        <line x1="18" y1="34.8" x2="42" y2="34.8" stroke="#FBBF24" strokeWidth="1.2" />
      </svg>
    </div>
  );
};

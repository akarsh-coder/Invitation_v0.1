import React from 'react';

interface HastamelapaIconProps {
  className?: string;
  size?: number;
}

export const HastamelapaIcon: React.FC<HastamelapaIconProps> = ({ className = '', size = 70 }) => {
  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size * 0.8}
        viewBox="0 0 100 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="filter drop-shadow-md"
      >
        <defs>
          <linearGradient id="goldHandGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFF2A3" />
            <stop offset="40%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#996515" />
          </linearGradient>
          <linearGradient id="bangleRed" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#B91C1C" />
            <stop offset="50%" stopColor="#DC2626" />
            <stop offset="100%" stopColor="#991B1B" />
          </linearGradient>
          <linearGradient id="bangleGreen" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#15803D" />
            <stop offset="50%" stopColor="#16A34A" />
            <stop offset="100%" stopColor="#166534" />
          </linearGradient>
          <linearGradient id="betelLeaf" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#22C55E" />
            <stop offset="100%" stopColor="#15803D" />
          </linearGradient>
        </defs>

        {/* Outer auspicious halo ring */}
        <circle cx="50" cy="40" r="36" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />

        {/* Betel Leaf (Paan) resting underneath hands */}
        <path
          d="M50 20 C65 24 75 38 68 56 C60 68 50 74 50 74 C50 74 40 68 32 56 C25 38 35 24 50 20 Z"
          fill="url(#betelLeaf)"
          opacity="0.85"
        />

        {/* Bride's Hand (Lower - with traditional green/red glass bangles and mehndi accent) */}
        <path
          d="M20 54 C30 52 42 46 56 46 C62 46 68 49 66 54 C64 58 55 60 44 60 C32 60 20 62 16 58 Z"
          fill="url(#goldHandGrad)"
          stroke="#8C6D18"
          strokeWidth="1.2"
        />
        {/* Bride Bangles */}
        <rect x="14" y="52" width="3.5" height="10" rx="1.5" fill="url(#bangleRed)" />
        <rect x="18" y="51" width="3.5" height="10.5" rx="1.5" fill="url(#bangleGreen)" />
        <rect x="22" y="50" width="2.5" height="11" rx="1.2" fill="#D4AF37" />

        {/* Groom's Hand (Upper - gently clasping the bride's hand from above) */}
        <path
          d="M84 42 C72 44 58 42 46 44 C42 45 40 48 42 51 C45 54 52 52 64 50 C76 48 84 52 86 46 Z"
          fill="url(#goldHandGrad)"
          stroke="#8C6D18"
          strokeWidth="1.2"
        />
        {/* Groom Kadas / Gold wristband */}
        <rect x="80" y="39" width="4" height="11" rx="2" fill="#D4AF37" stroke="#8C6D18" strokeWidth="0.8" />

        {/* Auspicious Coconut (Shrifal) in hands */}
        <ellipse cx="50" cy="38" rx="8" ry="11" fill="#78350F" stroke="#451A03" strokeWidth="1" />
        <path d="M50 27 L48 24 M50 27 L52 24" stroke="#A16207" strokeWidth="1.2" />

        {/* Sacred water/milk stream drops (Dhaare) */}
        <g fill="#38BDF8" opacity="0.85">
          <ellipse cx="50" cy="18" rx="1.8" ry="3" />
          <ellipse cx="50" cy="24" rx="1.5" ry="2.5" />
          <circle cx="50" cy="30" r="1.5" />
        </g>

        {/* Floating flower petals around hands */}
        <circle cx="36" cy="32" r="2.5" fill="#F43F5E" />
        <circle cx="64" cy="30" r="2.5" fill="#F43F5E" />
        <circle cx="52" cy="66" r="2.5" fill="#FBBF24" />
      </svg>
    </div>
  );
};

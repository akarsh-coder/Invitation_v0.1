import React from 'react';

interface HangingGarlandsProps {
  className?: string;
}

export const HangingGarlands: React.FC<HangingGarlandsProps> = ({ className = '' }) => {
  return (
    <div className={`pointer-events-none select-none z-20 ${className}`}>
      {/* Top garland swag (torana) */}
      <svg
        viewBox="0 0 1200 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-md"
        preserveAspectRatio="none"
      >
        <defs>
          <radialGradient id="jasmineGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="70%" stopColor="#FFFDF0" />
            <stop offset="100%" stopColor="#EADBBD" />
          </radialGradient>
          <radialGradient id="marigoldOrange" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFC107" />
            <stop offset="60%" stopColor="#FF9800" />
            <stop offset="100%" stopColor="#E65100" />
          </radialGradient>
          <radialGradient id="marigoldYellow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF59D" />
            <stop offset="70%" stopColor="#FFD54F" />
            <stop offset="100%" stopColor="#FFB300" />
          </radialGradient>
          <linearGradient id="mangoLeaf" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#43A047" />
            <stop offset="60%" stopColor="#2E7D32" />
            <stop offset="100%" stopColor="#1B5E20" />
          </linearGradient>
          <linearGradient id="goldThread" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D4AF37" />
            <stop offset="50%" stopColor="#FFF9C4" />
            <stop offset="100%" stopColor="#C59B27" />
          </linearGradient>
        </defs>

        {/* Golden connecting thread / roping */}
        <path
          d="M0,15 Q300,55 600,15 Q900,55 1200,15"
          stroke="url(#goldThread)"
          strokeWidth="3.5"
          fill="none"
        />

        {/* Mango Leaves hanging between swags */}
        {[100, 200, 300, 400, 500, 700, 800, 900, 1000, 1100].map((x, i) => (
          <g key={`leaf-${i}`} transform={`translate(${x}, ${20 + Math.sin(x / 100) * 8})`}>
            <path
              d="M0,0 C-10,25 -8,55 0,75 C8,55 10,25 0,0 Z"
              fill="url(#mangoLeaf)"
              stroke="#1B5E20"
              strokeWidth="0.8"
            />
            <line x1="0" y1="0" x2="0" y2="70" stroke="#81C784" strokeWidth="0.8" />
          </g>
        ))}

        {/* Clustered Jasmine Buds (Mallige) */}
        {Array.from({ length: 48 }).map((_, i) => {
          const x = 12 + i * 25;
          const baseY = 18 + Math.sin((x / 1200) * Math.PI * 2) * 14;
          return (
            <g key={`jasmine-${i}`} transform={`translate(${x}, ${baseY})`}>
              <circle cx="0" cy="0" r="4.5" fill="url(#jasmineGrad)" stroke="#E0D2C3" strokeWidth="0.5" />
              <circle cx="2" cy="5" r="4" fill="url(#jasmineGrad)" stroke="#E0D2C3" strokeWidth="0.5" />
              <circle cx="-2" cy="7" r="3.5" fill="url(#jasmineGrad)" stroke="#E0D2C3" strokeWidth="0.5" />
              <rect x="-0.8" y="-4" width="1.6" height="4" fill="#5A784B" rx="0.8" />
            </g>
          );
        })}

        {/* Marigold flowers interspersed */}
        {[60, 160, 260, 360, 460, 560, 660, 760, 860, 960, 1060, 1140].map((x, i) => {
          const y = 24 + Math.sin((x / 1200) * Math.PI * 2) * 16;
          const isYellow = i % 2 === 0;
          return (
            <g key={`marigold-${i}`} transform={`translate(${x}, ${y})`}>
              {/* Petal ring */}
              <circle cx="0" cy="0" r="10" fill={isYellow ? "url(#marigoldYellow)" : "url(#marigoldOrange)"} />
              <circle cx="0" cy="0" r="7" fill={isYellow ? "url(#marigoldOrange)" : "url(#marigoldYellow)"} />
              <circle cx="0" cy="0" r="3.5" fill="#BF360C" />
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export const VerticalJasmineGarland: React.FC<{ side: 'left' | 'right'; height?: string }> = ({
  side,
  height = 'h-96'
}) => {
  return (
    <div
      className={`absolute top-0 ${side === 'left' ? 'left-2 md:left-6' : 'right-2 md:right-6'} ${height} pointer-events-none select-none z-20 flex flex-col items-center animate-float-slow`}
      style={{ animationDelay: side === 'left' ? '0s' : '1.5s' }}
    >
      {/* Hanging rope */}
      <div className="w-[1.5px] h-12 bg-gradient-to-b from-gold-500 to-amber-200" />
      {/* Repeating garland buds */}
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className="flex flex-col items-center my-0.5">
          {/* Jasmine cluster */}
          <div className="relative flex items-center justify-center">
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-white via-[#FFFDF5] to-[#E9DCB8] shadow-sm border border-[#E2D2B0]" />
            <div className="absolute -top-1 w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-white to-[#F5EEDB]" />
            <div className="absolute -bottom-1 w-3 h-3 rounded-full bg-gradient-to-tl from-white to-[#F5EEDB]" />
          </div>
          {/* Orange/Yellow marigold every 3 buds */}
          {i % 3 === 2 && (
            <div className="w-6 h-6 my-1 rounded-full bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 shadow-md border border-amber-600 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-200" />
            </div>
          )}
        </div>
      ))}
      {/* Golden bell at the bottom of garland */}
      <div className="mt-1 flex flex-col items-center">
        <div className="w-1.5 h-3 bg-gold-500" />
        <svg width="22" height="24" viewBox="0 0 24 26" fill="none">
          <path d="M12 2C8 2 5 7 5 15C5 18 3 20 2 21H22C21 20 19 18 19 15C19 7 16 2 12 2Z" fill="url(#bellGold)" stroke="#A47D1C" strokeWidth="1" />
          <circle cx="12" cy="23" r="2.5" fill="#FFE89E" />
          <defs>
            <linearGradient id="bellGold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFE89E" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#8C6D18" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

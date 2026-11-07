import React from 'react';

interface GoldDividerProps {
  className?: string;
  variant?: 'simple' | 'diamond' | 'lotus';
}

export const GoldDivider: React.FC<GoldDividerProps> = ({ className = '', variant = 'simple' }) => {
  return (
    <div className={`flex items-center justify-center my-6 w-full max-w-sm mx-auto ${className}`}>
      {/* Left hairline */}
      <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#C59B27]/40 to-[#D4AF37]/80" />

      {/* Center Modern Motif */}
      <div className="mx-3 flex items-center space-x-1.5 text-gold-600">
        <div className="w-1.5 h-1.5 rounded-full bg-[#C59B27]" />
        {variant === 'diamond' ? (
          <div className="w-2 h-2 rotate-45 border border-[#C59B27] bg-[#FDFBF7]" />
        ) : (
          <div className="w-2 h-2 rotate-45 bg-[#D4AF37]" />
        )}
        <div className="w-1.5 h-1.5 rounded-full bg-[#C59B27]" />
      </div>

      {/* Right hairline */}
      <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-[#C59B27]/40 to-[#D4AF37]/80" />
    </div>
  );
};

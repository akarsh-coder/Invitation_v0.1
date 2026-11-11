import React from 'react';

interface LotusOrnamentProps {
  className?: string;
  size?: number;
}

export const LotusOrnament: React.FC<LotusOrnamentProps> = ({ className = '', size = 64 }) => {
  return (
    <div className={`inline-flex items-center justify-center text-gold-600 ${className}`}>
      <svg
        width={size}
        height={size * 0.62}
        viewBox="0 0 80 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M40 44C28 44 16 36 10 26C20 30 30 36 40 44Z"
          stroke="currentColor"
          strokeWidth="1.1"
        />
        <path
          d="M40 44C52 44 64 36 70 26C60 30 50 36 40 44Z"
          stroke="currentColor"
          strokeWidth="1.1"
        />
        <path
          d="M40 44C30 36 24 22 26 12C32 20 36 32 40 44Z"
          stroke="currentColor"
          strokeWidth="1.1"
        />
        <path
          d="M40 44C50 36 56 22 54 12C48 20 44 32 40 44Z"
          stroke="currentColor"
          strokeWidth="1.1"
        />
        <path
          d="M40 44C35 32 34 16 40 6C46 16 45 32 40 44Z"
          stroke="currentColor"
          strokeWidth="1.15"
        />
        <path d="M22 44H58" stroke="currentColor" strokeWidth="0.8" />
      </svg>
    </div>
  );
};

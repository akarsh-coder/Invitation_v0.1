import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'gold' | 'maroon' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'gold',
  size = 'md',
  icon,
  children,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 active:scale-95 select-none shadow-sm';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-7 py-3.5 gap-2.5 font-semibold tracking-wide',
  };

  const variantStyles = {
    gold: 'bg-gradient-to-r from-[#D4AF37] via-[#ECCB51] to-[#C59B27] text-[#340E0E] font-semibold hover:shadow-gold-glow hover:brightness-105 border border-[#FFE89E]',
    maroon: 'bg-gradient-to-r from-[#7A2222] to-[#5A1818] text-[#FDFBF7] font-semibold hover:bg-maroon-800 shadow-md border border-gold-500/40 hover:border-gold-400',
    outline: 'bg-[#FDFBF7]/85 backdrop-blur-md text-[#5A1818] border-1.5 border-[#C59B27] hover:bg-[#F9F5EE] hover:border-gold-600 shadow-sm',
    ghost: 'bg-transparent text-[#5A1818] hover:bg-gold-500/10 border border-transparent',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};

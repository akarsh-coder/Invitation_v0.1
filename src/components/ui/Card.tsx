import React, { useRef, useState } from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  enableTilt?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  enableTilt = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableTilt || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const multiplier = 0.02;
    setRotateX(-y * multiplier);
    setRotateY(x * multiplier);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: enableTilt && isHovered
          ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
      }}
      className={`relative bg-[#FDFBF8] rounded-2xl shadow-[0_20px_45px_-28px_rgba(61,18,18,0.28)] ${className}`}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
};

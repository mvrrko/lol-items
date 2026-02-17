import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  hover = false,
}) => {
  const hoverStyles = hover ? 'hover:shadow-lg hover:shadow-lol-accent/30 hover:scale-105' : '';
  const clickable = onClick ? 'cursor-pointer' : '';

  return (
    <div
      className={`bg-lol-secondary border border-lol-accent/30 rounded-lg p-4 transition-all duration-200 ${hoverStyles} ${clickable} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

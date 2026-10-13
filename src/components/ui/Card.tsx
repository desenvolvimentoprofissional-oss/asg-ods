import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverable?: boolean;
  className?: string;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', hoverable = false, children, ...props }, ref) => {
    const hasBgClass = className.includes('bg-');
    const baseStyles = `rounded-2xl ${hasBgClass ? '' : 'bg-white'} shadow-sm ring-1 ring-gray-100`;
    const hoverStyles = hoverable ? "transition-all hover:shadow-md hover:ring-blue-200" : "";
    
    return (
      <div ref={ref} className={`${baseStyles} ${hoverStyles} ${className}`.trim()} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

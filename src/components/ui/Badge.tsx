import React from 'react';

export type BadgeVariant = 'primary' | 'secondary' | 'blue-light' | 'ghost' | 'outline';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

export const Badge = ({ variant = 'primary', className = '', children, ...props }: BadgeProps) => {
  const baseStyles = "inline-flex items-center font-semibold";
  
  const variants = {
    primary: "rounded-full bg-blue-100 px-4 py-2 text-sm text-blue-800",
    secondary:
      'rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 ' +
      'hover:bg-blue-100 hover:text-blue-800 transition-colors',
    'blue-light': "rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-800",
    ghost: "uppercase tracking-wide text-sm text-blue-300",
    outline: "uppercase tracking-wider text-xs text-slate-500",
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`.trim()} {...props}>
      {children}
    </span>
  );
};

import React from 'react';

export type ButtonVariant = 'primary' | 'outline-white' | 'ghost' | 'icon-outline' | 'white' | 'yellow';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon' | 'none';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  className?: string;
}

export const buttonStyles = (variant: ButtonVariant = 'primary', size: ButtonSize = 'md', className: string = '') => {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 font-semibold transition-all focus:outline-none ' +
    'focus-visible:ring-2 focus-visible:ring-blue-800 focus-visible:ring-offset-2 disabled:opacity-50 ' +
    'disabled:pointer-events-none';
  
  const variants = {
    primary: "bg-blue-800 text-white shadow-sm hover:bg-blue-900 rounded-full",
    yellow: "bg-yellow-500 text-black shadow-sm hover:bg-yellow-400 rounded-full",
    'outline-white': "border border-white text-white hover:bg-white/10 rounded-full",
    ghost: "text-blue-800 hover:text-blue-900",
    'icon-outline':
      'border border-gray-200 bg-white text-gray-600 shadow-sm ' +
      'hover:border-blue-800 hover:text-blue-800 rounded-full',
    white: "bg-white text-blue-900 shadow-sm hover:bg-gray-100 rounded-full",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
    icon: "h-10 w-10 md:h-11 md:w-11",
    none: "",
  };

  const appliedSize = variant === 'ghost' ? '' : sizes[size];

  return `${baseStyles} ${variants[variant]} ${appliedSize} ${className}`.trim();
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={buttonStyles(variant as ButtonVariant, size as ButtonSize, className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

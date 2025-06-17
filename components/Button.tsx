
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  className,
  ...props
}) => {
  const baseStyles = "font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-150 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed";

  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const variantStyles = {
    primary: "bg-primary text-white hover:bg-blue-600 focus:ring-blue-500",
    secondary: "bg-secondary text-white hover:bg-emerald-600 focus:ring-emerald-500",
    danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500",
    outline: "bg-transparent border border-neutral text-neutral hover:bg-gray-100 focus:ring-neutral",
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className || ''}`}
      {...props}
    >
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};

export default Button;
    
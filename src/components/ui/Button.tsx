import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  children: ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  className = '',
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-semibold tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-agri-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none';
  
  const variantStyles = {
    primary: 'bg-agri-primary text-white hover:bg-agri-hover active:bg-agri-active shadow-sm',
    secondary: 'bg-agri-secondary text-white hover:bg-agri-hover active:bg-agri-active shadow-sm',
    outline: 'border-2 border-agri-primary text-agri-primary hover:bg-agri-primary hover:text-white active:bg-agri-active',
    ghost: 'text-agri-primary hover:bg-agri-light/20 active:bg-agri-light/40',
    danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-sm',
  };
  
  const sizeStyles = {
    sm: 'text-sm leading-5 px-4 py-2 min-h-[2.25rem] gap-1.5',
    md: 'text-base leading-6 px-5 py-2.5 min-h-[2.75rem] gap-2',
    lg: 'text-lg leading-7 px-6 py-3 min-h-[3rem] gap-2.5',
  };
  
  const widthStyle = fullWidth ? 'w-full' : '';
  
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{ display: 'inline-block' }}
    >
      <button
        className={`
          ${baseStyles}
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${widthStyle}
          ${className}
        `}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <div className="w-5 h-5 animate-spin rounded-full border-2 border-current border-t-transparent" 
               role="status" 
               aria-label="Loading" 
          />
        ) : icon && iconPosition === 'left' ? (
          <span className="inline-flex shrink-0 text-current" style={{ fontSize: '1.2em' }}>
            {icon}
          </span>
        ) : null}
        
        <span className="inline-flex items-center justify-center">
          {children}
        </span>
        
        {!isLoading && icon && iconPosition === 'right' && (
          <span className="inline-flex shrink-0 text-current" style={{ fontSize: '1.2em' }}>
            {icon}
          </span>
        )}
      </button>
    </motion.div>
  );
};

export default Button;
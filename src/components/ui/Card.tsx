import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  className?: string;
  onClick?: () => void;
  children: ReactNode;
  hoverable?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  className = '', 
  onClick, 
  children,
  hoverable = false,
}) => {
  return (
    <motion.div 
      className={`
        bg-white rounded-lg shadow-card p-6 
        ${hoverable ? 'transition-shadow hover:shadow-card-hover' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hoverable ? { 
        scale: 1.02,
        transition: { duration: 0.2 }
      } : undefined}
      transition={{
        duration: 0.3,
        ease: "easeOut"
      }}
    >
      {children}
    </motion.div>
  );
};

export default Card;

export const CardHeader: React.FC<{ className?: string; children: ReactNode }> = ({ 
  className = '', 
  children 
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {children}
    </div>
  );
};

export const CardTitle: React.FC<{ className?: string; children: ReactNode }> = ({ 
  className = '', 
  children 
}) => {
  return (
    <h3 className={`text-lg font-semibold text-neutral-900 ${className}`}>
      {children}
    </h3>
  );
};

export const CardDescription: React.FC<{ className?: string; children: ReactNode }> = ({ 
  className = '', 
  children 
}) => {
  return (
    <p className={`text-sm text-neutral-500 ${className}`}>
      {children}
    </p>
  );
};

export const CardContent: React.FC<{ className?: string; children: ReactNode }> = ({ 
  className = '', 
  children 
}) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export const CardFooter: React.FC<{ className?: string; children: ReactNode }> = ({ 
  className = '', 
  children 
}) => {
  return (
    <div className={`mt-4 ${className}`}>
      {children}
    </div>
  );
};

export { Card }
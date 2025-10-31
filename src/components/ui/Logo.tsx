import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  textColor?: 'default' | 'white';
}

const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  textColor = 'default'
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl'
  };

  return (
    <motion.div 
      className={`flex items-center gap-3 ${className}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* AgriMove Logo Image */}
      <motion.div 
        className={`${sizeClasses[size]} flex-shrink-0`}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.img
          src="/logo.svg"
          alt="AgriMove Logo"
          className="w-full h-full object-contain"
          animate={{ rotateY: [0, 360] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
        />
      </motion.div>
      
      {showText && (
        <motion.div 
          className="flex flex-col"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.span 
            className={`font-bold ${textColor === 'white' ? 'text-white' : 'text-green-800'} ${textSizeClasses[size]}`}
            whileHover={{ scale: 1.05 }}
          >
            AgriMove
          </motion.span>
          {size !== 'sm' && (
            <motion.span 
              className={`text-xs font-medium ${textColor === 'white' ? 'text-green-200' : 'text-green-600'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Farm to Market
            </motion.span>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default Logo;

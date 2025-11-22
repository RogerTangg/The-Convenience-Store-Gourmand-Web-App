import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "px-6 py-3 transition-all duration-300 font-serif tracking-wider flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden rounded-[2px]";
  
  const variants = {
    // Primary: Solid Gold background, dark text. High visibility.
    primary: "bg-gold text-background border border-gold hover:bg-gold-light hover:border-gold-light font-bold shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] active:scale-[0.98]",
    
    // Secondary: Transparent background, light border.
    secondary: "bg-transparent border border-white/20 text-gray-300 hover:border-gold hover:text-gold hover:bg-gold/5 active:scale-[0.98]",
    
    // Ghost: Text only.
    ghost: "bg-transparent text-gold hover:text-gold-light hover:bg-white/5"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300 mix-blend-overlay"></div>
      )}
    </button>
  );
};

import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 md:bottom-12 md:left-12 z-30">
      <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
        
        {/* Decorative line */}
        <div className="w-8 sm:w-12 md:w-16 h-px bg-gradient-to-r from-gold to-transparent"></div>
        
        {/* Logo and text */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="text-gold w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6">
            <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 4L7 20L12 8L17 20L21 4" strokeWidth="1.5" stroke="currentColor" fill="none"/>
            </svg>
          </div>
          <div className="text-white/80 text-xs sm:text-sm font-serif tracking-[0.15em] sm:tracking-[0.2em]">LUXURY</div>
        </div>
        
        {/* Decorative elements */}
        <div className="relative">
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gold/30 rounded-full"></div>
          <div className="absolute inset-0 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gold/10 rounded-full animate-ping"></div>
        </div>
        
      </div>
    </div>
  );
};

export default Logo;
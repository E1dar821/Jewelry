import React from 'react';

const Background: React.FC = () => {
  return (
    <>
      {/* Dark gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-black/95 to-black/90" />
      
      {/* Golden line texture */}
      <div className="fixed inset-0 opacity-20 pointer-events-none overflow-hidden">
        {/* Diagonal lines */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={`diag-${i}`}
              className="absolute h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent animate-pulse-glow"
              style={{
                width: '200%',
                top: `${i * 5}%`,
                left: '-50%',
                transform: 'rotate(15deg)',
                animationDelay: `${i * 0.3}s`,
                animationDuration: '4s'
              }}
            />
          ))}
        </div>
        
        {/* Vertical lines */}
        <div className="absolute inset-0">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={`vert-${i}`}
              className="absolute w-px bg-gradient-to-b from-transparent via-gold/20 to-transparent animate-pulse-glow"
              style={{
                height: '100%',
                left: `${i * 7}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: '6s'
              }}
            />
          ))}
        </div>
        
        {/* Horizontal lines */}
        <div className="absolute inset-0">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={`horiz-${i}`}
              className="absolute h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent animate-pulse-glow"
              style={{
                width: '100%',
                top: `${i * 8}%`,
                animationDelay: `${i * 0.7}s`,
                animationDuration: '5s'
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Animated grain effect */}
      <div className="fixed inset-0 opacity-[0.015] pointer-events-none">
        <div className="absolute inset-0 bg-[url('/noise.png')] animate-grain" />
      </div>
      
      {/* Subtle radial gradients */}
      <div className="fixed inset-0">
        <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-gold/5 rounded-full blur-[100px] animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-gold/5 rounded-full blur-[100px] animate-pulse-slow delay-1000" />
      </div>
      
      {/* Decorative border lines */}
      <div className="fixed inset-0 overflow-hidden opacity-30">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent animate-pulse-glow" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent animate-pulse-glow" />
        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-gold/50 to-transparent animate-pulse-glow" />
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-gold/50 to-transparent animate-pulse-glow" />
      </div>
    </>
  );
};

export default Background;
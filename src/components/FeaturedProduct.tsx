import React from 'react';
import { Sparkles } from 'lucide-react';
import lux1 from '../assets/images/lux1.png';

const FeaturedProduct: React.FC = () => {
  return (
    <div className="absolute bottom-12 right-12 z-10 flex items-center">
      <div className="relative w-64 h-36 bg-black/30 backdrop-blur-md border border-white/10 rounded-md overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
        <img 
          src={lux1} 
          alt="Featured diamond ring" 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-0 left-0 w-full p-3">
          <div className="flex items-center">
            <Sparkles size={14} className="text-gold mr-1" />
            <span className="text-xs text-white/80 uppercase tracking-wider">Featured Collection</span>
          </div>
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="font-serif text-lg text-gold">Diamond Eternity</h3>
          <div className="flex items-center justify-between mt-1">
            <p className="text-white/70 text-xs">Handcrafted excellence</p>
            <span className="text-gold text-xs font-medium">Explore →</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProduct;
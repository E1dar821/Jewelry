import React from 'react';
import { X } from 'lucide-react';
import { useContent } from '../context/ContentContext';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  const { aboutContent } = useContent();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/150 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-gradient-to-br from-black/90 to-black/95 backdrop-blur-md rounded-lg p-4 sm:p-6 w-full max-w-sm sm:max-w-lg border border-gold/20 shadow-2xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gold/70 hover:text-gold transition-colors p-1 touch-manipulation"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-serif text-gold mb-2">
            About Us
          </h2>
          <div className="w-12 sm:w-16 h-px bg-gold/50 mx-auto" />
        </div>

        <div className="space-y-4 sm:space-y-6 text-white/90">
          <div className="text-center">
            <p className="text-sm sm:text-base leading-relaxed font-light">
              We work with the highest precision and attention to detail. Our master craftsmen create unique jewelry pieces using only the finest materials and time-tested techniques.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-4 sm:mt-6">
            <div className="text-center">
             
              <h3 className="text-gold font-serif text-sm sm:text-base mb-1">
                Quality
              </h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                Every piece undergoes strict quality control and is crafted using advanced technologies.
              </p>
            </div>

            <div className="text-center">
              
              <h3 className="text-gold font-serif text-sm sm:text-base mb-1">
                Craftsmanship
              </h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                Our experienced artisans create unique works of art that become family heirlooms.
              </p>
            </div>

            <div className="text-center">
             
              <h3 className="text-gold font-serif text-sm sm:text-base mb-1">
                Materials
              </h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                We use only the finest precious metals and certified natural gemstones.
              </p>
            </div>

            <div className="text-center">
              
              <h3 className="text-gold font-serif text-sm sm:text-base mb-1">
                Service
              </h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                Each client receives personal attention and consultation for the perfect piece.
              </p>
            </div>
          </div>

          <div className="text-center pt-3 sm:pt-4 border-t border-gold/20">
            <p className="text-gold/80 font-serif italic text-xs sm:text-sm">
              "Creating beauty that lasts forever"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutModal; 
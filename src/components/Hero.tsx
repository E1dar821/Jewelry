import React, { useState, useEffect, useContext } from 'react';
import { ChevronRight } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { ModalContext } from '../App';

// Import all available images
import model1 from '../assets/images/model1.jpg';
import model2 from '../assets/images/model2.jpg';
import model3 from '../assets/images/model3.jpg';
import ring1 from '../assets/images/ring1.jpeg';
import ring2 from '../assets/images/ring2.png';
import ring3 from '../assets/images/ring3.png';
import lux1 from '../assets/images/lux1.png';
import lux2 from '../assets/images/lux2.jpg';
import diamond from '../assets/images/diamond.jpg';
import diamondRing2 from '../assets/images/diamond-ring2.jpg';
import luxExtra1 from '../assets/images/ae4aeb11520e32535dea476ce8b1360d.jpg';
import luxExtra2 from '../assets/images/6080f545cbdfb9e2edb752d484101b8c.jpg';
import imgExtra from '../assets/images/IMG_7646.jpeg';

const ModelCarousel: React.FC = () => {
  const { carousels } = useContent();
  const modelCarousel = carousels.find(c => c.id === 'model');
  const [currentModelIndex, setCurrentModelIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentModelIndex((prevIndex) => 
        prevIndex === (modelCarousel?.images.length || 1) - 1 ? 0 : prevIndex + 1
      );
    }, 2500);

    return () => clearInterval(interval);
  }, [modelCarousel?.images.length]);

  if (!modelCarousel) return null;

  return (
    <div className="col-span-3 row-span-3 relative overflow-hidden rounded-lg">
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent z-10"></div>
      
      <div className="relative w-full h-full">
        {modelCarousel.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Elegant model ${index + 1} with jewelry`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentModelIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>

      <div className="absolute top-4 left-3 z-20 flex space-x-1">
        {modelCarousel.images.map((_, index) => (
          <div
            key={index}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              index === currentModelIndex ? 'bg-gold' : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const RingCarousel: React.FC = () => {
  const { carousels } = useContent();
  const modalContext = useContext(ModalContext);
  const ringCarousel = carousels.find(c => c.id === 'rings');
  const [currentRingIndex, setCurrentRingIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRingIndex((prevIndex) => 
        prevIndex === (ringCarousel?.images.length || 1) - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [ringCarousel?.images.length]);

  if (!ringCarousel) return null;

  return (
    <div className="col-span-3 row-span-1.5 relative overflow-hidden rounded-lg mx-1">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      
      <div className="relative w-full h-full">
        {ringCarousel.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Luxury ring ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentRingIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center bg-black/40 backdrop-blur-sm px-4 py-2 rounded">
          <div className="text-gold text-xs uppercase tracking-[0.2em] mb-1">Unique Palette</div>
          <button 
            onClick={() => modalContext?.openAboutModal()}
            className="text-white text-lg font-serif hover:text-gold transition-colors duration-300 cursor-pointer"
          >
            About
          </button>
          <div className="text-white/70 text-xs tracking-wider">Premium Quality</div>
        </div>
      </div>

      <div className="absolute bottom-2 right-2 z-20 flex space-x-1">
        {ringCarousel.images.map((_, index) => (
          <div
            key={index}
            className={`w-1 h-1 rounded-full transition-all duration-300 ${
              index === currentRingIndex ? 'bg-gold' : 'bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const LuxuryCarousel: React.FC = () => {
  const { carousels, textContent } = useContent();
  const luxuryCarousel = carousels.find(c => c.id === 'luxury');
  const [currentLuxIndex, setCurrentLuxIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLuxIndex((prevIndex) => 
        prevIndex === (luxuryCarousel?.images.length || 1) - 1 ? 0 : prevIndex + 1
      );
    }, 3500);

    return () => clearInterval(interval);
  }, [luxuryCarousel?.images.length]);

  if (!luxuryCarousel) return null;

  return (
    <div className="col-span-7 row-span-3 relative overflow-hidden rounded-lg ml-2">
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/80"></div>
      
      <div className="relative w-full h-full">
        {luxuryCarousel.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Luxury collection ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1200 ${
              index === currentLuxIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>

      <div className="absolute top-6 right-6">
        <div className="text-right">
          <div className="text-gold text-4xl font-serif italic mb-1">{textContent.luxuryBrand.text}</div>
          <div className="text-white text-xs tracking-[0.3em] uppercase">{textContent.luxuryBrand.subtext}</div>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 z-20 flex space-x-1">
        {luxuryCarousel.images.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-1 rounded-full transition-all duration-300 ${
              index === currentLuxIndex ? 'bg-gold' : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const EleganceCarousel: React.FC = () => {
  const { carousels } = useContent();
  const eleganceCarousel = carousels.find(c => c.id === 'elegance');
  const [currentEleganceIndex, setCurrentEleganceIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEleganceIndex((prevIndex) => 
        prevIndex === (eleganceCarousel?.images.length || 1) - 1 ? 0 : prevIndex + 1
      );
    }, 2800);

    return () => clearInterval(interval);
  }, [eleganceCarousel?.images.length]);

  if (!eleganceCarousel) return null;

  return (
    <div className="col-span-3 row-span-3 relative overflow-hidden rounded-lg ml-2">
      <div className="absolute inset-0 bg-gradient-to-bl from-transparent to-black/80 z-10"></div>
      
      <div className="relative w-full h-full">
        {eleganceCarousel.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Eternal elegance ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentEleganceIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>

      <div className="absolute bottom-4 left-3 right-3 z-20">
        <h3 className="font-serif text-lg text-gold mb-1">{eleganceCarousel.title}</h3>
        <p className="text-white/70 text-xs">{eleganceCarousel.description}</p>
      </div>

      <div className="absolute top-4 right-4 z-20">
        <div className="w-1.5 h-1.5 bg-gold rotate-45 transform"></div>
      </div>

      <div className="absolute top-4 left-3 z-20 flex space-x-1">
        {eleganceCarousel.images.map((_, index) => (
          <div
            key={index}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              index === currentEleganceIndex ? 'bg-gold' : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const Hero: React.FC = () => {
  const { textContent } = useContent();
  const modalContext = useContext(ModalContext);

  const handleExploreNow = () => {
    modalContext?.openContactModal();
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col h-full p-4 pt-16 space-y-4">
        
        {/* Main Title Section */}
        <div className="flex-shrink-0 text-center px-4 py-6">
          <h1 className="font-serif text-2xl sm:text-3xl text-white leading-tight mb-4">
            {textContent.mainTitle.text}
          </h1>
          
          <p className="font-serif text-gold/90 italic text-base leading-relaxed mb-6">
            {textContent.quote.text}
          </p>
          
          <button 
            onClick={handleExploreNow}
            className="bg-gold/90 hover:bg-gold text-black px-6 py-3 text-sm rounded-sm flex items-center justify-center group transition-all duration-300 mx-auto"
          >
            <span className="mr-2 uppercase tracking-wider font-medium">Explore Now</span>
            <ChevronRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

        {/* Mobile Carousels - Horizontal Scroll */}
        <div className="flex-1 overflow-hidden">
          <div className="flex space-x-3 overflow-x-auto pb-4 h-full snap-x">
            {/* Scroll hint */}
            <div className="flex-shrink-0 w-1"></div>
            
            {/* Model Carousel */}
            <div className="flex-shrink-0 w-64 h-full relative overflow-hidden rounded-lg snap-start">
              <ModelCarousel />
              <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-xs text-gold">
                Models
              </div>
            </div>
            
            {/* Luxury Carousel */}
            <div className="flex-shrink-0 w-80 h-full relative overflow-hidden rounded-lg snap-start">
              <LuxuryCarousel />
              <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-xs text-gold">
                Luxury Collection
              </div>
            </div>
            
            {/* Ring Carousel */}
            <div className="flex-shrink-0 w-64 h-full relative overflow-hidden rounded-lg snap-start">
              <RingCarousel />
              <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-xs text-gold">
                Rings
              </div>
            </div>
            
            {/* Elegance Carousel */}
            <div className="flex-shrink-0 w-64 h-full relative overflow-hidden rounded-lg snap-start">
              <EleganceCarousel />
              <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-xs text-gold">
                Elegance
              </div>
            </div>
            
            {/* Scroll hint */}
            <div className="flex-shrink-0 w-4"></div>
          </div>
          
          {/* Scroll indicator with animation */}
          <div className="flex justify-center mt-2">
            <div className="flex space-x-1">
              <div className="w-2 h-1 bg-gold/60 rounded-full animate-pulse"></div>
              <div className="w-6 h-1 bg-gold/30 rounded-full"></div>
              <div className="w-2 h-1 bg-gold/60 rounded-full animate-pulse delay-300"></div>
            </div>
          </div>
        </div>

        {/* Mobile About Button */}
        <div className="flex-shrink-0 flex justify-center py-2">
          <button 
            onClick={() => modalContext?.openAboutModal()}
            className="bg-black/60 backdrop-blur-md border border-gold/20 text-gold px-6 py-2 rounded-lg hover:bg-black/80 transition-colors duration-300"
          >
            About Us
          </button>
        </div>

        {/* Brand Text */}
        <div className="flex-shrink-0 text-center pb-4">
          <div className="text-gold text-xl font-serif mb-1">{textContent.luxuryBrand.text}</div>
          <div className="text-white/60 text-xs uppercase tracking-[0.3em]">{textContent.luxuryBrand.subtext}</div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:grid grid-cols-12 grid-rows-6 h-full gap-4 p-8 pt-20">
        
        <div className="col-span-5 row-span-3 flex flex-col justify-center pr-4">
          <div className="space-y-4">
            <h1 className="font-serif text-4xl lg:text-5xl text-white leading-tight">
              {textContent.mainTitle.text}
            </h1>
            
            <div className="flex items-center mt-4">
              <button 
                onClick={handleExploreNow}
                className="bg-gold/90 hover:bg-gold text-black px-5 py-2 text-sm rounded-sm flex items-center group transition-all duration-300"
              >
                <span className="mr-2 uppercase tracking-wider font-medium">Explore Now</span>
                <ChevronRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>

        <LuxuryCarousel />
        <ModelCarousel />
        <RingCarousel />

        <div className="col-span-3 row-span-1.5 bg-black/60 backdrop-blur-md rounded-lg flex items-center justify-center border border-white/10 mx-1">
          <div className="text-center p-3">
            <div className="text-gold text-2xl font-serif mb-1">{textContent.luxuryBrand.text}</div>
          </div>
        </div>

        <EleganceCarousel />

        <div className="col-span-4 row-span-3 flex items-center justify-center">
          <p className="font-serif text-gold/90 italic text-lg md:text-xl leading-relaxed text-center px-4">
            {textContent.quote.text}
          </p>
        </div>
      </div>

      {/* Brand Text - Desktop */}
      <div className="hidden md:block absolute top-6 left-1/2 transform -translate-x-1/2 z-30">
        <div className="text-white/40 text-xs uppercase tracking-[0.4em]">{textContent.brandText.text}</div>
      </div>
    </div>
  );
};

export default Hero;
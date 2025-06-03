import React, { useContext } from 'react';
import { ModalContext } from '../App';

const WLogo = () => (
  <div className="text-gold w-6 h-6 sm:w-8 sm:h-8">
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 4L7 20L12 8L17 20L21 4" strokeWidth="1.5" stroke="currentColor" fill="none"/>
    </svg>
  </div>
);

const Navbar: React.FC = () => {
  const modalContext = useContext(ModalContext);

  const handleBookAppointment = () => {
    modalContext?.openContactModal();
  };

  return (
    <nav className="absolute top-0 left-0 right-0 z-20 px-4 sm:px-8 md:px-12 py-4 sm:py-6">
      <div className="flex justify-between items-center">
        
        {/* Left side - Logo */}
        <div className="flex items-center">
          <WLogo />
        </div>
        
        {/* Center - Navigation (on larger screens) */}
        {/* <div className="hidden lg:flex space-x-8">
          {['Collections', 'About', 'Craftsmanship', 'Contact'].map((item) => (
            <a
              key={item}
              href="#"
              className="text-white/60 hover:text-gold transition-colors duration-500 text-sm uppercase tracking-[0.15em] font-light"
            >
              {item}
            </a>
          ))}
        </div> */}
        
        {/* Right side - Appointment */}
        <div>
          <button 
            onClick={handleBookAppointment}
            className="border border-gold/40 text-gold px-3 py-1.5 sm:px-5 sm:py-2 text-xs sm:text-sm uppercase tracking-[0.2em] hover:bg-gold hover:text-black transition-all duration-500 backdrop-blur-sm bg-black/20 touch-manipulation"
          >
            <span className="hidden sm:inline">Book Appointment</span>
            <span className="sm:hidden">Book</span>
          </button>
        </div>
        
      </div>
    </nav>
  );
};

export default Navbar;
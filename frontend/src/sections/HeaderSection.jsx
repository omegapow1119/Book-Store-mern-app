import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Banner from '../pages/home/Banner';
import bannerImg from "../assets/books/banner.jpg";

const HeaderSection = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div
      className='relative bg-cover bg-center bg-no-repeat sm:bg-center md:bg-right'
      style={{ backgroundImage: `url(${bannerImg})`, backgroundSize: 'cover', backgroundAttachment: 'fixed' }}
    >
      {/* Overlay with a gradient for better text contrast */}
      <div className='absolute inset-0 bg-gradient-to-r from-black/70 to-gray-800/50'>
      </div>

      {/* Navbar and Banner */}
      <div className="relative z-10">
        <Navbar setIsDropdownOpen={setIsDropdownOpen} isDropdownOpen={isDropdownOpen} />
        <Banner />
      </div>

      {/* Custom Animation Styles */}
      <style>
        {`
          @keyframes fadeInDown {
            from { opacity: 0; transform: translateY(-25px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(25px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-down {
            animation: fadeInDown 2s ease-out forwards;
          }
          .animate-fade-in-up {
            animation: fadeInUp 2s ease-out forwards;
            animation-delay: 0.3s;
          }
          .animate-fade-in {
            animation: fadeInUp 1s ease-out forwards;
            animation-delay: 0.6s;
          }
        `}
      </style>
    </div>
  );
};

export default HeaderSection;
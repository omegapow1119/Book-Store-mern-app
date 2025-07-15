import React from 'react';
import { Link } from 'react-router-dom';

const Banner = () => {

  return (
    <div className='flex flex-col items-center justify-center py-10 sm:py-14 md:py-20 text-center min-h-[450px] sm:min-h-[500px] md:min-h-[550px]'>
      {/* Text Content with Animation */}
      <div className='relative z-10 px-4 sm:px-6 md:px-8 max-w-md sm:max-w-lg md:max-w-3xl lg:max-w-4xl'>
        <h1 className='text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white tracking-tight animate-fade-in-down'>
          New Releases This Week
        </h1>
        <p className='text-sm sm:text-base md:text-lg lg:text-lg mb-6 sm:mb-8 md:mb-10 text-gray-200 leading-relaxed animate-fade-in-up'>
          It's time to update your reading list with some of the latest and greatest releases in the literary world. From heart-pumping thrillers to captivating memoirs, this week's new releases offer something for everyone.
        </p>
        <Link to="/subscribe">
          <button 
            className='btn-primary bg-teal-600 text-white px-6 sm:px-7 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-full text-base sm:text-lg md:text-lg font-semibold hover:bg-teal-700 transition-transform transform hover:scale-105 shadow-lg animate-fade-in'
            aria-label="Subscribe to newsletter"
          >
            Subscribe
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Banner;
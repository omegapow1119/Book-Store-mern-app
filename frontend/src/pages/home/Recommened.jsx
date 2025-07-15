import React, { useState, useMemo } from 'react';
import BookCard from '../books/Bookscard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';

function Recommended() {
  const { data: books = [], isLoading, error } = useFetchAllBooksQuery();

  // Use useMemo to avoid recalculating recommendedBooks unnecessarily
  
  const recommendedBooks = useMemo(() => {
    return books.length > 7 ? books.slice(7) : books;
  }, [books]);

  return (
    <section className="py-6 sm:py-8 md:py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-5 text-center sm:text-left animate-fade-in">
        Recommended For You
      </h2>

      {/* Swiper Carousel */}
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="rounded-full h-12 w-12 border-t-4 border-b-4 border-teal-500 border-opacity-75 animate-pulse"></div>
        </div>
      ) : error ? (
        <p className="text-red-500 text-center text-sm sm:text-base bg-red-50 rounded-lg py-3 px-4 shadow-sm">
          {error.data?.message || 'An error occurred while fetching books.'}
        </p>
      ) : recommendedBooks.length === 0 ? (
        <p className="text-gray-500 text-center text-sm sm:text-base bg-gray-100 rounded-lg py-3 px-4 shadow-sm">
          No recommended books available.
        </p>
      ) : (
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          navigation={true}
          breakpoints={{
            480: { slidesPerView: 1, spaceBetween: 0 },
            620: { slidesPerView: 2, spaceBetween: 20 },
            851: { slidesPerView: 2, spaceBetween: 30 },
            1400: { slidesPerView: 3, spaceBetween: 50 },
          }}
          modules={[Navigation]}
          className="mySwiper recommended-swiper animate-fade-in"
        >
          {recommendedBooks.map((book) => (
            <SwiperSlide key={book._id} className="animate-fade-in">
              <BookCard book={book} totalBooks={recommendedBooks.length} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
}

export default Recommended;
import React, { useState } from 'react';
import BookCard from '../books/Bookscard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';

const categories = ["Choose a genre", "Business", "Fiction", "Horror", "Adventure", "Law", "Romance", "Suspense"];

function Topsellers() {

  const [selectedCategory, setSelectedCategory] = useState("Choose a genre");

  //  Using RTK Query states
  const { data: books = [], isLoading, isError, error } = useFetchAllBooksQuery();

  const filteredBooks = selectedCategory === "Choose a genre"
    ? books
    : books.filter(book =>
        book.category?.trim().toLowerCase() === selectedCategory.trim().toLowerCase()
      );

  //  Optional: Log error in dev
  if (isError) console.error("Books API Error:", error);

  return (
    <section className="py-6 custom-630:py-4 px-4 custom-630:px-3 sm:py-6 sm:px-4 md:py-10 md:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-5 text-center sm:text-left animate-fade-in">
        Top Sellers
      </h2>

      {/* Category Filter */}
      <div className="mb-6 sm:mb-8 flex justify-center sm:justify-start">
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          name="category"
          id="category"
          className="border border-gray-300 bg-gray-100 rounded-lg px-4 py-2 sm:px-5 sm:py-2.5 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-teal-500 hover:bg-teal-50 hover:border-teal-500 transition-all duration-300 shadow-md cursor-pointer"
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Swiper Carousel */}
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="rounded-full h-12 w-12 border-t-4 border-b-4 border-teal-500 border-opacity-75 animate-pulse"></div>
        </div>
      ) : isError ? (
        <p className="text-red-500 text-center text-sm sm:text-base bg-red-50 rounded-lg py-3 px-4 shadow-sm">
          {error?.message || "An error occurred while fetching books."}
        </p>
      ) : filteredBooks.length === 0 ? (
        <p className="text-gray-500 text-center text-sm sm:text-base bg-gray-100 rounded-lg py-3 px-4 shadow-sm">
          No books found in this category.
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
          className="mySwiper animate-fade-in"
        >
          {filteredBooks.map((book, index) => (
            <SwiperSlide key={index} className="animate-fade-in">
              <BookCard book={book} totalBooks={filteredBooks.length} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* Custom Styles */}
      <style>
        {`
          .swiper-button-next, .swiper-button-prev {
            color: #fff;
            background: linear-gradient(145deg, #14b8a6, #0d9488);
            border-radius: 50%;
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
            transition: all 0.3s ease;
          }
          .swiper-button-next:hover, .swiper-button-prev:hover {
            background: linear-gradient(145deg, #0d9488, #14b8a6);
            transform: scale(1.15) rotate(5deg);
            box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
          }
          .swiper-button-next:after, .swiper-button-prev:after {
            font-size: 18px;
          }
          @media (max-width: 620px) {
            .swiper-button-next, .swiper-button-prev {
              width: 32px;
              height: 32px;
            }
            .swiper-button-next:after, .swiper-button-prev:after {
              font-size: 16px;
            }
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
        `}
      </style>
    </section>
  );
}

export default Topsellers;

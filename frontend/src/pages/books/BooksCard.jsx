import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { getImgUrl } from '../../utils/getImgUrl';
import { Link } from 'react-router-dom';


import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/features/cart/cartSlice'

const BookCard = ({ book, totalBooks }) => {

  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };


  const placeholderImage = "https://via.placeholder.com/150?text=No+Image";

  // Determine card size based on the number of books and screen size
  const cardSize = totalBooks === 1
    ? "max-w-xs sm:max-w-xs lg:max-w-md h-[400px] sm:h-[300px] lg:h-[320px] custom-850:h-[500px] custom-650:h-[300px] min-[800px]:max-[850px]:flex-col min-[800px]:max-[850px]:items-center min-[800px]:max-[850px]:p-4 min-[800px]:max-[850px]:visible min-[800px]:max-[850px]:block"
    : "max-w-sm sm:max-w-sm lg:max-w-lg h-[500px] sm:h-[340px] lg:h-[360px] custom-850:h-[560px] custom-650:h-[340px] min-[800px]:max-[850px]:flex-col min-[800px]:max-[850px]:items-center min-[800px]:max-[850px]:p-4 min-[800px]:max-[850px]:visible min-[800px]:max-[850px]:block";

  // Adjust image size based on the number of books and screen size
  const imageSize = totalBooks === 1
    ? "h-40 sm:h-48 md:h-48 w-24 sm:w-28 md:w-32 lg:h-52 lg:w-36 custom-850:h-64 custom-850:w-full custom-650:h-44 custom-650:w-full max-[850px]:max-w-[150px] max-[850px]:w-full max-[850px]:h-48 min-[800px]:max-[850px]:max-w-[150px] min-[800px]:max-[850px]:w-full min-[800px]:max-[850px]:h-48 min-[800px]:max-[850px]:visible"
    : "h-44 sm:h-52 md:h-52 w-28 sm:w-32 md:w-36 lg:h-56 lg:w-40 custom-850:h-72 custom-850:w-full custom-650:h-48 custom-650:w-full max-[850px]:max-w-[150px] max-[850px]:w-full max-[850px]:h-48 min-[800px]:max-[850px]:max-w-[150px] min-[800px]:max-[850px]:w-full min-[800px]:max-[850px]:h-48 min-[800px]:max-[850px]:visible";

  return (
    <>
      <div className={`bg-white rounded-xl shadow-md mx-auto ${cardSize} border border-gray-100 flex p-5 sm:p-6 max-[850px]:flex-col max-[850px]:p-4 max-[850px]:items-center`}>
        <div className="flex flex-row items-start gap-4 sm:gap-5 flex-1 max-[850px]:flex-col max-[850px]:gap-4 max-[850px]:items-center">
          {/* Image Section */}
          <div className={`${imageSize} flex-shrink-0 rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300`}>
            <Link to={`/books/${book._id}`}>
              <img
                src={book?.coverImage ? getImgUrl(book.coverImage) : placeholderImage}
                alt={book?.title || "Book cover"}
                className="w-full h-full object-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-transform duration-300"
              />
            </Link>
          </div>

          {/* Text and Button Section */}
          <div className="flex-1 flex flex-col justify-between space-y-1 sm:space-y-1 lg:space-y-1 max-[850px]:items-center max-[850px]:text-center">
            <div className="flex flex-col space-y-2">
              <Link to={`/books/${book._id}`}>
                <h3 className="text-xs sm:text-sm lg:text-sm font-semibold text-gray-800 hover:text-teal-600 transition-colors">
                  {book?.title}
                </h3>
              </Link>
              <p className="text-gray-600 text-xs sm:text-xs lg:text-xs line-clamp-2 leading-relaxed">
                {book?.description}
              </p>
              <p className="text-teal-600 font-semibold text-xs sm:text-xs lg:text-xs">
                ₹{book?.newPrice}
                <span className="line-through font-normal text-red-500 text-xs sm:text-xs lg:text-xs ml-2">
                  ₹{book?.oldPrice}
                </span>
              </p>
            </div>
            <button
              onClick={() => handleAddToCart(book)}
              className="bg-teal-600 text-white px-4 sm:px-3 py-1.5 sm:py-1.5 rounded-lg flex items-center justify-center gap-1 hover:bg-teal-700 hover:ring-2 hover:ring-teal-400 transition-all duration-300 shadow-md text-xs w-full sm:w-28 mt-2 sm:mt-3 lg:mt-3 max-[850px]:w-32"
            >
              <FiShoppingCart className="text-sm sm:text-base" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
      {/* Custom styles for 800px to 850px range */}
      <style>
        {`
          @media (min-width: 800px) and (max-width: 850px) {
            .bg-white.rounded-xl.shadow-md.mx-auto {
              width: 354px;
              margin-right: 20px;
              height: 520px;
            }
          }
        `}
      </style>
    </>
  );
};

export default BookCard;
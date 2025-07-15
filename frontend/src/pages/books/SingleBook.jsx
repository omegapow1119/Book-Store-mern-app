import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

import { getImgUrl } from '../../utils/getImgUrl';
import { addToCart } from '../../redux/features/cart/cartSlice';
import { useFetchBookByIdQuery } from '../../redux/features/books/booksApi';

const SingleBook = () => {
  const { id } = useParams();
  const { data: book, isLoading, isError } = useFetchBookByIdQuery(id);
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success(`${product.title} added to cart!`, {
      duration: 1500,
      style: {
        background: '#f0fdfa',
        color: '#0d9488',
        border: '1px solid #14b8a6',
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-16">
        <div className="rounded-full h-8 w-8 border-t-4 border-b-4 border-teal-500 border-opacity-75 animate-pulse"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-500 text-center text-base sm:text-lg bg-red-50/80 rounded-sm py-2 px-4 shadow-xs">
        Error happened while loading book info.
      </div>
    );
  }

  return (
    <section className="py-4 sm:py-6 md:py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white-50 to-white animate-fade-in">
      <div className="max-w-3xl mx-auto shadow-xs border border-transparent bg-gradient-to-r from-teal-200/50 to-gray-200/50 p-4 sm:p-6 rounded-sm bg-white hover:bg-teal-50/20 transition-colors duration-300">
        <h1 className="text-lg sm:text-xl font-medium text-gray-800 mb-4 text-center sm:text-left tracking-tight">
          {book.title}
        </h1>

        <div className="flex flex-col md:flex-row gap-4 sm:gap-6 items-center">
          <div className="md:w-1/2 group">
            <img
              src={getImgUrl(book.coverImage)}
              alt={`Cover of ${book.title}`}
              className="w-full h-auto max-h-80 object-contain rounded-sm shadow-xs mb-4 sm:mb-6 transition-all duration-300 group-hover:scale-105 group-hover:ring-1 group-hover:ring-teal-200"
            />
          </div>

          <div className="md:w-1/2 flex flex-col justify-between">
            <div className="mb-4 space-y-2">
              <p className="text-base sm:text-lg text-gray-700 tracking-tight">
                <strong>Author:</strong> {book.author || 'Unknown'}
              </p>
              <p className="text-base sm:text-lg text-gray-700 tracking-tight">
                <strong>Published:</strong>{' '}
                {book.createdAt
                  ? new Date(book.createdAt).toLocaleDateString()
                  : 'Unknown'}
              </p>
              <p className="text-base sm:text-lg text-gray-700 capitalize tracking-tight">
                <strong>Category:</strong> {book.category || 'Uncategorized'}
              </p>
              <p className="text-base sm:text-lg text-gray-700 line-clamp-3 tracking-tight">
                <strong>Description:</strong>{' '}
                {book.description || 'No description available.'}
              </p>
            </div>

            <button
              onClick={() => handleAddToCart(book)}
              disabled={isLoading || isError}
              className="flex items-center justify-center gap-2 px-6 py-2 bg-gradient-to-r from-teal-300 to-teal-400 text-white font-medium rounded-sm shadow-xs hover:shadow-sm hover:scale-105 hover:rotate-[0.3deg] hover:bg-teal-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 min-w-[140px] animate-pulse-once text-base sm:text-lg"
              aria-label={`Add ${book.title} to cart`}
            >
              <FiShoppingCart className="text-base sm:text-lg" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleBook;
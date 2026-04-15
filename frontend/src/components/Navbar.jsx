import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoSearchOutline } from 'react-icons/io5';
import { useFetchAllBooksQuery } from '../redux/features/books/booksApi';
import { HiMiniBars3CenterLeft } from 'react-icons/hi2';
import { FaRegUser } from 'react-icons/fa';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { FaRegHeart } from 'react-icons/fa';
import avatarImg from '../assets/avatar.png';
import { useSelector } from 'react-redux';
import { useAuth } from '../context/AuthContext';

const navigation = [
  { name: 'Dashboard', href: '/dashboard' }, 
  { name: 'Orders', href: '/orders' },
  { name: 'Cart Page', href: '/cart' },
  { name: 'Check Out', href: '/checkout' },
];

const Navbar = ({ setIsDropdownOpen, isDropdownOpen }) => {
  const { currentUser, logout } = useAuth();
  const cartItems = useSelector((state) => state.cart?.cartItems || []);

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const searchRef = useRef(null);
  const { data: books = [] } = useFetchAllBooksQuery();

  // Close search dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredBooks = books.filter(book => 
    book.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    book.category?.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 5); // show top 5 matches

  const handleLogOut = async () => {
    try {
      await logout();
      setIsDropdownOpen(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <nav className="flex justify-between items-center">

        {/* left side */}

        <div className="flex items-center md:gap-16 gap-4">
          <Link to="/">
            <HiMiniBars3CenterLeft
              className="size-6 text-gray-300 hover:text-gray-500 transition-colors"
              aria-label="Menu"
            />
          </Link>

          <div ref={searchRef} className="relative w-32 xs:w-40 sm:w-72 space-x-2">
            <IoSearchOutline className="absolute inline-block size-4 left-2 md:left-3 top-1/2 -translate-y-1/2 text-gray-300" />
            <input
              type="text"
              placeholder="Search here..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchDropdownOpen(e.target.value.length > 0);
              }}
              onFocus={() => setIsSearchDropdownOpen(searchQuery.length > 0)}
              className="bg-gray-800 text-gray-200 w-full py-1 md:px-10 px-7 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all text-sm leading-none placeholder-gray-400"
              aria-label="Search books"
            />
            
            {/* Live Search Dropdown */}
            {isSearchDropdownOpen && (
              <div className="absolute top-[120%] mt-1 w-full bg-white shadow-lg rounded-md z-50 max-h-80 overflow-y-auto border border-gray-100">
                {filteredBooks.length > 0 ? (
                  <ul className="py-2">
                    {filteredBooks.map((book) => (
                      <li key={book._id}>
                        <Link
                          to={`/books/${book._id}`}
                          onClick={() => {
                            setIsSearchDropdownOpen(false);
                            setSearchQuery("");
                          }}
                          className="flex items-center px-4 py-2 hover:bg-gray-100 transition-colors"
                        >
                          <img 
                            src={book?.coverImage || "https://via.placeholder.com/150?text=No+Image"} 
                            alt={book?.title} 
                            className="w-8 h-10 object-cover rounded mr-3 border border-gray-200"
                          />
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-800 line-clamp-1">{book?.title}</span>
                            <span className="text-xs text-gray-500">{book?.category}</span>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-4 text-sm text-gray-500 text-center">
                    No books found.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* right side */}

        <div className="relative flex items-center md:space-x-3 space-x-2">
          <div>
            {currentUser ? (
              <>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  aria-label="User profile"
                >
                  <img
                    src={currentUser.photoURL || avatarImg}
                    alt="User avatar"
                    className={`size-6 rounded-full ${currentUser ? 'ring-2 ring-blue-500' : ''}`}
                  />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-33 md:w-48 bg-white shadow-lg rounded-md z-40">
                    <ul className="py-2">
                      {navigation.map((item) => (
                        <li key={item.name} onClick={() => setIsDropdownOpen(false)}>
                          <Link
                            to={item.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <button
                          onClick={handleLogOut}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                          aria-label="Logout"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login" aria-label="Login">
                <FaRegUser className="size-6 text-gray-200 hover:text-gray-400 transition-colors" />
              </Link>
            )}
          </div>

          <button className="hidden sm:block" aria-label="Wishlist">
            <FaRegHeart className="size-6 text-gray-200 hover:text-gray-400 transition-colors" />
          </button>

          <Link
            to="/cart"
            className="bg-teal-500 text-gray-100 p-1 sm:px-6 px-2 flex items-center rounded-sm hover:bg-teal-600 transition-colors"
            aria-label="Cart"
          >
            <AiOutlineShoppingCart className="text-gray-100" />
            <span className="text-sm font-semibold sm:ml-1">{cartItems.length}</span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
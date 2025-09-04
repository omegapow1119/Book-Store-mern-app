import React from 'react';
import { Link } from 'react-router-dom';
import { IoSearchOutline } from 'react-icons/io5';
import { HiMiniBars3CenterLeft } from 'react-icons/hi2';
import { FaRegUser } from 'react-icons/fa';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { FaRegHeart } from 'react-icons/fa';
import avatarImg from '../assets/avatar.png';
import { useSelector } from 'react-redux';
import { useAuth } from '../context/AuthContext';

const navigation = [
  { name: 'Dashboard', href: '/dashboard' }, //changed by me 
  { name: 'Orders', href: '/orders' },
  { name: 'Cart Page', href: '/cart' },
  { name: 'Check Out', href: '/checkout' },
];

const Navbar = ({ setIsDropdownOpen, isDropdownOpen }) => {
  const { currentUser, logout } = useAuth();
  const cartItems = useSelector((state) => state.cart?.cartItems || []);

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

          <div className="relative w-32 xs:w-40 sm:w-72 space-x-2">
            <IoSearchOutline className="absolute inline-block size-4 left-2 md:left-3 top-1/2 -translate-y-1/2 text-gray-300" />
            <input
              type="text"
              placeholder="Search here..."
              className="bg-gray-800 text-gray-200 w-full py-1 md:px-10 px-7 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all text-sm leading-none placeholder-gray-400"
              aria-label="Search books"
            />
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
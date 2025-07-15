import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaTwitter, FaFacebookF } from 'react-icons/fa';

// Import the background image
import footerBg from "../assets/Foot.jpg";

const Footer = () => {
    return (
        <footer
            className="relative py-6 custom-630:py-4 px-4 custom-630:px-3 sm:py-6 sm:px-4 md:py-10 md:px-6 lg:px-8 text-white"
            style={{
                backgroundImage: `url(${footerBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed', // Parallax effect
            }}
        >
            {/* Overlay for readability */}
            <div className="absolute inset-0 bg-black opacity-60 z-0"></div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 animate-fade-in">
                {/* Quick Links */}
                <div className="relative slide-in-left p-2">
                    <h3 className="text-lg font-semibold mb-4 drop-shadow-md">Quick Links</h3>
                    <ul className="space-y-2">
                        <li className="relative">
                            <Link
                                to="/"
                                className="relative inline-block hover:text-teal-400 hover:scale-105 transition-all duration-400 drop-shadow-sm after:content-[''] after:absolute after:w-0 after:h-[3px] after:bg-teal-400 after:bottom-[-2px] after:left-0 after:transition-all after:duration-400 after:ease-in-out hover:after:w-full hover:drop-shadow-[0_0_8px_rgba(94,234,212,0.6)] cursor-pointer"
                            >
                                Home
                            </Link>
                        </li>
                        <li className="relative">
                            <Link
                                to="/about"
                                className="relative inline-block hover:text-teal-400 hover:scale-105 transition-all duration-400 drop-shadow-sm after:content-[''] after:absolute after:w-0 after:h-[3px] after:bg-teal-400 after:bottom-[-2px] after:left-0 after:transition-all after:duration-400 after:ease-in-out hover:after:w-full hover:drop-shadow-[0_0_8px_rgba(94,234,212,0.6)] cursor-pointer"
                            >
                                About
                            </Link>
                        </li>
                        <li className="relative">
                            <Link
                                to="/menu"
                                className="relative inline-block hover:text-teal-400 hover:scale-105 transition-all duration-400 drop-shadow-sm after:content-[''] after:absolute after:w-0 after:h-[3px] after:bg-teal-400 after:bottom-[-2px] after:left-0 after:transition-all after:duration-400 after:ease-in-out hover:after:w-full hover:drop-shadow-[0_0_8px_rgba(94,234,212,0.6)] cursor-pointer"
                            >
                                Books
                            </Link>
                        </li>
                        <li className="relative">
                            <Link
                                to="/contact"
                                className="relative inline-block hover:text-teal-400 hover:scale-105 transition-all duration-400 drop-shadow-sm after:content-[''] after:absolute after:w-0 after:h-[3px] after:bg-teal-400 after:bottom-[-2px] after:left-0 after:transition-all after:duration-400 after:ease-in-out hover:after:w-full hover:drop-shadow-[0_0_8px_rgba(94,234,212,0.6)] cursor-pointer"
                            >
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div className="relative slide-in-right p-2">
                    <h3 className="text-lg font-semibold mb-4 drop-shadow-md">Contact Us</h3>
                    <p className="text-sm mb-2 drop-shadow-sm">123 Book Lane, Story City, India</p>
                    <p className="text-sm mb-2 drop-shadow-sm">Phone: +91 98765 43210</p>
                    <p className="text-sm drop-shadow-sm">
                        Email:{' '}
                        <a
                            href="mailto:info@bookstoreapp.com"
                            className="relative inline-block hover:text-teal-400 transition-colors duration-300 after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-teal-400 after:bottom-[-2px] after:left-0 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full cursor-pointer"
                        >
                            info@bookstoreapp.com
                        </a>
                    </p>
                </div>

                {/* Newsletter */}
                <div className="relative slide-in-left p-2">
                    <h3 className="text-lg font-semibold mb-4 drop-shadow-md">Newsletter</h3>
                    <p className="text-sm mb-4 drop-shadow-sm">Subscribe for the latest book updates and offers!</p>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="px-4 py-2 rounded-md text-gray-800 bg-white bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all duration-300 cursor-text"
                        />
                        <button className="relative bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 hover:ring-2 hover:ring-teal-400 transition-all duration-300 animate-pulse-hover cursor-pointer">
                            Subscribe
                        </button>
                    </div>
                </div>

                {/* Social Media */}
                <div className="relative slide-in-right p-2">
                    <h3 className="text-lg font-semibold mb-4 drop-shadow-md">Follow Us</h3>
                    <div className="flex gap-4">
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative cursor-pointer"
                        >
                            <FaInstagram className="text-2xl hover:text-teal-400 hover:scale-110 transition-all duration-300 drop-shadow-sm" />
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative cursor-pointer"
                        >
                            <FaTwitter className="text-2xl hover:text-teal-400 hover:scale-110 transition-all duration-300 drop-shadow-sm" />
                        </a>
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative cursor-pointer"
                        >
                            <FaFacebookF className="text-2xl hover:text-teal-400 hover:scale-110 transition-all duration-300 drop-shadow-sm" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="relative z-10 mt-8 pt-6 border-t border-gray-400 border-opacity-50 text-center text-sm fade-in-delayed">
                <p
                    className="relative inline-block drop-shadow-sm hover:text-teal-300 hover:scale-105 transition-all duration-300 hover:drop-shadow-[0_0_6px_rgba(94,234,212,0.5)] after:content-[''] after:absolute after:w-0 after:h-[1px] after:bg-teal-300 after:bottom-[-2px] after:left-0 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full cursor-default"
                >
                    © 2025 BookStoreApp. By Abhishek Kumar.
                </p>
            </div>

            {/* Custom Styles */}
            <style>
                {`
                    /* Animations */
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(10px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    .animate-fade-in {
                        animation: fadeIn 0.5s ease-out forwards;
                    }

                    @keyframes slideInLeft {
                        from { opacity: 0; transform: translateX(-20px); }
                        to { opacity: 1; transform: translateX(0); }
                    }
                    .slide-in-left {
                        animation: slideInLeft 0.6s ease-out forwards;
                    }

                    @keyframes slideInRight {
                        from { opacity: 0; transform: translateX(20px); }
                        to { opacity: 1; transform: translateX(0); }
                    }
                    .slide-in-right {
                        animation: slideInRight 0.6s ease-out forwards;
                    }

                    @keyframes fadeInDelayed {
                        from { opacity: 0; transform: translateY(5px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    .fade-in-delayed {
                        animation: fadeInDelayed 0.5s ease-out forwards;
                        animation-delay: 0.8s;
                        opacity: 0;
                    }

                    @keyframes pulseHover {
                        0% { transform: scale(1); }
                        50% { transform: scale(1.05); }
                        100% { transform: scale(1); }
                    }
                    .animate-pulse-hover:hover {
                        animation: pulseHover 0.6s ease-in-out infinite;
                    }

                    /* Parallax Zoom Effect */
                    footer {
                        background-size: 100%;
                        transition: background-size 0.3s ease;
                    }
                    footer:hover {
                        background-size: 105%;
                    }
                `}
            </style>
        </footer>
    );
};

export default Footer;
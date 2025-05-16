import React, { useState } from "react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="sticky top-0 left-0 w-full z-10 py-5 px-5">
      <header className="bg-white shadow-md p-4 rounded-lg ">
        {/* Desktop Menu */}
        <div className="hidden md:flex justify-between items-center">
          <a href="/">
            <div className="text-3xl font-bold text-black">MoneyFy</div>
          </a>
          {/* Navigation Links */}
          <div className="flex gap-4">
            <a href="/#about" className="text-gray-700 hover:text-indigo-600">
              About us
            </a>
            <a href="/" className="text-gray-700 hover:text-indigo-600">
              Our Features
            </a>
            <a href="#footer" className="text-gray-700 hover:text-indigo-600">
              Contact Us
            </a>
          </div>
          <div className="flex gap-4 items-center">
            <a href="/login" className="text-gray-700 hover:text-indigo-600">
              Register
            </a>
            <a
              href="/login"
              className="text-white bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-700"
            >
              Login
            </a>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex justify-between items-center">
          <div className="text-3xl font-bold text-black">MoneyFy</div>
          <button onClick={toggleMobileMenu} className="text-indigo-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg p-4 space-y-4">
            <a href="#" className="block text-gray-700">
              About us
            </a>
            <a href="#" className="block text-gray-700">
              Our Features
            </a>
            <a href="#" className="block text-gray-700">
              Contact Us
            </a>
            <a
              href="#"
              className="block text-white bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-700"
            >
              Register
            </a>
            <a
              href="#"
              className="block text-white bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-700"
            >
              Login
            </a>
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;

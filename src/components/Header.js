'use client';
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { GiEarthAmerica } from "react-icons/gi"; // Importing the earth-cloud icon

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const overlayRef = useRef(null);

  // Toggle menu visibility
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Close menu if user clicks outside the menu or overlay
  const handleClickOutside = (event) => {
    if (
      menuRef.current && !menuRef.current.contains(event.target) && 
      overlayRef.current && !overlayRef.current.contains(event.target)
    ) {
      setIsMenuOpen(false);
    }
  };

  // Add and clean up event listener
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and Weather App as clickable link */}
        <Link href="/" className="flex items-center space-x-2">
          <GiEarthAmerica className="w-8 h-8 text-white" /> {/* Earth-cloud icon */}
          <h1 className="text-2xl font-bold">Weather App</h1>
        </Link>

        {/* Hamburger Icon (Mobile) */}
        <button
          className="lg:hidden block text-white focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>

        {/* Desktop Navigation (visible on large screens) */}
        <nav className="hidden lg:flex flex-row space-x-6 text-left items-center">
          <ul className="flex flex-row space-x-6 text-white">
            <li>
              <Link href="/" className="hover:text-gray-300">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-gray-300">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-gray-300">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/weather" className="hover:text-gray-300">
                Weather
              </Link>
            </li>
          </ul>
        </nav>

        {/* Mobile Navigation Overlay */}
        {isMenuOpen && (
          <>
            {/* Overlay Background */}
            <div
              ref={overlayRef}
              className="fixed inset-0 bg-black opacity-50 z-10"
              onClick={toggleMenu} // Close the menu if clicked outside
            ></div>

            {/* Mobile Navigation Menu */}
            <nav
              ref={menuRef}
              className="fixed z-20 top-16 left-0 right-0 p-8 bg-white/40 backdrop-blur-md rounded-lg mx-4 mt-2"
            >
              {/* Close Button */}
              <button
                onClick={toggleMenu}
                className="absolute top-4 right-4 text-white text-3xl"
              >
                &times;
              </button>

              {/* Menu Links */}
              <ul className="flex flex-col items-center space-y-6 text-white text-xl">
                <li>
                  <Link href="/" className="hover:text-gray-300" onClick={toggleMenu}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-gray-300" onClick={toggleMenu}>
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-gray-300" onClick={toggleMenu}>
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/weather" className="hover:text-gray-300" onClick={toggleMenu}>
                    Weather
                  </Link>
                </li>
              </ul>
            </nav>
          </>
        )}
      </div>
    </header>
  );
}


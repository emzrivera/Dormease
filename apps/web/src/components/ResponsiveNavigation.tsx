'use client';

import React, { useState } from 'react';
import ResponsiveContainer from './ResponsiveContainer';
import ResponsiveImage from './ResponsiveImage';

const ResponsiveNavigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <nav className="bg-white relative z-50">
        <ResponsiveContainer padding="none" className="px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <ResponsiveImage
                src="/dormease-logo-1.svg"
                alt="Dormease Logo"
                width={120}
                height={40}
                className="h-5 w-auto"
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="/" className="text-dark hover:text-darkest px-3 py-2 rounded-md text-sm font-figtree transition-colors">
                  Discover
                </a>
                <a href="/about" className="text-dark hover:text-darkest px-3 py-2 rounded-md text-sm font-figtree transition-colors">
                  About Us
                </a>
                <a href="/list" className="text-dark hover:text-darkest px-3 py-2 rounded-md text-sm font-figtree transition-colors">
                  List Your Property
                </a>
                <a href="/how-it-works" className="text-dark hover:text-darkest px-3 py-2 rounded-md text-sm font-figtree transition-colors">
                  How It Works
                </a>
                <a href="/faqs" className="text-dark hover:text-darkest px-3 py-2 rounded-md text-sm font-figtree transition-colors">
                  FAQs
                </a>
                <a href="/login" className="bg-light text-white hover:bg-darkest px-5 py-1 rounded-md text-sm font-figtree transition-colors">
                  Login
                </a>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-dark hover:text-darkest focus:outline-none focus:text-darkest"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </ResponsiveContainer>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={toggleMenu}
          />
          
          {/* Mobile Menu Panel */}
          <div 
            className="fixed top-16 left-0 right-0 bg-white shadow-lg z-50 md:hidden transform transition-transform duration-300 ease-in-out"
            id="mobile-menu" 
            role="menu" 
            aria-label="Mobile Navigation"
          >
            <div className="px-6 py-4 space-y-2 border-b border-lightBorder">
              <a 
                href="/" 
                className="block py-3 px-4 text-dark hover:text-darkest hover:bg-lightestGray rounded-md text-base font-figtree transition-colors"
                onClick={toggleMenu}
              >
                Discover
              </a>
              <a 
                href="/about" 
                className="block py-3 px-4 text-dark hover:text-darkest hover:bg-lightestGray rounded-md text-base font-figtree transition-colors"
                onClick={toggleMenu}
              >
                About Us
              </a>
              <a 
                href="/list" 
                className="block py-3 px-4 text-dark hover:text-darkest hover:bg-lightestGray rounded-md text-base font-figtree transition-colors"
                onClick={toggleMenu}
              >
                List Your Property
              </a>
              <a 
                href="/how-it-works" 
                className="block py-3 px-4 text-dark hover:text-darkest hover:bg-lightestGray rounded-md text-base font-figtree transition-colors"
                onClick={toggleMenu}
              >
                How It Works
              </a>
              <a 
                href="/faqs" 
                className="block py-3 px-4 text-dark hover:text-darkest hover:bg-lightestGray rounded-md text-base font-figtree transition-colors"
                onClick={toggleMenu}
              >
                FAQs
              </a>
              <a 
                href="/login" 
                className="block py-3 px-4 bg-light text-white hover:bg-darkest rounded-md text-base font-figtree transition-colors text-center"
                onClick={toggleMenu}
              >
                Login
              </a>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ResponsiveNavigation; 
'use client';

import React, { useState, useEffect } from 'react';
import ResponsiveContainer from './ResponsiveContainer';
import ResponsiveImage from './ResponsiveImage';

const ResponsiveNavigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
  }, [isMenuOpen]);

  return (
    <nav className="bg-white">
      <ResponsiveContainer padding="lg">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href='/home' className="flex-shrink-0">
            <ResponsiveImage
              src="/dormease-logo-1.svg"
              alt="Dormease Logo"
              width={120}
              height={40}
              className="h-5 w-auto"
            />
          </a>

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

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <>
            
            {/* Menu Panel */}
            <div className="fixed top-16 left-0 right-0 h-full bg-white z-50">
              {/* Menu items */}
              <div className="px-4 pt-2 pb-3 space-y-1 sm:px-3 border-t border-lightBorder">
                <a href="/" className="text-dark hover:text-darkest block px-3 py-2 rounded-md text-base font-figtree transition-colors">
                  Discover
                </a>
                <a href="/about" className="text-dark hover:text-darkest block px-3 py-2 rounded-md text-base font-figtree transition-colors">
                  About Us
                </a>
                <a href="/list" className="text-dark hover:text-darkest block px-3 py-2 rounded-md text-base font-figtree transition-colors">
                  List Your Property
                </a>
                <a href="/how-it-works" className="text-dark hover:text-darkest block px-3 py-2 rounded-md text-base font-figtree transition-colors">
                  How It Works
                </a>
                <a href="/faqs" className="text-dark hover:text-darkest block px-3 py-2 rounded-md text-base font-figtree transition-colors">
                  FAQs
                </a>
                <a href="/login" className="bg-light text-white hover:bg-darkest block px-3 py-2 rounded-md text-base font-figtree transition-colors text-center">
                  Login
                </a>
              </div>
            </div>
          </>
        )}
      </ResponsiveContainer>
    </nav>
  );
};

export default ResponsiveNavigation; 
import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Sun, Moon, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? (isDarkMode ? 'bg-gray-800 shadow-md' : 'bg-white shadow-md') 
          : (isDarkMode ? 'bg-gray-900' : 'bg-neutral-50')
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center">
              <span className="text-white font-semibold">B</span>
            </div>
            <h1 className="text-2xl font-serif font-bold">BatikVision</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="hover:text-indigo-600 transition-colors">Home</a>
            <a href="#about" className="hover:text-indigo-600 transition-colors">About</a>
            <a href="#gallery" className="hover:text-indigo-600 transition-colors">Gallery</a>
            <a href="#identify" className="hover:text-indigo-600 transition-colors">Identify</a>
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </nav>

          {/* Mobile menu button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <ul className="space-y-4">
              <li><a href="#" className="block py-2 hover:text-indigo-600 transition-colors">Home</a></li>
              <li><a href="#about" className="block py-2 hover:text-indigo-600 transition-colors">About</a></li>
              <li><a href="#gallery" className="block py-2 hover:text-indigo-600 transition-colors">Gallery</a></li>
              <li><a href="#identify" className="block py-2 hover:text-indigo-600 transition-colors">Identify</a></li>
              <li>
                <button 
                  onClick={toggleTheme}
                  className="flex items-center py-2 hover:text-indigo-600 transition-colors"
                  aria-label="Toggle theme"
                >
                  <span className="mr-2">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
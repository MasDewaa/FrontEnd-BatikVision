import React from 'react';
import { ArrowDown } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Hero: React.FC = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `url('/090332972d43d345625a6c1cdb595979.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(2px)'
        }}
      />
      
      {/* Additional overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Discover and Identify
          </span>
          <br />
          <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
            Traditional Batik Patterns
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
          Our advanced AI helps you instantly recognize and learn about Indonesia's rich batik heritage.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href="#identify" 
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-lg font-medium transition-colors duration-300 flex items-center"
          >
            Identify Batik
            <ArrowDown className="ml-2 h-5 w-5" />
          </a>
          <a 
            href="#gallery" 
            className={`px-8 py-3 rounded-full text-lg font-medium transition-colors duration-300 flex items-center ${
              isDarkMode 
                ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                : 'bg-white hover:bg-gray-100 text-gray-900 border border-gray-300'
            }`}
          >
            Explore Gallery
          </a>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className={isDarkMode ? 'text-white' : 'text-gray-900'} />
      </div>
    </section>
  );
};

export default Hero;
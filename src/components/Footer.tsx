import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const Footer: React.FC = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <footer className={`py-8 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center">
                <span className="text-white font-semibold text-sm">B</span>
              </div>
              <span className="text-xl font-serif font-bold">BatikVision</span>
            </div>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Preserving cultural heritage through technology
            </p>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              &copy; {new Date().getFullYear()} BatikVision Research Project
            </p>
            <p className="text-xs mt-1 text-gray-500 dark:text-gray-500">
              Powered by Transfer Learning & Hyperparameter Tuning
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
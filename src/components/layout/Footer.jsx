import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link to="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
              Toolify
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              A collection of 50 practical utility tools for everyday use
            </p>
          </div>
          
          <div className="flex items-center">
            <a 
              href="https://www.zapt.ai" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Made on ZAPT
            </a>
            <span className="mx-2 text-gray-400">•</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              © {currentYear} Toolify
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, FileEdit, Info, Book, Github, Menu, X, MessageSquare } from 'lucide-react';

interface HeaderProps {
  viewMode: 'edit' | 'shared';
  setViewMode: (mode: 'edit' | 'shared') => void;
  currentPath?: string;
}

const Header: React.FC<HeaderProps> = ({ viewMode, setViewMode, currentPath = '/' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-gray-900/80 backdrop-blur-md border-b border-gray-700/50 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link 
              to="/" 
              className="flex items-center space-x-3 group transition-all duration-300 ease-in-out"
            >
              <Heart className="text-pink-500 group-hover:scale-110 transition-transform duration-300" size={28} fill="currentColor" />
              <h1 className="text-2xl font-bold text-white tracking-tight group-hover:text-pink-200 transition-colors duration-300">
                Dating Red Flag Checker
              </h1>
            </Link>

            <div className="hidden md:flex items-center space-x-6">
              <nav className="flex items-center space-x-6">

              <Link
                  to="/about"
                  className={`flex items-center transition-all duration-300 ease-in-out transform hover:scale-105 ${
                    currentPath === '/calculator' ? 'text-white' : 'text-gray-200 hover:text-white'
                  }`}
                >
                  <Info size={16} className="mr-1" />
                  <span className="font-medium">About</span>
                </Link>

                <Link
                  to="/quiz"
                  className={`flex items-center transition-all duration-300 ease-in-out transform hover:scale-105 ${
                    currentPath === '/quiz' ? 'text-white' : 'text-gray-200 hover:text-white'
                  }`}
                >
                  <MessageSquare size={16} className="mr-1" />
                  <span className="font-medium">Quiz</span>
                </Link>

                <Link
                  to="/calculator"
                  className={`flex items-center transition-all duration-300 ease-in-out transform hover:scale-105 ${
                    currentPath === '/advice' ? 'text-white' : 'text-gray-200 hover:text-white'
                  }`}
                >
                  <Book size={16} className="mr-1" />
                  <span className="font-medium">Calculator</span>
                </Link>
                
                <Link
                  to="/advice"
                  className={`flex items-center transition-all duration-300 ease-in-out transform hover:scale-105 ${
                    currentPath === '/advice' ? 'text-white' : 'text-gray-200 hover:text-white'
                  }`}
                >
                  <Book size={16} className="mr-1" />
                  <span className="font-medium">Advice</span>
                </Link>
                
                <a
                  href="https://github.com/duriantaco/check-red-flag"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-200 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  <Github size={16} className="mr-1" />
                  <span className="font-medium">GitHub</span>
                </a>
              </nav>

              {viewMode === 'shared' && (
                <button
                  onClick={() => setViewMode('edit')}
                  className="flex items-center px-3 py-1.5 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-full hover:from-red-700 hover:to-pink-700 transition-all duration-300 ease-in-out shadow-md"
                >
                  <FileEdit size={16} className="mr-1" />
                  <span className="text-sm font-medium">Edit Mode</span>
                </button>
              )}
            </div>

            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-white focus:outline-none"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-3">
              <nav className="flex flex-col space-y-3">
                {/* Updated mobile menu as well */}
                <Link
                  to="/quiz"
                  className={`flex items-center py-2 px-3 rounded-lg hover:bg-gray-800/50 ${
                    currentPath === '/quiz' 
                      ? 'text-white bg-gray-800/70' 
                      : 'text-gray-200 hover:text-white'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <MessageSquare size={16} className="mr-2" />
                  <span className="font-medium">Quiz</span>
                </Link>
                
                <Link
                  to="/about"
                  className={`flex items-center py-2 px-3 rounded-lg hover:bg-gray-800/50 ${
                    currentPath === '/about' 
                      ? 'text-white bg-gray-800/70' 
                      : 'text-gray-200 hover:text-white'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Info size={16} className="mr-2" />
                  <span className="font-medium">About</span>
                </Link>
                
                <Link
                  to="/advice"
                  className={`flex items-center py-2 px-3 rounded-lg hover:bg-gray-800/50 ${
                    currentPath === '/advice' 
                      ? 'text-white bg-gray-800/70' 
                      : 'text-gray-200 hover:text-white'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Book size={16} className="mr-2" />
                  <span className="font-medium">Advice</span>
                </Link>
                
                <a
                  href="https://github.com/duriantaco/check-red-flag"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-200 hover:text-white py-2 px-3 rounded-lg hover:bg-gray-800/50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Github size={16} className="mr-2" />
                  <span className="font-medium">GitHub</span>
                </a>
                
                {viewMode === 'shared' && (
                  <button
                    onClick={() => {
                      setViewMode('edit');
                      toggleMenu();
                    }}
                    className="flex items-center px-3 py-2 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-lg hover:from-red-700 hover:to-pink-700 transition-all duration-300 ease-in-out shadow-md"
                  >
                    <FileEdit size={16} className="mr-2" />
                    <span className="font-medium">Edit Mode</span>
                  </button>
                )}
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
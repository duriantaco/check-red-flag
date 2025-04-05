import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Heart, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-16 bg-gradient-to-r from-gray-900 to-gray-950 border-t border-pink-900/20 pt-10 pb-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-500/20 to-transparent"></div>
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-full blur-xl"></div>
      
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-800/50 pb-8 mb-8">
          <div className="flex items-center mb-6 md:mb-0">
            <Heart className="text-pink-500 mr-3" size={20} fill="currentColor" strokeWidth={1.5} />
            <h3 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">
              Dating Red Flag Checker
            </h3>
          </div>
          
          <div className="flex items-center space-x-4">
            <a 
              href="https://github.com/duriantaco/check-red-flag" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2 bg-gray-800/80 hover:bg-gray-700/80 rounded-full transition-all duration-300 text-white border border-gray-700/50 hover:border-pink-500/30"
            >
              <Github size={16} className="mr-2" />
              <span className="text-sm">Star on GitHub</span>
            </a>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-gray-400 mb-8">
          <div>
            <h4 className="text-white font-medium mb-3">About</h4>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              A satirical tool designed to poke fun at the internet's obsession with relationship red flags.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-3">Features</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/quiz" className="hover:text-pink-400 transition-colors">Red Flag Quiz</Link>
              </li>
              <li>
                <Link to="/calculator" className="hover:text-pink-400 transition-colors">Dating Calculator</Link>
              </li>
              <li>
                <Link to="/advice" className="hover:text-pink-400 transition-colors">Satire Advice</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-3">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://github.com/duriantaco/check-red-flag" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors flex items-center">
                  GitHub <ExternalLink size={12} className="ml-1" />
                </a>
              </li>
              <li>
                <Link to="/about" className="hover:text-pink-400 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-pink-400 transition-colors">FAQ</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-3">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/privacy-policy" className="hover:text-pink-400 transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms-of-use" className="hover:text-pink-400 transition-colors">Terms of Use</Link>
              </li>
              <li>
                <Link to="/disclaimer" className="hover:text-pink-400 transition-colors">Disclaimer</Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-6 border-t border-gray-800/50 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Dating Red Flag Checker — A satirical project
          </p>
          
          <div className="flex items-center space-x-6">
            <Link to="/privacy-policy" className="text-gray-500 hover:text-pink-400 text-sm transition-colors">
              Privacy
            </Link>
            <Link to="/terms-of-use" className="text-gray-500 hover:text-pink-400 text-sm transition-colors">
              Terms
            </Link>
            <a 
              href="https://github.com/duriantaco/check-red-flag"
              target="_blank"
              rel="noopener noreferrer" 
              className="text-gray-500 hover:text-pink-400 text-sm transition-colors flex items-center"
            >
              <Github size={14} className="mr-1" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
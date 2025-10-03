import React from 'react';
import { Linkedin, Menu } from 'lucide-react';

interface HeaderProps {
  onToggleTemplates: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleTemplates }) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Linkedin className="h-8 w-8 text-linkedin-blue" />
            <h1 className="text-xl font-bold text-gray-900">
              Clipsy
            </h1>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleTemplates}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <Menu className="h-5 w-5" />
            <span>Templates</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

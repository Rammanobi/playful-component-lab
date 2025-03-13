
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, showBackButton = false }) => {
  const navigate = useNavigate();
  
  return (
    <header className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-gray-100 py-4 px-5">
      <div className="flex items-center">
        {showBackButton && (
          <button 
            onClick={() => navigate(-1)}
            className="mr-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5 text-app-darkGray" />
          </button>
        )}
        <h1 className="text-2xl font-medium text-app-darkGray">{title}</h1>
      </div>
    </header>
  );
};

export default Header;

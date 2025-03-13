
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Moon, Utensils, Heart, Sparkles, FileText, Database } from 'lucide-react';
import Card from '@/components/ui/Card';

const Index = () => {
  return (
    <div className="app-container px-5 page-transition">
      <h1 className="text-4xl font-medium text-app-darkGray pt-8 pb-6">
        Wellness Tracker
      </h1>
      
      <div className="grid grid-cols-2 gap-4">
        <Link to="/sleep" className="transform transition-all duration-300 hover:scale-105">
          <Card className="h-full flex flex-col items-center justify-center py-8 hover:shadow-md">
            <Moon className="h-10 w-10 text-app-blue mb-4" />
            <span className="text-lg font-medium text-app-darkGray">Sleep</span>
          </Card>
        </Link>
        
        <Link to="/food" className="transform transition-all duration-300 hover:scale-105">
          <Card className="h-full flex flex-col items-center justify-center py-8 hover:shadow-md">
            <Utensils className="h-10 w-10 text-app-blue mb-4" />
            <span className="text-lg font-medium text-app-darkGray">Food</span>
          </Card>
        </Link>
        
        <Link to="/stress" className="transform transition-all duration-300 hover:scale-105">
          <Card className="h-full flex flex-col items-center justify-center py-8 hover:shadow-md">
            <Heart className="h-10 w-10 text-app-blue mb-4" />
            <span className="text-lg font-medium text-app-darkGray">Stress</span>
          </Card>
        </Link>
        
        <Link to="/skincare" className="transform transition-all duration-300 hover:scale-105">
          <Card className="h-full flex flex-col items-center justify-center py-8 hover:shadow-md">
            <Sparkles className="h-10 w-10 text-app-blue mb-4" />
            <span className="text-lg font-medium text-app-darkGray">Skincare</span>
          </Card>
        </Link>
        
        <Link to="/day" className="transform transition-all duration-300 hover:scale-105">
          <Card className="h-full flex flex-col items-center justify-center py-8 hover:shadow-md">
            <FileText className="h-10 w-10 text-app-blue mb-4" />
            <span className="text-lg font-medium text-app-darkGray">Day Log</span>
          </Card>
        </Link>
        
        <Link to="/storage" className="transform transition-all duration-300 hover:scale-105">
          <Card className="h-full flex flex-col items-center justify-center py-8 hover:shadow-md">
            <Database className="h-10 w-10 text-app-blue mb-4" />
            <span className="text-lg font-medium text-app-darkGray">Storage</span>
          </Card>
        </Link>
      </div>
      
      <nav className="navbar">
        <Link to="/" className="navbar-item active">
          <Home className="h-6 w-6" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link to="/sleep" className="navbar-item">
          <Moon className="h-6 w-6" />
          <span className="text-xs mt-1">Sleep</span>
        </Link>
        <Link to="/food" className="navbar-item">
          <Utensils className="h-6 w-6" />
          <span className="text-xs mt-1">Food</span>
        </Link>
        <Link to="/stress" className="navbar-item">
          <Heart className="h-6 w-6" />
          <span className="text-xs mt-1">Stress</span>
        </Link>
        <Link to="/storage" className="navbar-item">
          <Database className="h-6 w-6" />
          <span className="text-xs mt-1">Data</span>
        </Link>
      </nav>
    </div>
  );
};

export default Index;

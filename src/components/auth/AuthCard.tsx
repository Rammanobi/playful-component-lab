
import React from 'react';
import { Card } from '@/components/ui/card';

interface AuthCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const AuthCard: React.FC<AuthCardProps> = ({ title, description, children }) => {
  return (
    <Card className="p-6 shadow-lg">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-app-darkGray">{title}</h2>
        <p className="text-gray-500 mt-2">{description}</p>
      </div>
      
      {children}
    </Card>
  );
};

export default AuthCard;

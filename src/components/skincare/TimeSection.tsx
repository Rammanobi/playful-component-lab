
import React from 'react';
import { Card } from '@/components/ui/card';

interface TimeSectionProps {
  title: string;
  time: string;
  icon: any;
  color: string;
  children: React.ReactNode;
}

const TimeSection: React.FC<TimeSectionProps> = ({ title, time, icon: Icon, color, children }) => (
  <Card className={`p-4 mb-4 border-l-4 ${color}`}>
    <div className="flex items-center mb-3">
      <Icon className="h-5 w-5 mr-2" />
      <h3 className="text-lg font-medium">{title}</h3>
      <span className="ml-auto text-sm text-gray-500">{time}</span>
    </div>
    {children}
  </Card>
);

export default TimeSection;

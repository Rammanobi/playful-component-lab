
import React from 'react';
import { cn } from '@/lib/utils';

interface RatingProps {
  value: number;
  onChange: (value: number) => void;
  max?: number;
  className?: string;
}

const Rating: React.FC<RatingProps> = ({ 
  value, 
  onChange, 
  max = 5,
  className 
}) => {
  const ratings = Array.from({ length: max }, (_, i) => i + 1);

  return (
    <div className={cn("flex justify-between mt-4", className)}>
      {ratings.map(rating => (
        <button
          key={rating}
          className={cn(
            "flex justify-center items-center w-12 h-12 rounded-md transition-all duration-200",
            value === rating 
              ? "bg-app-blue text-white transform scale-105" 
              : "bg-app-gray text-app-darkGray hover:bg-gray-200"
          )}
          onClick={() => onChange(rating)}
        >
          {rating}
        </button>
      ))}
    </div>
  );
};

export default Rating;

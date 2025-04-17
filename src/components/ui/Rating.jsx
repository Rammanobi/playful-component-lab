
import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Rating component that allows selecting a numeric rating
 * @param {Object} props
 * @param {number} props.value - Current rating value
 * @param {function} props.onChange - Function to call when rating changes
 * @param {number} [props.max=5] - Maximum rating value
 * @param {string} [props.className] - Additional CSS classes
 */
const Rating = ({ 
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

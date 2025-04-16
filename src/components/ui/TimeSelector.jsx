
import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

const TimeSelector = ({ 
  label, 
  value, 
  onChange,
  className
}) => {
  // Generate time options in 30-minute intervals
  const timeOptions = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute of [0, 30]) {
      const formattedHour = hour.toString().padStart(2, '0');
      const formattedMinute = minute.toString().padStart(2, '0');
      timeOptions.push(`${formattedHour}:${formattedMinute}`);
    }
  }

  return (
    <div className={cn("mb-4", className)}>
      {label && <label className="label-text block mb-2">{label}</label>}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="time-select w-full h-10 px-3 border rounded-md pr-10"
        >
          {timeOptions.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </div>
      </div>
    </div>
  );
};

export default TimeSelector;

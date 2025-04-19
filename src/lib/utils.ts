import { twMerge } from 'tailwind-merge';
import { clsx, ClassValue } from "clsx";
import { format, parseISO } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};

export const getCurrentDate = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const parseDate = (dateStr: string): Date => {
  return parseISO(dateStr);
};

export const formatDateString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const formatDateForDisplay = (dateStr: string) => {
  const date = parseDate(dateStr);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Add back the formatTime function
export const formatTime = (timeString: string): string => {
  if (!timeString) return '';
  
  // Time might be in HH:MM format or just HH
  const parts = timeString.split(':');
  let hour = parseInt(parts[0], 10);
  const minute = parts.length > 1 ? parts[1] : '00';
  
  const period = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12 || 12; // Convert to 12h format
  
  return `${hour}:${minute} ${period}`;
};

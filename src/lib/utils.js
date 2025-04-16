
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { v4 as uuidv4 } from 'uuid';
 
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// Create a function to get the current date in DD-MM-YYYY format
export function getCurrentDate() {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
  const yyyy = today.getFullYear();

  return `${dd}-${mm}-${yyyy}`;
}

// Parse date string in DD-MM-YYYY format
export function parseDate(dateStr) {
  const [day, month, year] = dateStr.split('-').map(Number);
  // Create new date (months are 0-indexed in JS Date)
  return new Date(year, month - 1, day);
}

// Format a Date object to DD-MM-YYYY
export function formatDateString(date, longFormat = false) {
  if (typeof date === 'string') {
    // If already in DD-MM-YYYY format, just return it or convert it to long format
    if (longFormat) {
      const dateObj = parseDate(date);
      return dateObj.toLocaleDateString('en-US', {
        weekday: 'short',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    }
    return date;
  }
  
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
  const yyyy = date.getFullYear();

  return `${dd}-${mm}-${yyyy}`;
}

// Format time from 24h format to 12h format
export function formatTime(timeString) {
  if (!timeString) return '';
  
  // Time might be in HH:MM format or just HH
  const parts = timeString.split(':');
  let hour = parseInt(parts[0], 10);
  const minute = parts.length > 1 ? parts[1] : '00';
  
  const period = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12 || 12; // Convert to 12h format
  
  return `${hour}:${minute} ${period}`;
}

// Generate a unique ID
export function generateId() {
  return uuidv4();
}

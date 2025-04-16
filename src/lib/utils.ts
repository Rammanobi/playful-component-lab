
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { v4 as uuidv4 } from 'uuid';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Create a short UUID
export function uuid(): string {
  return uuidv4();
}

// Get current date in DD-MM-YYYY format
export function getCurrentDate(): string {
  const now = new Date();
  return formatDateString(now);
}

// Format a date object to DD-MM-YYYY string
export function formatDateString(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  
  return `${day}-${month}-${year}`;
}

// Parse a DD-MM-YYYY string to Date object
export function parseDate(dateString: string): Date {
  const [day, month, year] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
}

// Format time from 24-hour format (e.g., "14:30") to 12-hour format (e.g., "2:30 PM")
export function formatTime(time: string): string {
  if (!time) return '';
  
  const [hourStr, minuteStr] = time.split(':');
  let hour = parseInt(hourStr);
  const minute = minuteStr;
  
  const ampm = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12;
  hour = hour ? hour : 12; // the hour '0' should be '12'
  
  return `${hour}:${minute} ${ampm}`;
}

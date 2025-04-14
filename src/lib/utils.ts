
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from 'uuid';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCurrentDate() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  
  return `${day}-${month}-${year}`;
}

export function formatDateString(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  
  return `${day}-${month}-${year}`;
}

export function parseDate(dateString: string): Date {
  const [day, month, year] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function formatTimeForDisplay(time: string): string {
  // Handle empty or invalid time
  if (!time || time === "") return "";
  
  // Assuming time is in 24-hour format like "14:30"
  const [hours, minutes] = time.split(':').map(Number);
  
  if (isNaN(hours) || isNaN(minutes)) return time;
  
  // Convert to 12-hour format
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12; // Convert 0 to 12 for 12 AM
  const displayMinutes = String(minutes).padStart(2, '0');
  
  return `${displayHours}:${displayMinutes} ${period}`;
}

export function generateId(): string {
  return uuidv4();
}

// Additional utility functions can be added here

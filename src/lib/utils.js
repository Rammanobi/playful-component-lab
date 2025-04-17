
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS classes
 * @param {string[]} inputs - The class names to merge
 * @returns {string} - The merged class names
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Generate a unique ID
 * @returns {string} - A unique ID
 */
export function generateId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

/**
 * Get the current date in YYYY-MM-DD format
 * @returns {string} - The current date
 */
export function getCurrentDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Format time from HH:MM to a more readable format
 * @param {string} time - Time in HH:MM format
 * @returns {string} - Formatted time (e.g. "9:00 AM")
 */
export function formatTime(time) {
  if (!time) return '';
  
  const [hours, minutes] = time.split(':');
  const parsedHours = parseInt(hours, 10);
  const period = parsedHours >= 12 ? 'PM' : 'AM';
  const displayHours = parsedHours % 12 || 12;
  
  return `${displayHours}:${minutes} ${period}`;
}

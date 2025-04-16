import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';

export function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ')
}

export function formatDate(input: Date | number): string {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function formatDateString(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

export function parseDate(dateString: string): Date {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function generateId(): string {
  return uuidv4();
}

export function getCurrentDate(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatTime(time: string): string {
  if (!time) return '';
  
  // Handle various time formats
  // If it's in 24-hour format (HH:MM), convert to 12-hour format
  if (/^\d{1,2}:\d{2}$/.test(time)) {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 || 12;
    return `${hour12}:${minutes.toString().padStart(2, '0')} ${period}`;
  }
  
  // If it's already in a readable format, return as is
  return time;
}

// Backward compatibility for any code that might use formatTimeForDisplay
export const formatTimeForDisplay = formatTime;

// Ensure the generateId function exists

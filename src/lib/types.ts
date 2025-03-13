
export interface SleepData {
  id: string;
  date: string;
  hoursSlept: number;
  quality: string;
  morningReminder: string;
}

export interface MealData {
  id: string;
  date: string;
  title: string;
  description: string;
  time: string;
}

export interface StressLog {
  id: string;
  date: string;
  rating: number;
  notes: string;
  morningCheckIn: string;
  eveningReview: string;
}

export interface SkincareRoutine {
  id: string;
  date: string;
  reminderTime: string;
  serum1: boolean;
  serum2: boolean;
  sunscreen: boolean;
  moisturizer: boolean;
}

export interface DayDescription {
  id: string;
  date: string;
  description: string;
}

export type StorageKeys = 
  | 'sleepData' 
  | 'mealData' 
  | 'stressLogs' 
  | 'skincareRoutines' 
  | 'dayDescriptions';

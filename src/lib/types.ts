
export interface SleepData {
  id: string;
  date: string;
  bedTime?: string;
  wakeTime?: string;
  hoursSlept: number;
  quality: string;
  notes?: string;
  morningReminder: string;
  timestamp: string;
}

export interface MealData {
  id: string;
  date: string;
  title: string;
  description: string;
  time: string;
  mealType?: string;
  satisfaction?: number;
  foods?: string[];
  notes?: string;
  timestamp: string;
}

export interface StressLog {
  id: string;
  date: string;
  rating: number;
  notes: string;
  time?: string;
  stressLevel?: number;
  triggers?: string;
  copingMechanisms?: string;
  timestamp: string;
}

export interface SkincareRoutine {
  id: string;
  date: string;
  reminderTime: string;
  serum1: boolean;
  serum2: boolean;
  sunscreen: boolean;
  moisturizer: boolean;
  routineType?: string;
  time?: string;
  cleanser?: string;
  productsUsed?: string[];
  notes?: string;
  timestamp: string;
}

export interface DayDescription {
  id: string;
  date: string;
  description: string;
  dayRating?: number;
  dailyGoals?: string;
  timestamp: string;
}

export type StorageKeys = 
  | 'sleepData' 
  | 'mealData' 
  | 'stressLogs' 
  | 'skincareRoutines' 
  | 'dayDescriptions';

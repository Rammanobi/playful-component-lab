
import { 
  SleepData, 
  MealData, 
  StressLog, 
  SkincareRoutine, 
  DayDescription,
  StorageKeys
} from './types';
import { getCurrentDate } from './utils';
import { toast } from 'sonner';

// Helper to handle storage errors
const safeStorage = {
  get: <T>(key: StorageKeys): T[] => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error(`Error retrieving ${key} from localStorage:`, e);
      return [];
    }
  },
  set: <T>(key: StorageKeys, value: T[]): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`Error storing ${key} in localStorage:`, e);
      toast.error(`Failed to save data. Storage might be full.`);
    }
  }
};

// Sleep Data
export const getSleepData = (): SleepData[] => {
  return safeStorage.get<SleepData>('sleepData');
};

export const saveSleepData = (newData: SleepData): void => {
  const data = getSleepData();
  safeStorage.set<SleepData>('sleepData', [...data, newData]);
};

// Meal Data
export const getMealData = (): MealData[] => {
  return safeStorage.get<MealData>('mealData');
};

export const saveMealData = (newData: MealData): void => {
  const data = getMealData();
  safeStorage.set<MealData>('mealData', [...data, newData]);
};

// Stress Logs
export const getStressLogs = (): StressLog[] => {
  return safeStorage.get<StressLog>('stressLogs');
};

export const saveStressLog = (newData: StressLog): void => {
  const logs = getStressLogs();
  safeStorage.set<StressLog>('stressLogs', [...logs, newData]);
};

// Skincare Routines
export const getSkincareRoutines = (): SkincareRoutine[] => {
  return safeStorage.get<SkincareRoutine>('skincareRoutines');
};

export const saveSkincareRoutine = (newData: SkincareRoutine): void => {
  const routines = getSkincareRoutines();
  safeStorage.set<SkincareRoutine>('skincareRoutines', [...routines, newData]);
};

// Day Descriptions
export const getDayDescriptions = (): DayDescription[] => {
  return safeStorage.get<DayDescription>('dayDescriptions');
};

export const saveDayDescription = (newData: DayDescription): void => {
  const descriptions = getDayDescriptions();
  safeStorage.set<DayDescription>('dayDescriptions', [...descriptions, newData]);
};

// Get today's data for any collection
export const getTodayData = <T extends { date: string }>(
  getFunction: () => T[]
): T | undefined => {
  const data = getFunction();
  const today = getCurrentDate();
  return data.find(item => item.date === today);
};

// Storage Management
export const getStorageSize = (): string => {
  try {
    let total = 0;
    for (const key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        total += localStorage[key].length * 2; // UTF-16 = 2 bytes per char
      }
    }
    const kb = Math.round(total / 1024 * 100) / 100;
    return `${kb} KB`;
  } catch (e) {
    console.error('Error calculating storage size:', e);
    return 'Error calculating';
  }
};

export const createBackup = (): Record<string, any> => {
  const backup: Record<string, any> = {};
  
  try {
    backup.sleepData = getSleepData();
    backup.mealData = getMealData();
    backup.stressLogs = getStressLogs();
    backup.skincareRoutines = getSkincareRoutines();
    backup.dayDescriptions = getDayDescriptions();
    backup.exportDate = new Date().toISOString();
    
    return backup;
  } catch (e) {
    console.error('Error creating backup:', e);
    toast.error('Failed to create backup');
    return {};
  }
};

export const importData = (data: Record<string, any>): boolean => {
  try {
    if (data.sleepData) safeStorage.set('sleepData', data.sleepData);
    if (data.mealData) safeStorage.set('mealData', data.mealData);
    if (data.stressLogs) safeStorage.set('stressLogs', data.stressLogs);
    if (data.skincareRoutines) safeStorage.set('skincareRoutines', data.skincareRoutines);
    if (data.dayDescriptions) safeStorage.set('dayDescriptions', data.dayDescriptions);
    
    return true;
  } catch (e) {
    console.error('Error importing data:', e);
    return false;
  }
};

export const clearAllStorage = (): void => {
  try {
    localStorage.clear();
    toast.success('Storage cleared successfully');
  } catch (e) {
    console.error('Error clearing storage:', e);
    toast.error('Failed to clear storage');
  }
};

export const getLastBackupDate = (): string => {
  try {
    const backupInfoStr = localStorage.getItem('backupInfo');
    if (!backupInfoStr) return 'Never';
    
    const backupInfo = JSON.parse(backupInfoStr);
    if (!backupInfo.lastBackup) return 'Never';
    
    return new Date(backupInfo.lastBackup).toLocaleDateString();
  } catch (e) {
    console.error('Error getting last backup date:', e);
    return 'Error';
  }
};

export const setLastBackupDate = (): void => {
  try {
    localStorage.setItem('backupInfo', JSON.stringify({
      lastBackup: new Date().toISOString()
    }));
  } catch (e) {
    console.error('Error setting last backup date:', e);
  }
};

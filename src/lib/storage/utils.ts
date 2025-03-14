
import { StorageKeys } from '../types';
import { toast } from 'sonner';

// Helper to handle storage errors
export const safeStorage = {
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

export const clearAllStorage = (): void => {
  try {
    localStorage.clear();
    toast.success('Storage cleared successfully');
  } catch (e) {
    console.error('Error clearing storage:', e);
    toast.error('Failed to clear storage');
  }
};

// Import from utils.ts
import { getCurrentDate } from '../utils';

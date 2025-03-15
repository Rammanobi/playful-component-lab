
import { toast } from 'sonner';
import { getSleepData } from './sleep';
import { getMealData } from './meal';
import { getStressLogs } from './stress'; 
import { getSkincareRoutines } from './skincare';
import { getDayDescriptions } from './day';

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

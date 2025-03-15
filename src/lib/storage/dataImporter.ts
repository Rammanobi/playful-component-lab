
import { safeStorage } from './utils';

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

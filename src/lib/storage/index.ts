
// Export storage functions from Supabase
export { 
  getSleepData,
  saveSleepData,
  updateSleepData,
  deleteSleepData,
  getMealData,
  saveMealData,
  updateMealData,
  deleteMealData,
  getStressLogs,
  saveStressLog,
  updateStressLog,
  deleteStressLog,
  getSkincareRoutines,
  saveSkincareRoutine,
  updateSkincareRoutine,
  deleteSkincareRoutine,
  getDayDescriptions,
  saveDayDescription,
  updateDayDescription,
  deleteDayDescription,
  getTodayData
} from '../supabase/storage';

// Keep the utility and backup functions
export { getStorageSize, getLastBackupDate, setLastBackupDate, clearAllStorage } from './utils';
export { createBackup, exportDataAsText, importData } from './backup';

// Import the functions we need for the unified functions
import {
  getSleepData,
  getMealData,
  getStressLogs,
  getSkincareRoutines,
  getDayDescriptions,
  deleteSleepData,
  deleteMealData,
  deleteStressLog,
  deleteSkincareRoutine,
  deleteDayDescription
} from '../supabase/storage';

// Add unified functions for the LogDetails components
export const getAllLogs = async () => {
  const [sleepData, mealData, stressLogs, skincareRoutines, dayDescriptions] = await Promise.all([
    getSleepData(),
    getMealData(),
    getStressLogs(),
    getSkincareRoutines(),
    getDayDescriptions()
  ]);
  
  return {
    sleepData,
    mealData,
    stressLogs,
    skincareRoutines,
    dayDescriptions
  };
};

export const deleteLogById = async (type: string, id: string) => {
  switch (type) {
    case 'sleep':
      return deleteSleepData(id);
    case 'meal':
      return deleteMealData(id);
    case 'stress':
      return deleteStressLog(id);
    case 'skincare':
      return deleteSkincareRoutine(id);
    case 'day':
      return deleteDayDescription(id);
    default:
      throw new Error(`Unknown log type: ${type}`);
  }
};

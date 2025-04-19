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

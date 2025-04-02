
// Export all storage functions from this central file
export { getTodayData, getStorageSize, getLastBackupDate, setLastBackupDate, clearAllStorage } from './utils';
export { getSleepData, saveSleepData, updateSleepData } from './sleep';
export { getMealData, saveMealData, updateMealData } from './meal';
export { getStressLogs, saveStressLog, updateStressLog } from './stress';
export { getSkincareRoutines, saveSkincareRoutine, updateSkincareRoutine } from './skincare';
export { getDayDescriptions, saveDayDescription, updateDayDescription } from './day';
export { createBackup, exportDataAsText, importData } from './backup';

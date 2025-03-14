
// Export all storage functions from this central file
export { getTodayData, getStorageSize, getLastBackupDate, setLastBackupDate, clearAllStorage } from './utils';
export { getSleepData, saveSleepData } from './sleep';
export { getMealData, saveMealData } from './meal';
export { getStressLogs, saveStressLog } from './stress';
export { getSkincareRoutines, saveSkincareRoutine } from './skincare';
export { getDayDescriptions, saveDayDescription } from './day';
export { createBackup, exportDataAsText, importData } from './backup';

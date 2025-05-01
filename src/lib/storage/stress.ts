
import { StressLog } from '../types';
import { safeStorage } from './utils';

export const getStressLogs = (): StressLog[] => {
  return safeStorage.get<StressLog>('stressLogs');
};

export const saveStressLog = (newData: StressLog): void => {
  const logs = getStressLogs();
  safeStorage.set<StressLog>('stressLogs', [...logs, newData]);
};

export const updateStressLog = (updatedData: StressLog): void => {
  const logs = getStressLogs();
  const index = logs.findIndex(item => item.id === updatedData.id);
  
  if (index !== -1) {
    logs[index] = updatedData;
    safeStorage.set<StressLog>('stressLogs', logs);
  }
};

export const deleteStressLog = (id: string): void => {
  const logs = getStressLogs();
  const filteredLogs = logs.filter(item => item.id !== id);
  safeStorage.set<StressLog>('stressLogs', filteredLogs);
};

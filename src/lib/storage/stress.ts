
import { StressLog } from '../types';
import { safeStorage } from './utils';

export const getStressLogs = (): StressLog[] => {
  return safeStorage.get<StressLog>('stressLogs');
};

export const saveStressLog = (newData: StressLog): void => {
  const logs = getStressLogs();
  safeStorage.set<StressLog>('stressLogs', [...logs, newData]);
};


import { SleepData } from '../types';
import { safeStorage } from './utils';

export const getSleepData = (): SleepData[] => {
  return safeStorage.get<SleepData>('sleepData');
};

export const saveSleepData = (newData: SleepData): void => {
  const data = getSleepData();
  safeStorage.set<SleepData>('sleepData', [...data, newData]);
};

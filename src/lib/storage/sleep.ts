
import { SleepData } from '../types';
import { safeStorage } from './utils';

export const getSleepData = (): SleepData[] => {
  return safeStorage.get<SleepData>('sleepData');
};

export const saveSleepData = (newData: SleepData): void => {
  const data = getSleepData();
  safeStorage.set<SleepData>('sleepData', [...data, newData]);
};

export const updateSleepData = (updatedData: SleepData): void => {
  const data = getSleepData();
  const index = data.findIndex(item => item.id === updatedData.id);
  
  if (index !== -1) {
    data[index] = updatedData;
    safeStorage.set<SleepData>('sleepData', data);
  }
};

export const deleteSleepData = (id: string): void => {
  const data = getSleepData();
  const filteredData = data.filter(item => item.id !== id);
  safeStorage.set<SleepData>('sleepData', filteredData);
};

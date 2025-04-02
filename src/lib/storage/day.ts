
import { DayDescription } from '../types';
import { safeStorage } from './utils';

export const getDayDescriptions = (): DayDescription[] => {
  return safeStorage.get<DayDescription>('dayDescriptions');
};

export const saveDayDescription = (newData: DayDescription): void => {
  const descriptions = getDayDescriptions();
  safeStorage.set<DayDescription>('dayDescriptions', [...descriptions, newData]);
};

export const updateDayDescription = (updatedData: DayDescription): void => {
  const descriptions = getDayDescriptions();
  const index = descriptions.findIndex(item => item.id === updatedData.id);
  
  if (index !== -1) {
    descriptions[index] = updatedData;
    safeStorage.set<DayDescription>('dayDescriptions', descriptions);
  }
};

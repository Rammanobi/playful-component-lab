
import { DayDescription } from '../types';
import { safeStorage } from './utils';

export const getDayDescriptions = (): DayDescription[] => {
  return safeStorage.get<DayDescription>('dayDescriptions');
};

export const saveDayDescription = (newData: DayDescription): void => {
  const descriptions = getDayDescriptions();
  safeStorage.set<DayDescription>('dayDescriptions', [...descriptions, newData]);
};

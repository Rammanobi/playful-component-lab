
import { MealData } from '../types';
import { safeStorage } from './utils';

export const getMealData = (): MealData[] => {
  return safeStorage.get<MealData>('mealData');
};

export const saveMealData = (newData: MealData): void => {
  const data = getMealData();
  safeStorage.set<MealData>('mealData', [...data, newData]);
};

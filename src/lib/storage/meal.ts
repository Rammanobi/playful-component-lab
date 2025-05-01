
import { MealData } from '../types';
import { safeStorage } from './utils';

export const getMealData = (): MealData[] => {
  return safeStorage.get<MealData>('mealData');
};

export const saveMealData = (newData: MealData): void => {
  const data = getMealData();
  safeStorage.set<MealData>('mealData', [...data, newData]);
};

export const updateMealData = (updatedData: MealData): void => {
  const data = getMealData();
  const index = data.findIndex(item => item.id === updatedData.id);
  
  if (index !== -1) {
    data[index] = updatedData;
    safeStorage.set<MealData>('mealData', data);
  }
};

export const deleteMealData = (id: string): void => {
  const data = getMealData();
  const filteredData = data.filter(item => item.id !== id);
  safeStorage.set<MealData>('mealData', filteredData);
};

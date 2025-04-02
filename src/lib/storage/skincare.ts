
import { SkincareRoutine } from '../types';
import { safeStorage } from './utils';

export const getSkincareRoutines = (): SkincareRoutine[] => {
  return safeStorage.get<SkincareRoutine>('skincareRoutines');
};

export const saveSkincareRoutine = (newData: SkincareRoutine): void => {
  const routines = getSkincareRoutines();
  safeStorage.set<SkincareRoutine>('skincareRoutines', [...routines, newData]);
};

export const updateSkincareRoutine = (updatedData: SkincareRoutine): void => {
  const routines = getSkincareRoutines();
  const index = routines.findIndex(item => item.id === updatedData.id);
  
  if (index !== -1) {
    routines[index] = updatedData;
    safeStorage.set<SkincareRoutine>('skincareRoutines', routines);
  }
};


import { SkincareRoutine } from '../types';
import { safeStorage } from './utils';

export const getSkincareRoutines = (): SkincareRoutine[] => {
  return safeStorage.get<SkincareRoutine>('skincareRoutines');
};

export const saveSkincareRoutine = (newData: SkincareRoutine): void => {
  const routines = getSkincareRoutines();
  safeStorage.set<SkincareRoutine>('skincareRoutines', [...routines, newData]);
};

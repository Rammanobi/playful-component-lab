
import { safeStorage } from './utils';

export interface UserCredentials {
  email: string;
  password: string;
}

export const saveUserCredentials = (credentials: UserCredentials): boolean => {
  try {
    safeStorage.set('userCredentials', credentials);
    return true;
  } catch (e) {
    console.error('Error saving user credentials:', e);
    return false;
  }
};

export const getUserCredentials = (): UserCredentials | null => {
  try {
    return safeStorage.get('userCredentials');
  } catch (e) {
    console.error('Error getting user credentials:', e);
    return null;
  }
};

export const isUserLoggedIn = (): boolean => {
  return localStorage.getItem('isLoggedIn') === 'true';
};

export const getCurrentUserEmail = (): string | null => {
  return localStorage.getItem('userEmail');
};

export const logoutUser = (): void => {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('userEmail');
};

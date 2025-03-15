
import { safeStorage } from './utils';

export interface UserCredentials {
  email: string;
  password: string;
}

export const saveUserCredentials = (credentials: UserCredentials): boolean => {
  try {
    localStorage.setItem('userCredentials', JSON.stringify(credentials));
    return true;
  } catch (e) {
    console.error('Error saving user credentials:', e);
    return false;
  }
};

export const getUserCredentials = (): UserCredentials | null => {
  try {
    const credentialsStr = localStorage.getItem('userCredentials');
    if (!credentialsStr) return null;
    return JSON.parse(credentialsStr) as UserCredentials;
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

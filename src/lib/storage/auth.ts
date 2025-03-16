
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
    if (!credentialsStr) {
      console.log('No user credentials found in storage');
      return null;
    }
    const credentials = JSON.parse(credentialsStr) as UserCredentials;
    console.log('Retrieved credentials for email:', credentials.email);
    return credentials;
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

export const checkEmailExists = (email: string): boolean => {
  const credentials = getUserCredentials();
  return credentials !== null && credentials.email === email;
};

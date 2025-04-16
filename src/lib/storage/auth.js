
import { safeStorage } from './utils';

export const saveUserCredentials = (credentials) => {
  try {
    localStorage.setItem('userCredentials', JSON.stringify(credentials));
    return true;
  } catch (e) {
    console.error('Error saving user credentials:', e);
    return false;
  }
};

export const getUserCredentials = () => {
  try {
    const credentialsStr = localStorage.getItem('userCredentials');
    if (!credentialsStr) {
      console.log('No user credentials found in storage');
      return null;
    }
    const credentials = JSON.parse(credentialsStr);
    console.log('Retrieved credentials for email:', credentials.email);
    return credentials;
  } catch (e) {
    console.error('Error getting user credentials:', e);
    return null;
  }
};

export const isUserLoggedIn = () => {
  return localStorage.getItem('isLoggedIn') === 'true';
};

export const getCurrentUserEmail = () => {
  return localStorage.getItem('userEmail');
};

export const logoutUser = () => {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('userEmail');
};

export const checkEmailExists = (email) => {
  const credentials = getUserCredentials();
  return credentials !== null && credentials.email === email;
};

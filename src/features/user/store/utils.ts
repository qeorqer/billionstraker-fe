import { AuthResponse } from 'features/user/types';

export const saveAuthDataToLocalStorage = (authData: AuthResponse) => {
  localStorage.setItem('token', authData.accessToken);
  localStorage.setItem('accessExpiration', String(authData.accessExpiration));
  localStorage.setItem('refreshToken', authData.refreshToken);
  localStorage.setItem('user', JSON.stringify(authData.user));
};

export const clearDataFromLocalStorage = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('accessExpiration');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
};

import { AxiosResponse } from 'axios';
import api from 'api/axiosInstance';
import {
  AuthData,
  AuthResponse,
  logInRoute,
  logOutRoute,
  refreshTokenRoute,
  signUpRoute,
  UpdateUserPayload,
  UpdateUserResponse,
  updateUserRoute,
} from 'features/user';

export const signUpRequest = (
  body: AuthData,
): Promise<AxiosResponse<AuthResponse>> => api.post(signUpRoute, body);

export const logInRequest = (
  body: AuthData,
): Promise<AxiosResponse<AuthResponse>> => api.post(logInRoute, body);

export const logOutRequest = (): Promise<AxiosResponse<void>> => {
  const refreshToken = localStorage.getItem('refreshToken');
  return api.post(logOutRoute, { refreshToken });
};

export const refreshTokenRequest = (): Promise<AxiosResponse<AuthResponse>> => {
  const refreshToken = localStorage.getItem('refreshToken');
  return api.post(refreshTokenRoute, { refreshToken });
};

export const updateUserRequest = (
  body: UpdateUserPayload,
): Promise<AxiosResponse<UpdateUserResponse>> =>
  api.patch(updateUserRoute, body);

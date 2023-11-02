import { AxiosResponse } from 'axios';
import api from 'api/axiosInstance';
import {
  AuthData,
  AuthResponse,
  logInRoute,
  LogOutPayload,
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

export const logOutRequest = (
  body: LogOutPayload,
): Promise<AxiosResponse<void>> => api.post(logOutRoute, body);

export const refreshTokenRequest = (): Promise<AxiosResponse<AuthResponse>> =>
  api.get(refreshTokenRoute);

export const updateUserRequest = (
  body: UpdateUserPayload,
): Promise<AxiosResponse<UpdateUserResponse>> =>
  api.patch(updateUserRoute, body);

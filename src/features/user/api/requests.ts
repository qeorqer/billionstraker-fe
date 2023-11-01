import {
  AuthData,
  AuthResponse,
  UpdateUserResponse,
} from 'features/user/types';
import { AxiosResponse } from 'axios';
import api from 'api/axiosInstance';
import {
  logInRoute,
  logOutRoute,
  refreshTokenRoute,
  signUpRoute,
  updateUserRoute,
} from 'features/user';

export const signUpRequest = (
  body: AuthData,
): Promise<AxiosResponse<AuthResponse>> => api.post(signUpRoute, body);

export const logInRequest = (
  body: AuthData,
): Promise<AxiosResponse<AuthResponse>> => api.post(logInRoute, body);

export const logOutRequest = (body: {
  refreshToken: string | null;
}): Promise<AxiosResponse<void>> => api.post(logOutRoute, body);

export const refreshTokenRequest = (): Promise<AxiosResponse<AuthResponse>> =>
  api.get(refreshTokenRoute);

export const updateUserRequest = (): Promise<
  AxiosResponse<UpdateUserResponse>
> => api.patch(updateUserRoute);

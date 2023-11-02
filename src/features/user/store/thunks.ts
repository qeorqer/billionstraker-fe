import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';

import {
  AuthData,
  AuthError,
  AuthResponse,
  logInRequest,
  logInRoute,
  LogOutPayload,
  logOutRequest,
  logOutRoute,
  refreshTokenRequest,
  refreshTokenRoute,
  signUpRequest,
  signUpRoute,
  UpdateUserPayload,
  updateUserRequest,
  UpdateUserResponse,
  updateUserRoute,
} from 'features/user';

export const signUpThunk = createAsyncThunk<
  AuthResponse,
  AuthData,
  {
    rejectValue: AuthError;
  }
>(signUpRoute, async (signUpData, thunkApi) => {
  try {
    const res = await signUpRequest(signUpData);
    return res.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return thunkApi.rejectWithValue(e.response?.data as AuthError);
    }

    return thunkApi.rejectWithValue({ message: 'Sorry, something went wrong' });
  }
});

export const logInThunk = createAsyncThunk<
  AuthResponse,
  AuthData,
  {
    rejectValue: AuthError;
  }
>(logInRoute, async (loginData, thunkApi) => {
  try {
    const res = await logInRequest(loginData);
    return res.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return thunkApi.rejectWithValue(e.response?.data as AuthError);
    }

    return thunkApi.rejectWithValue({ message: 'Sorry, something went wrong' });
  }
});

export const logOutThunk = createAsyncThunk(
  logOutRoute,
  async (body: LogOutPayload): Promise<AxiosResponse<void>> =>
    await logOutRequest(body),
);

export const refreshTokenThunk = createAsyncThunk(
  refreshTokenRoute,
  async (): Promise<AxiosResponse<AuthResponse>> => await refreshTokenRequest(),
);

export const updateUserThunk = createAsyncThunk(
  updateUserRoute,
  async (body: UpdateUserPayload): Promise<AxiosResponse<UpdateUserResponse>> =>
    await updateUserRequest(body),
);

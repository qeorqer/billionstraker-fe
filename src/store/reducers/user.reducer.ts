import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import i18next from 'i18next';

import * as api from 'api/index';
import {
  authData,
  loginResponseType,
  signUpResponseType,
  updateUserResponseType,
  userType,
} from 'types/user.type';

export const signUp = createAsyncThunk<
  loginResponseType,
  authData,
  {
    rejectValue: signUpResponseType;
  }
>(
  'user/signUp',
  //todo:fix this
  //@ts-ignore
  async (signUpData, thunkApi) => {
    try {
      const res = await api.signUp(signUpData);
      return res.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return thunkApi.rejectWithValue(e.response?.data);
      }
    }
  },
);

export const logIn = createAsyncThunk<
  loginResponseType,
  authData,
  {
    rejectValue: signUpResponseType;
  }
>(
  'user/logIn',
  //todo:fix this
  //@ts-ignore
  async (loginData: authData, thunkApi) => {
    try {
      const res = await api.logIn(loginData);
      return res.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return thunkApi.rejectWithValue(e.response?.data);
      }
    }
  },
);

export const logOut = createAsyncThunk(
  'user/logOut',
  async (): Promise<AxiosResponse<void>> => await api.logOut(),
);

export const checkAuth = createAsyncThunk(
  'user/refresh',
  async (): Promise<AxiosResponse<loginResponseType>> => await api.refresh(),
);

export const setFirstEnter = createAsyncThunk(
  'user/setFirstEnter',
  async (): Promise<AxiosResponse<updateUserResponseType>> =>
    await api.setFirstEnter(),
);

export type userState = {
  user: userType;
  isAuth: boolean | null;
  isRefreshLoading: boolean;
  isSignUpSignInLoading: boolean;
  lang: string;
};

const initialState: userState = {
  user: {} as userType,
  isAuth: null,
  isRefreshLoading: false,
  isSignUpSignInLoading: false,
  lang: localStorage.getItem('i18nextLng') || 'en',
};

const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeLang: (state: userState, action: PayloadAction<string>) => {
      state.lang = action.payload;
    },
    setAuth: (state: userState, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.isSignUpSignInLoading = false;

      localStorage.setItem('token', action.payload.accessToken);
      localStorage.setItem(
        'accessExpiration',
        String(action.payload.accessExpiration),
      );
      state.user = action.payload.user;
      state.isAuth = true;
    });

    builder.addCase(signUp.rejected, (state, action) => {
      state.isSignUpSignInLoading = false;

      toast(i18next.t(action.payload?.message!), {
        type: 'error',
      });
    });

    builder.addCase(signUp.pending, (state) => {
      state.isSignUpSignInLoading = true;
    });

    builder.addCase(logIn.pending, (state) => {
      state.isSignUpSignInLoading = true;
    });

    builder.addCase(logIn.fulfilled, (state, action) => {
      state.isSignUpSignInLoading = false;

      localStorage.setItem('token', action.payload.accessToken);
      localStorage.setItem(
        'accessExpiration',
        String(action.payload.accessExpiration),
      );
      state.user = action.payload.user;
      state.isAuth = true;
    });

    builder.addCase(logIn.rejected, (state, action) => {
      state.isSignUpSignInLoading = false;

      toast(i18next.t(action.payload?.message!), {
        type: 'error',
      });
    });

    builder.addCase(logOut.fulfilled, (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('accessExpiration');
      state.user = {} as userType;
      state.isAuth = false;
    });

    builder.addCase(logOut.rejected, (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('accessExpiration');
      state.user = {} as userType;
      state.isAuth = false;
    });

    builder.addCase(checkAuth.pending, (state) => {
      state.isRefreshLoading = true;
    });

    builder.addCase(checkAuth.rejected, (state) => {
      state.isRefreshLoading = false;
      state.user = {} as userType;
      state.isAuth = false;
    });

    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.isRefreshLoading = false;

      localStorage.setItem('token', action.payload.data.accessToken);
      localStorage.setItem(
        'accessExpiration',
        String(action.payload.data.accessExpiration),
      );

      state.isAuth = true;
    });

    builder.addCase(setFirstEnter.fulfilled, (state, action) => {
      state.user = action.payload.data.user;
    });
  },
});

export const { changeLang, setAuth } = userReducer.actions;

export default userReducer.reducer;

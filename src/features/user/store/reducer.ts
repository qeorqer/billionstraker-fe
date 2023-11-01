import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import i18next from 'i18next';
import { AuthError, User } from 'features/user/types';
import {
  logInThunk,
  logOutThunk,
  refreshTokenThunk,
  signUpThunk,
  updateUserThunk,
} from 'features/user';
import {
  clearDataFromLocalStorage,
  saveAuthDataToLocalStorage,
} from 'features/user/store/utils';

export type UserState = {
  user: User;
  isAuth: boolean | null;
  isRefreshLoading: boolean;
  isSignUpSignInLoading: boolean;
  lang: string;
};

const initialState: UserState = {
  user: JSON.parse(localStorage.getItem('user')!) as User,
  isAuth: null,
  isRefreshLoading: false,
  isSignUpSignInLoading: false,
  lang: localStorage.getItem('i18nextLng') || 'en',
};

const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeLang: (state: UserState, action: PayloadAction<string>) => {
      state.lang = action.payload;
    },
    setAuth: (state: UserState, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUpThunk.fulfilled, (state, action) => {
      saveAuthDataToLocalStorage(action.payload);

      state.isSignUpSignInLoading = false;
      state.user = action.payload.user;
      state.isAuth = true;
    });

    builder.addCase(signUpThunk.rejected, (state, action) => {
      state.isSignUpSignInLoading = false;

      toast(i18next.t((action.payload as AuthError)?.message!), {
        type: 'error',
      });
    });

    builder.addCase(signUpThunk.pending, (state) => {
      state.isSignUpSignInLoading = true;
    });

    builder.addCase(logInThunk.pending, (state) => {
      state.isSignUpSignInLoading = true;
    });

    builder.addCase(logInThunk.fulfilled, (state, action) => {
      saveAuthDataToLocalStorage(action.payload);

      state.isSignUpSignInLoading = false;
      state.user = action.payload.user;
      state.isAuth = true;
    });

    builder.addCase(logInThunk.rejected, (state, action) => {
      state.isSignUpSignInLoading = false;

      toast(i18next.t((action.payload as AuthError)?.message!), {
        type: 'error',
      });
    });

    builder.addCase(logOutThunk.fulfilled, (state) => {
      clearDataFromLocalStorage();

      state.user = {} as User;
      state.isAuth = false;
    });

    builder.addCase(logOutThunk.rejected, (state) => {
      clearDataFromLocalStorage();

      state.user = {} as User;
      state.isAuth = false;
    });

    builder.addCase(refreshTokenThunk.pending, (state) => {
      state.isRefreshLoading = true;
    });

    builder.addCase(refreshTokenThunk.rejected, (state) => {
      state.isRefreshLoading = false;
      state.user = {} as User;
      state.isAuth = false;
    });

    builder.addCase(refreshTokenThunk.fulfilled, (state, action) => {
      state.isRefreshLoading = false;

      localStorage.setItem('token', action.payload.data.accessToken);
      localStorage.setItem(
        'accessExpiration',
        String(action.payload.data.accessExpiration),
      );
      localStorage.setItem('refreshToken', action.payload.data.refreshToken);

      state.isAuth = true;
    });

    builder.addCase(updateUserThunk.fulfilled, (state, action) => {
      state.user = action.payload.data.user;
    });
  },
});

export const { changeLang, setAuth } = userReducer.actions;

export default userReducer.reducer;

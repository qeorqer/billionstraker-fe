import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosResponse } from 'axios'
import * as api from '../../api/index'
import { authData } from "../../types/auth.type"
import { loginResponseType, signUpResponseType } from '../../types/auth.type'
import { userType } from "../../types/user.type"
import { toast } from "react-toastify";
import { addTransactionResponseType, transactionType } from "../../types/transaction.type";

export const signUp = createAsyncThunk<signUpResponseType,
  authData,
  {
    rejectValue: signUpResponseType
  }>(
  'user/signUp',
  //todo:fix this
  //@ts-ignore
  async (signUpData, thunkApi) => {
    try {
      const res = await api.signUp(signUpData);
      return res.data
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return thunkApi.rejectWithValue(e.response?.data)
      }
    }
  })


export const logIn = createAsyncThunk<loginResponseType
  , authData,
  {
    rejectValue: signUpResponseType
  }>(
  'user/logIn',
  //todo:fix this
  //@ts-ignore
  async (loginData: authData, thunkApi) => {
    try {
      const res = await api.logIn(loginData)
      return res.data
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return thunkApi.rejectWithValue(e.response?.data)
      }
    }
  }
)

export const logOut = createAsyncThunk(
  'user/logOut',
  async (): Promise<AxiosResponse<void>> => await api.logOut(),
)

export const checkAuth = createAsyncThunk(
  'user/refresh',
  async (): Promise<AxiosResponse<loginResponseType>> => await api.refresh(),
)

//todo: think again about logic of adding transaction
export const addTransaction = createAsyncThunk(
  'transaction/addTransaction',
  async (body: { transaction: transactionType }): Promise<AxiosResponse<addTransactionResponseType>> => await api.addTransaction(body),
)

export type userState = {
  user: userType,
  isAuth: boolean,
  loading: boolean,
  isSignUpSignInLoading: boolean
  lang: string,
}

const initialState: userState = {
  user: {} as userType,
  isAuth: false,
  loading: false,
  isSignUpSignInLoading: false,
  lang: localStorage.getItem('i18nextLng') || 'en'
}

const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeLang: (state: userState, action: PayloadAction<string>) => {
      state.lang = action.payload
    }
  },
  extraReducers: (builder => {
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.isSignUpSignInLoading = false
      toast(localStorage.getItem('i18nextLng') === 'en'
        ? action.payload.messageEn
        : action.payload.messageRu
        , {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: true,
          closeOnClick: true,
          theme: 'dark',
          type: 'success'
        })
    })

    builder.addCase(signUp.rejected, (state, action) => {
      state.isSignUpSignInLoading = false
      toast(localStorage.getItem('i18nextLng') === 'en'
        ? action.payload?.messageEn
        : action.payload?.messageRu, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        theme: 'dark',
        type: 'error'
      })
    })

    builder.addCase(signUp.pending, (state) => {
      state.isSignUpSignInLoading = true
    })

    builder.addCase(logIn.pending, (state) => {
      state.isSignUpSignInLoading = true
    })

    builder.addCase(logIn.fulfilled, (state, action) => {
      state.isSignUpSignInLoading = false

      localStorage.setItem('token', action.payload.accessToken)
      state.user = action.payload.user
      state.isAuth = true
    })

    builder.addCase(logIn.rejected, (state, action) => {
      state.isSignUpSignInLoading = false

      toast(localStorage.getItem('i18nextLng') === 'en'
        ? action.payload?.messageEn
        : action.payload?.messageRu, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        theme: 'dark',
        type: 'error'
      })
    })

    builder.addCase(logOut.fulfilled, (state) => {
      localStorage.removeItem('token')
      state.user = {} as userType
      state.isAuth = false
    })

    builder.addCase(checkAuth.pending, (state) => {
      state.loading = true
    })

    builder.addCase(checkAuth.rejected, (state) => {
      state.loading = false
    })


    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.loading = false

      localStorage.setItem('token', action.payload.data.accessToken)
      state.user = action.payload.data.user
      state.isAuth = true
    })

    builder.addCase(addTransaction.fulfilled, (state, action) => {
      state.user = action.payload.data.updatedUser

      toast(localStorage.getItem('i18nextLng') === 'en'
        ? action.payload?.data.messageEn
        : action.payload?.data.messageRu, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        theme: 'dark',
        type: 'success'
      })
    })

  })
})

export const { changeLang } = userReducer.actions

export default userReducer.reducer
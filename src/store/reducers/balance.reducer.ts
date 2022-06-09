import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

import * as api from '../../api/index';
import {
  balanceType,
  createBalanceResponseType,
  getBalanceResponseType,
} from '../../types/balance.type';

export const getBalances = createAsyncThunk(
  'balance/getBalances',
  async (): Promise<AxiosResponse<getBalanceResponseType>> =>
    await api.getBalances(),
);

export const createBalance = createAsyncThunk(
  'balance/createBalance',
  async (body: {
    name: string;
    amount: number;
  }): Promise<AxiosResponse<createBalanceResponseType>> =>
    await api.createBalance(body),
);

export type categoryState = {
  balances: balanceType[];
};

const initialState: categoryState = {
  balances: [] as balanceType[],
};

const balanceReducer = createSlice({
  name: 'balance',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBalances.fulfilled, (state, action) => {
      state.balances = action.payload.data.balances;
    });

    builder.addCase(createBalance.fulfilled, (state, action) => {

      toast('creating balance success',
        {
          position: 'top-right',
          autoClose: 2500,
          hideProgressBar: true,
          closeOnClick: true,
          theme: 'dark',
          type: 'success',
        },
      );

      state.balances = [...state.balances, action.payload.data.balance];
    });
  },
});

export default balanceReducer.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

import * as api from 'api/index';
import {
  balanceType,
  createBalanceResponseType,
  deleteBalanceResponseType,
  getBalanceResponseType,
} from 'types/balance.type';
import { createTransaction } from './transaction.reducer';

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

export const updateBalance = createAsyncThunk(
  'balance/updateBalance',
  async (body: {
    balanceId: string;
    balance: balanceType;
  }): Promise<AxiosResponse<createBalanceResponseType>> =>
    await api.updateBalance(body),
);

export const deleteBalance = createAsyncThunk(
  'balance/deleteBalance',
  async (body: {
    balanceId: string;
  }): Promise<AxiosResponse<deleteBalanceResponseType>> =>
    await api.deleteBalance(body),
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
      toast('creating balance success', {
        position: 'top-right',
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        theme: 'dark',
        type: 'success',
      });

      state.balances = [...state.balances, action.payload.data.balance];
    });

    builder.addCase(updateBalance.fulfilled, (state, action) => {
      toast('updating balance success', {
        position: 'top-right',
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        theme: 'dark',
        type: 'success',
      });

      const updatedBalance = action.payload.data.balance;
      state.balances = state.balances.map((balance) =>
        balance._id === updatedBalance._id ? updatedBalance : balance,
      );
    });

    builder.addCase(deleteBalance.fulfilled, (state, action) => {
      toast('deleting balance success', {
        position: 'top-right',
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        theme: 'dark',
        type: 'success',
      });

      const deletedBalanceId = action.payload.data.balanceId;
      state.balances = state.balances.filter(
        (balance) => balance._id !== deletedBalanceId,
      );
    });

    builder.addCase(createTransaction.fulfilled, (state, action) => {
      const updatedBalance = action.payload.data.balances;

      state.balances = state.balances.map((balance) => {
        const balanceForUpdate = updatedBalance.find(
          (item) => item._id === balance._id,
        );
        return balanceForUpdate ? balanceForUpdate : balance;
      });
    });
  },
});

export default balanceReducer.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import * as api from '../../api/index';
import {
  addTransactionResponseType,
  getTransactionsResponseType,
  transactionType,
} from '../../types/transaction.type';

export const createTransaction = createAsyncThunk(
  'transaction/createTransaction',
  async (body: {
    transaction: transactionType;
    balanceId: string;
  }): Promise<AxiosResponse<addTransactionResponseType>> =>
    await api.addTransaction(body),
);

export const getAllUserTransactions = createAsyncThunk(
  'transaction/getAllUserTransactions',
  async (body: {
    limit: number;
    numberToSkip: number;
  }): Promise<AxiosResponse<getTransactionsResponseType>> =>
    await api.getAllUserTransactions(body),
);

export type transactionState = {
  isTransactionsloading: boolean;
  numberOfTransactions: number;
  transactions: transactionType[];
};

const initialState: transactionState = {
  isTransactionsloading: false,
  numberOfTransactions: 0,
  transactions: [] as transactionType[],
};

const transactionReducer = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    resetTransactions: (state) => {
      state.transactions = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllUserTransactions.pending, (state) => {
      state.isTransactionsloading = true;
    });

    builder.addCase(getAllUserTransactions.fulfilled, (state, action) => {
      state.isTransactionsloading = false;
      state.transactions = [
        ...state.transactions,
        ...action.payload.data.transactions,
      ];
      state.numberOfTransactions =
        action.payload.data.numberOfTransactions || 0;
    });

    builder.addCase(getAllUserTransactions.rejected, (state) => {
      state.isTransactionsloading = false;
    });

    builder.addCase(createTransaction.fulfilled, (state, action) => {
      state.transactions = [...state.transactions, action.payload.data.transaction];
    })
  },
});

export const { resetTransactions } = transactionReducer.actions;

export default transactionReducer.reducer;

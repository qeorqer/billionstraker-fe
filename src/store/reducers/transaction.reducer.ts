import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import i18next from 'i18next';

import * as api from 'api/index';
import {
  addTransactionResponseType,
  getTransactionsResponseType,
  transactionType,
} from 'types/transaction.type';

export const createTransaction = createAsyncThunk(
  'transaction/createTransaction',
  async (body: {
    transaction: transactionType;
    balanceId: string;
    balanceToSubtractId?: string;
  }): Promise<AxiosResponse<addTransactionResponseType>> =>
    await api.addTransaction(body),
);

export const getAllUserTransactions = createAsyncThunk(
  'transaction/getAllUserTransactions',
  async (body: {
    limit: number;
    numberToSkip: number;
    filteringOptions: {
      shownTransactionsTypes: string;
      categoriesToShow: string[];
      balancesToShow: string[];
    };
  }): Promise<AxiosResponse<getTransactionsResponseType>> =>
    await api.getAllUserTransactions(body),
);

export type transactionState = {
  isLoadingTransactions: boolean;
  numberOfTransactions: number;
  transactions: transactionType[];
};

const initialState: transactionState = {
  isLoadingTransactions: false,
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
      state.isLoadingTransactions = true;
    });

    builder.addCase(getAllUserTransactions.fulfilled, (state, action) => {
      state.isLoadingTransactions = false;
      state.transactions = [
        ...state.transactions,
        ...action.payload.data.transactions,
      ];
      state.numberOfTransactions =
        action.payload.data.numberOfTransactions || 0;
    });

    builder.addCase(getAllUserTransactions.rejected, (state) => {
      state.isLoadingTransactions = false;
    });

    builder.addCase(createTransaction.pending, (state, action) => {
      state.isLoadingTransactions = true;
    });

    builder.addCase(createTransaction.fulfilled, (state, action) => {
      state.isLoadingTransactions = false;

      state.transactions = [
        ...state.transactions,
        action.payload.data.transaction,
      ];

      toast(i18next.t('transaction created successfully'), {
        type: 'success',
      });
    });

    builder.addCase(createTransaction.rejected, (state, action) => {
      state.isLoadingTransactions = false;

      toast(i18next.t('failed to create transaction'), {
        type: 'error',
      });
    });
  },
});

export const { resetTransactions } = transactionReducer.actions;

export default transactionReducer.reducer;

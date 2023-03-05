import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import i18next from 'i18next';

import * as api from 'api/index';
import {
  addTransactionResponseType,
  deleteTransactionResponseType,
  getTransactionsResponseType,
  submitTransactionType,
  transactionType,
} from 'types/transaction.type';

export const createTransaction = createAsyncThunk(
  'transaction/createTransaction',
  async (
    body: submitTransactionType,
  ): Promise<AxiosResponse<addTransactionResponseType>> =>
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
      from: Date;
      to: Date;
    };
  }): Promise<AxiosResponse<getTransactionsResponseType>> =>
    await api.getAllUserTransactions(body),
);

export const deleteTransaction = createAsyncThunk(
  'transaction/deleteTransaction',
  async (body: {
    transactionId: string;
  }): Promise<AxiosResponse<deleteTransactionResponseType>> =>
    await api.deleteTransaction(body),
);

export const updateTransaction = createAsyncThunk(
  'transaction/editTransaction',
  async (
    body: submitTransactionType,
  ): Promise<AxiosResponse<addTransactionResponseType>> =>
    await api.editTransaction(body),
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

    builder.addCase(deleteTransaction.pending, (state, action) => {
      state.isLoadingTransactions = true;
    });

    builder.addCase(deleteTransaction.fulfilled, (state, action) => {
      state.isLoadingTransactions = false;

      toast(i18next.t('deleting transaction success'), {
        type: 'success',
      });

      const deletedTransactionId = action.payload.data.transactionId;
      state.transactions = state.transactions.filter(
        (transaction) => transaction._id !== deletedTransactionId,
      );
    });

    builder.addCase(deleteTransaction.rejected, (state, action) => {
      state.isLoadingTransactions = false;

      toast(i18next.t('deleting transaction failed'), {
        type: 'error',
      });
    });

    builder.addCase(updateTransaction.pending, (state, action) => {
      state.isLoadingTransactions = true;
    });

    builder.addCase(updateTransaction.fulfilled, (state, action) => {
      state.isLoadingTransactions = false;

      const updatedBalance = action.payload.data.transaction;
      state.transactions = state.transactions.map((balance) =>
        balance._id === updatedBalance._id ? updatedBalance : balance,
      );

      toast(i18next.t('updating transaction success'), {
        type: 'success',
      });
    });

    builder.addCase(updateTransaction.rejected, (state, action) => {
      state.isLoadingTransactions = false;

      toast(i18next.t('updating transaction failed'), {
        type: 'error',
      });
    });
  },
});

export const { resetTransactions } = transactionReducer.actions;

export default transactionReducer.reducer;

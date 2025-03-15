import { createSlice } from '@reduxjs/toolkit';
import i18next from 'i18next';
import { Transaction } from 'features/transaction/types';
import {
  createTransactionThunk,
  deleteTransactionThunk,
  getTransactionsThunk,
  updateTransactionThunk,
} from 'features/transaction/store/thunks';
import { notifications } from '@mantine/notifications';

export type TransactionState = {
  isLoadingTransactions: boolean;
  numberOfTransactions: number;
  transactions: Transaction[];
};

const initialState: TransactionState = {
  isLoadingTransactions: false,
  numberOfTransactions: 0,
  transactions: [] as Transaction[],
};

const reducer = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    resetTransactions: (state) => {
      state.transactions = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTransactionsThunk.pending, (state) => {
      state.isLoadingTransactions = true;
    });

    builder.addCase(getTransactionsThunk.fulfilled, (state, action) => {
      state.isLoadingTransactions = false;
      state.transactions = [
        ...state.transactions,
        ...action.payload.data.transactions,
      ];
      state.numberOfTransactions =
        action.payload.data.numberOfTransactions || 0;
    });

    builder.addCase(getTransactionsThunk.rejected, (state) => {
      state.isLoadingTransactions = false;
    });

    builder.addCase(createTransactionThunk.pending, (state, _action) => {
      state.isLoadingTransactions = true;
    });

    builder.addCase(createTransactionThunk.fulfilled, (state, action) => {
      state.isLoadingTransactions = false;

      state.transactions = [
        ...state.transactions,
        action.payload.data.transaction,
      ];

      notifications.show({
        message: i18next.t('transaction created successfully') as string,
        withBorder: true,
      });
    });

    builder.addCase(createTransactionThunk.rejected, (state, _action) => {
      state.isLoadingTransactions = false;

      notifications.show({
        message: i18next.t('failed to create transaction') as string,
        withBorder: true,
        color: 'red',
      });
    });

    builder.addCase(deleteTransactionThunk.pending, (state, _action) => {
      state.isLoadingTransactions = true;
    });

    builder.addCase(deleteTransactionThunk.fulfilled, (state, action) => {
      state.isLoadingTransactions = false;

      notifications.show({
        message: i18next.t('deleting transaction success') as string,
        withBorder: true,
      });

      const deletedTransactionId = action.payload.data.transactionId;
      state.transactions = state.transactions.filter(
        (transaction) => transaction._id !== deletedTransactionId,
      );
    });

    builder.addCase(deleteTransactionThunk.rejected, (state, _action) => {
      state.isLoadingTransactions = false;

      notifications.show({
        message: i18next.t('deleting transaction failed') as string,
        withBorder: true,
        color: 'red',
      });
    });

    builder.addCase(updateTransactionThunk.pending, (state, _action) => {
      state.isLoadingTransactions = true;
    });

    builder.addCase(updateTransactionThunk.fulfilled, (state, action) => {
      state.isLoadingTransactions = false;

      const updatedBalance = action.payload.data.transaction;
      state.transactions = state.transactions.map((balance) =>
        balance._id === updatedBalance._id ? updatedBalance : balance,
      );

      notifications.show({
        message: i18next.t('updating transaction success') as string,
        withBorder: true,
      });
    });

    builder.addCase(updateTransactionThunk.rejected, (state, _action) => {
      state.isLoadingTransactions = false;

      notifications.show({
        message: i18next.t('updating transaction failed') as string,
        withBorder: true,
        color: 'red',
      });
    });
  },
});

export const { resetTransactions } = reducer.actions;

export default reducer.reducer;

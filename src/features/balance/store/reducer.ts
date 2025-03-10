import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import i18next from 'i18next';

import {
  Balance,
  createBalanceThunk,
  deleteBalanceThunk,
  getBalancesThunk,
  updateBalanceThunk,
} from 'features/balance';
import {
  createTransactionThunk,
  deleteTransactionThunk,
  updateTransactionThunk,
} from 'features/transaction';

export type BalanceState = {
  balances: Balance[];
  isLoadingBalances: boolean;
};

const initialState: BalanceState = {
  balances: [] as Balance[],
  isLoadingBalances: false,
};

const balanceReducer = createSlice({
  name: 'balance',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createBalanceThunk.pending, (state) => {
      state.isLoadingBalances = true;
    });

    builder.addCase(createBalanceThunk.fulfilled, (state, action) => {
      state.isLoadingBalances = false;
      toast(i18next.t('creating balance success'), {
        type: 'success',
      });

      state.balances = [...state.balances, action.payload.data.balance];
    });

    builder.addCase(createBalanceThunk.rejected, (state, _action) => {
      state.isLoadingBalances = false;
    });

    builder.addCase(getBalancesThunk.pending, (state) => {
      state.isLoadingBalances = true;
    });

    builder.addCase(getBalancesThunk.rejected, (state) => {
      state.isLoadingBalances = false;
    });

    builder.addCase(getBalancesThunk.fulfilled, (state, action) => {
      state.balances = action.payload.data.balances;
      state.isLoadingBalances = false;
    });

    builder.addCase(updateBalanceThunk.fulfilled, (state, action) => {
      toast(i18next.t('updating balance success'), {
        type: 'success',
      });

      const updatedBalance = action.payload.data.balance;
      state.balances = state.balances.map((balance) =>
        balance._id === updatedBalance._id ? updatedBalance : balance,
      );
    });

    builder.addCase(deleteBalanceThunk.fulfilled, (state, action) => {
      toast(i18next.t('deleting balance success'), {
        type: 'success',
      });

      const deletedBalanceId = action.payload.data.balanceId;
      state.balances = state.balances.filter(
        (balance) => balance._id !== deletedBalanceId,
      );
    });

    builder.addCase(createTransactionThunk.fulfilled, (state, action) => {
      const updatedBalance = action.payload.data.balances;

      state.balances = state.balances.map((balance) => {
        const balanceForUpdate = updatedBalance.find(
          (item) => item._id === balance._id,
        );

        return balanceForUpdate ? balanceForUpdate : balance;
      });
    });

    builder.addCase(updateTransactionThunk.fulfilled, (state, action) => {
      const updatedBalance = action.payload.data.balances;

      state.balances = state.balances.map((balance) => {
        const balanceForUpdate = updatedBalance.find(
          (item) => item._id === balance._id,
        );

        return balanceForUpdate ? balanceForUpdate : balance;
      });
    });

    builder.addCase(deleteTransactionThunk.fulfilled, (state, action) => {
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

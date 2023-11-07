import { createSlice } from '@reduxjs/toolkit';
import {
  getNetWorthThunk,
  getStatisticsForSingleBalanceThunk,
  NetWorth,
  StatisticsForBalance,
} from 'features/statistics';

export type StatisticsState = {
  statisticsForBalance: StatisticsForBalance | null;
  isStatisticsForBalanceLoading: boolean;
  isNetWorthLoading: boolean;
  netWorth: NetWorth | null;
};

const initialState: StatisticsState = {
  statisticsForBalance: null,
  isStatisticsForBalanceLoading: false,
  isNetWorthLoading: false,
  netWorth: null,
};

const statisticsReducer = createSlice({
  name: 'statistics',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getStatisticsForSingleBalanceThunk.pending, (state) => {
      state.isStatisticsForBalanceLoading = true;
    });

    builder.addCase(
      getStatisticsForSingleBalanceThunk.fulfilled,
      (state, action) => {
        state.statisticsForBalance = action.payload.data.statistics;
        state.isStatisticsForBalanceLoading = false;
      },
    );

    builder.addCase(getStatisticsForSingleBalanceThunk.rejected, (state) => {
      state.isStatisticsForBalanceLoading = false;
    });

    builder.addCase(getNetWorthThunk.pending, (state) => {
      state.isNetWorthLoading = true;
    });

    builder.addCase(getNetWorthThunk.fulfilled, (state, action) => {
      state.netWorth = action.payload.data.statistics;
      state.isNetWorthLoading = false;
    });

    builder.addCase(getNetWorthThunk.rejected, (state) => {
      state.isNetWorthLoading = false;
    });
  },
});

export default statisticsReducer.reducer;

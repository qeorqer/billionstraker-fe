import { createSlice } from '@reduxjs/toolkit';
import {
  getNetWorthThunk,
  getStatisticsThunk,
  NetWorth,
  Statistics,
} from 'features/statistics';

export type StatisticsState = {
  statisticsForBalance: Statistics | null;
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
    builder.addCase(getStatisticsThunk.pending, (state) => {
      state.isStatisticsForBalanceLoading = true;
    });

    builder.addCase(getStatisticsThunk.fulfilled, (state, action) => {
      state.statisticsForBalance = action.payload.data.statistics;
      state.isStatisticsForBalanceLoading = false;
    });

    builder.addCase(getStatisticsThunk.rejected, (state) => {
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

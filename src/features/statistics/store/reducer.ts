import { createSlice } from '@reduxjs/toolkit';
import {
  getNetWorthThunk,
  getStatisticsThunk,
  NetWorth,
  Statistics,
} from 'features/statistics';

export type StatisticsState = {
  statistics: Statistics | null;
  isLoadingStatistics: boolean;
  isLoadingNetWorth: boolean;
  netWorth: NetWorth | null;
};

const initialState: StatisticsState = {
  statistics: null,
  isLoadingStatistics: false,
  isLoadingNetWorth: false,
  netWorth: null,
};

const statisticsReducer = createSlice({
  name: 'statistics',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getStatisticsThunk.pending, (state) => {
      state.isLoadingStatistics = true;
    });

    builder.addCase(getStatisticsThunk.fulfilled, (state, action) => {
      state.statistics = action.payload.data.statistics;
      state.isLoadingStatistics = false;
    });

    builder.addCase(getStatisticsThunk.rejected, (state) => {
      state.isLoadingStatistics = false;
    });

    builder.addCase(getNetWorthThunk.pending, (state) => {
      state.isLoadingNetWorth = true;
    });

    builder.addCase(getNetWorthThunk.fulfilled, (state, action) => {
      state.netWorth = action.payload.data.statistics;
      state.isLoadingNetWorth = false;
    });

    builder.addCase(getNetWorthThunk.rejected, (state) => {
      state.isLoadingNetWorth = false;
    });
  },
});

export default statisticsReducer.reducer;

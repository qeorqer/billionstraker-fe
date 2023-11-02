import { createSlice } from '@reduxjs/toolkit';
import {
  getStatisticsForSingleBalanceThunk,
  StatisticsForBalance,
} from 'features/statistics';

export type StatisticsState = {
  statisticsForBalance: StatisticsForBalance | null;
  isStatisticsForBalanceLoading: boolean;
};

const initialState: StatisticsState = {
  statisticsForBalance: null,
  isStatisticsForBalanceLoading: false,
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
        state.statisticsForBalance = action.payload.data.statistic;
        state.isStatisticsForBalanceLoading = false;
      },
    );

    builder.addCase(getStatisticsForSingleBalanceThunk.rejected, (state) => {
      state.isStatisticsForBalanceLoading = false;
    });
  },
});

export default statisticsReducer.reducer;

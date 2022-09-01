import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import * as api from 'api/index';
import {
  getStatisticsForBalanceResponseType,
  getStatisticsForBalanceType,
} from 'types/statistic.type';

export const getStatisticsForBalance = createAsyncThunk(
  'statistic/getStatisticsForBalance',
  async (body: {
    from: Date;
    to: Date;
    balance: string;
  }): Promise<AxiosResponse<getStatisticsForBalanceResponseType>> =>
    await api.getStatisticsForBalance(body),
);

export type statisticState = {
  statisticsForBalance: getStatisticsForBalanceType | null;
  isStatisticsForBalanceLoading: boolean;
};

const initialState: statisticState = {
  statisticsForBalance: null,
  isStatisticsForBalanceLoading: false,
};

const statisticReducer = createSlice({
  name: 'statistic',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getStatisticsForBalance.pending, (state) => {
      state.isStatisticsForBalanceLoading = true;
    });

    builder.addCase(getStatisticsForBalance.fulfilled, (state, action) => {
      state.statisticsForBalance = action.payload.data.statistic;
      state.isStatisticsForBalanceLoading = false;
    });

    builder.addCase(getStatisticsForBalance.rejected, (state) => {
      state.isStatisticsForBalanceLoading = false;
    });
  },
});

export default statisticReducer.reducer;

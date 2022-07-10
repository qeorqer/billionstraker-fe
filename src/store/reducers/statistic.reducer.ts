import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import * as api from 'api/index';
import {
  generalStatisticType,
  getGeneralStatisticResponseType,
  getStatisticForRangeResponseType,
  getWholeStatisticResponseType,
  statisticForRangeType,
  wholeStatisticType,
} from 'types/statistic.type';

export const getGeneralStatistic = createAsyncThunk(
  'statistic/getGeneralStatistic',
  async (): Promise<AxiosResponse<getGeneralStatisticResponseType>> =>
    await api.getGeneralStatistic(),
);

export const getWholeStatistic = createAsyncThunk(
  'statistic/getWholeStatistic',
  async (): Promise<AxiosResponse<getWholeStatisticResponseType>> =>
    await api.getWholeStatistic(),
);

export const getStatisticForRange = createAsyncThunk(
  'statistic/getStatisticForRange',
  async (body: {
    from: Date;
    to: Date;
  }): Promise<AxiosResponse<getStatisticForRangeResponseType>> =>
    await api.getStatisticForRange(body),
);

export type statisticState = {
  loading: boolean;
  generalStatistic: generalStatisticType | null;
  wholeStatistic: wholeStatisticType | null;
  statisticForRange: statisticForRangeType | null;
  isGeneralStatisticLoading: boolean;
  isWholeStatisticLoading: boolean;
  isStatisticForRangeLoading: boolean;
};

const initialState: statisticState = {
  loading: false,
  generalStatistic: null,
  wholeStatistic: null,
  statisticForRange: null,
  isGeneralStatisticLoading: false,
  isWholeStatisticLoading: false,
  isStatisticForRangeLoading: false,
};

const statisticReducer = createSlice({
  name: 'statistic',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGeneralStatistic.pending, (state) => {
      state.isGeneralStatisticLoading = true;
    });

    builder.addCase(getGeneralStatistic.fulfilled, (state, action) => {
      state.isGeneralStatisticLoading = false;
      state.generalStatistic = action.payload.data.statistic;
    });

    builder.addCase(getGeneralStatistic.rejected, (state) => {
      state.isGeneralStatisticLoading = false;
    });

    builder.addCase(getWholeStatistic.pending, (state) => {
      state.isWholeStatisticLoading = true;
    });

    builder.addCase(getWholeStatistic.fulfilled, (state, action) => {
      state.isWholeStatisticLoading = false;
      state.wholeStatistic = action.payload.data.statistic;
    });

    builder.addCase(getWholeStatistic.rejected, (state) => {
      state.isWholeStatisticLoading = false;
    });

    builder.addCase(getStatisticForRange.pending, (state) => {
      state.isStatisticForRangeLoading = true;
    });

    builder.addCase(getStatisticForRange.fulfilled, (state, action) => {
      state.isStatisticForRangeLoading = false;
      state.statisticForRange = action.payload.data.statistic;
    });

    builder.addCase(getStatisticForRange.rejected, (state) => {
      state.isStatisticForRangeLoading = false;
    });
  },
});

export default statisticReducer.reducer;

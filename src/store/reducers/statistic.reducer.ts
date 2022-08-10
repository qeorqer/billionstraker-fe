import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import * as api from 'api/index';
import {
  getStatisticForRangeResponseType,
  statisticForRangeType,
} from 'types/statistic.type';

export const getStatisticForRange = createAsyncThunk(
  'statistic/getStatisticForRange',
  async (body: {
    from: Date;
    to: Date;
    balance: string;
  }): Promise<AxiosResponse<getStatisticForRangeResponseType>> =>
    await api.getStatisticForRange(body),
);

export type statisticState = {
  statisticForRange: statisticForRangeType | null;
  isStatisticForRangeLoading: boolean;
};

const initialState: statisticState = {
  statisticForRange: null,
  isStatisticForRangeLoading: false,
};

const statisticReducer = createSlice({
  name: 'statistic',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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

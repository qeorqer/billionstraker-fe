import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import {
  getStatisticsForSingleBalanceRequest,
  getStatisticsForSingleBalanceRoute,
  GetStatisticsForBalanceResponse,
  getNetWorthRoute,
  getNetWorthRequest,
  GetNetWorthResponse,
} from 'features/statistics';

export const getStatisticsForSingleBalanceThunk = createAsyncThunk(
  getStatisticsForSingleBalanceRoute,
  async (body: {
    from: Date;
    to: Date;
    balance: string;
  }): Promise<AxiosResponse<GetStatisticsForBalanceResponse>> =>
    await getStatisticsForSingleBalanceRequest(body),
);

export const getNetWorthThunk = createAsyncThunk(
  getNetWorthRoute,
  async (): Promise<AxiosResponse<GetNetWorthResponse>> =>
    await getNetWorthRequest(),
);

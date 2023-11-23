import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import {
  getStatisticsRequest,
  getStatisticsRoute,
  getNetWorthRoute,
  getNetWorthRequest,
  GetNetWorthResponse,
  GetStatisticsResponse,
  GetStatisticsPayload,
} from 'features/statistics';

export const getStatisticsThunk = createAsyncThunk(
  getStatisticsRoute,
  async (
    body: GetStatisticsPayload,
  ): Promise<AxiosResponse<GetStatisticsResponse>> =>
    await getStatisticsRequest(body),
);

export const getNetWorthThunk = createAsyncThunk(
  getNetWorthRoute,
  async (): Promise<AxiosResponse<GetNetWorthResponse>> =>
    await getNetWorthRequest(),
);

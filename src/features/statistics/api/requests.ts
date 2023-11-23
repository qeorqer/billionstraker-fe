import { AxiosResponse } from 'axios';

import {
  GetStatisticsPayload,
  getStatisticsRoute,
  getNetWorthRoute,
  GetNetWorthResponse,
  GetStatisticsResponse,
} from 'features/statistics';
import api from 'api/axiosInstance';

export const getStatisticsRequest = (
  body: GetStatisticsPayload,
): Promise<AxiosResponse<GetStatisticsResponse>> =>
  api.post(getStatisticsRoute, body);

export const getNetWorthRequest = (): Promise<
  AxiosResponse<GetNetWorthResponse>
> => api.get(getNetWorthRoute);

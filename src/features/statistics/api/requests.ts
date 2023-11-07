import { AxiosResponse } from 'axios';

import {
  GetStatisticsForBalanceResponse,
  StatisticsForBalancePayload,
  getStatisticsForSingleBalanceRoute,
  getNetWorthRoute,
  GetNetWorthResponse,
} from 'features/statistics';
import api from 'api/axiosInstance';

export const getStatisticsForSingleBalanceRequest = (
  body: StatisticsForBalancePayload,
): Promise<AxiosResponse<GetStatisticsForBalanceResponse>> =>
  api.post(getStatisticsForSingleBalanceRoute, body);

export const getNetWorthRequest = (): Promise<
  AxiosResponse<GetNetWorthResponse>
> => api.get(getNetWorthRoute);

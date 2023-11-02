import { AxiosResponse } from 'axios';

import {
  GetStatisticsForBalanceResponse,
  StatisticsForBalancePayload,
  getStatisticsForSingleBalanceRoute,
} from 'features/statistics';
import api from 'api/axiosInstance';

export const getStatisticsForSingleBalanceRequest = (
  body: StatisticsForBalancePayload,
): Promise<AxiosResponse<GetStatisticsForBalanceResponse>> =>
  api.post(getStatisticsForSingleBalanceRoute, body);

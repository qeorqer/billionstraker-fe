import { AxiosResponse } from 'axios';

import api from 'api/axiosInstance';
import {
  Balance,
  CreateUpdateBalancePayload,
  CreateUpdateBalanceResponse,
  createBalanceRoute,
  DeleteBalancePayload,
  DeleteBalanceResponse,
  deleteBalanceRoute,
  GetBalanceResponse,
  getBalancesRoute,
  updateBalanceRoute,
} from 'features/balance';

export const createBalanceRequest = (
  body: CreateUpdateBalancePayload,
): Promise<AxiosResponse<CreateUpdateBalanceResponse>> =>
  api.post(createBalanceRoute, body);

export const getBalancesRequest = (): Promise<
  AxiosResponse<GetBalanceResponse>
> => api.get(getBalancesRoute);

export const updateBalanceRequest = (
  body: CreateUpdateBalancePayload,
): Promise<AxiosResponse<CreateUpdateBalanceResponse>> =>
  api.patch(updateBalanceRoute, body);

export const deleteBalanceRequest = (
  body: DeleteBalancePayload,
): Promise<AxiosResponse<DeleteBalanceResponse>> =>
  api.delete(deleteBalanceRoute, { data: body });

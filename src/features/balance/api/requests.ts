import { AxiosResponse } from 'axios';

import api from 'api/axiosInstance';
import {
  createBalanceRoute,
  deleteBalanceRoute,
  getBalancesRoute,
  updateBalanceRoute,
  CreateBalanceResponse,
  DeleteBalanceResponse,
  GetBalanceResponse,
  CreateBalancePayload,
  UpdateBalancePayload,
  DeleteBalancePayload,
} from 'features/balance';

export const createBalanceRequest = (
  body: CreateBalancePayload,
): Promise<AxiosResponse<CreateBalanceResponse>> =>
  api.post(createBalanceRoute, body);

export const getBalancesRequest = (): Promise<
  AxiosResponse<GetBalanceResponse>
> => api.get(getBalancesRoute);

export const updateBalanceRequest = (
  body: UpdateBalancePayload,
): Promise<AxiosResponse<CreateBalanceResponse>> =>
  api.patch(updateBalanceRoute, body);

export const deleteBalanceRequest = (
  body: DeleteBalancePayload,
): Promise<AxiosResponse<DeleteBalanceResponse>> =>
  api.delete(deleteBalanceRoute, { data: body });

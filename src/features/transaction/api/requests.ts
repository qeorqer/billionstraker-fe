import {
  CreateTransactionResponse,
  DeleteTransactionResponse,
  GetTransactionsPayload,
  GetTransactionsResponse,
  CreateTransactionPayload,
  DeleteTransactionPayload,
} from 'features/transaction/types';
import { AxiosResponse } from 'axios';
import api from 'api/axiosInstance';
import {
  createTransactionRoute,
  deleteTransactionRoute,
  getTransactionsRoute,
  updateTransactionRoute,
} from 'features/transaction/api/constants';

export const createTransactionRequest = (
  body: CreateTransactionPayload,
): Promise<AxiosResponse<CreateTransactionResponse>> =>
  api.post(createTransactionRoute, body);

export const updateTransactionRequest = (
  body: CreateTransactionPayload,
): Promise<AxiosResponse<CreateTransactionResponse>> =>
  api.patch(updateTransactionRoute, body);

export const getTransactionsRequest = (
  body: GetTransactionsPayload,
): Promise<AxiosResponse<GetTransactionsResponse>> =>
  api.post(getTransactionsRoute, body);

export const deleteTransactionRequest = (
  body: DeleteTransactionPayload,
): Promise<AxiosResponse<DeleteTransactionResponse>> =>
  api.delete(deleteTransactionRoute, { data: body });

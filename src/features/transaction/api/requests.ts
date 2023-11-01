import {
  AddTransactionResponse,
  DeleteTransactionResponse,
  GetTransactions,
  GetTransactionsResponse,
  SubmitTransaction,
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
  body: SubmitTransaction,
): Promise<AxiosResponse<AddTransactionResponse>> =>
  api.post(createTransactionRoute, body);

export const updateTransactionRequest = (
  body: SubmitTransaction,
): Promise<AxiosResponse<AddTransactionResponse>> =>
  api.patch(updateTransactionRoute, body);

export const getTransactionsRequest = (
  body: GetTransactions,
): Promise<AxiosResponse<GetTransactionsResponse>> =>
  api.post(getTransactionsRoute, body);

export const deleteTransactionRequest = (body: {
  transactionId: string;
}): Promise<AxiosResponse<DeleteTransactionResponse>> =>
  api.delete(deleteTransactionRoute, { data: body });

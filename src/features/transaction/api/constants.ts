import {
  CreateTransactionResponse,
  DeleteTransactionResponse,
  GetTransactionsPayload,
  GetTransactionsResponse,
  CreateTransactionPayload,
} from 'features/transaction/types';
import { AxiosResponse } from 'axios';
import api from 'api/axiosInstance';

export const createTransactionRoute = '/transaction/create';
export const updateTransactionRoute = '/transaction/update';
export const getTransactionsRoute = '/transaction/get';
export const deleteTransactionRoute = '/transaction/delete';

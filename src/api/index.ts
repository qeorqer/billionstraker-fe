import { AxiosResponse } from 'axios';

import {
  AuthData,
  AuthResponse,
  UpdateUserResponse,
} from 'features/user/types';
import {
  Category,
  CreateCategoryResponse,
  DeleteCategoryResponse,
  GetCategoriesResponse,
} from 'features/category/types';
import {
  CreateTransactionResponse,
  DeleteTransactionResponse,
  GetTransactionsResponse,
  CreateTransactionPayload,
} from 'features/transaction/types';
import { getStatisticsForBalanceResponseType } from 'types/statistic.type';
import {
  Balance,
  CreateBalanceResponse,
  DeleteBalanceResponse,
  GetBalanceResponse,
} from 'features/balance/types';

import api from './axiosInstance';

/* transaction requests */

/* statistics requests */
export const getStatisticsForBalance = (body: {
  from: Date;
  to: Date;
  balance: string;
}): Promise<AxiosResponse<getStatisticsForBalanceResponseType>> =>
  api.post('/statistics/getStatisticsForBalance', body);

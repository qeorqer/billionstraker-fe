import { AxiosResponse } from 'axios';

import {
  AuthData,
  AuthResponse,
  UpdateUserResponse,
} from 'features/user/types';
import {
  categoryType,
  createCategoryResponseType,
  deleteCategoryResponseType,
  getCategoriesResponseType,
} from 'types/category.type';
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

/* category requests */
export const getCategories = (): Promise<
  AxiosResponse<getCategoriesResponseType>
> => api.get('/category/getCategories');

export const createCategory = (body: {
  category: categoryType;
}): Promise<AxiosResponse<createCategoryResponseType>> =>
  api.post('/category/createCategory', body);

export const updateCategory = (body: {
  category: categoryType;
  categoryId: string;
}): Promise<AxiosResponse<createCategoryResponseType>> =>
  api.patch('/category/updateCategory', body);

export const deleteCategory = (body: {
  categoryId: string;
}): Promise<AxiosResponse<deleteCategoryResponseType>> =>
  api.delete('/category/deleteCategory', { data: body });

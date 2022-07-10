import { AxiosResponse } from 'axios';

import {
  authData,
  loginResponseType,
  signUpResponseType,
  updateUserResponseType,
} from 'types/user.type';
import {
  categoryType,
  createCategoryResponseType,
  deleteCategoryResponseType,
  getCategoriesResponseType,
} from 'types/category.type';
import {
  addTransactionResponseType,
  getTransactionsResponseType,
  transactionType,
} from 'types/transaction.type';
import {
  getGeneralStatisticResponseType,
  getStatisticForRangeResponseType,
  getWholeStatisticResponseType,
} from 'types/statistic.type';
import {
  balanceType,
  createBalanceResponseType,
  deleteBalanceResponseType,
  getBalanceResponseType,
} from 'types/balance.type';

import api from './axiosInstance';

/* user requests */
export const signUp = (
  body: authData,
): Promise<AxiosResponse<signUpResponseType>> => api.post('/user/signUp', body);

export const logIn = (
  body: authData,
): Promise<AxiosResponse<loginResponseType>> => api.post('/user/logIn', body);

export const logOut = (): Promise<AxiosResponse<void>> =>
  api.post('/user/logOut');

export const refresh = (): Promise<AxiosResponse<loginResponseType>> =>
  api.get('/user/refresh');

export const setFirstEnter = (): Promise<
  AxiosResponse<updateUserResponseType>
> => api.patch('/user/setFirstEnter');

export const setInitialValues = (body: {
  card: number;
  cash: number;
}): Promise<AxiosResponse<updateUserResponseType>> =>
  api.patch('/user/setInitialValues', body);

/* transaction requests */
export const addTransaction = (body: {
  transaction: transactionType;
  balanceId: string;
  balanceToSubtractId?: string;
}): Promise<AxiosResponse<addTransactionResponseType>> =>
  api.post('/transaction/createTransaction', body);

export const getAllUserTransactions = (body: {
  limit: number;
  numberToSkip: number;
  filteringOptions: {
    shownTransactionsTypes: string;
    categoriesToShow: string[];
    balancesToShow: string[];
  };
}): Promise<AxiosResponse<getTransactionsResponseType>> =>
  api.post('/transaction/getAllUserTransactions', body);

/* statistic requests */
export const getGeneralStatistic = (): Promise<
  AxiosResponse<getGeneralStatisticResponseType>
> => api.get('/statistic/getGeneralStatistic');

export const getWholeStatistic = (): Promise<
  AxiosResponse<getWholeStatisticResponseType>
> => api.get('/statistic/getWholeStatistic');

export const getStatisticForRange = (body: {
  from: Date;
  to: Date;
}): Promise<AxiosResponse<getStatisticForRangeResponseType>> =>
  api.post('/statistic/getStatisticForRange', body);

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

/* balance requests */
export const createBalance = (body: {
  name: string;
  amount: number;
}): Promise<AxiosResponse<createBalanceResponseType>> =>
  api.post('/balance/createBalance', body);

export const getBalances = (): Promise<AxiosResponse<getBalanceResponseType>> =>
  api.get('/balance/getBalances');

export const updateBalance = (body: {
  balanceId: string;
  balance: balanceType;
}): Promise<AxiosResponse<createBalanceResponseType>> =>
  api.patch('/balance/updateBalance', body);

export const deleteBalance = (body: {
  balanceId: string;
}): Promise<AxiosResponse<deleteBalanceResponseType>> =>
  api.delete('/balance/deleteBalance', { data: body });

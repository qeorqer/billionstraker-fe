import { AxiosResponse } from 'axios';

import api from './axiosInstance';
import {
  authData,
  loginResponseType,
  signUpResponseType,
  updateUserResponseType,
} from '../types/user.type';
import { categoryResponseType } from '../types/category.type';
import {
  addTransactionResponseType,
  getTransactionsResponseType,
  transactionType,
} from '../types/transaction.type';
import {
  getGeneralStatisticResponseType,
  getStatisticForRangeResponseType,
  getWholeStatisticResponseType,
} from '../types/statistic.type';
import {
  createBalanceResponseType,
  getBalanceResponseType,
} from '../types/balance.type';

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
}): Promise<AxiosResponse<addTransactionResponseType>> =>
  api.post('/transaction/createTransaction', body);

export const getAllUserTransactions = (body: {
  limit: number;
  numberToSkip: number;
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
export const getCategories = (): Promise<AxiosResponse<categoryResponseType>> =>
  api.get('/category/getCategories');

/* balance requests */
export const createBalance = (body: {
  name: string;
  amount: number;
}): Promise<AxiosResponse<createBalanceResponseType>> =>
  api.post('/balance/createBalance', body);

export const getBalances = (): Promise<AxiosResponse<getBalanceResponseType>> =>
  api.get('/balance/getBalances');

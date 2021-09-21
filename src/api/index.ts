import api from './axiosInstance'
import { authData, loginResponseType, signUpResponseType } from "../types/auth.type";
import { AxiosResponse } from 'axios';
import { categoryResponseType } from "../types/category.type";
import {
  addTransactionResponseType,
  getTransactionsResponseType,
  transactionType
} from "../types/transaction.type";
import {
  getGeneralStatisticResponseType,
  getStatisticForRangeResponseType,
  getWholeStatisticResponseType
} from "../types/statistic.type";

/* auth requests */
export const signUp = (body: authData): Promise<AxiosResponse<signUpResponseType>> => api.post('/auth/signUp', body)
export const logIn = (body: authData): Promise<AxiosResponse<loginResponseType>> => api.post('/auth/logIn', body)
export const logOut = (): Promise<AxiosResponse<void>> => api.post('/auth/logOut')
export const refresh = (): Promise<AxiosResponse<loginResponseType>> => api.get('/auth/refresh')

/*transaction requests*/
export const addTransaction = (body: { transaction: transactionType }): Promise<AxiosResponse<addTransactionResponseType>> => api.post('/transaction/addNewTransaction', body)
export const getAllUserTransactions = (body: {limit: number, numberToSkip: number}): Promise<AxiosResponse<getTransactionsResponseType>> => api.post('/transaction/getAllUserTransactions', body)

/*statistic requests*/
export const getGeneralStatistic = (): Promise<AxiosResponse<getGeneralStatisticResponseType>> => api.get('/statistic/getGeneralStatistic')
export const getWholeStatistic = (): Promise<AxiosResponse<getWholeStatisticResponseType>> => api.get('/statistic/getWholeStatistic')
export const getStatisticForRange = (body: { from: Date, to: Date }): Promise<AxiosResponse<getStatisticForRangeResponseType>> => api.post('/statistic/getStatisticForRange', body)

/*category requests*/
export const getCategories = (): Promise<AxiosResponse<categoryResponseType>> => api.get('/category/getCategories')
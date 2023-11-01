import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AddTransactionResponse,
  DeleteTransactionResponse,
  GetTransactions,
  GetTransactionsResponse,
  SubmitTransaction,
} from 'features/transaction/types';
import { AxiosResponse } from 'axios';
import {
  createTransactionRoute,
  deleteTransactionRoute,
  getTransactionsRoute,
  updateTransactionRoute,
} from 'features/transaction/api/constants';
import {
  createTransactionRequest,
  deleteTransactionRequest,
  getTransactionsRequest,
  updateTransactionRequest,
} from 'features/transaction/api/requests';

export const createTransactionThunk = createAsyncThunk(
  createTransactionRoute,
  async (
    body: SubmitTransaction,
  ): Promise<AxiosResponse<AddTransactionResponse>> =>
    await createTransactionRequest(body),
);

export const getTransactionsThunk = createAsyncThunk(
  getTransactionsRoute,
  async (
    body: GetTransactions,
  ): Promise<AxiosResponse<GetTransactionsResponse>> =>
    await getTransactionsRequest(body),
);

export const deleteTransactionThunk = createAsyncThunk(
  deleteTransactionRoute,
  async (body: {
    transactionId: string;
  }): Promise<AxiosResponse<DeleteTransactionResponse>> =>
    await deleteTransactionRequest(body),
);

export const updateTransactionThunk = createAsyncThunk(
  updateTransactionRoute,
  async (
    body: SubmitTransaction,
  ): Promise<AxiosResponse<AddTransactionResponse>> =>
    await updateTransactionRequest(body),
);

import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import {
  CreateTransactionPayload,
  createTransactionRequest,
  CreateTransactionResponse,
  createTransactionRoute,
  DeleteTransactionPayload,
  deleteTransactionRequest,
  DeleteTransactionResponse,
  deleteTransactionRoute,
  GetTransactionsPayload,
  getTransactionsRequest,
  GetTransactionsResponse,
  getTransactionsRoute,
  updateTransactionRequest,
  updateTransactionRoute,
} from 'features/transaction';

export const createTransactionThunk = createAsyncThunk(
  createTransactionRoute,
  async (
    body: CreateTransactionPayload,
  ): Promise<AxiosResponse<CreateTransactionResponse>> =>
    await createTransactionRequest(body),
);

export const getTransactionsThunk = createAsyncThunk(
  getTransactionsRoute,
  async (
    body: GetTransactionsPayload,
  ): Promise<AxiosResponse<GetTransactionsResponse>> =>
    await getTransactionsRequest(body),
);

export const deleteTransactionThunk = createAsyncThunk(
  deleteTransactionRoute,
  async (
    body: DeleteTransactionPayload,
  ): Promise<AxiosResponse<DeleteTransactionResponse>> =>
    await deleteTransactionRequest(body),
);

export const updateTransactionThunk = createAsyncThunk(
  updateTransactionRoute,
  async (
    body: CreateTransactionPayload,
  ): Promise<AxiosResponse<CreateTransactionResponse>> =>
    await updateTransactionRequest(body),
);

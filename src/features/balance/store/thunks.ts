import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import {
  CreateBalancePayload,
  CreateBalanceResponse,
  DeleteBalancePayload,
  DeleteBalanceResponse,
  GetBalanceResponse,
  UpdateBalancePayload,
} from 'features/balance/types';

import {
  createBalanceRequest,
  deleteBalanceRequest,
  getBalancesRequest,
  updateBalanceRequest,
} from 'features/balance/api/requests';
import {
  createBalanceRoute,
  deleteBalanceRoute,
  getBalancesRoute,
  updateBalanceRoute,
} from 'features/balance/api/constants';

export const createBalanceThunk = createAsyncThunk(
  createBalanceRoute,
  async (
    body: CreateBalancePayload,
  ): Promise<AxiosResponse<CreateBalanceResponse>> =>
    await createBalanceRequest(body),
);

export const getBalancesThunk = createAsyncThunk(
  getBalancesRoute,
  async (): Promise<AxiosResponse<GetBalanceResponse>> =>
    await getBalancesRequest(),
);

export const updateBalanceThunk = createAsyncThunk(
  updateBalanceRoute,
  async (
    body: UpdateBalancePayload,
  ): Promise<AxiosResponse<CreateBalanceResponse>> =>
    await updateBalanceRequest(body),
);

export const deleteBalanceThunk = createAsyncThunk(
  deleteBalanceRoute,
  async (
    body: DeleteBalancePayload,
  ): Promise<AxiosResponse<DeleteBalanceResponse>> =>
    await deleteBalanceRequest(body),
);

import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import {
  createCategoryRequest,
  createCategoryRoute,
  CreateUpdateCategoryPayload,
  CreateUpdateCategoryResponse,
  deleteCategoryRequest,
  DeleteCategoryResponse,
  deleteCategoryRoute,
  getCategoriesRequest,
  GetCategoriesResponse,
  getCategoriesRoute,
  updateCategoryRequest,
  updateCategoryRoute,
} from 'features/category';

export const getCategoriesThunk = createAsyncThunk(
  getCategoriesRoute,
  async (): Promise<AxiosResponse<GetCategoriesResponse>> =>
    await getCategoriesRequest(),
);

export const createCategoryThunk = createAsyncThunk(
  createCategoryRoute,
  async (
    body: CreateUpdateCategoryPayload,
  ): Promise<AxiosResponse<CreateUpdateCategoryResponse>> =>
    await createCategoryRequest(body),
);

export const updateCategoryThunk = createAsyncThunk(
  updateCategoryRoute,
  async (
    body: CreateUpdateCategoryPayload,
  ): Promise<AxiosResponse<CreateUpdateCategoryResponse>> =>
    await updateCategoryRequest(body),
);

export const deleteCategoryThunk = createAsyncThunk(
  deleteCategoryRoute,
  async (body: {
    categoryId: string;
  }): Promise<AxiosResponse<DeleteCategoryResponse>> =>
    await deleteCategoryRequest(body),
);

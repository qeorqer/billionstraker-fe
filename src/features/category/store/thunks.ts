import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import {
  CreateCategoryPayload,
  createCategoryRequest,
  CreateCategoryResponse,
  createCategoryRoute,
  deleteCategoryRequest,
  DeleteCategoryResponse,
  deleteCategoryRoute,
  getCategoriesRequest,
  GetCategoriesResponse,
  getCategoriesRoute,
  UpdateCategoryPayload,
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
    body: CreateCategoryPayload,
  ): Promise<AxiosResponse<CreateCategoryResponse>> =>
    await createCategoryRequest(body),
);

export const updateCategoryThunk = createAsyncThunk(
  updateCategoryRoute,
  async (
    body: UpdateCategoryPayload,
  ): Promise<AxiosResponse<CreateCategoryResponse>> =>
    await updateCategoryRequest(body),
);

export const deleteCategoryThunk = createAsyncThunk(
  deleteCategoryRoute,
  async (body: {
    categoryId: string;
  }): Promise<AxiosResponse<DeleteCategoryResponse>> =>
    await deleteCategoryRequest(body),
);

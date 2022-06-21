import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import * as api from '../../api/index';
import {
  categoryType,
  createCategoryResponseType, deleteCategoryResponseType,
  getCategoriesResponseType,
} from '../../types/category.type';

export const getCategories = createAsyncThunk(
  'category/getCategories',
  async (): Promise<AxiosResponse<getCategoriesResponseType>> =>
    await api.getCategories(),
);

export const createCategory = createAsyncThunk(
  'category/createCategory',
  async (body: { category: categoryType }): Promise<AxiosResponse<createCategoryResponseType>> =>
    await api.createCategory(body),
);

export const updateCategory = createAsyncThunk(
  'category/updateCategory',
  async (body: { category: categoryType, categoryId: string }): Promise<AxiosResponse<createCategoryResponseType>> =>
    await api.updateCategory(body),
);

export const deleteCategory = createAsyncThunk(
  'category/deleteCategory',
  async (body: { categoryId: string }): Promise<AxiosResponse<deleteCategoryResponseType>> =>
    await api.deleteCategory(body),
);

export type categoryState = {
  categories: categoryType[];
};

const initialState: categoryState = {
  categories: [] as categoryType[],
};

const categoryReducer = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = action.payload.data.categories;
    });
  },
});

export default categoryReducer.reducer;

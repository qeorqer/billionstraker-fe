import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import i18next from 'i18next';

import * as api from 'api/index';
import {
  categoryType,
  createCategoryResponseType,
  deleteCategoryResponseType,
  getCategoriesResponseType,
} from 'types/category.type';

export const getCategories = createAsyncThunk(
  'category/getCategories',
  async (): Promise<AxiosResponse<getCategoriesResponseType>> =>
    await api.getCategories(),
);

export const createCategory = createAsyncThunk(
  'category/createCategory',
  async (body: {
    category: categoryType;
  }): Promise<AxiosResponse<createCategoryResponseType>> =>
    await api.createCategory(body),
);

export const updateCategory = createAsyncThunk(
  'category/updateCategory',
  async (body: {
    category: categoryType;
    categoryId: string;
  }): Promise<AxiosResponse<createCategoryResponseType>> =>
    await api.updateCategory(body),
);

export const deleteCategory = createAsyncThunk(
  'category/deleteCategory',
  async (body: {
    categoryId: string;
  }): Promise<AxiosResponse<deleteCategoryResponseType>> =>
    await api.deleteCategory(body),
);

export type categoryState = {
  categories: categoryType[];
  isLoadingCategories: boolean;
};

const initialState: categoryState = {
  categories: [] as categoryType[],
  isLoadingCategories: false,
};

const categoryReducer = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.isLoadingCategories = true;
    });

    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = action.payload.data.categories;
      state.isLoadingCategories = false;
    });

    builder.addCase(getCategories.rejected, (state) => {
      state.isLoadingCategories = false;
    });

    builder.addCase(createCategory.fulfilled, (state, action) => {
      toast(i18next.t('creating category success'), {
        type: 'success',
      });

      state.categories = [...state.categories, action.payload.data.category];
    });

    builder.addCase(updateCategory.fulfilled, (state, action) => {
      toast(i18next.t('updating category success'), {
        type: 'success',
      });

      const updatedCategory = action.payload.data.category;
      state.categories = state.categories.map((category) =>
        category._id === updatedCategory._id ? updatedCategory : category,
      );
    });

    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      toast(i18next.t('deleting category success'), {
        type: 'success',
      });

      const deletedCategoryId = action.payload.data.categoryId;
      state.categories = state.categories.filter(
        (category) => category._id !== deletedCategoryId,
      );
    });
  },
});

export default categoryReducer.reducer;

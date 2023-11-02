import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import i18next from 'i18next';

import {
  Category,
  createCategoryThunk,
  deleteCategoryThunk,
  getCategoriesThunk,
  updateCategoryThunk,
} from 'features/category';

export type CategoryState = {
  categories: Category[];
  isLoadingCategories: boolean;
};

const initialState: CategoryState = {
  categories: [] as Category[],
  isLoadingCategories: false,
};

const categoryReducer = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategoriesThunk.pending, (state) => {
      state.isLoadingCategories = true;
    });

    builder.addCase(getCategoriesThunk.fulfilled, (state, action) => {
      state.categories = action.payload.data.categories;
      state.isLoadingCategories = false;
    });

    builder.addCase(getCategoriesThunk.rejected, (state) => {
      state.isLoadingCategories = false;
    });

    builder.addCase(createCategoryThunk.pending, (state, action) => {
      state.isLoadingCategories = true;
    });

    builder.addCase(createCategoryThunk.fulfilled, (state, action) => {
      state.isLoadingCategories = false;
      toast(i18next.t('creating category success'), {
        type: 'success',
      });

      state.categories = [...state.categories, action.payload.data.category];
    });

    builder.addCase(createCategoryThunk.rejected, (state, action) => {
      state.isLoadingCategories = false;
    });

    builder.addCase(updateCategoryThunk.fulfilled, (state, action) => {
      toast(i18next.t('updating category success'), {
        type: 'success',
      });

      const updatedCategory = action.payload.data.category;
      state.categories = state.categories.map((category) =>
        category._id === updatedCategory._id ? updatedCategory : category,
      );
    });

    builder.addCase(deleteCategoryThunk.fulfilled, (state, action) => {
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

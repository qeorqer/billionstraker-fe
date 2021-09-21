import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import * as api from '../../api/index'
import { categoryResponseType, categoryType } from "../../types/category.type";


export const getCategories = createAsyncThunk(
  'category/getCategories',
  async (): Promise<AxiosResponse<categoryResponseType>> => await api.getCategories(),
)

export type categoryState = {
  categories: categoryType[],
}

const initialState: categoryState = {
  categories: [] as categoryType[],
}

const categoryReducer = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = action.payload.data.categories
    })

  })
})

export default categoryReducer.reducer
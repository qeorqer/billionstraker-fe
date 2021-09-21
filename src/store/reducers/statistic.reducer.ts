import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import * as api from '../../api/index'
import {
  generalStatisticType,
  getGeneralStatisticResponseType,
  getStatisticForRangeResponseType,
  getWholeStatisticResponseType,
  statisticForRangeType,
  wholeStatisticType
} from "../../types/statistic.type";

export const getGeneralStatistic = createAsyncThunk(
  'statistic/getGeneralStatistic',
  async (): Promise<AxiosResponse<getGeneralStatisticResponseType>> => await api.getGeneralStatistic()
)

export const getWholeStatistic = createAsyncThunk(
  'statistic/getWholeStatistic',
  async (): Promise<AxiosResponse<getWholeStatisticResponseType>> => await api.getWholeStatistic()
)

export const getStatisticForRange = createAsyncThunk(
  'statistic/getStatisticForRange',
  async (body: { from: Date, to: Date }): Promise<AxiosResponse<getStatisticForRangeResponseType>> => await api.getStatisticForRange(body)
)

export type statisticState = {
  loading: boolean,
  generalStatistic: generalStatisticType | null,
  wholeStatistic: wholeStatisticType | null,
  statisticForRange: statisticForRangeType | null
}

const initialState: statisticState = {
  loading: false,
  generalStatistic: null,
  wholeStatistic: null,
  statisticForRange: null
}

const statisticReducer = createSlice({
  name: 'statistic',
  initialState,
  reducers: {},
  extraReducers: (builder => {
    builder.addCase(getGeneralStatistic.fulfilled, (state, action) => {
      state.generalStatistic = action.payload.data.statistic
    })

    builder.addCase(getWholeStatistic.fulfilled, (state, action) => {
      state.wholeStatistic = action.payload.data.statistic
    })

    builder.addCase(getStatisticForRange.fulfilled, (state, action) => {
      state.statisticForRange = action.payload.data.statistic
    })
  })
})


export default statisticReducer.reducer
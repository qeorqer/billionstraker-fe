import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import * as api from '../../api/index'
import { getTransactionsResponseType, transactionType } from "../../types/transaction.type";

export const getAllUserTransactions = createAsyncThunk(
  'transaction/getAllUserTransactions',
  async (body: { limit: number, numberToSkip: number }): Promise<AxiosResponse<getTransactionsResponseType>> => await api.getAllUserTransactions(body),
)

export type transactionState = {
  loading: boolean,
  numberOfTransactions: number,
  transactions: transactionType[],
}

const initialState: transactionState = {
  loading: false,
  numberOfTransactions: 0,
  transactions: [] as transactionType[],
}

const transactionReducer = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    resetTransactions: (state) => {
      state.transactions = []
    }
  },
  extraReducers: (builder => {
    builder.addCase(getAllUserTransactions.pending, (state) => {
      state.loading = true
    })

    builder.addCase(getAllUserTransactions.fulfilled, (state, action) => {
      state.loading = false
      state.transactions = [...state.transactions, ...action.payload.data.transactions]
      state.numberOfTransactions = action.payload.data.numberOfTransactions || 0
    })
  })
})

export const { resetTransactions } = transactionReducer.actions

export default transactionReducer.reducer
import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./reducers/user.reducer";
import categoryReducer from "./reducers/category.reducer";
import transactionReducer from "./reducers/transaction.reducer";
import statisticReducer from "./reducers/statistic.reducer";


const store = configureStore({
  reducer: {
    userData: userReducer,
    categoryDate: categoryReducer,
    transactionData: transactionReducer,
    statisticData: statisticReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
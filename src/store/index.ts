import { configureStore } from '@reduxjs/toolkit';

import userReducer from 'store/reducers/user.reducer';
import categoryReducer from 'store/reducers/category.reducer';
import transactionReducer from 'store/reducers/transaction.reducer';
import statisticReducer from 'store/reducers/statistic.reducer';
import balanceReducer from 'store/reducers/balance.reducer';

const store = configureStore({
  reducer: {
    userData: userReducer,
    categoryDate: categoryReducer,
    transactionData: transactionReducer,
    statisticData: statisticReducer,
    balanceData: balanceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

import { configureStore } from '@reduxjs/toolkit';

import userReducer from 'features/user/store/reducer';
import categoryReducer from 'features/category/store/reducer';
import transactionReducer from 'features/transaction/store/reducer';
import statisticsReducer from 'features/statistics/store/reducer';
import balanceReducer from 'features/balance/store/reducer';

const store = configureStore({
  reducer: {
    userData: userReducer,
    categoryDate: categoryReducer,
    transactionData: transactionReducer,
    statisticsData: statisticsReducer,
    balanceData: balanceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

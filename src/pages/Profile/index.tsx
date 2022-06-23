import React, { useEffect } from 'react';

import { getGeneralStatistic } from 'store/reducers/statistic.reducer';
import { useAppDispatch, useAppSelector } from 'hooks/react-redux.hook';
import {
  getAllUserTransactions,
  resetTransactions,
} from 'store/reducers/transaction.reducer';
import { statisticData, transactionData } from 'store/selectors';
import Loader from 'components/Loader';

import Profile from './view';

const ProfilePage = () => {
  const { isTransactionsloading } = useAppSelector(transactionData);
  const { isGeneralStatisticLoading } = useAppSelector(statisticData);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetTransactions());
    dispatch(getGeneralStatistic());
    dispatch(getAllUserTransactions({ limit: 10, numberToSkip: 0 }));
  }, []);

  if (isGeneralStatisticLoading && isTransactionsloading) {
    return <Loader />;
  }

  return (
    <Profile />
  );
};

export default ProfilePage;

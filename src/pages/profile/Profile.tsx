import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';

import UserInfo from 'components/Profile/UserInfo';
import Transactions from 'components/Profile/Transactions';
import { getGeneralStatistic } from 'store/reducers/statistic.reducer';
import { useAppDispatch, useAppSelector } from 'hooks/react-redux.hook';
import {
  getAllUserTransactions,
  resetTransactions,
} from 'store/reducers/transaction.reducer';
import { statisticData, transactionData } from 'store/selectors';
import Loader from 'components/Loader';

import './profile.scss';

const Profile = () => {
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
    <Container className="py-4">
      <UserInfo />
      <Transactions />
    </Container>
  );
};

export default Profile;

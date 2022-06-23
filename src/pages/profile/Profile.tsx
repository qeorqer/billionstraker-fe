import React, { useEffect } from 'react';
import UserInfo from '../../components/profile/UserInfo';
import { Container } from 'react-bootstrap';
import './profile.scss';
import Transactions from '../../components/profile/Transactions';
import { getGeneralStatistic } from '../../store/reducers/statistic.reducer';
import { useAppDispatch, useAppSelector } from '../../hooks/react-redux.hook';
import {
  getAllUserTransactions,
  resetTransactions,
} from '../../store/reducers/transaction.reducer';
import { statisticData, transactionData } from '../../store/selectors';
import Loader from '../../components/Loader';

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

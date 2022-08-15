import React, { FC, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from 'hooks/react-redux.hook';
import { getStatisticsForBalance } from 'store/reducers/statistic.reducer';
import { statisticData, userData } from 'store/selectors';
import { getBalances } from 'store/reducers/balance.reducer';
import Loader from 'components/Loader';
import 'moment/locale/ru';

import Statistics from './view';

const StatisticsPage: FC = () => {
  const { statisticsForBalance } =
    useAppSelector(statisticData);
  const {
    isLoadingBalances,
    balances,
  } = useAppSelector((state) => state.balanceData);

  const dispatch = useAppDispatch();
  const { user } = useAppSelector(userData);

  const [monthsRange, setMonthsRange] = useState<Date[]>([new Date(user.created), new Date()]);
  const [balance, setBalance] = useState<string>('');

  useEffect(() => {
    if (balance) {
      dispatch(
        getStatisticsForBalance({
          from: monthsRange[0],
          to: monthsRange[1],
          balance,
        }),
      );
    }
  }, [monthsRange, balance]);

  useEffect(() => {
    dispatch(getBalances());
  }, []);

  useEffect(() => {
    if (balances.length) {
      setBalance(balances[0].name);
    }
  }, [balances]);

  if (isLoadingBalances) {
    return <Loader />;
  }

  return (
    <Statistics
      statisticsForBalance={statisticsForBalance}
      monthsRange={monthsRange}
      setMonthsRange={setMonthsRange}
      balance={balance}
      setBalance={setBalance}
    />
  );
};

export default StatisticsPage;

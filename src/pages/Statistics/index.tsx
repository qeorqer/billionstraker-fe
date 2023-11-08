import React, { FC, useEffect, useState } from 'react';
import moment from 'moment';
import { useLocation } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import Loader from 'components/Shared/Loader';
import { balanceData, getBalancesThunk } from 'features/balance';
import { getStatisticsForSingleBalanceThunk } from 'features/statistics';
import 'moment/locale/ru';

import StatisticsPageView from './view';

const StatisticsPage: FC = () => {
  const { isLoadingBalances, balances } = useAppSelector(balanceData);

  const dispatch = useAppDispatch();
  const { search } = useLocation();

  const params = new URLSearchParams(search);

  const initialBalance = params.get('balance');
  const initialDateFrom = params.get('dateFrom');
  const initialDateTo = params.get('dateTo');

  const startOfMonth = new Date(moment().startOf('month').toISOString());
  const [monthsRange, setMonthsRange] = useState<[Date, Date]>([
    new Date(initialDateFrom || startOfMonth),
    new Date(initialDateTo || new Date()),
  ]);
  const [balance, setBalance] = useState<string>(initialBalance || '');

  useEffect(() => {
    if (balance) {
      dispatch(
        getStatisticsForSingleBalanceThunk({
          from: monthsRange[0],
          to: monthsRange[1],
          balance,
        }),
      );
    }
  }, [monthsRange, balance]);

  useEffect(() => {
    dispatch(getBalancesThunk());
  }, []);

  useEffect(() => {
    if (balances.length && !initialBalance) {
      setBalance(balances[0].name);
    }
  }, [balances]);

  if (isLoadingBalances) {
    return <Loader />;
  }

  return (
    <StatisticsPageView
      monthsRange={monthsRange}
      setMonthsRange={setMonthsRange}
      balanceName={balance}
      setBalanceName={setBalance}
    />
  );
};

export default StatisticsPage;

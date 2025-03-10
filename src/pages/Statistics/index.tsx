import { FC, useEffect, useState } from 'react';
import moment from 'moment';
import { useLocation } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import Loader from 'components/Shared/Loader';
import { balanceData, getBalancesThunk } from 'features/balance';
import { getStatisticsThunk } from 'features/statistics';
import 'moment/locale/ru';

import StatisticsPageView from './view';
import { userData } from 'features/user';

const StatisticsPage: FC = () => {
  const { isLoadingBalances } = useAppSelector(balanceData);
  const { user } = useAppSelector(userData);

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
  const [balanceName, setBalanceName] = useState<string>(initialBalance || '');

  useEffect(() => {
    dispatch(
      getStatisticsThunk({
        from: monthsRange[0],
        to: monthsRange[1],
        balance: balanceName ? balanceName : null,
      }),
    );
  }, [monthsRange, balanceName, user]);

  useEffect(() => {
    dispatch(getBalancesThunk());
  }, []);

  if (isLoadingBalances) {
    return <Loader />;
  }

  return (
    <StatisticsPageView
      monthsRange={monthsRange}
      setMonthsRange={setMonthsRange}
      balanceName={balanceName}
      setBalanceName={setBalanceName}
    />
  );
};

export default StatisticsPage;

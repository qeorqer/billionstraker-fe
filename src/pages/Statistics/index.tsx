import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from 'hooks/react-redux.hook';
import {
  getStatisticForRange,
} from 'store/reducers/statistic.reducer';
import { statisticData, userData } from 'store/selectors';
import Loader from 'components/Loader';
import 'moment/locale/ru';

import Statistics from './view';

const StatisticsPage: FC = () => {
  const dispatch = useAppDispatch();
  const {
    statisticForRange,
    isStatisticForRangeLoading,
  } = useAppSelector(statisticData);
  const { t } = useTranslation();
  const { user } = useAppSelector(userData);

  const [monthsRange, setMonthsRange] = useState<Date[]>([
    new Date(user.created),
    new Date(),
  ]);

  useEffect(() => {
    dispatch(
      getStatisticForRange({ from: monthsRange[0], to: monthsRange[1], balance: 'Mono UAH' }),
    );
  }, [monthsRange]);

  if (isStatisticForRangeLoading) {
    return <Loader />;
  }

  return (
    <Statistics
      t={t}
      statisticForRange={statisticForRange}
      monthsRange={monthsRange}
      setMonthsRange={setMonthsRange}
    />
  );
};

export default StatisticsPage;

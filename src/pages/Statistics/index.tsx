import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from 'hooks/react-redux.hook';
import {
  getStatisticForRange,
  getWholeStatistic,
} from 'store/reducers/statistic.reducer';
import { statisticData, userData } from 'store/selectors';
import Loader from 'components/Loader';
import 'moment/locale/ru';

import Statistics from './view';

const StatisticsPage: FC = () => {
  const dispatch = useAppDispatch();
  const {
    wholeStatistic,
    statisticForRange,
    isWholeStatisticLoading,
    isStatisticForRangeLoading,
  } = useAppSelector(statisticData);
  const { t } = useTranslation();
  const { user, lang } = useAppSelector(userData);

  useEffect(() => {
    dispatch(getWholeStatistic());
  }, []);

  const [monthsRange, setMonthsRange] = useState<Date[]>([
    new Date(user.created),
    new Date(),
  ]);

  useEffect(() => {
    dispatch(
      getStatisticForRange({ from: monthsRange[0], to: monthsRange[1] }),
    );
  }, [monthsRange]);

  if (isWholeStatisticLoading && isStatisticForRangeLoading) {
    return <Loader />;
  }

  return (
    <Statistics
      t={t}
      wholeStatistic={wholeStatistic}
      statisticForRange={statisticForRange}
      monthsRange={monthsRange}
      setMonthsRange={setMonthsRange}
      user={user}
      lang={lang}
    />
  );
};

export default StatisticsPage;

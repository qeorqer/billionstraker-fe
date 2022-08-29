import React, { Dispatch, FC, SetStateAction } from 'react';
import { Container } from 'react-bootstrap';

import RangeStatistic from 'components/Statistics/RangeStatistic';
import { getStatisticsForBalanceType } from 'types/statistic.type';

type propsType = {
  statisticsForBalance: getStatisticsForBalanceType | null;
  monthsRange: Date[];
  setMonthsRange: Dispatch<SetStateAction<Date[]>>;
  balance: string;
  setBalance: Dispatch<SetStateAction<string>>;
};

const Statistics: FC<propsType> = ({
  statisticsForBalance,
  monthsRange,
  setMonthsRange,
  balance,
  setBalance,
}) => (
  <Container className="py-md-4 my-4 pb-5 pb-sm-0">
    <RangeStatistic
      statisticsForRange={statisticsForBalance}
      monthsRange={monthsRange}
      setMonthsRange={setMonthsRange}
      balance={balance}
      setBalance={setBalance}
    />
  </Container>
);

export default Statistics;

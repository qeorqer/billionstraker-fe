import React, { Dispatch, FC, SetStateAction } from 'react';
import { Container, Stack } from 'react-bootstrap';

import RangeStatistic from 'features/statistics/components/RangeStatistic';
import { StatisticsForBalance } from 'features/statistics/types';
import NetWorthView from 'features/statistics/components/NetWorth';

type StatisticsPageViewProps = {
  statisticsForBalance: StatisticsForBalance | null;
  monthsRange: [Date, Date];
  setMonthsRange: Dispatch<SetStateAction<[Date, Date]>>;
  balance: string;
  setBalance: Dispatch<SetStateAction<string>>;
};

const StatisticsPageView: FC<StatisticsPageViewProps> = ({
  statisticsForBalance,
  monthsRange,
  setMonthsRange,
  balance,
  setBalance,
}) => (
  <Container className="py-md-4 my-4 pb-5 pb-sm-0">
    <Stack gap={2}>
      <NetWorthView />
      <RangeStatistic
        statisticsForRange={statisticsForBalance}
        monthsRange={monthsRange}
        setMonthsRange={setMonthsRange}
        balance={balance}
        setBalance={setBalance}
      />
    </Stack>
  </Container>
);

export default StatisticsPageView;

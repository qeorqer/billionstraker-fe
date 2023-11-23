import React, { Dispatch, FC, SetStateAction } from 'react';
import { Container, Stack } from 'react-bootstrap';

import StatisticsView from 'features/statistics/components/StatisticsView';
import { Statistics } from 'features/statistics/types';
import NetWorthView from 'features/statistics/components/NetWorth';
import SelectStatisticsDetails from 'features/statistics/components/SelectStatisticsDetails/SelectStatisticsDetails';

type StatisticsPageViewProps = {
  monthsRange: [Date, Date];
  setMonthsRange: Dispatch<SetStateAction<[Date, Date]>>;
  balanceName: string;
  setBalanceName: Dispatch<SetStateAction<string>>;
};

const StatisticsPageView: FC<StatisticsPageViewProps> = ({
  monthsRange,
  setMonthsRange,
  balanceName,
  setBalanceName,
}) => (
  <Container className="py-md-4 my-4 pb-5 pb-sm-0">
    <Stack gap={2}>
      <NetWorthView />
      <SelectStatisticsDetails
        balanceName={balanceName}
        setBalanceName={setBalanceName}
        setMonthsRange={setMonthsRange}
        monthsRange={monthsRange}
      />
      <StatisticsView monthsRange={monthsRange} balanceName={balanceName} />
    </Stack>
  </Container>
);

export default StatisticsPageView;

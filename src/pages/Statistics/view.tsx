import { Dispatch, FC, SetStateAction } from 'react';

import StatisticsView from 'features/statistics/components/StatisticsView';
import NetWorthView from 'features/statistics/components/NetWorth';
import SelectStatisticsDetails from 'features/statistics/components/SelectStatisticsDetails/SelectStatisticsDetails';
import { Box, Container, Stack } from '@mantine/core';

type StatisticsPageViewProps = {
  monthsRange: [Date, Date];
  setMonthsRange: Dispatch<SetStateAction<[Date, Date]>>;
  balanceName: string | null;
  setBalanceName: Dispatch<SetStateAction<string | null>>;
};

const StatisticsPageView: FC<StatisticsPageViewProps> = ({
  monthsRange,
  setMonthsRange,
  balanceName,
  setBalanceName,
}) => (
  <Box component="main" bg="dark" c="white" style={{ minHeight: '100vh' }}>
    <Container size="lg" pt="xl" pb={{ base: 70, sm: 'xl' }}>
      <Stack>
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
  </Box>
);

export default StatisticsPageView;

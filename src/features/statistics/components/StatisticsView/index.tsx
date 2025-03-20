import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Flex, Stack, Title } from '@mantine/core';

import Loader from 'components/Shared/Loader';
import { useAppSelector } from 'store/hooks';
import { statisticsData } from 'features/statistics/store/selector';
import StatisticsViewItem from 'features/statistics/components/StatisticsViewItem';
import CreateTransactionFirstButton from 'features/transaction/components/CreateTransactionFirstButton';
import ExchangeStatistics from 'features/statistics/components/ExchangeStatistics';

type StatisticsViewProps = {
  monthsRange: [Date, Date];
  balanceName: string | null;
};

const StatisticsView: FC<StatisticsViewProps> = ({
  monthsRange,
  balanceName,
}) => {
  const { statistics } = useAppSelector(statisticsData);
  const { isLoadingStatistics } = useAppSelector(statisticsData);

  const { t } = useTranslation();

  if (isLoadingStatistics) {
    return <Loader />;
  }

  if (!statistics) {
    return (
      <CreateTransactionFirstButton text="Some of your statistic will be here" />
    );
  }

  return (
    <Stack gap="md" align="center">
      <ExchangeStatistics
        selectedBalance={balanceName}
        monthsRange={monthsRange}
      />
      <Title order={3} fw={500} ta="center">
        {t('profit expense statistics')}
      </Title>
      <Flex
        gap="md"
        direction={{ base: 'column', sm: 'row' }}
        align="flex-start"
        justify="center"
        w="100%">
        <StatisticsViewItem
          selectedBalance={balanceName}
          monthsRange={monthsRange}
          statistics={statistics.expenses}
          type="expense"
        />
        <StatisticsViewItem
          selectedBalance={balanceName}
          monthsRange={monthsRange}
          statistics={statistics.profits}
          type="profit"
        />
      </Flex>
    </Stack>
  );
};

export default StatisticsView;

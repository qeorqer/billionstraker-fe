import { Text, Stack, SegmentedControl, Switch, Group } from '@mantine/core';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import DiagramStatistics from 'features/statistics/components/DiagramStatistics';
import { StatisticsList } from 'features/statistics/components/StatisticsList';
import { StatisticsForTransactionType } from 'features/statistics/types';
import { TransactionType } from 'features/transaction';

import { useFormatSumByBalanceName } from 'features/currency/hooks/useFormatSumByBalanceName';
import { formatSumByCurrencyCode } from 'features/statistics/utils/formatSumByCurrencyCode';
import { useAppSelector } from 'store/hooks';
import { userData } from 'features/user';

type StatisticsViewItemProps = {
  statistics: StatisticsForTransactionType;
  type: TransactionType;
  selectedBalance: string | null;
  monthsRange: [Date, Date];
};

const StatisticsViewItem: FC<StatisticsViewItemProps> = ({
  statistics,
  type,
  selectedBalance,
  monthsRange,
}) => {
  const { t } = useTranslation();
  const [statisticsType, setStatisticsType] = useState<'chart' | 'list'>(
    'chart',
  );
  const [useBalanceRange, setUseBalanceRange] = useState(false);

  const { formatSumByBalanceName } = useFormatSumByBalanceName();
  const { user } = useAppSelector(userData);

  useEffect(() => {
    setUseBalanceRange(false);
  }, [statistics]);

  return (
    <Stack w="100%" align="center">
      {statistics.total > 0 && (
        <Stack align="center">
          <SegmentedControl
            size="md"
            value={statisticsType}
            onChange={(val) => setStatisticsType(val as 'chart' | 'list')}
            data={[
              { value: 'chart', label: t('Pie chart') },
              { value: 'list', label: t('List') },
            ]}
          />
          <Switch
            defaultChecked
            checked={useBalanceRange}
            label={t('use balances')}
            onChange={() => setUseBalanceRange(!useBalanceRange)}
          />
        </Stack>
      )}
      <Group gap="xs" align="center">
        <Text ta="center">
          {t(
            type === 'expense'
              ? 'Spent during this period'
              : 'Earned during this period',
          )}
        </Text>
        <Text c="primary" component="span">
          {selectedBalance
            ? formatSumByBalanceName(statistics.total, selectedBalance)
            : formatSumByCurrencyCode(
                statistics.total,
                user.preferredCurrency ?? '',
              )}
        </Text>
      </Group>

      {statisticsType === 'chart' ? (
        <DiagramStatistics
          totallySpent={statistics.total}
          rangeStatistics={
            useBalanceRange
              ? statistics.balanceRange!
              : statistics.categoryRange
          }
        />
      ) : (
        <StatisticsList
          selectedBalance={selectedBalance}
          monthsRange={monthsRange}
          totalSpent={statistics.total}
          fieldToGroupBy={useBalanceRange ? 'balance' : 'category'}
          transactionType={type}
          statisticForRange={
            useBalanceRange
              ? statistics.balanceRange!
              : statistics.categoryRange
          }
        />
      )}
    </Stack>
  );
};

export default StatisticsViewItem;

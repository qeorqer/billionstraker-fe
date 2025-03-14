import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { RangeStatisticsItem } from 'features/statistics/types';
import StatisticsListItem from 'features/statistics/components/StatisticsListItem';
import { TransactionType } from 'features/transaction';
import { Stack, Text } from '@mantine/core';

type StatisticsListProps = {
  statisticForRange: RangeStatisticsItem[];
  totalSpent: number;
  selectedBalance: string | null;
  monthsRange: [Date, Date];
  fieldToGroupBy: 'balance' | 'category';
  transactionType: TransactionType;
};

export type listForRangeItem = {
  title: string;
  value: number;
  percentage: number | string;
};

export const StatisticsList: FC<StatisticsListProps> = ({
  statisticForRange,
  totalSpent,
  selectedBalance,
  monthsRange,
  fieldToGroupBy,
  transactionType,
}) => {
  const { t } = useTranslation();

  const dataForRange: listForRangeItem[] = statisticForRange.map((el) => ({
    title: el.name,
    value: el.amount,
    percentage: ((100 * el.amount) / totalSpent).toFixed(2),
  }));

  return (
    <Stack align="center" w="100%">
      <Text ta="center">{t('click on item to see transactions')}</Text>
      {dataForRange
        .sort((a, b) => b.value - a.value)
        .map((listItem) => (
          <StatisticsListItem
            key={listItem.title}
            listItem={listItem}
            selectedBalance={selectedBalance}
            fieldToGroupBy={fieldToGroupBy}
            monthsRange={monthsRange}
            transactionType={transactionType}
          />
        ))}
    </Stack>
  );
};

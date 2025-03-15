import { FC } from 'react';
import { useHistory } from 'react-router-dom';

import { listForRangeItem } from 'features/statistics/components/StatisticsList';
import { TransactionType } from 'features/transaction';
import { useFormatSumByBalanceName } from 'features/currency/hooks/useFormatSumByBalanceName';
import { useAppSelector } from 'store/hooks';
import { userData } from 'features/user';
import { formatSumByCurrencyCode } from 'features/statistics/utils/formatSumByCurrencyCode';
import { Grid, Card, Text } from '@mantine/core';

type StatisticsListItemProps = {
  listItem: listForRangeItem;
  selectedBalance: string | null;
  monthsRange: [Date, Date];
  fieldToGroupBy: 'balance' | 'category';
  transactionType: TransactionType;
};

const StatisticsListItem: FC<StatisticsListItemProps> = ({
  listItem,
  selectedBalance,
  monthsRange,
  fieldToGroupBy,
  transactionType,
}) => {
  const { push } = useHistory();

  const { formatSumByBalanceName } = useFormatSumByBalanceName();
  const { user } = useAppSelector(userData);

  const handleItemClick = () => {
    const statisticsQueryString = new URLSearchParams({
      dateFrom: monthsRange[0].toISOString(),
      dateTo: monthsRange[1].toISOString(),
      transactionType,
      ...(fieldToGroupBy === 'category' &&
        selectedBalance && { balance: selectedBalance }),
    });

    const homeQueryString = new URLSearchParams({
      // @ts-ignore
      dateFrom: monthsRange[0].toISOString(),
      dateTo: monthsRange[1].toISOString(),
      transactionType,
      ...(selectedBalance && { balance: selectedBalance }),
      ...(fieldToGroupBy === 'balance'
        ? { balance: listItem.title }
        : { category: listItem.title }),
    });

    push({
      pathname: '/statistics',
      search: statisticsQueryString.toString(),
    });
    push({
      pathname: '/home',
      search: homeQueryString.toString(),
    });
  };

  return (
    <Card
      withBorder
      radius="md"
      p="sm"
      h="100%"
      w="100%"
      style={{ justifyContent: 'center' }}
      onClick={handleItemClick}>
      <Grid>
        <Grid.Col span={{ base: 6, md: 4 }}>
          <Text ta="center">
            {selectedBalance
              ? formatSumByBalanceName(listItem.value, selectedBalance)
              : formatSumByCurrencyCode(
                  listItem.value,
                  user.preferredCurrency ?? '',
                )}
          </Text>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 5 }} order={{ base: -1, sm: 0 }}>
          <Text ta="center">{listItem.title}</Text>
        </Grid.Col>
        <Grid.Col span={{ base: 6, md: 3 }}>
          <Text ta="center">{listItem.percentage}%</Text>
        </Grid.Col>
      </Grid>
    </Card>
  );
};

export default StatisticsListItem;

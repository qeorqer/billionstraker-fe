import { useAppSelector } from 'store/hooks';
import { statisticsData } from 'features/statistics/store/selector';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { FC } from 'react';
import { useFormatSumByBalanceName } from 'features/currency/hooks/useFormatSumByBalanceName';
import { Title, Stack, Text, Group, Button } from '@mantine/core';

type ExchangeStatisticsProps = {
  selectedBalance: string | null;
  monthsRange: [Date, Date];
};

const ExchangeStatistics: FC<ExchangeStatisticsProps> = ({
  selectedBalance,
  monthsRange,
}) => {
  const { statistics } = useAppSelector(statisticsData);

  const { t } = useTranslation();
  const { push } = useHistory();

  const { formatSumByBalanceName } = useFormatSumByBalanceName();

  const handleViewTransaction = () => {
    const queryString = new URLSearchParams({
      balance: selectedBalance as string,
      dateFrom: monthsRange[0].toISOString(),
      dateTo: monthsRange[1].toISOString(),
      transactionType: 'exchange',
    });

    push({
      pathname: '/statistics',
      search: queryString.toString(),
    });
    push({
      pathname: '/home',
      search: queryString.toString(),
    });
  };

  if (!statistics?.exchanges || !selectedBalance) {
    return null;
  }

  return (
    <Stack align="center">
      <Title order={3} ta="center">
        {t('exchange statistics')}
      </Title>
      <Group align="center" style={{ alignSelf: 'center' }} justify="center">
        <Text size="md" ta="center">
          {`${t('sent')}: `}
          <Text size="md" c="primary" component="span">
            {formatSumByBalanceName(
              statistics.exchanges.totallySend,
              selectedBalance,
            )}
          </Text>
        </Text>
        <Text size="md" ta="center">
          {`${t('received')}: `}
          <Text size="md" c="primary" component="span">
            {formatSumByBalanceName(
              statistics.exchanges.totallyReceived,
              selectedBalance,
            )}
          </Text>
        </Text>
      </Group>
      {statistics.exchanges.totallyReceived > 0 ||
      statistics.exchanges.totallySend > 0 ? (
        <Button onClick={handleViewTransaction} size="sm" variant="light">
          {t('view transaction')}
        </Button>
      ) : null}
    </Stack>
  );
};

export default ExchangeStatistics;

import { Button, Col, Stack } from 'react-bootstrap';
import { useAppSelector } from 'store/hooks';
import { statisticsData } from 'features/statistics/store/selector';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { FC } from 'react';
import { useFormatSumByBalanceName } from 'features/currency/hooks/useFormatSumByBalanceName';

type ExchangeStatisticsProps = {
  selectedBalance: string;
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
      balance: selectedBalance,
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

  if (!statistics?.exchanges) {
    return null;
  }

  return (
    <Col xs={12}>
      <Stack gap={2} className="align-items-center mb-3">
        <p className="fw-bold h5">{t('exchange statistics')}</p>
        <Stack
          gap={4}
          direction="horizontal"
          className="justify-content-center fw-bold"
        >
          <p className="mb-0">
            {`${t('sent')}: `}
            <span className="yellowText fst-italic d-inline-block ml-1">
              {formatSumByBalanceName(
                statistics.exchanges.totallySend,
                selectedBalance,
              )}
            </span>
          </p>
          <p className="mb-0">
            {`${t('received')}: `}
            <span className="yellowText fst-italic d-inline-block ml-1">
              {formatSumByBalanceName(
                statistics.exchanges.totallyReceived,
                selectedBalance,
              )}
            </span>
          </p>
        </Stack>
        {Boolean(
          statistics.exchanges.totallyReceived ||
            statistics.exchanges.totallySend,
        ) && (
          <Button
            size="sm"
            variant="outline-secondary"
            onClick={handleViewTransaction}
          >
            {t('view transaction')}
          </Button>
        )}
      </Stack>
    </Col>
  );
};

export default ExchangeStatistics;

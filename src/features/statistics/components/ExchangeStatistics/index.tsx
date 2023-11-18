import { Button, Col, Row, Stack } from 'react-bootstrap';
import { useAppSelector } from 'store/hooks';
import { statisticsData } from 'features/statistics/store/selector';
import { useTranslation } from 'react-i18next';
import { formattingSum } from 'features/transaction/utils/formattingSum';
import { useHistory } from 'react-router-dom';
import { FC } from 'react';

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
      <Stack gap={2} className="align-items-center">
        <p className="fw-bold h5">{t('exchange statistics')}</p>
        <Stack
          gap={4}
          direction="horizontal"
          className="justify-content-center fw-bold">
          <p className="mb-0">
            {`${t('sent')}: `}
            <p className="yellowText fst-italic d-inline-block ml-1 mb-0">
              {formattingSum(statistics.exchanges.totallySend)}
            </p>
          </p>
          <p className="mb-0">
            {`${t('received')}: `}
            <p className="yellowText fst-italic d-inline-block ml-1 mb-0">
              {formattingSum(statistics.exchanges.totallyReceived)}
            </p>
          </p>
        </Stack>
        <Button
          size="sm"
          variant="outline-secondary"
          onClick={handleViewTransaction}
          className="mb-3">
          {t('view transaction')}
        </Button>
      </Stack>
    </Col>
  );
};

export default ExchangeStatistics;

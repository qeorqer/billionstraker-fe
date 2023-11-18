import React, { FC } from 'react';
import { Col, Row } from 'react-bootstrap';
import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css';
import 'react-calendar/dist/Calendar.css';
import { useTranslation } from 'react-i18next';

import Loader from 'components/Shared/Loader';
import { useAppSelector } from 'store/hooks';
import { statisticsData } from 'features/statistics/store/selector';
import StatisticsViewItem from 'features/statistics/components/StatisticsViewItem';
import CreateTransactionFirstButton from 'features/transaction/components/CreateTransactionFirstButton';
import ExchangeStatistics from 'features/statistics/components/ExchangeStatistics';

import './styles.scss';

type StatisticsViewProps = {
  monthsRange: [Date, Date];
  balanceName: string;
};

const StatisticsView: FC<StatisticsViewProps> = ({
  monthsRange,
  balanceName,
}) => {
  const { statistics } = useAppSelector(statisticsData);
  const { isLoadingStatistics } = useAppSelector(statisticsData);

  const { t } = useTranslation();

  if (!statistics) {
    return (
      <CreateTransactionFirstButton text="Some of your statistic will be here" />
    );
  }

  if (isLoadingStatistics) {
    return <Loader />;
  }

  return (
    <Row className="rangeHolder mt-3 text-center">
      <ExchangeStatistics
        selectedBalance={balanceName}
        monthsRange={monthsRange}
      />
      <p className="fw-bold h5">{t('profit expense statistics')}</p>
      <Col xs={12} md={6} className="mb-5 mb-md-0">
        <StatisticsViewItem
          selectedBalance={balanceName}
          monthsRange={monthsRange}
          statistics={statistics.expenses}
          type="expense"
        />
      </Col>
      <Col xs={12} md={6}>
        <StatisticsViewItem
          selectedBalance={balanceName}
          monthsRange={monthsRange}
          statistics={statistics.profits}
          type="profit"
        />
      </Col>
    </Row>
  );
};

export default StatisticsView;

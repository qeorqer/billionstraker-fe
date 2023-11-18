import React, { FC } from 'react';
import { Col, Row } from 'react-bootstrap';
import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css';
import 'react-calendar/dist/Calendar.css';

import Loader from 'components/Shared/Loader';
import { useAppSelector } from 'store/hooks';
import { statisticsData } from 'features/statistics/store/selector';
import StatisticsViewItem from 'features/statistics/components/StatisticsViewItem';
import CreateTransactionFirstButton from 'features/transaction/components/CreateTransactionFirstButton';

import './styles.scss';
import ExchangeStatistics from 'features/statistics/components/ExchangeStatistics';

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
      <Col xs={12} md={6} className="mb-5 mb-md-0">
        <StatisticsViewItem
          selectedBalance={balanceName}
          monthsRange={monthsRange}
          statisticsForRange={statistics}
          type="expense"
        />
      </Col>
      <Col xs={12} md={6}>
        <StatisticsViewItem
          selectedBalance={balanceName}
          monthsRange={monthsRange}
          statisticsForRange={statistics}
          type="income"
        />
      </Col>
    </Row>
  );
};

export default StatisticsView;

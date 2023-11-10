import React, { FC } from 'react';
import { Col, Row } from 'react-bootstrap';
import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css';
import 'react-calendar/dist/Calendar.css';

import Loader from 'components/Shared/Loader';
import { useAppSelector } from 'store/hooks';
import { statisticsData } from 'features/statistics/store/selector';
import StatisticsForBalanceViewItem from 'features/statistics/components/StatisticsForBalanceViewItem';
import CreateTransactionFirstButton from 'features/transaction/components/CreateTransactionFirstButton';

import './styles.scss';

type propsType = {
  monthsRange: [Date, Date];
  balanceName: string;
};

const StatisticsForBalanceView: FC<propsType> = ({
  monthsRange,
  balanceName,
}) => {
  const { statisticsForBalance } = useAppSelector(statisticsData);
  const { isStatisticsForBalanceLoading } = useAppSelector(statisticsData);

  if (!statisticsForBalance) {
    return (
      <CreateTransactionFirstButton text="Some of your statistic will be here" />
    );
  }

  if (isStatisticsForBalanceLoading) {
    return <Loader />;
  }

  return (
    <Row className="rangeHolder mt-3 text-center">
      <Col xs={12} md={6} className="mb-5 mb-md-0">
        <StatisticsForBalanceViewItem
          selectedBalance={balanceName}
          monthsRange={monthsRange}
          statisticsForRange={statisticsForBalance}
          type="expense"
        />
      </Col>
      <Col xs={12} md={6}>
        <StatisticsForBalanceViewItem
          selectedBalance={balanceName}
          monthsRange={monthsRange}
          statisticsForRange={statisticsForBalance}
          type="income"
        />
      </Col>
    </Row>
  );
};

export default StatisticsForBalanceView;

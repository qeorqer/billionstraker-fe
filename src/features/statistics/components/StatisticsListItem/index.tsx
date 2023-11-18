import React, { FC } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import { formattingSum } from 'features/transaction/utils/formattingSum';
import { listForRangeItem } from 'features/statistics/components/StatisticsList';

import 'features/statistics/components/StatisticsListItem/styles.scss';

type propsType = {
  listItem: listForRangeItem;
  selectedBalance: string;
  monthsRange: [Date, Date];
};

const StatisticsListItem: FC<propsType> = ({
  listItem,
  selectedBalance,
  monthsRange,
}) => {
  const { push } = useHistory();

  const handleItemClick = () => {
    const queryString = new URLSearchParams({
      balance: selectedBalance,
      dateFrom: monthsRange[0].toISOString(),
      dateTo: monthsRange[1].toISOString(),
      category: listItem.title,
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

  return (
    <Card
      className="mb-3 mx-auto text-center statisticsListItem cursor-pointer"
      bg="light"
      text="dark"
      onClick={handleItemClick}>
      <Card.Body>
        <Row>
          <Col xs="6" lg="3">
            {formattingSum(listItem.value)}
          </Col>
          <Col xs="12" lg="6" className="mb-2 mb-sm-0 title">
            {listItem.title}
          </Col>
          <Col xs="6" lg="3">
            {listItem.percentage}%
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default StatisticsListItem;

import React, { FC } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import { formatSum } from 'features/transaction/utils/formatSum';
import { listForRangeItem } from 'features/statistics/components/StatisticsList';
import 'features/statistics/components/StatisticsListItem/styles.scss';
import { TransactionType } from 'features/transaction';
import { useFormatSumByBalanceName } from 'features/currency/hooks/useFormatSumByBalanceName';
import { useAppSelector } from 'store/hooks';
import { userData } from 'features/user';
import { formatSumByCurrencyCode } from 'features/statistics/utils/formatSumByCurrencyCode';

type propsType = {
  listItem: listForRangeItem;
  selectedBalance: string;
  monthsRange: [Date, Date];
  fieldToGroupBy: 'balance' | 'category';
  transactionType: TransactionType;
};

const StatisticsListItem: FC<propsType> = ({
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
      ...(fieldToGroupBy === 'category' && { balance: selectedBalance }),
    });

    const homeQueryString = new URLSearchParams({
      // @ts-ignore
      balance: selectedBalance,
      dateFrom: monthsRange[0].toISOString(),
      dateTo: monthsRange[1].toISOString(),
      transactionType,
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
      className="mb-3 mx-auto text-center statisticsListItem cursor-pointer"
      bg="light"
      text="dark"
      onClick={handleItemClick}>
      <Card.Body>
        <Row>
          <Col xs="6" lg="4">
            {selectedBalance
              ? formatSumByBalanceName(listItem.value, selectedBalance)
              : formatSumByCurrencyCode(
                  listItem.value,
                  user.preferredCurrency ?? '',
                )}
          </Col>
          <Col xs="12" lg="5" className="mb-2 mb-sm-0 title">
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

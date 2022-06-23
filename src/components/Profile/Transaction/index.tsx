import React, { FC } from 'react';
import { Card, Col, Row } from 'react-bootstrap';

import { transactionType } from 'types/transaction.type';
import { formatTransactionDate } from 'utils/time';
import { formattingNumber } from 'utils/formattingNumber';
import { useAppSelector } from 'hooks/react-redux.hook';
import { userData } from 'store/selectors';

type propsType = {
  transaction: transactionType;
};

const Transaction: FC<propsType> = ({ transaction }) => {
  const { lang } = useAppSelector(userData);

  return (
    <Card
      className="mb-3  w-75 mx-auto fw-bold text-center"
      bg="light"
      text="dark"
    >
      <Card.Body>
        <Row>
          <Col xs="12" sm="4" className="mb-2 mb-sm-0">
            {transaction.title}
          </Col>
          <Col xs="8" sm="4">
            {formatTransactionDate(transaction.date, lang)}
          </Col>
          <Col xs="4" sm="4">
            {transaction.transactionType === 'expense' ? (
              <span className="text-danger">
                -{formattingNumber(transaction.sum)}
              </span>
            ) : (
              <span className="text-success">
                +{formattingNumber(transaction.sum)}
              </span>
            )}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Transaction;

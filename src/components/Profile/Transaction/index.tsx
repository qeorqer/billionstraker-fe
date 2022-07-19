import React, { FC } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { transactionType } from 'types/transaction.type';
import { formatTransactionDate } from 'utils/time';
import { formattingNumber } from 'utils/formattingNumber';
import { useAppSelector } from 'hooks/react-redux.hook';
import { userData } from 'store/selectors';

import './styles.scss'

type propsType = {
  transaction: transactionType;
};

const Transaction: FC<propsType> = ({ transaction }) => {
  const { lang } = useAppSelector(userData);
  const { t } = useTranslation();

  return (
    <Card
      className={`mb-3 w-75 mx-auto text-center ${transaction.transactionType}`}
    >
      <Card.Body>
        <Row className='align-items-center'>
          <Col xs="12" sm="4" className="mb-2 mb-sm-0 balance">
            <p><span>💼</span> {transaction.balance}</p>
          </Col>
          <Col xs="4" sm="4" className="sumAndName">
              <span>
                {transaction.transactionType === 'expense' ? '-' : '+'}{formattingNumber(transaction.sum)}
              </span>
            <p className="mb-0">{transaction.title}</p>
          </Col>
          <Col xs="8" sm="4" className="categoryAndDate">
            <p className="category"><span>🖇</span>{transaction.category}</p>
            <span className="date">{formatTransactionDate(transaction.date, lang)}</span>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Transaction;

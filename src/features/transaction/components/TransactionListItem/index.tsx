import React, { Dispatch, FC, SetStateAction } from 'react';
import { Card, Col, Dropdown, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { Transaction } from 'features/transaction/types';
import { formatTransactionDate } from 'features/transaction/utils/formatTransactionDate';
import { formattingSum } from 'features/transaction/utils/formattingSum';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { userData } from 'features/user';
import CustomToggle from 'components/Shared/CustomToggle';
import { deleteTransactionThunk } from 'features/transaction/index';

import 'features/transaction/components/TransactionListItem/styles.scss';

type propsType = {
  transaction: Transaction;
  setSelectedTransaction: Dispatch<SetStateAction<Transaction | null>>;
};

const TransactionListItem: FC<propsType> = ({
  transaction,
  setSelectedTransaction,
}) => {
  const { lang } = useAppSelector(userData);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  return (
    <Card
      className={`mb-3 w-75 mx-auto text-center ${transaction.transactionType}`}>
      <Card.Body>
        <Row className="align-items-center">
          <Col
            xs="6"
            lg="3"
            className="title order-1 order-md-1 order-order-lg-0">
            <span className="mb-0">{transaction.title}</span>
          </Col>
          <Col xs="12" lg="6" className="sumAndBalance order-0 order-lg-1">
            {transaction.transactionType === 'exchange' ? (
              <>
                <div className="from">
                  <p>
                    <span>💰</span> {transaction.balanceToSubtract}
                  </p>
                  <span>{formattingSum(transaction.sumToSubtract!)}</span>
                </div>
                <span className="exchangeSign">🔁</span>
                <div className="to">
                  <p>
                    {transaction.balance} <span>💸</span>
                  </p>
                  <span>{formattingSum(transaction.sum)}</span>
                </div>
              </>
            ) : (
              <>
                <span>{formattingSum(transaction.sum)}</span>
                <p>
                  <span>💰</span> {transaction.balance}
                </p>
              </>
            )}
          </Col>
          <Col xs="6" lg="3" className="categoryAndDate order-2">
            <div className="d-flex justify-content-end">
              {transaction.category && (
                <p className="category">
                  <span>🖇</span>
                  {transaction.category}
                </p>
              )}
              <Dropdown drop="start">
                <Dropdown.Toggle as={CustomToggle} variant="circle" />
                <Dropdown.Menu>
                  <Dropdown.Item
                    as="span"
                    onClick={() => setSelectedTransaction(transaction)}>
                    {t('edit')}
                  </Dropdown.Item>
                  <Dropdown.Item
                    as="span"
                    onClick={() =>
                      dispatch(
                        deleteTransactionThunk({
                          transactionId: transaction._id!,
                        }),
                      )
                    }>
                    {t('remove')}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <span className="date">
              {formatTransactionDate(transaction.date, lang)}
            </span>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default TransactionListItem;

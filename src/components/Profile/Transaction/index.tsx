import React, { Dispatch, FC, SetStateAction } from 'react';
import { Card, Col, Dropdown, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { transactionType } from 'types/transaction.type';
import { formatTransactionDate } from 'utils/time';
import { formattingNumber } from 'utils/formattingNumber';
import { useAppDispatch, useAppSelector } from 'hooks/react-redux.hook';
import { userData } from 'store/selectors';
import { deleteTransaction } from 'store/reducers/transaction.reducer';
import CustomToggle from 'components/CustomToggle';

import './styles.scss';

type propsType = {
  transaction: transactionType;
  setSelectedTransaction: Dispatch<SetStateAction<transactionType | null>>;
};

const Transaction: FC<propsType> = ({
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
                  <span>{formattingNumber(transaction.sumToSubtract!)}</span>
                </div>
                <span className="exchangeSign">🔁</span>
                <div className="to">
                  <p>
                    {transaction.balance} <span>💸</span>
                  </p>
                  <span>{formattingNumber(transaction.sum)}</span>
                </div>
              </>
            ) : (
              <>
                <span>{formattingNumber(transaction.sum)}</span>
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
                <Dropdown.Toggle
                  as={CustomToggle}
                  variant="circle"
                  id="dropdown-custom-components"
                />
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
                        deleteTransaction({ transactionId: transaction._id! }),
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

export default Transaction;

import React, { FC, useState } from 'react';
import { Card, Col, Dropdown, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { Transaction } from 'features/transaction/types';
import { formatTransactionDate } from 'features/transaction/utils/formatTransactionDate';
import { useAppSelector } from 'store/hooks';
import { userData } from 'features/user';
import CustomToggle from 'components/Shared/CustomToggle';
import EditTransactionModal from 'features/transaction/components/EditTransactionModal';
import DeleteTransactionModal from 'features/transaction/components/DeleteTransactionModal';
import { useFormatSumByBalanceName } from 'features/currency/hooks/useFormatSumByBalanceName';

import './styles.scss';

type TransactionListItemProps = {
  transaction: Transaction;
};

type ActionOption = {
  title: string;
  onClick: () => void;
};

const TransactionListItem: FC<TransactionListItemProps> = ({ transaction }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { lang } = useAppSelector(userData);
  const { t } = useTranslation();
  const { formatSumByBalanceName } = useFormatSumByBalanceName();

  const actions: ActionOption[] = [
    {
      title: 'edit',
      onClick: () => setIsEditModalOpen(true),
    },
    {
      title: 'delete',
      onClick: () => setIsDeleteModalOpen(true),
    },
  ];

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
                  <span>
                    {formatSumByBalanceName(
                      transaction.sumToSubtract!,
                      transaction?.balanceToSubtract!,
                    )}
                  </span>
                </div>
                <span className="exchangeSign">🔁</span>
                <div className="to">
                  <p>
                    {transaction.balance} <span>💸</span>
                  </p>
                  <span>
                    {formatSumByBalanceName(
                      transaction.sum,
                      transaction.balance,
                    )}
                  </span>
                </div>
              </>
            ) : (
              <>
                <span>
                  {formatSumByBalanceName(transaction.sum, transaction.balance)}
                </span>
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
                  {actions.map(({ title, onClick }) => (
                    <Dropdown.Item key={title} as="span" onClick={onClick}>
                      {t(title)}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <span className="date">
              {formatTransactionDate(transaction.date, lang)}
            </span>
          </Col>
        </Row>
      </Card.Body>
      <EditTransactionModal
        transaction={transaction}
        isOpen={isEditModalOpen}
        handleClose={() => setIsEditModalOpen(false)}
      />
      <DeleteTransactionModal
        transaction={transaction}
        isOpen={isDeleteModalOpen}
        handleClose={() => setIsDeleteModalOpen(false)}
      />
    </Card>
  );
};

export default TransactionListItem;

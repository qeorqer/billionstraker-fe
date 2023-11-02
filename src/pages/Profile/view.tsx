import React, { Dispatch, SetStateAction } from 'react';
import { Container, Modal } from 'react-bootstrap';

import TransactionsList from 'features/transaction/components/TransactionsList';
import BalancesList from 'features/balance/components/BalancesList';
import SelectTransactionType from 'features/transaction/components/SelectTransactionType';

import './styles.scss';
import {
  CreateTransactionPayload,
  Transaction,
  TransactionType,
} from 'features/transaction/types';
import CreateTransactionForm from 'features/transaction/components/CreateTransactionForm';
import { Balance } from 'features/balance/types';
import { categoryType } from 'types/category.type';

type propsType = {
  balances: Balance[];
  categories: categoryType[];
  t: (text: string) => string;
  isModalShown: boolean;
  transactionType: TransactionType;
  setTransactionType: Dispatch<SetStateAction<TransactionType>>;
  setSelectedTransaction: Dispatch<SetStateAction<Transaction | null>>;
  handleSubmit: (transaction: CreateTransactionPayload | null) => void;
  selectedTransaction: Transaction | null;
};

const ProfilePageView: React.FC<propsType> = ({
  balances,
  categories,
  t,
  isModalShown,
  transactionType,
  setTransactionType,
  setSelectedTransaction,
  handleSubmit,
  selectedTransaction,
}) => (
  <Container className="py-4 mb-4 mb-sm-0">
    {Boolean(balances.length) && (
      <p className="fs-4 fw-bold text-center py-2">{t('all your balances')}</p>
    )}
    <BalancesList />
    <TransactionsList setSelectedTransaction={setSelectedTransaction} />
    <Modal
      show={isModalShown}
      onHide={() => setSelectedTransaction(null)}
      centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('edit transaction')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <SelectTransactionType
            transactionType={transactionType}
            setTransactionType={setTransactionType}
            isModal
            initialValues={selectedTransaction}
          />
          <CreateTransactionForm
            selectedTransactionType={transactionType}
            balances={balances}
            categories={categories}
            handleSubmit={handleSubmit}
            initialValues={selectedTransaction}
            isModal
            isEdit
          />
        </Container>
      </Modal.Body>
    </Modal>
  </Container>
);

export default ProfilePageView;

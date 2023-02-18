import React, { Dispatch, SetStateAction } from 'react';
import { Container, Modal } from 'react-bootstrap';

import Transactions from 'components/Profile/Transactions';
import BalancesList from 'components/Balances/BalancesList';
import SelectTransactionType from 'components/CreateTransaction/SelectTransactionType';

import './styles.scss';
import {
  submitTransactionType,
  transactionType,
  transactionTypes,
} from 'types/transaction.type';
import CreateTransactionForm from 'components/CreateTransaction/CreateTransactionForm';
import { balanceType } from 'types/balance.type';
import { categoryType } from 'types/category.type';

type propsType = {
  balances: balanceType[];
  categories: categoryType[];
  t: (text: string) => string;
  isModalShown: boolean;
  transactionType: transactionTypes;
  setTransactionType: Dispatch<SetStateAction<transactionTypes>>;
  setSelectedTransaction: Dispatch<SetStateAction<transactionType | null>>;
  handleSubmit: (transaction: submitTransactionType | null) => void;
};

const Profile: React.FC<propsType> = ({
  balances,
  categories,
  t,
  isModalShown,
  transactionType,
  setTransactionType,
  setSelectedTransaction,
  handleSubmit,
}) => (
  <Container className="py-4 mb-4 mb-sm-0">
    {Boolean(balances.length) && (
      <p className="fs-4 fw-bold text-center py-2">{t('all your balances')}</p>
    )}
    <BalancesList />
    <Transactions setSelectedTransaction={setSelectedTransaction} />
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
          />
          <CreateTransactionForm
            selectedTransactionType={transactionType}
            balances={balances}
            categories={categories}
            handleSubmit={handleSubmit}
            isModal
          />
        </Container>
      </Modal.Body>
    </Modal>
  </Container>
);

export default Profile;

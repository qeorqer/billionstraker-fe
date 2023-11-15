import React, { Dispatch, SetStateAction } from 'react';
import { Button, Container } from 'react-bootstrap';

import {
  CreateTransactionPayload,
  TransactionType,
} from 'features/transaction/types';
import BalancesList from 'features/balance/components/BalancesList';
import 'react-datepicker/dist/react-datepicker.css';
import SelectTransactionType from 'features/transaction/components/SelectTransactionType';
import TransactionForm from 'features/transaction/components/TransactionForm';
import CannotCreateTransactionButtons from 'features/transaction/components/CannotCreateTransactionButtons';

type CreateTransactionPageViewProps = {
  transactionType: TransactionType;
  setTransactionType: Dispatch<SetStateAction<TransactionType>>;
  canCreateTransaction: boolean;
};

const CreateTransactionPageView: React.FC<CreateTransactionPageViewProps> = ({
  transactionType,
  setTransactionType,
  canCreateTransaction,
}) => (
  <Container className="py-md-4 my-4 pb-5 pb-sm-0">
    <SelectTransactionType
      transactionType={transactionType}
      setTransactionType={setTransactionType}
    />

    {canCreateTransaction ? (
      <>
        <BalancesList />
        <TransactionForm selectedTransactionType={transactionType} />
      </>
    ) : (
      <CannotCreateTransactionButtons transactionType={transactionType} />
    )}
  </Container>
);

export default CreateTransactionPageView;

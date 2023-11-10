import React, { Dispatch, SetStateAction } from 'react';
import { Button, Container } from 'react-bootstrap';

import {
  CreateTransactionPayload,
  TransactionType,
} from 'features/transaction/types';
import BalancesList from 'features/balance/components/BalancesList';
import 'react-datepicker/dist/react-datepicker.css';
import SelectTransactionType from 'features/transaction/components/SelectTransactionType';
import CreateTransactionForm from 'features/transaction/components/CreateTransactionForm';
import CannotCreateTransactionButtons from 'features/transaction/components/CannotCreateTransactionButtons';

type CreateTransactionPageViewProps = {
  transactionType: TransactionType;
  setTransactionType: Dispatch<SetStateAction<TransactionType>>;
  handleSubmit: (transaction: CreateTransactionPayload | null) => void;
  canCreateTransaction: boolean;
};

const CreateTransactionPageView: React.FC<CreateTransactionPageViewProps> = ({
  transactionType,
  setTransactionType,
  handleSubmit,
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
        <CreateTransactionForm
          selectedTransactionType={transactionType}
          handleSubmit={handleSubmit}
        />
      </>
    ) : (
      <CannotCreateTransactionButtons transactionType={transactionType} />
    )}
  </Container>
);

export default CreateTransactionPageView;

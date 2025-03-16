import { Dispatch, FC, SetStateAction } from 'react';

import { TransactionType } from 'features/transaction/types';
import BalancesList from 'features/balance/components/BalancesList';
import SelectTransactionType from 'features/transaction/components/SelectTransactionType';
import TransactionForm from 'features/transaction/components/TransactionForm';
import CannotCreateTransactionButtons from 'features/transaction/components/CannotCreateTransactionButtons';
import { Box, Container, Stack } from '@mantine/core';

type CreateTransactionPageViewProps = {
  transactionType: TransactionType;
  setTransactionType: Dispatch<SetStateAction<TransactionType>>;
  canCreateTransaction: boolean;
};

const CreateTransactionPageView: FC<CreateTransactionPageViewProps> = ({
  transactionType,
  setTransactionType,
  canCreateTransaction,
}) => (
  <Box component="main" bg="dark" c="white"  h="100%">
    <Container size="lg" pt="xl" pb={{ base: 70, sm: 'xl' }}>
      <Stack>
        {canCreateTransaction && <BalancesList />}
        <Stack align="center">
          <SelectTransactionType
            transactionType={transactionType}
            setTransactionType={setTransactionType}
          />

          {canCreateTransaction ? (
            <TransactionForm selectedTransactionType={transactionType} />
          ) : (
            <CannotCreateTransactionButtons transactionType={transactionType} />
          )}
        </Stack>
      </Stack>
    </Container>
  </Box>
);

export default CreateTransactionPageView;

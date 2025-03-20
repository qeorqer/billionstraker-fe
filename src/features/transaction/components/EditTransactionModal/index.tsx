import SelectTransactionType from 'features/transaction/components/SelectTransactionType';
import TransactionForm from 'features/transaction/components/TransactionForm';
import { FC, useState } from 'react';
import { Transaction, TransactionType } from 'features/transaction/types';
import { useTranslation } from 'react-i18next';
import { Modal, Stack, Title } from '@mantine/core';

type EditTransactionModalProps = {
  isOpen: boolean;
  transaction: Transaction;
  handleClose: () => void;
};

const EditTransactionModal: FC<EditTransactionModalProps> = ({
  isOpen,
  transaction,
  handleClose,
}) => {
  const [transactionType, setTransactionType] = useState<TransactionType>(
    transaction.transactionType,
  );

  const { t } = useTranslation();

  return (
    <Modal
      opened={isOpen}
      onClose={handleClose}
      title={
        <Title order={3} c="white" size="h4">
          {t('edit transaction')}
        </Title>
      }
      centered>
      <Stack>
        <SelectTransactionType
          transactionType={transactionType}
          setTransactionType={setTransactionType}
          initialValues={transaction}
        />
        <TransactionForm
          selectedTransactionType={transactionType}
          transaction={transaction}
          isModal
          onSuccess={handleClose}
        />
      </Stack>
    </Modal>
  );
};

export default EditTransactionModal;

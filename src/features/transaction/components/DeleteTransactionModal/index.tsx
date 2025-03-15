import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch } from 'store/hooks';
import { Transaction } from 'features/transaction/types';
import { deleteTransactionThunk } from 'features/transaction/store/thunks';
import { Button, Modal, Stack, Title } from '@mantine/core';

type DeleteBalanceModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  transaction: Transaction;
};

const DeleteTransactionModal: FC<DeleteBalanceModalProps> = ({
  isOpen,
  handleClose,
  transaction,
}) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleDelete = async () => {
    await dispatch(
      deleteTransactionThunk({ transactionId: transaction?._id! }),
    );
    handleClose();
  };

  return (
    <Modal
      opened={isOpen}
      onClose={handleClose}
      centered
      title={
        <Title order={3} c="white" size="h4">
          {t('do you want to delete transaction', {
            transactionName: transaction.title,
          })}
        </Title>
      }>
      <Stack>
        <Button variant="light" color="red" onClick={handleDelete}>
          {t('delete')}
        </Button>
        <Button variant="default" onClick={handleClose}>
          {t('cancel')}
        </Button>
      </Stack>
    </Modal>
  );
};

export default DeleteTransactionModal;

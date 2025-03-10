import { Button, Modal, Stack } from 'react-bootstrap';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch } from 'store/hooks';
import { Transaction } from 'features/transaction/types';
import { deleteTransactionThunk } from 'features/transaction/store/thunks';

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
    <Modal show={isOpen} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {t('do you want to delete transaction', {
            transactionName: transaction.title,
          })}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack gap={2}>
          <Button variant="danger" onClick={handleDelete}>
            {t('delete')}
          </Button>
          <Button variant="outline-dark" onClick={handleClose}>
            {t('cancel')}
          </Button>
        </Stack>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteTransactionModal;

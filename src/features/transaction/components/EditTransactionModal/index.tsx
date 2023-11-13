import { Container, Modal } from 'react-bootstrap';
import SelectTransactionType from 'features/transaction/components/SelectTransactionType';
import CreateTransactionForm from 'features/transaction/components/CreateTransactionForm';
import React, { FC, useState } from 'react';
import {
  CreateTransactionPayload,
  Transaction,
  TransactionType,
} from 'features/transaction/types';
import { useTranslation } from 'react-i18next';
import { updateTransactionThunk } from 'features/transaction/store/thunks';
import { useDispatch } from 'react-redux';

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
  const [transactionType, setTransactionType] =
    useState<TransactionType>('expense');

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleSubmit = (dataForSubmit: CreateTransactionPayload | null) => {
    if (dataForSubmit) {
      dispatch(updateTransactionThunk(dataForSubmit));
      handleClose();
    }
  };

  return (
    <Modal show={isOpen} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('edit transaction')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <SelectTransactionType
            transactionType={transactionType}
            setTransactionType={setTransactionType}
            isModal
            initialValues={transaction}
          />
          <CreateTransactionForm
            selectedTransactionType={transactionType}
            handleSubmit={handleSubmit}
            defaultValues={transaction}
            isModal
            isEdit
          />
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default EditTransactionModal;

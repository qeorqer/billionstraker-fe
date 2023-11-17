import { Container, Modal } from 'react-bootstrap';
import SelectTransactionType from 'features/transaction/components/SelectTransactionType';
import TransactionForm from 'features/transaction/components/TransactionForm';
import React, { FC, ForwardedRef, useRef, useState } from 'react';
import { Transaction, TransactionType } from 'features/transaction/types';
import { useTranslation } from 'react-i18next';
import SelectCurrencyTypeahead from 'features/currency/components/SelectCurrencyTypeahead';
import { TypeaheadRef } from 'react-bootstrap-typeahead';
import SelectPreferredCurrency from 'features/currency/components/SelectPreferredCurrency';

type EditMainCurrencyModalProps = {
  isOpen: boolean;
  handleClose: () => void;
};

const EditMainCurrencyModal: FC<EditMainCurrencyModalProps> = ({
  isOpen,
  handleClose,
}) => {
  const { t } = useTranslation();

  return (
    <Modal show={isOpen} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('edit currency')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <SelectPreferredCurrency isModal />
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default EditMainCurrencyModal;

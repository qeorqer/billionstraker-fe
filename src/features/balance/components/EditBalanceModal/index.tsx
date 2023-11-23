import { Modal } from 'react-bootstrap';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Balance } from 'features/balance/types';
import BalanceForm from 'features/balance/components/BalanceForm';

type EditBalanceModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  balance: Balance;
};

const EditBalanceModal: FC<EditBalanceModalProps> = ({
  isOpen,
  handleClose,
  balance,
}) => {
  const { t } = useTranslation();

  return (
    <Modal show={isOpen} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('edit balance')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <BalanceForm
          buttonText="update"
          balance={balance}
          onSuccess={handleClose}
        />
      </Modal.Body>
    </Modal>
  );
};

export default EditBalanceModal;

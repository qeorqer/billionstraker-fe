import { Container, Modal } from 'react-bootstrap';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
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

import { Modal } from 'react-bootstrap';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Balance } from 'features/balance/types';
import BalanceForm from 'features/balance/components/BalanceForm';
import { Category } from 'features/category/types';
import CategoryForm from 'features/category/components/CategoryForm';

type EditCategoryModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  category: Category;
};

const EditCategoryModal: FC<EditCategoryModalProps> = ({
  isOpen,
  handleClose,
  category,
}) => {
  const { t } = useTranslation();

  return (
    <Modal show={isOpen} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('edit category')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CategoryForm
          buttonText="update"
          category={category}
          onSuccess={handleClose}
        />
      </Modal.Body>
    </Modal>
  );
};

export default EditCategoryModal;

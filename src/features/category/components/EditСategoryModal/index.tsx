import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Title } from '@mantine/core';
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
    <Modal
      opened={isOpen}
      onClose={handleClose}
      title={
        <Title order={3} c="white" size="h4">
          {t('edit category')}
        </Title>
      }
      centered>
      <CategoryForm
        buttonText="update"
        category={category}
        onSuccess={handleClose}
      />
    </Modal>
  );
};

export default EditCategoryModal;

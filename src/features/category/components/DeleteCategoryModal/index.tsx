import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Stack, Button, Title } from '@mantine/core';
import { useAppDispatch } from 'store/hooks';
import { Category } from 'features/category/types';
import { deleteCategoryThunk } from 'features/category/store/thunks';

type DeleteCategoryModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  category: Category;
};

const DeleteCategoryModal: FC<DeleteCategoryModalProps> = ({
  isOpen,
  handleClose,
  category,
}) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleDelete = async () => {
    await dispatch(deleteCategoryThunk({ categoryId: category._id! }));
    handleClose();
  };

  return (
    <Modal
      opened={isOpen}
      onClose={handleClose}
      centered
      title={
        <Title order={3} c="white" size="h4">
          {t('do you want to delete category', {
            categoryName: category.name,
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

export default DeleteCategoryModal;

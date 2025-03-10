import { Button, Modal, Stack } from 'react-bootstrap';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
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
    <Modal show={isOpen} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {t('do you want to delete category', { categoryName: category.name })}
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

export default DeleteCategoryModal;

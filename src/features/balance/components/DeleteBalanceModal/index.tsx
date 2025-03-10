import { Button, Modal, Stack } from 'react-bootstrap';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Balance } from 'features/balance/types';
import { useAppDispatch } from 'store/hooks';
import { deleteBalanceThunk } from 'features/balance/store/thunks';

type DeleteBalanceModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  balance: Balance;
};

const DeleteBalanceModal: FC<DeleteBalanceModalProps> = ({
  isOpen,
  handleClose,
  balance,
}) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleDelete = async () => {
    await dispatch(deleteBalanceThunk({ balanceId: balance._id }));
    handleClose();
  };

  return (
    <Modal show={isOpen} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {t('do you want to delete balance', { balanceName: balance.name })}
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

export default DeleteBalanceModal;

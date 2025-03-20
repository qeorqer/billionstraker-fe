import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Stack, Button, Title } from '@mantine/core';

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
    <Modal
      opened={isOpen}
      onClose={handleClose}
      title={
        <Title order={3} c="white" size="h4">
          {t('do you want to delete balance', { balanceName: balance.name })}
        </Title>
      }
      centered>
      <Stack>
        <Button variant="light" color="red" onClick={handleDelete} fullWidth>
          {t('delete')}
        </Button>
        <Button variant="default" onClick={handleClose} fullWidth>
          {t('cancel')}
        </Button>
      </Stack>
    </Modal>
  );
};

export default DeleteBalanceModal;

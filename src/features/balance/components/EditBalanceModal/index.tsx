import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Title } from '@mantine/core';

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
    <Modal
      opened={isOpen}
      onClose={handleClose}
      title={
        <Title order={3} c="white" size="h4">
          {t('edit balance')}
        </Title>
      }
      centered>
      <BalanceForm
        buttonText="update"
        balance={balance}
        onSuccess={handleClose}
      />
    </Modal>
  );
};

export default EditBalanceModal;

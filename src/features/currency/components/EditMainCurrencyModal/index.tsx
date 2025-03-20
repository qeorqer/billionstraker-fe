import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import SelectPreferredCurrency from 'features/currency/components/SelectPreferredCurrency';
import { Modal, Title } from '@mantine/core';

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
    <Modal
      opened={isOpen}
      onClose={handleClose}
      title={
        <Title order={3} c="white" size="h4">
          {t('edit currency')}
        </Title>
      }
      centered>
      <SelectPreferredCurrency />
    </Modal>
  );
};

export default EditMainCurrencyModal;

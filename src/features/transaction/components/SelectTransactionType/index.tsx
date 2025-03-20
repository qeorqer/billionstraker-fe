import { Dispatch, FC, SetStateAction, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Transaction, TransactionType } from 'features/transaction/types';
import { SegmentedControl, Stack, Title } from '@mantine/core';

type SelectTransactionTypeProps = {
  transactionType: TransactionType;
  setTransactionType: Dispatch<SetStateAction<TransactionType>>;
  initialValues?: Transaction | null;
};

const SelectTransactionType: FC<SelectTransactionTypeProps> = ({
  transactionType,
  setTransactionType,
  initialValues = null,
}) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (initialValues) {
      setTransactionType(initialValues.transactionType);
    }
  }, [initialValues]);

  return (
    <Stack align="center" style={{ width: '100%' }}>
      <Title order={2} fw={500} ta="center">
        {t('Select operation type')}
      </Title>
      <SegmentedControl
        w={{base: '100%', sm: '420px'}}
        size="md"
        value={transactionType}
        onChange={(newValue) => setTransactionType(newValue as TransactionType)}
        data={[
          { value: 'expense', label: t('expense') },
          { value: 'profit', label: t('profit') },
          { value: 'exchange', label: t('exchange') },
        ]}
      />
    </Stack>
  );
};

export default SelectTransactionType;

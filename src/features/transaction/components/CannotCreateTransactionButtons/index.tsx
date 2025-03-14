import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { TransactionType } from 'features/transaction/types';
import { Stack, Title, Button, Flex } from '@mantine/core';

type CannotCreateTransactionButtonsProps = {
  transactionType: TransactionType;
};

const CannotCreateTransactionButtons: FC<
  CannotCreateTransactionButtonsProps
> = ({ transactionType }) => {
  const { t } = useTranslation();
  const { push } = useHistory();

  const handleCreateBalance = () => push('balance');

  const handleCreateCategory = () => push('category');

  if (transactionType === 'exchange') {
    return (
      <Stack align="center">
        <Title order={3} fw={500} ta="center">
          {t('you need to have two balance')}
        </Title>
        <Button
          onClick={handleCreateBalance}
          maw="320px"
          fullWidth
          variant="light">
          {t('create balance')}
        </Button>
      </Stack>
    );
  }

  return (
    <Stack align="center">
      <Title order={3} fw={500} ta="center">
        {t('you need to have one balance')}
      </Title>
      <Flex
        direction={{ base: 'column', sm: 'row' }}
        gap="md"
        w="100%"
        justify="center"
        align="center">
        <Button
          onClick={handleCreateBalance}
          maw="320px"
          fullWidth
          variant="light">
          {t('create balance')}
        </Button>
        <Button
          onClick={handleCreateCategory}
          maw="320px"
          fullWidth
          variant="light">
          {t('create category')}
        </Button>
      </Flex>
    </Stack>
  );
};

export default CannotCreateTransactionButtons;

import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Button, Stack, Title } from '@mantine/core';

type CreateTransactionFirstButtonProps = {
  text: string;
};

const CreateTransactionFirstButton: FC<CreateTransactionFirstButtonProps> = ({
  text,
}) => {
  const { t } = useTranslation();
  const { push } = useHistory();

  const handleCreateTransaction = () => push('createTransaction');

  return (
    <Stack align="center">
      <Title order={3} fw={500}>
        {t(text)}
      </Title>
      <Button onClick={handleCreateTransaction}>
        {t('create transaction')}
      </Button>
    </Stack>
  );
};

export default CreateTransactionFirstButton;

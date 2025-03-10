import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Title, Text, Stack } from '@mantine/core';

import LoginForm from 'features/authorization/components/LogInForm';
import SignUpForm from 'features/authorization/components/SignUpForm';

const AuthForm = () => {
  const [showSignIn, setShowSignIn] = useState<boolean>(true);
  const { t } = useTranslation();

  if (showSignIn) {
    return (
      <Stack gap="md" align="center">
        <Title order={2} fw={700} fz={35}>{t('Sign in')}</Title>
        <LoginForm />
        <Text onClick={() => setShowSignIn(false)} style={{ cursor: 'pointer' }} ta="center">
          {t('New to billionstracker')}?{' '}
          <Text span fw={700} component="span">{t('Sign up')}</Text>
        </Text>
      </Stack>
    );
  }

  return (
    <Stack gap="md" align="center">
      <Title order={2} fw={700} fz={35}>{t('Sign up')}</Title>
      <SignUpForm />
      <Text onClick={() => setShowSignIn(true)} style={{ cursor: 'pointer' }} ta="center">
        {t('Already on billionstracker')}?{' '}
        <Text span fw={700} component="span">{t('Sign in')}</Text>
      </Text>
    </Stack>
  );
};

export default AuthForm;

import { useTranslation } from 'react-i18next';
import { Stack, Image, Text, Button } from '@mantine/core';

import logo from 'assets/common/logo.png';

const NoInternetConnectionPage = () => {
  const { t } = useTranslation();

  return (
    <Stack component="main" h="100vh" justify="center" align="center" px={10}>
      <Image src={logo} alt="app logo" w={300} />
      <Text component="h1" size="lg" fw={500} ta="center">
        {t('No internet connection')}
      </Text>
      <Button color="primary" w={280} onClick={() => window.location.reload()}>
        {t('Try again')}
      </Button>
    </Stack>
  );
};

export default NoInternetConnectionPage;

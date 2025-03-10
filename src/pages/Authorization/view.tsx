import { Container, Grid, Stack, Title, Box, Image, Anchor, Center, Text } from '@mantine/core';
import { NavLink } from 'react-router-dom';
import { FC } from 'react';

import logo from 'assets/common/logo.png';
import LanguageSwitcher from 'components/Shared/LanguageSwitcher';
import AuthForm from 'features/authorization/components/AuthForm/authForm';

type PropsType = {
  t: (text: string) => string;
};

const AuthorizationPageView: FC<PropsType> = ({ t }) => (
  <Box bg="dark" c="white" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
    <Container w="100%" py={20}>
      <Grid align="center" w="100%">
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Stack align="center" gap="xs">
            <Image src={logo} alt="logo" w={200} />
            <Title c="primary">Billionstracker</Title>
            <Text ta="center" c="white" fw={500}>
              {t('Powerful app for controlling your budget')}
            </Text>
          </Stack>
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Stack align="center" gap="md">
            <AuthForm />
            <Anchor component={NavLink} to="/about" c="primary" fw={500}>
              {t('what is this')}
            </Anchor>
            <Center>
              <Box w={100}>
                <LanguageSwitcher />
              </Box>
            </Center>
          </Stack>
        </Grid.Col>
      </Grid>
    </Container>
  </Box>
);

export default AuthorizationPageView;

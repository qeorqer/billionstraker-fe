import { FC } from 'react';
import { Container, Box, Title, Stack } from '@mantine/core';

import BalancesList from 'features/balance/components/BalancesList';
import BalanceForm from 'features/balance/components/BalanceForm';
import SelectPreferredCurrency from 'features/currency/components/SelectPreferredCurrency';

type BalancePageViewProps = {
  t: (text: string) => string;
};

const BalancePageView: FC<BalancePageViewProps> = ({ t }) => (
  <Box component="main" bg="dark" c="white" style={{ minHeight: '100vh' }}>
    <Container size="lg" py="xl">
      <Stack>
        <BalancesList showMenu />
        <Stack
          align="center"
          gap="md"
          maw="420px"
          w="100%"
          style={{ alignSelf: 'center' }}>
          <Title order={2} fw={500} ta="center">
            {t('Select main currency')}
          </Title>
          <SelectPreferredCurrency />
          <Title order={2} fw={500} ta="center">
            {t('add new balance')}
          </Title>
          <BalanceForm buttonText="create" />
        </Stack>
      </Stack>
    </Container>
  </Box>
);

export default BalancePageView;

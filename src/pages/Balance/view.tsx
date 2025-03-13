import { FC } from 'react';
import { Container, Grid, Box, Title, Stack } from '@mantine/core';

import BalancesList from 'features/balance/components/BalancesList';
import BalanceForm from 'features/balance/components/BalanceForm';
import SelectPreferredCurrency from 'features/currency/components/SelectPreferredCurrency';

type BalancePageViewProps = {
  t: (text: string) => string;
};

const BalancePageView: FC<BalancePageViewProps> = ({ t }) => (
  <Box component="main" bg="dark" c="white" style={{ minHeight: '100vh' }}>
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <BalancesList showMenu />
        <SelectPreferredCurrency />
        <Grid>
          <Grid.Col span={{ base: 12, md: 5 }} offset={{ md: 3.5 }}>
            <Stack align="center" gap="md">
              <Title order={2} fw={500} ta="center">
                {t('add new balance')}
              </Title>
              <Box maw="320px" w="100%">
                <BalanceForm buttonText="create" />
              </Box>
            </Stack>
          </Grid.Col>
        </Grid>
      </Stack>
    </Container>
  </Box>
);

export default BalancePageView;

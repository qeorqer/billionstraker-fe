import { FC } from 'react';
import {
  Box,
  Container,
  Button,
  Stack,
  Title,
  Text,
  Image,
  Alert,
  Card,
} from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';

import guide1 from 'assets/guide/guide-1.png';
import guide2 from 'assets/guide/guide-2.png';
import guide3 from 'assets/guide/guide-3.png';
import guide4 from 'assets/guide/guide-4.png';
import guide5 from 'assets/guide/guide-5.png';
import guide6 from 'assets/guide/guide-6.png';
import guide7 from 'assets/guide/guide-7.png';
import guide8 from 'assets/guide/guide-8.png';
import guide9 from 'assets/guide/guide-9.png';

type GuidePageViewProps = {
  t: (text: string) => string;
  handleCreateBalance: () => void;
  handleCreateCategory: () => void;
  handleCreateTransaction: () => void;
  handleExploreProfile: () => void;
  handleCheckStatistics: () => void;
};

const GuidePageView: FC<GuidePageViewProps> = ({
  t,
  handleCreateBalance,
  handleCreateCategory,
  handleCreateTransaction,
  handleExploreProfile,
  handleCheckStatistics,
}) => (
  <Box component="main" bg="dark" c="white">
    <Container size="lg" pt="xl" pb={{ base: 70, sm: 'xl' }}>
      <Stack align="center">
        <Title c="primary" ta="center" order={2} size="h1">
          {t('here comes the usage guide')}
        </Title>

        <Alert variant="light" icon={<IconInfoCircle />} maw={700}>
          {t('first of all, you can always return to this page')}
        </Alert>

        <Text component="p" size="lg" maw={700} ta="center">
          {t('the main parts of the app are')}
        </Text>

        <Text component="p" size="md" c="dimmed" maw={700} ta="center">
          {t('the balance page is used for')}
        </Text>

        <Card withBorder p={0}>
          <Image src={guide1} alt="balance page" />
        </Card>

        <Button onClick={handleCreateBalance} maw="320px" fullWidth>
          {t('create balance')}
        </Button>

        <Text component="p" size="lg" maw={700} ta="center">
          {t("after that let's create some categories")}
        </Text>

        <Text component="p" size="md" c="dimmed" maw={700} ta="center">
          {t('the categories page is used for')}
        </Text>

        <Card withBorder p={0}>
          <Image src={guide2} alt="category page" />
        </Card>

        <Button onClick={handleCreateCategory} maw="320px" fullWidth>
          {t('create category')}
        </Button>

        <Text component="p" size="lg" maw={700} ta="center">
          {t('now we are ready for transactions')}
        </Text>

        <Stack gap="xs">
          <Text component="p" size="lg" ta="center" c="primary">
            {t('expense example')}:
          </Text>

          <Card withBorder p={0}>
            <Image src={guide3} alt="expense example" />
          </Card>
        </Stack>

        <Stack gap="xs">
          <Text component="p" size="lg" ta="center" c="primary">
            {t('income example')}:
          </Text>

          <Card withBorder p={0}>
            <Image src={guide4} alt="income example" />
          </Card>
        </Stack>

        <Stack gap="xs">
          <Text component="p" size="lg" ta="center" c="primary">
            {t('exchange example')}:
          </Text>

          <Card withBorder p={0}>
            <Image src={guide5} alt="exchange example" />
          </Card>
        </Stack>

        <Button maw="320px" fullWidth onClick={handleCreateTransaction}>
          {t('create transaction')}
        </Button>

        <Text component="p" size="lg" maw={700} ta="center">
          {t('time to explore the profile page')}
        </Text>

        <Text component="p" size="md" c="dimmed" maw={700} ta="center">
          {t('the profile page is used for')}
        </Text>

        <Box
          component="figure"
          style={{
            border: '4px solid var(--mantine-color-primary-filled)',
            borderRadius: 'var(--mantine-radius-md)',
          }}>
          <Image src={guide6} alt="profile page" />
        </Box>

        <Button onClick={handleExploreProfile} maw="320px" fullWidth>
          {t('explore profile')}
        </Button>

        <Text component="p" size="lg" maw={700} ta="center">
          {t('the last but not least')}
        </Text>

        <Text component="p" size="md" c="dimmed" maw={700} ta="center">
          {t('select dates range and balance')}
        </Text>

        <Box
          component="figure"
          style={{
            border: '4px solid var(--mantine-color-primary-filled)',
            borderRadius: 'var(--mantine-radius-md)',
          }}>
          <Image src={guide7} alt="statistics page" />
        </Box>

        <Text component="p" size="md" c="dimmed" maw={700} ta="center">
          {t('by default statistics is shown')}
        </Text>

        <Box
          component="figure"
          style={{
            border: '4px solid var(--mantine-color-primary-filled)',
            borderRadius: 'var(--mantine-radius-md)',
          }}>
          <Image src={guide8} alt="statistics page2" />
        </Box>

        <Button maw="320px" fullWidth onClick={handleCheckStatistics}>
          {t('check out statistics')}
        </Button>

        <Alert
          variant="light"
          icon={<IconInfoCircle />}
          title={t('pro tip')}
          maw={700}>
          {t('get pwa')}
        </Alert>

        <Box
          component="figure"
          style={{
            border: '4px solid var(--mantine-color-primary-filled)',
            borderRadius: 'var(--mantine-radius-md)',
          }}>
          <Image src={guide9} alt="get PWA" maw="220px" />
        </Box>

        <Text component="p" size="lg" maw={700} ta="center">
          {t('that is all for the guidance')}
        </Text>

        <Text component="p" size="md" c="dimmed" maw={700} ta="center">
          {t('if you read here')}
        </Text>

        <Button onClick={handleCreateBalance} maw="320px" fullWidth>
          {t('create balance')}
        </Button>
      </Stack>
    </Container>
  </Box>
);

export default GuidePageView;

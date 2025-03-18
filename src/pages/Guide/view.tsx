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
import guideMobile1 from 'assets/guide/guide-mobile-1.png';
import guide2 from 'assets/guide/guide-2.png';
import guideMobile2 from 'assets/guide/guide-mobile-2.png';
import guide3 from 'assets/guide/guide-3.png';
import guideMobile3 from 'assets/guide/guide-mobile-3.png';
import guide4 from 'assets/guide/guide-4.png';
import guideMobile4 from 'assets/guide/guide-mobile-4.png';
import guide5 from 'assets/guide/guide-5.png';
import guideMobile5 from 'assets/guide/guide-mobile-5.png';
import guide6 from 'assets/guide/guide-6.png';
import guideMobile6 from 'assets/guide/guide-mobile-6.png';
import guide7 from 'assets/guide/guide-7.png';
import guideMobile7 from 'assets/guide/guide-mobile-7.png';
import guide8 from 'assets/guide/guide-8.png';
import guideMobile8 from 'assets/guide/guide-mobile-8.png';
import guide9 from 'assets/guide/guide-9.png';
import guideMobile9 from 'assets/guide/guide-mobile-9.png';

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
          <Image src={guide1} display={{ base: 'none', sm: 'block' }} alt="balance page" />
          <Image src={guideMobile1} display={{ base: 'block', sm: 'none' }} alt="balance page" />
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
          <Image src={guide2} display={{ base: 'none', sm: 'block' }} alt="category page" />
          <Image src={guideMobile2} display={{ base: 'block', sm: 'none' }} alt="category page" />
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
            <Image src={guide3} display={{ base: 'none', sm: 'block' }} alt="expense example" />
            <Image src={guideMobile3} display={{ base: 'block', sm: 'none' }} alt="expense example" />
          </Card>
        </Stack>

        <Stack gap="xs">
          <Text component="p" size="lg" ta="center" c="primary">
            {t('income example')}:
          </Text>

          <Card withBorder p={0}>
            <Image src={guide4} display={{ base: 'none', sm: 'block' }} alt="income example" />
            <Image src={guideMobile4} display={{ base: 'block', sm: 'none' }} alt="income example" />
          </Card>
        </Stack>

        <Stack gap="xs">
          <Text component="p" size="lg" ta="center" c="primary">
            {t('exchange example')}:
          </Text>

          <Card withBorder p={0}>
            <Image src={guide5} display={{ base: 'none', sm: 'block' }} alt="exchange example" />
            <Image src={guideMobile5} display={{ base: 'block', sm: 'none' }} alt="exchange example" />
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

        <Card withBorder p={0}>
          <Image src={guide6} display={{ base: 'none', sm: 'block' }} alt="profile page" />
          <Image src={guideMobile6} display={{ base: 'block', sm: 'none' }} alt="profile page" />
        </Card>

        <Button onClick={handleExploreProfile} maw="320px" fullWidth>
          {t('explore profile')}
        </Button>

        <Text component="p" size="lg" maw={700} ta="center">
          {t('the last but not least')}
        </Text>

        <Text component="p" size="md" c="dimmed" maw={700} ta="center">
          {t('select dates range and balance')}
        </Text>

        <Card withBorder p={0}>
          <Image src={guide7} display={{ base: 'none', sm: 'block' }} alt="statistics page" />
          <Image src={guideMobile7} display={{ base: 'block', sm: 'none' }} alt="statistics page" />
        </Card>

        <Text component="p" size="md" c="dimmed" maw={700} ta="center">
          {t('by default statistics is shown')}
        </Text>

        <Card withBorder p={0}>
          <Image src={guide8} display={{ base: 'none', sm: 'block' }} alt="statistics page2" />
          <Image src={guideMobile8} display={{ base: 'block', sm: 'none' }} alt="statistics page2" />
        </Card>

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

        <Card withBorder p={0}>
          <Image src={guide9} display={{ base: 'none', sm: 'block' }} alt="get PWA" />
          <Image src={guideMobile9} display={{ base: 'block', sm: 'none' }} alt="get PWA" />
        </Card>

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

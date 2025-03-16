import { FC } from 'react';
import {
  Container,
  Title,
  Text,
  Image,
  Stack,
  Button,
  Box,
  Card,
} from '@mantine/core';

import about1 from 'assets/about/about-1.png';
import about2 from 'assets/about/about-2.png';
import about3 from 'assets/about/about-3.png';

type propsType = {
  t: (text: string) => string;
  handleCheckOutClick: () => void;
};

const AboutPageView: FC<propsType> = ({ t, handleCheckOutClick }) => (
  <Box component="main" bg="dark" c="white"  h="100%">
    <Container py="md" size="lg">
      <Stack component="section" align="center">
        <Title c="primary" ta="center" order={1}>
          {t('what does this app do')}
        </Title>

        <Text component="p" size="lg" maw={700} ta="center">
          {t('the main idea of the app')}
        </Text>

        <Card withBorder p={0}>
          <Image src={about1} alt="transactions" />
        </Card>

        <Text component="p" size="lg" maw={700} ta="center">
          {t('about statistics')}
        </Text>

        <Card withBorder p={0}>
          <Image src={about2} alt="statistics" />
        </Card>

        <Text component="p" size="lg" maw={700} ta="center">
          {t('more over the has mobile version')}
        </Text>

        <Card withBorder p={0}>
          <Image src={about3} alt="mobile version" />
        </Card>

        <Text component="p" size="lg" maw={700} ta="center">
          {t('so there is no reason not to check it out')}
        </Text>

        <Button
          component="a"
          role="button"
          variant="filled"
          w={300}
          onClick={handleCheckOutClick}>
          {t('check it out')}
        </Button>
      </Stack>
    </Container>
  </Box>
);

export default AboutPageView;

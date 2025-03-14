import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Title, Stack, Box } from '@mantine/core';
import { Carousel } from '@mantine/carousel';

import { balanceData, getBalancesThunk } from 'features/balance';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import BalanceListItem from '../BalanceListItem';

type BalanceListProps = {
  showMenu?: boolean;
};

const BalancesList: FC<BalanceListProps> = ({ showMenu = false }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { balances } = useAppSelector(balanceData);

  useEffect(() => {
    dispatch(getBalancesThunk());
  }, []);

  if (!balances.length) {
    return (
      <Title order={2} ta="center" py="md" fw={500}>
        {t('your balances will be here')}
      </Title>
    );
  }

  return (
    <Stack>
      <Title order={2} ta="center" fw={500}>
        {t('all your balances')}
      </Title>

      <Box px={8}>
        <Carousel
          slideSize={{ base: '70%', xs: '50%', sm: '33.3%', lg: '20%' }}
          slideGap="md"
          align="start"
          withControls={false}
          slidesToScroll={1}>
          {balances.map((balance) => (
            <Carousel.Slide key={balance._id}>
              <BalanceListItem balance={balance} showMenu={showMenu} />
            </Carousel.Slide>
          ))}
        </Carousel>
      </Box>
    </Stack>
  );
};

export default BalancesList;

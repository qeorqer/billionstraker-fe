import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { formatSum } from 'features/transaction/utils/formatSum';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getNetWorthThunk } from 'features/statistics/store/thunks';
import { statisticsData } from 'features/statistics/store/selector';
import EditMainCurrencyModal from 'features/currency/components/EditMainCurrencyModal';
import { userData } from 'features/user';
import { Group, Title, Text, Tooltip, ActionIcon } from '@mantine/core';
import { IconPencil, IconQuestionMark } from '@tabler/icons-react';

const NetWorthView = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { t } = useTranslation();
  const { netWorth } = useAppSelector(statisticsData);
  const { user } = useAppSelector(userData);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getNetWorthThunk());
  }, [user]);

  if (!netWorth) {
    return null;
  }

  return (
    <>
      <Group gap="sm" style={{ alignSelf: 'center' }} justify="center">
        <Title order={2} fw={500} ta="center">
          {t('Your total net worth')}
          <Text c="primary" component="span" size="xl" fw={500} fs="italic">
            {` ${formatSum(
              netWorth.value,
            )} ${netWorth.currency.toUpperCase()} `}
          </Text>
        </Title>

        <Group gap="sm">
          <Tooltip
            label={t('You can change main currency on the balances page')}>
            <ActionIcon variant="light" color="white">
              <IconQuestionMark style={{ width: '70%', height: '70%' }} />
            </ActionIcon>
          </Tooltip>

          <Tooltip label={t('edit currency')}>
            <ActionIcon
              variant="light"
              color="white"
              onClick={() => setIsModalOpen(true)}>
              <IconPencil
                style={{ width: '70%', height: '70%' }}
                stroke={1.5}
              />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Group>
      <EditMainCurrencyModal
        isOpen={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default NetWorthView;

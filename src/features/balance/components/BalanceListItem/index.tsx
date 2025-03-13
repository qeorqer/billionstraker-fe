import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Text, Group, Stack, ActionIcon } from '@mantine/core';
import { IconPencil, IconX } from '@tabler/icons-react';

import { Balance } from 'features/balance/types';
import EditBalanceModal from 'features/balance/components/EditBalanceModal';
import { getCurrencyLabel } from 'features/currency/utils/getCurrencyLabel';
import DeleteBalanceModal from 'features/balance/components/DeleteBalanceModal';
import { formatSum } from 'features/transaction/utils/formatSum';

import './styles.scss';

type BalanceListItemProps = {
  balance: Balance;
  showMenu?: boolean;
};

const BalanceListItem: FC<BalanceListItemProps> = ({
  balance,
  showMenu = true,
}) => {
  const [isEditBalanceModalOpen, setIsEditBalanceModalOpen] = useState(false);
  const [isDeleteBalanceModalOpen, setIsDeleteBalanceModalOpen] =
    useState(false);

  const { t } = useTranslation();

  return (
    <>
      <Card
        withBorder
        radius="md"
        p="sm"
        h="100%"
        style={{ justifyContent: 'center' }}>
        <Group justify="space-between" align="center" wrap="nowrap">
          <Stack gap={4}>
            <Text fw={500} size="sm" lineClamp={2}>
              {balance.name}
            </Text>
            <Text size="xs" c="dimmed" fs="italic">
              {t('value')}: {formatSum(balance.amount)}
            </Text>
            {balance.currency && (
              <Text size="xs" c="dimmed" fs="italic">
                {t('currency')}: {getCurrencyLabel(balance.currency)}
              </Text>
            )}
          </Stack>
          {showMenu && (
            <Stack gap={4}>
              <ActionIcon
                variant="subtle"
                color="gray"
                onClick={() => setIsEditBalanceModalOpen(true)}
                size="sm">
                <IconPencil style={{ width: '70%', height: '70%' }} />
              </ActionIcon>
              <ActionIcon
                variant="subtle"
                color="gray"
                onClick={() => setIsDeleteBalanceModalOpen(true)}
                size="sm">
                <IconX style={{ width: '70%', height: '70%' }} />
              </ActionIcon>
            </Stack>
          )}
        </Group>
      </Card>
      <EditBalanceModal
        isOpen={isEditBalanceModalOpen}
        handleClose={() => setIsEditBalanceModalOpen(false)}
        balance={balance}
      />
      <DeleteBalanceModal
        isOpen={isDeleteBalanceModalOpen}
        handleClose={() => setIsDeleteBalanceModalOpen(false)}
        balance={balance}
      />
    </>
  );
};

export default BalanceListItem;

import { FC, ForwardRefExoticComponent, RefAttributes, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Transaction } from 'features/transaction/types';
import { formatTransactionDate } from 'features/transaction/utils/formatTransactionDate';
import { useAppSelector } from 'store/hooks';
import { userData } from 'features/user';
import EditTransactionModal from 'features/transaction/components/EditTransactionModal';
import DeleteTransactionModal from 'features/transaction/components/DeleteTransactionModal';
import { useFormatSumByBalanceName } from 'features/currency/hooks/useFormatSumByBalanceName';

import {
  ActionIcon,
  Card,
  Center,
  Grid,
  Group,
  Menu,
  Stack,
  Text,
} from '@mantine/core';
import {
  Icon,
  IconArrowsRightLeft,
  IconClock,
  IconDotsVertical,
  IconPencil,
  IconProps,
  IconTag,
  IconTrendingDown,
  IconTrendingUp,
  IconWallet,
  IconX,
} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

type TransactionListItemProps = {
  transaction: Transaction;
};

type ActionOption = {
  title: string;
  onClick: () => void;
  Icon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
};

const TransactionListItem: FC<TransactionListItemProps> = ({ transaction }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { lang } = useAppSelector(userData);
  const { t } = useTranslation();
  const [opened, { toggle }] = useDisclosure();
  const { formatSumByBalanceName } = useFormatSumByBalanceName();

  const actions: ActionOption[] = [
    {
      title: 'edit',
      onClick: () => setIsEditModalOpen(true),
      Icon: IconPencil,
    },
    {
      title: 'delete',
      onClick: () => setIsDeleteModalOpen(true),
      Icon: IconX,
    },
  ];

  return (
    <Card
      withBorder
      radius="md"
      p="sm"
      h="100%"
      w="100%"
      style={{ justifyContent: 'center' }}>
      <Grid>
        <Grid.Col
          span={{ base: 6, sm: 3 }}
          order={1}
          style={{ display: 'flex', alignItems: 'center' }}>
          <Text size="lg" fw={500}>
            {transaction.title}
          </Text>
        </Grid.Col>
        <Grid.Col
          span={{ base: 10, sm: 6 }}
          offset={{ base: 1, sm: 0 }}
          order={{ base: 0, sm: 1 }}>
          {transaction.transactionType === 'exchange' ? (
            <Center>
              <Group gap="xs">
                <Text ta="center">
                  <Text ta="center" size="sm">
                    {transaction.balanceToSubtract}
                  </Text>
                  <Text
                    c="red"
                    size="sm"
                    style={{ display: 'inline-flex', alignItems: 'center' }}>
                    <IconTrendingDown size={15} style={{ marginRight: 5 }} />
                    {formatSumByBalanceName(
                      transaction.sumToSubtract!,
                      transaction?.balanceToSubtract!,
                    )}
                  </Text>
                </Text>
                <IconArrowsRightLeft size={15} />
                <Text>
                  <Text ta="center" size="sm">
                    {transaction.balance}
                  </Text>
                  <Text
                    c="green"
                    size="sm"
                    style={{ display: 'inline-flex', alignItems: 'center' }}>
                    <IconTrendingUp size={15} style={{ marginRight: 5 }} />
                    {formatSumByBalanceName(
                      transaction.sum,
                      transaction.balance,
                    )}
                  </Text>
                </Text>
              </Group>
            </Center>
          ) : (
            <Stack gap={-4}>
              <Text
                ta="center"
                size="sm"
                c={transaction.transactionType === 'profit' ? 'green' : 'red'}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {transaction.transactionType === 'profit' ? (
                  <IconTrendingUp size={15} style={{ marginRight: 5 }} />
                ) : (
                  <IconTrendingDown size={15} style={{ marginRight: 5 }} />
                )}
                {formatSumByBalanceName(transaction.sum, transaction.balance)}
              </Text>
              <Text
                ta="center"
                size="sm"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <IconWallet size={15} style={{ marginRight: 5 }} />
                {transaction.balance}
              </Text>
            </Stack>
          )}
        </Grid.Col>
        <Grid.Col span={{ base: 6, sm: 2.5 }} order={1}>
          <Stack gap={-4} align="flex-end" justify="center" h="100%">
            {transaction.category && (
              <Text style={{ display: 'inline-flex', alignItems: 'center' }}>
                <IconTag size={15} style={{ marginRight: 5 }} />
                {transaction.category}
              </Text>
            )}
            <Text
              c="dimmed"
              size="sm"
              style={{ display: 'inline-flex', alignItems: 'center' }}>
              <IconClock size={13} style={{ marginRight: 5 }} />
              {formatTransactionDate(transaction.date, lang)}
            </Text>
          </Stack>
        </Grid.Col>
        <Grid.Col span={{ base: 1, sm: 0.5 }} order={{ base: 0, sm: 1 }}>
          <Menu
            opened={opened}
            onChange={toggle}
            position="bottom-end"
            shadow="md"
            transitionProps={{
              transition: 'fade-down',
              duration: 150,
            }}
            >
            <Menu.Target>
              <ActionIcon
                color="white"
                variant="subtle"
                size="sm"
                onClick={toggle}>
                <IconDotsVertical size={15} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              {actions.map(({ title, onClick, Icon }) => (
                <Menu.Item
                  key={title}
                  onClick={onClick}
                  leftSection={<Icon size={20} />}>
                  {t(title)}
                </Menu.Item>
              ))}
            </Menu.Dropdown>
          </Menu>
        </Grid.Col>
      </Grid>
      <EditTransactionModal
        transaction={transaction}
        isOpen={isEditModalOpen}
        handleClose={() => setIsEditModalOpen(false)}
      />
      <DeleteTransactionModal
        transaction={transaction}
        isOpen={isDeleteModalOpen}
        handleClose={() => setIsDeleteModalOpen(false)}
      />
    </Card>
  );
};

export default TransactionListItem;

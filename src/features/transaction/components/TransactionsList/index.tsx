import { FC, useEffect, useState } from 'react';
import { Stack, Title } from '@mantine/core';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroller';

import TransactionListItem from 'features/transaction/components/TransactionListItem';
import Loader from 'components/Shared/Loader';
import { userData } from 'features/user';
import { transactionData, TransactionsSections } from 'features/transaction';
import { getCategoriesThunk } from 'features/category';
import CreateTransactionFirstButton from 'features/transaction/components/CreateTransactionFirstButton';

import { formTransactionsSections } from './utils';

type TransactionsListProps = {
  handleLoadMoreTransactions: () => void;
  hasMore: boolean;
};

const TransactionsList: FC<TransactionsListProps> = ({
  handleLoadMoreTransactions,
  hasMore,
}) => {
  const { isLoadingTransactions, transactions, numberOfTransactions } =
    useAppSelector(transactionData);
  const dispatch = useAppDispatch();
  const { lang } = useAppSelector(userData);
  const { t } = useTranslation();

  const [transactionsSections, setTransactionsSections] =
    useState<TransactionsSections>([]);

  useEffect(() => {
    setTransactionsSections(formTransactionsSections(transactions, lang));
  }, [transactions, lang]);

  useEffect(() => {
    dispatch(getCategoriesThunk());
  }, []);

  if (isLoadingTransactions && !numberOfTransactions) {
    return <Loader />;
  }

  if (!numberOfTransactions) {
    return <CreateTransactionFirstButton text="There is no transactions yet" />;
  }

  return (
    <Stack>
      <Title order={2} fw={500} ta="center">
        {t('Your transactions')}
      </Title>
      <InfiniteScroll
        initialLoad={false}
        loadMore={handleLoadMoreTransactions}
        hasMore={hasMore}
        loader={<Loader key={0} />}>
        {transactionsSections.map((section) => (
          <Stack key={section.title} mb="md">
            <Title order={3} size="h4" ta="center" fw={500}>
              {section.title}
            </Title>
            {section.data.map((transaction) => (
              <TransactionListItem
                key={transaction._id}
                transaction={transaction}
              />
            ))}
          </Stack>
        ))}
      </InfiniteScroll>
    </Stack>
  );
};

export default TransactionsList;

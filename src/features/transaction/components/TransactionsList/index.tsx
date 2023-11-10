import React, { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroller';
import { Stack } from 'react-bootstrap';

import TransactionListItem from 'features/transaction/components/TransactionListItem';
import Loader from 'components/Shared/Loader';
import { userData } from 'features/user';
import { transactionData, TransactionsSections } from 'features/transaction';
import { getCategoriesThunk } from 'features/category';
import CreateTransactionFirstButton from 'features/transaction/components/CreateTransactionFirstButton';

import { formTransactionsSections } from './utils';
import './styles.scss';

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
    <Stack gap={1}>
      <p className="text-center fw-bold fs-4">{t('Your transactions')}</p>
      <InfiniteScroll
        initialLoad={false}
        loadMore={handleLoadMoreTransactions}
        hasMore={hasMore}
        loader={<Loader key={0} />}>
        {transactionsSections.map((section) => (
          <React.Fragment key={section.title}>
            <p className="sectionTitle fs-5 w-75 mx-auto">{section.title}</p>
            {section.data.map((transaction, index) => (
              <TransactionListItem
                key={transaction._id}
                transaction={transaction}
              />
            ))}
          </React.Fragment>
        ))}
      </InfiniteScroll>
    </Stack>
  );
};

export default TransactionsList;

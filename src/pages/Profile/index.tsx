import React, { useEffect, useState } from 'react';

import ProfilePageView from './view';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { userData } from 'features/user';
import {
  getTransactionsThunk,
  resetTransactions,
  transactionData,
  TransactionTypesToShow,
} from 'features/transaction';

const LIMIT = 10;

const ProfilePage = () => {
  const { isLoadingTransactions, transactions, numberOfTransactions } =
    useAppSelector(transactionData);
  const dispatch = useAppDispatch();
  const { lang, user } = useAppSelector(userData);
  const { search } = useLocation();

  const params = new URLSearchParams(search);

  const initialBalance = params.get('balance');
  const initialCategory = params.get('category');
  const initialDateFrom = params.get('dateFrom');
  const initialDateTo = params.get('dateTo');

  const [numberToSkip, setNumberToSkip] = useState<number>(LIMIT);
  const [categoriesToShow, setCategoriesToShow] = useState<string>(
    initialCategory || 'all',
  );
  const [shownTransactionsTypes, setShownTransactionsTypes] =
    useState<TransactionTypesToShow>('all transactions');
  const [balancesToShow, setBalancesToShow] = useState<string>(
    initialBalance || 'all',
  );
  const [monthsRange, setMonthsRange] = useState<[Date, Date]>([
    new Date(initialDateFrom || user.created),
    new Date(initialDateTo || new Date()),
  ]);

  const handleLoadMoreTransactions = () => {
    if (!isLoadingTransactions) {
      dispatch(
        getTransactionsThunk({
          limit: LIMIT,
          numberToSkip: numberToSkip,
          filteringOptions: {
            shownTransactionsTypes,
            categoriesToShow:
              categoriesToShow === 'all' ? [] : [categoriesToShow],
            balancesToShow: balancesToShow === 'all' ? [] : [balancesToShow],
            from: monthsRange[0],
            to: monthsRange[1],
          },
        }),
      );
      setNumberToSkip(LIMIT + numberToSkip);
    }
  };

  useEffect(() => {
    setNumberToSkip(LIMIT);

    if (shownTransactionsTypes === 'exchange') {
      setCategoriesToShow('all');
      setBalancesToShow('all');
    }

    if (!isLoadingTransactions) {
      dispatch(resetTransactions());
      dispatch(
        getTransactionsThunk({
          limit: LIMIT,
          numberToSkip: 0,
          filteringOptions: {
            shownTransactionsTypes,
            categoriesToShow:
              categoriesToShow === 'all' ||
              shownTransactionsTypes === 'exchange'
                ? []
                : [categoriesToShow],
            balancesToShow:
              balancesToShow === 'all' || shownTransactionsTypes === 'exchange'
                ? []
                : [balancesToShow],
            from: monthsRange[0],
            to: monthsRange[1],
          },
        }),
      );
    }
  }, [shownTransactionsTypes, categoriesToShow, balancesToShow, monthsRange]);

  return (
    <ProfilePageView
      shownTransactionsTypes={shownTransactionsTypes}
      categoriesToShow={categoriesToShow}
      balancesToShow={balancesToShow}
      setCategoriesToShow={setCategoriesToShow}
      setBalancesToShow={setBalancesToShow}
      setShownTransactionsTypes={setShownTransactionsTypes}
      setMonthsRange={setMonthsRange}
      monthsRange={monthsRange}
      isBackToStatisticsShown={Boolean(initialDateFrom && initialDateTo)}
      handleLoadMoreTransactions={handleLoadMoreTransactions}
      hasMoreTransactions={numberToSkip <= numberOfTransactions}
    />
  );
};

export default ProfilePage;

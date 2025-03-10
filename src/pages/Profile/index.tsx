import { useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { userData } from 'features/user';
import { debounce } from 'lodash';
import {
  getTransactionsThunk,
  resetTransactions,
  transactionData,
  TransactionTypeToShow,
} from 'features/transaction';

import ProfilePageView from './view';

const LIMIT = 10;

const ProfilePage = () => {
  const { isLoadingTransactions, numberOfTransactions } =
    useAppSelector(transactionData);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(userData);
  const { search } = useLocation();

  const params = new URLSearchParams(search);

  const initialBalance = params.get('balance');
  const initialCategory = params.get('category');
  const initialDateFrom = params.get('dateFrom');
  const initialDateTo = params.get('dateTo');
  const initialTransactionType = params.get('transactionType');

  const [numberToSkip, setNumberToSkip] = useState<number>(LIMIT);
  const [categoriesToShow, setCategoriesToShow] = useState<string>(
    initialCategory || 'all',
  );
  const [shownTransactionsTypes, setShownTransactionsTypes] =
    useState<TransactionTypeToShow>(
      (initialTransactionType as TransactionTypeToShow) || 'all transactions',
    );
  const [balancesToShow, setBalancesToShow] = useState<string>(
    initialBalance || 'all',
  );
  const [monthsRange, setMonthsRange] = useState<[Date, Date]>([
    new Date(initialDateFrom || user.created),
    new Date(initialDateTo || new Date()),
  ]);
  const [transactionName, setTransactionName] = useState<string>('');
  const [debouncedTransactionName, setDebouncedTransactionName] =
    useState<string>('');

  useEffect(() => {
    const handler = debounce(() => {
      setDebouncedTransactionName(transactionName);
    }, 500);

    handler();

    return () => {
      handler.cancel();
    };
  }, [transactionName]);

  const handleLoadMoreTransactions = () => {
    if (!isLoadingTransactions) {
      dispatch(
        getTransactionsThunk({
          limit: LIMIT,
          numberToSkip,
          filteringOptions: {
            shownTransactionsTypes,
            categoriesToShow:
              categoriesToShow === 'all' ? [] : [categoriesToShow],
            balancesToShow: balancesToShow === 'all' ? [] : [balancesToShow],
            from: monthsRange[0],
            to: monthsRange[1],
            transactionName: debouncedTransactionName,
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
            balancesToShow: balancesToShow === 'all' ? [] : [balancesToShow],
            from: monthsRange[0],
            to: monthsRange[1],
            transactionName: debouncedTransactionName,
          },
        }),
      );
    }
  }, [
    shownTransactionsTypes,
    categoriesToShow,
    balancesToShow,
    monthsRange,
    debouncedTransactionName,
  ]);

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
      transactionName={transactionName}
      setTransactionName={setTransactionName}
    />
  );
};

export default ProfilePage;

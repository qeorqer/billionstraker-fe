import React, { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { TransactionType } from 'features/transaction';
import { balanceData, getBalancesThunk } from 'features/balance';
import { categoryData, getCategoriesThunk } from 'features/category';
import Loader from 'components/Shared/Loader';

import CreateTransactionPageView from './view';

const CreateTransactionPage = () => {
  const { categories, isLoadingCategories } = useAppSelector(categoryData);
  const { balances, isLoadingBalances } = useAppSelector(balanceData);

  const [canCreateTransaction, setCanCreateTransaction] =
    useState<boolean>(false);
  const [transactionType, setTransactionType] =
    useState<TransactionType>('expense');

  const dispatch = useAppDispatch();

  useEffect(() => {
    switch (transactionType) {
      case 'expense':
        setCanCreateTransaction(
          Boolean(
            balances.length &&
              categories.some(
                (category) => category.categoryType === 'expense',
              ),
          ),
        );
        break;
      case 'profit':
        setCanCreateTransaction(
          Boolean(
            balances.length &&
              categories.some((category) => category.categoryType === 'profit'),
          ),
        );
        break;
      case 'exchange':
        setCanCreateTransaction(Boolean(balances.length >= 2));
        break;
    }
  }, [categories, balances, transactionType]);

  useEffect(() => {
    dispatch(getCategoriesThunk());
    dispatch(getBalancesThunk());
  }, []);

  if (isLoadingCategories && isLoadingBalances) {
    return <Loader />;
  }

  return (
    <CreateTransactionPageView
      transactionType={transactionType}
      setTransactionType={setTransactionType}
      canCreateTransaction={canCreateTransaction}
    />
  );
};

export default CreateTransactionPage;

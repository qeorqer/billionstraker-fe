import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import {
  createTransactionThunk,
  CreateTransactionPayload,
  TransactionType,
} from 'features/transaction';
import { balanceData, getBalancesThunk } from 'features/balance';
import { categoryData, getCategoriesThunk } from 'features/category';

import CreateTransactionPageView from './view';

const CreateTransactionPage = () => {
  const { categories, isLoadingCategories } = useAppSelector(categoryData);
  const { balances, isLoadingBalances } = useAppSelector(balanceData);

  const [canCreateTransaction, setCanCreateTransaction] =
    useState<boolean>(false);
  const [transactionType, setTransactionType] =
    useState<TransactionType>('expense');

  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { push } = useHistory();

  const handleSubmit = (dataForSubmit: CreateTransactionPayload | null) => {
    if (dataForSubmit) {
      dispatch(createTransactionThunk(dataForSubmit));
    }
  };

  const handleCreateBalance = () => push('balance');

  const handleCreateCategory = () => push('categories');

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

  useEffect(() => {
    setIsLoading(isLoadingCategories && isLoadingBalances);
  }, [isLoadingBalances, isLoadingCategories]);

  return (
    <CreateTransactionPageView
      t={t}
      transactionType={transactionType}
      setTransactionType={setTransactionType}
      balances={balances}
      categories={categories}
      handleSubmit={handleSubmit}
      canCreateTransaction={canCreateTransaction}
      handleCreateBalance={handleCreateBalance}
      handleCreateCategory={handleCreateCategory}
      isLoading={isLoading}
    />
  );
};

export default CreateTransactionPage;

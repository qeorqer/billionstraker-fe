import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { categoryData } from 'store/selectors';
import { useAppDispatch, useAppSelector } from 'hooks/react-redux.hook';
import {
  submitTransactionType,
  transactionTypes,
} from 'types/transaction.type';
import { getCategories } from 'store/reducers/category.reducer';
import { getBalances } from 'store/reducers/balance.reducer';
import { createTransaction } from 'store/reducers/transaction.reducer';

import CreateTransaction from './view';

const CreateTransactionPage = () => {
  const { categories, isLoadingCategories } = useAppSelector(categoryData);
  const { balances, isLoadingBalances } = useAppSelector(
    (state) => state.balanceData,
  );

  const [canCreateTransaction, setCanCreateTransaction] =
    useState<boolean>(false);
  const [transactionType, setTransactionType] =
    useState<transactionTypes>('expense');

  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { push } = useHistory();

  const handleSubmit = (dataForSubmit: submitTransactionType | null) => {
    if (dataForSubmit) {
      dispatch(createTransaction(dataForSubmit));
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
    dispatch(getCategories());
    dispatch(getBalances());
  }, []);

  useEffect(() => {
    setIsLoading(isLoadingCategories && isLoadingBalances);
  }, [isLoadingBalances, isLoadingCategories]);

  return (
    <CreateTransaction
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

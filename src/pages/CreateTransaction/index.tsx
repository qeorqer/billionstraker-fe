import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { categoryData } from 'store/selectors';
import { useAppDispatch, useAppSelector } from 'hooks/react-redux.hook';
import { transactionType, transactionTypes } from 'types/transaction.type';
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
  const [categoryId, setCategoryId] = useState<string>('');
  const [balanceId, setBalanceId] = useState<string>('');
  const [exchangeBalanceId, setExchangeBalanceId] = useState<string>('');
  const [sum, setSum] = useState<number | string>('');
  const [exchangeSum, setExchangeSum] = useState<number | string>('');
  const [title, setTitle] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { push } = useHistory();

  const validateSumReg = /^(0|[1-9]\d*)(\.\d+)?$/;

  const handleChangeSum =
    (setter: Dispatch<SetStateAction<string | number>>) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (
        validateSumReg.test(event.target.value) ||
        event.target.value === ''
      ) {
        setter(event.target.value);
      }
    };

  const handleSubmit = () => {
    const requiredFieldsForExpenseProfit = [sum, title, categoryId, balanceId];
    const requiredFieldsForExchange = [
      sum,
      title,
      balanceId,
      exchangeSum,
      exchangeBalanceId,
    ];
    const requiredFieldsForTransaction =
      transactionType === 'exchange'
        ? requiredFieldsForExchange
        : requiredFieldsForExpenseProfit;

    if (requiredFieldsForTransaction.some((field) => !field)) {
      return toast(t('All fields are required'), {
        type: 'error',
      });
    }

    if (transactionType === 'exchange') {
      const balance = balances.find(
        (balance) => balance._id === exchangeBalanceId,
      );
      const balanceToSubtract = balances.find(
        (balance) => balance._id === balanceId,
      );

      if (!balance || !balanceToSubtract) {
        return toast(t('the balance does not exist'), {
          type: 'error',
        });
      }

      if (balanceToSubtract.amount < sum) {
        return toast(t("You don't have this much"), {
          type: 'error',
        });
      }

      const newTransaction: transactionType = {
        title: title,
        sum: Number(exchangeSum),
        sumToSubtract: Number(sum),
        balance: balance.name,
        balanceToSubtract: balanceToSubtract.name,
        transactionType: transactionType,
        date: date,
      };

      dispatch(
        createTransaction({
          transaction: newTransaction,
          balanceId: exchangeBalanceId,
          balanceToSubtractId: balanceId,
        }),
      );

      setSum('');
      setExchangeSum('');
      setTitle('');
      return;
    }

    const balance = balances.find((balance) => balance._id === balanceId);
    if (!balance) {
      return toast(t('the balance does not exist'), {
        type: 'error',
      });
    }

    if (transactionType === 'expense') {
      if (balance.amount < sum) {
        return toast(t("You don't have this much"), {
          type: 'error',
        });
      }
    }

    const category = categories.find((category) => category._id === categoryId);

    if (!category) {
      return toast(t('there is no category with such id'), {
        type: 'error',
      });
    }

    const newTransaction: transactionType = {
      title: title,
      sum: Number(sum),
      category: category.name,
      balance: balance.name,
      date: date,
      transactionType: transactionType,
    };

    dispatch(
      createTransaction({
        transaction: newTransaction,
        balanceId: balanceId,
      }),
    );

    setSum('');
    setExchangeSum('');
    setTitle('');
  };

  const handleCreateBalance = () => push('balances');

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
      setCategoryId={setCategoryId}
      categoryId={categoryId}
      setBalanceId={setBalanceId}
      balanceId={balanceId}
      setExchangeBalanceId={setExchangeBalanceId}
      exchangeBalanceId={exchangeBalanceId}
      setTitle={setTitle}
      balances={balances}
      categories={categories}
      title={title}
      sum={sum}
      exchangeSum={exchangeSum}
      handleChangeSum={handleChangeSum(setSum)}
      handleChangeExchangeSum={handleChangeSum(setExchangeSum)}
      handleSubmit={handleSubmit}
      date={date}
      setDate={setDate}
      canCreateTransaction={canCreateTransaction}
      handleCreateBalance={handleCreateBalance}
      handleCreateCategory={handleCreateCategory}
      isLoading={isLoading}
    />
  );
};

export default CreateTransactionPage;

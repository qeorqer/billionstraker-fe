import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { categoryData, userData } from '../../store/selectors';
import { useAppDispatch, useAppSelector } from '../../hooks/react-redux.hook';
import {
  transactionType,
  transactionTypes,
} from '../../types/transaction.type';
import { getCategories } from '../../store/reducers/category.reducer';
import { getBalances } from '../../store/reducers/balance.reducer';
import { createTransaction } from '../../store/reducers/transaction.reducer';

import CreateTransaction from './view';

const CreateTransactionPage = () => {
  const { lang } = useAppSelector(userData);
  const { categories } = useAppSelector(categoryData);
  const { balances } = useAppSelector((state) => state.balanceData);

  const [transactionType, setTransactionType] = useState<transactionTypes>('expense');
  const [categoryId, setCategoryId] = useState<string>('');
  const [balanceId, setBalanceId] = useState<string>('');
  const [exchangeBalanceId, setExchangeBalanceId] = useState<string>('');
  const [sum, setSum] = useState<number | string>('');
  const [exchangeSum, setExchangeSum] = useState<number | string>('');
  const [title, setTitle] = useState<string>('');

  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const validateSumReg = /^((?!(0))[0-9]+)$/;

  const handleChangeSum = (setter: Dispatch<SetStateAction<string | number>>) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (validateSumReg.test(event.target.value) || event.target.value === '') {
      setter(event.target.value);
    }
  };

  const handleSubmit = () => {
    const requiredFieldsForExpenseProfit = [sum, title, categoryId, balanceId];
    const requiredFieldsForExchange = [sum, title, balanceId, exchangeSum, exchangeBalanceId];
    const requiredFieldsForTransaction = transactionType === 'exchange' ? requiredFieldsForExchange : requiredFieldsForExpenseProfit;

    if (requiredFieldsForTransaction.some((field) => !field)) {
      return toast(t('All fields are required'), {
        position: 'top-right',
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        theme: 'dark',
        type: 'error',
      });
    }

    if (transactionType === 'exchange') {
      const balance = balances.find((balance) => balance._id === exchangeBalanceId);
      const balanceToSubtract = balances.find((balance) => balance._id === balanceId);
      if (!balance || !balanceToSubtract) {
        return toast(t('the balance does not exist'), {
          position: 'top-right',
          autoClose: 2500,
          hideProgressBar: true,
          closeOnClick: true,
          theme: 'dark',
          type: 'error',
        });
      }

      if (balanceToSubtract.amount < sum) {
        return toast(t('You don\'t have this much'), {
          position: 'top-right',
          autoClose: 2500,
          hideProgressBar: true,
          closeOnClick: true,
          theme: 'dark',
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
        date: new Date(),
      };

      dispatch(createTransaction({
        transaction: newTransaction,
        balanceId: exchangeBalanceId,
        balanceToSubtractId: balanceId,
      }));

      return;
    }

    const balance = balances.find((balance) => balance._id === balanceId);
    if (!balance) {
      return toast(t('the balance does not exist'), {
        position: 'top-right',
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        theme: 'dark',
        type: 'error',
      });
    }

    if (transactionType === 'expense') {
      if (balance.amount < sum) {
        return toast(t('You don\'t have this much'), {
          position: 'top-right',
          autoClose: 2500,
          hideProgressBar: true,
          closeOnClick: true,
          theme: 'dark',
          type: 'error',
        });
      }
    }

    const newTransaction: transactionType = {
      title: title,
      sum: Number(sum),
      category: categoryId,
      balance: balance.name,
      date: new Date(),
      transactionType: transactionType,
    };

    dispatch(createTransaction({
      transaction: newTransaction,
      balanceId: balanceId,
    }));
  };

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getBalances());
  }, []);

  return (
    <CreateTransaction
      t={t}
      transactionType={transactionType}
      setTransactionType={setTransactionType}
      setCategoryId={setCategoryId}
      setBalanceId={setBalanceId}
      balanceId={balanceId}
      setExchangeBalanceId={setExchangeBalanceId}
      setTitle={setTitle}
      balances={balances}
      categories={categories}
      lang={lang}
      title={title}
      sum={sum}
      exchangeSum={exchangeSum}
      handleChangeSum={handleChangeSum(setSum)}
      handleChangeExchangeSum={handleChangeSum(setExchangeSum)}
      handleSubmit={handleSubmit}
    />
  );
};

export default CreateTransactionPage;

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { categoryData, userData } from '../../store/selectors';
import { useAppDispatch, useAppSelector } from '../../hooks/react-redux.hook';
import { addTransaction } from '../../store/reducers/user.reducer';
import {
  transactionType,
  transactionTypes,
} from '../../types/transaction.type';
import { getCategories } from '../../store/reducers/category.reducer';
import { getBalances } from '../../store/reducers/balance.reducer';

import './transaction.scss';
import { handleExpense } from './utils';
import CreateTransaction from './view';

const CreateTransactionPage = () => {
  const { user, lang } = useAppSelector(userData);
  const { categories } = useAppSelector(categoryData);
  const { balances } = useAppSelector((state) => state.balanceData);

  const [useCard, setUseCard] = useState<boolean>(true);
  const [transactionType, setTransactionType] = useState<transactionTypes>('expense');
  const [categoryId, setCategoryId] = useState<string>('');
  const [balanceId, setBalanceId] = useState<string>('');
  const [sum, setSum] = useState<number | string>('');
  const [title, setTitle] = useState<string>('');

  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const validateSumReg = /^((?!(0))[0-9]+)$/;

  const handleChangeSum = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (validateSumReg.test(event.target.value) || event.target.value === '') {
      setSum(event.target.value);
    }
  };

  const handleSubmit = () => {
    if (!sum || !categoryId || !title || !balanceId) {
      return toast(t('All fields are required'), {
        position: 'top-right',
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        theme: 'dark',
        type: 'error',
      });
    }

    console.log(sum, categoryId, title, balanceId);
    return;

    switch (transactionType) {
      case 'exchange':
        handleExpense();
    }

    if (transactionType === 'expense') {
      if ((useCard && user.card < sum) || (!useCard && user.cash < sum)) {
        return toast(t('You don\'t have this much'), {
          position: 'top-right',
          autoClose: 2500,
          hideProgressBar: true,
          closeOnClick: true,
          theme: 'dark',
          type: 'error',
        });
      }

      if (Number(sum) === 0) {
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
      ownerId: user._id,
      isCard: useCard,
      isExpense: true,
      sum: Number(sum),
      category: categoryId,
      date: new Date(),
    };

    dispatch(addTransaction({ transaction: newTransaction }));
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
      setTitle={setTitle}
      balances={balances}
      categories={categories}
      lang={lang}
      title={title}
      sum={sum}
      handleChangeSum={handleChangeSum}
      handleSubmit={handleSubmit}
    />
  );
};

export default CreateTransactionPage;

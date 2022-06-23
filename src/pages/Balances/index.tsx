import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from 'hooks/react-redux.hook';
import { createBalance, getBalances } from 'store/reducers/balance.reducer';

import Balances from './view';

const BalancesPage = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { balances } = useAppSelector((state) => state.balanceData);
  const [name, setName] = useState<string>('');
  const [amount, setAmount] = useState<number | string>('');

  const handleChangeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    const validateSumReg = /^[0-9]+$/;

    if (validateSumReg.test(event.target.value) || event.target.value === '') {
      setAmount(event.target.value);
    }
  };

  useEffect(() => {
    dispatch(getBalances());
  }, []);

  const handleAddBalance = () => {
    if (!name || !amount) {
      return toast(t('All fields are required'), {
        position: 'top-right',
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        theme: 'dark',
        type: 'error',
      });
    }

    const isNameAlreadyUsed = balances.some(
      (balance) => balance.name.toLowerCase().trim() === name,
    );
    if (isNameAlreadyUsed) {
      return toast(t('name should be unique'), {
        position: 'top-right',
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        theme: 'dark',
        type: 'error',
      });
    }

    dispatch(createBalance({ name, amount: Number(amount) }));
  };

  return (
    <Balances
      t={t}
      balances={balances}
      name={name}
      setName={setName}
      amount={amount}
      handleChangeAmount={handleChangeAmount}
      handleAddBalance={handleAddBalance}
    />
  );
};

export default BalancesPage;

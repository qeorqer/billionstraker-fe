import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { handleChangeAmount } from 'features/balance/utils/handleChangeAmount';
import { balanceData, createBalanceThunk } from 'features/balance';

import BalancePageView from './view';

const BalancePage = () => {
  const [name, setName] = useState<string>('');
  const [amount, setAmount] = useState<number | string>('');

  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { balances } = useAppSelector(balanceData);

  const handleAddBalance = () => {
    if (!name || !amount) {
      return toast(t('All fields are required'), {
        type: 'error',
      });
    }

    const isNameAlreadyUsed = balances.some(
      (balance) => balance.name.toLowerCase().trim() === name,
    );
    if (isNameAlreadyUsed) {
      return toast(t('name should be unique'), {
        type: 'error',
      });
    }

    dispatch(createBalanceThunk({ name, amount: Number(amount) }));

    setName('');
    setAmount('');
  };

  return <BalancePageView t={t} hasBalances={balances.length > 0} />;
};

export default BalancePage;

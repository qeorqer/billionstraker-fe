import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from 'store/hooks';
import { categoryData } from 'store/selectors';
import { useDispatch } from 'react-redux';
import {
  updateTransactionThunk,
  CreateTransactionPayload,
  Transaction,
  TransactionType,
} from 'features/transaction';

import ProfilePageView from './view';
import { balanceData } from 'features/balance';

const ProfilePage = () => {
  const { balances } = useAppSelector(balanceData);
  const { categories } = useAppSelector(categoryData);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [transactionType, setTransactionType] =
    useState<TransactionType>('expense');
  const [isModalShown, setIsModalShown] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const handleSubmit = (dataForSubmit: CreateTransactionPayload | null) => {
    if (dataForSubmit) {
      dispatch(updateTransactionThunk(dataForSubmit));
      setIsModalShown(false);
    }
  };

  useEffect(() => {
    setIsModalShown(Boolean(selectedTransaction));
  }, [selectedTransaction]);

  return (
    <ProfilePageView
      balances={balances}
      categories={categories}
      t={t}
      transactionType={transactionType}
      setTransactionType={setTransactionType}
      isModalShown={isModalShown}
      setSelectedTransaction={setSelectedTransaction}
      selectedTransaction={selectedTransaction}
      handleSubmit={handleSubmit}
    />
  );
};

export default ProfilePage;

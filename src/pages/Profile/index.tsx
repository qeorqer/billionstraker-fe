import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from 'store/hooks';
import { categoryData } from 'store/selectors';
import { useDispatch } from 'react-redux';
import {
  updateTransactionThunk,
  SubmitTransaction,
  Transaction,
  TransactionType,
} from 'features/transaction';

import Profile from './view';

const ProfilePage = () => {
  const { balances } = useAppSelector((state) => state.balanceData);
  const { categories } = useAppSelector(categoryData);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [transactionType, setTransactionType] =
    useState<TransactionType>('expense');
  const [isModalShown, setIsModalShown] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const handleSubmit = (dataForSubmit: SubmitTransaction | null) => {
    if (dataForSubmit) {
      dispatch(updateTransactionThunk(dataForSubmit));
      setIsModalShown(false);
    }
  };

  useEffect(() => {
    setIsModalShown(Boolean(selectedTransaction));
  }, [selectedTransaction]);

  return (
    <Profile
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

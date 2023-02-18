import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from 'hooks/react-redux.hook';
import {
  submitTransactionType,
  transactionType,
  transactionTypes,
} from 'types/transaction.type';
import { categoryData } from 'store/selectors';
import { updateTransaction } from 'store/reducers/transaction.reducer';
import { useDispatch } from 'react-redux';

import Profile from './view';

const ProfilePage = () => {
  const { balances } = useAppSelector((state) => state.balanceData);
  const { categories } = useAppSelector(categoryData);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [transactionType, setTransactionType] =
    useState<transactionTypes>('expense');
  const [isModalShown, setIsModalShown] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<transactionType | null>(null);

  const handleSubmit = (dataForSubmit: submitTransactionType | null) => {
    if (dataForSubmit) {
      dispatch(updateTransaction(dataForSubmit));
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

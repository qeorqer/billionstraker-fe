import React from 'react';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from 'hooks/react-redux.hook';

import Profile from './view';

const ProfilePage = () => {
  const { balances } = useAppSelector((state) => state.balanceData);
  const { t } = useTranslation();

  return (
    <Profile numberOfBalances={balances.length} t={t} />
  );
};

export default ProfilePage;

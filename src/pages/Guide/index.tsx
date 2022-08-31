import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'hooks/react-redux.hook';
import { setFirstEnter } from 'store/reducers/user.reducer';
import { userData } from 'store/selectors';

import Guide from './view';

const GuidePage = () => {
  const {  user } = useAppSelector(userData);
  const dispatch = useAppDispatch();

  const { push } = useHistory();
  const { t } = useTranslation();

  const handleCreateBalance = () => push('/balance');

  const handleCreateCategory = () => push('/categories');

  const handleCreateTransaction = () => push('/createTransaction');

  const handleExploreProfile = () => push('/profile');

  const handleCheckStatistics = () => push('/statistics');

  useEffect(() => {
    if (user.isFirstEnter) {
      dispatch(setFirstEnter());
    }
  }, []);

  return (
    <Guide
      t={t}
      handleCreateBalance={handleCreateBalance}
      handleCreateCategory={handleCreateCategory}
      handleCreateTransaction={handleCreateTransaction}
      handleExploreProfile={handleExploreProfile}
      handleCheckStatistics={handleCheckStatistics}
    />
  );
};

export default GuidePage;

import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { updateUserThunk, userData } from 'features/user';

import GuidePageView from './view';

const GuidePage = () => {
  const { user } = useAppSelector(userData);
  const dispatch = useAppDispatch();

  const { push } = useHistory();
  const { t } = useTranslation();

  const handleCreateBalance = () => push('/balance');

  const handleCreateCategory = () => push('/category');

  const handleCreateTransaction = () => push('/createTransaction');

  const handleExploreProfile = () => push('/profile');

  const handleCheckStatistics = () => push('/statistics');

  useEffect(() => {
    if (user.isFirstEnter) {
      dispatch(updateUserThunk({ updatedFields: { isFirstEnter: false } }));
    }
  }, []);

  return (
    <GuidePageView
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

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { updateUserThunk, userData } from 'features/user';

import GuidePageView from './view';

const GuidePage = () => {
  const { user } = useAppSelector(userData);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleCreateBalance = () => navigate('/balance');

  const handleCreateCategory = () => navigate('/category');

  const handleCreateTransaction = () => navigate('/createTransaction');

  const handleExploreProfile = () => navigate('/profile');

  const handleCheckStatistics = () => navigate('/statistics');

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

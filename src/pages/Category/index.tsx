import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch } from 'store/hooks';
import { getCategoriesThunk } from 'features/category';

import CategoryPageView from './view';

const CategoryPage = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getCategoriesThunk());
  }, []);

  return <CategoryPageView t={t} />;
};

export default CategoryPage;

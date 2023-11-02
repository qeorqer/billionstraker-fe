import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import {
  CategoryTypes,
  createCategoryThunk,
  getCategoriesThunk,
} from 'features/category';

import CategoryPageView from './view';

const CategoryPage = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { categories, isLoadingCategories } = useAppSelector(
    (state) => state.categoryDate,
  );

  const [name, setName] = useState<string>('');
  const [categoryType, setCategoryType] = useState<CategoryTypes>('expense');

  useEffect(() => {
    dispatch(getCategoriesThunk());
  }, []);

  const handleAddCategory = () => {
    if (!name) {
      return toast(t('All fields are required'), {
        type: 'error',
      });
    }

    const isAlreadyExists = categories.some(
      (category) =>
        category.name.toLowerCase().trim() === name &&
        category.categoryType === categoryType,
    );

    if (isAlreadyExists) {
      return toast(t('category already exists'), {
        type: 'error',
      });
    }

    dispatch(
      createCategoryThunk({
        category: {
          name,
          categoryType,
        },
      }),
    );

    setName('');
    setCategoryType('expense');
  };

  return (
    <CategoryPageView
      t={t}
      categories={categories}
      name={name}
      setName={setName}
      categoryType={categoryType}
      setCategoryType={setCategoryType}
      handleAddCategory={handleAddCategory}
      isLoading={isLoadingCategories}
    />
  );
};

export default CategoryPage;

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from 'hooks/react-redux.hook';
import { createCategory, getCategories } from 'store/reducers/category.reducer';
import { categoriesTypes } from 'types/category.type';

import Categories from './view';

const CategoriesPage = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { categories } = useAppSelector((state) => state.categoryDate);
  const [name, setName] = useState<string>('');
  const [categoryType, setCategoryType] = useState<categoriesTypes>('expense');

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const handleAddCategory = () => {
    if (!name) {
      return toast(t('All fields are required'), {
        position: 'top-right',
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        theme: 'dark',
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
        position: 'top-right',
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        theme: 'dark',
        type: 'error',
      });
    }

    dispatch(
      createCategory({
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
    <Categories
      t={t}
      categories={categories}
      name={name}
      setName={setName}
      categoryType={categoryType}
      setCategoryType={setCategoryType}
      handleAddCategory={handleAddCategory}
    />
  );
};

export default CategoriesPage;

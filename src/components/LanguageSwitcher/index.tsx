import React from 'react';
import i18next from 'i18next';

import { changeLang } from 'store/reducers/user.reducer';
import enFlag from 'images/en.png';
import ruFlag from 'images/ru.png';
import { userData } from 'store/selectors';
import { useAppDispatch, useAppSelector } from 'hooks/react-redux.hook';

const Index = () => {
  const dispatch = useAppDispatch();
  const { lang } = useAppSelector(userData);

  const handleLangChange = (lang: string) => () => {
    dispatch(changeLang(lang));
    i18next.changeLanguage(lang);
  };

  return (
    <>
      <span
        onClick={handleLangChange('en')}
        className={lang === 'en' ? 'activeLang' : ''}
      >
        <img src={enFlag} alt="en" />
      </span>
      <span
        onClick={handleLangChange('ru')}
        className={lang === 'ru' ? 'activeLang' : ''}
      >
        <img src={ruFlag} alt="en" />
      </span>
    </>
  );
};

export default Index;

import React from 'react';
import i18next from 'i18next';

import { changeLang } from 'features/user';
import enFlag from 'assets/common/en.png';
import ruFlag from 'assets/common/ru.png';
import { userData } from 'features/user';
import { useAppDispatch, useAppSelector } from 'store/hooks';

const LanguageSwitcher = () => {
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
        className={lang === 'en' ? 'activeLang' : ''}>
        <img src={enFlag} alt="en" />
      </span>
      <span
        onClick={handleLangChange('ru')}
        className={lang === 'ru' ? 'activeLang' : ''}>
        <img src={ruFlag} alt="en" />
      </span>
    </>
  );
};

export default LanguageSwitcher;

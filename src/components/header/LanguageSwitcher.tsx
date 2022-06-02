import React from 'react';
import { changeLang } from '../../store/reducers/user.reducer';
import i18next from 'i18next';
import enFlag from '../../images/en.png';
import ruFlag from '../../images/ru.png';
import { userData } from '../../store/selectors';
import { useAppDispatch, useAppSelector } from '../../hooks/react-redux.hook';

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

export default LanguageSwitcher;

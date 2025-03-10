import i18next from 'i18next';

import { changeLang } from 'features/user';
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
        className={lang === 'en' ? 'activeLang' : ''}
      >
        EN
      </span>
      <span
        onClick={handleLangChange('ru')}
        className={lang === 'ru' ? 'activeLang' : ''}
      >
        Not EN
      </span>
    </>
  );
};

export default LanguageSwitcher;

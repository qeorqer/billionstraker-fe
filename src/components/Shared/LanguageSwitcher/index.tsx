import i18next from 'i18next';
import { Group, UnstyledButton, Text } from '@mantine/core';
import { FC } from 'react';

import { changeLang, userData } from 'features/user';
import { useAppDispatch, useAppSelector } from 'store/hooks';

import styles from './styles.module.css';

const LANGUAGES = [
  { code: 'en', label: 'EN' },
  { code: 'ru', label: 'Not EN' },
] as const;

const LanguageSwitcher: FC = () => {
  const dispatch = useAppDispatch();
  const { lang } = useAppSelector(userData);

  const handleLangChange = (lang: string) => () => {
    dispatch(changeLang(lang));
    i18next.changeLanguage(lang);
  };

  return (
    <Group gap="xs" justify="center">
      {LANGUAGES.map(({ code, label }) => (
        <UnstyledButton key={code} onClick={handleLangChange(code)}>
          <Text
            component="span"
            size="sm"
            c={lang === code ? 'white' : 'dimmed'}
            fw={500}
            className={styles.button}>
            {label}
          </Text>
        </UnstyledButton>
      ))}
    </Group>
  );
};

export default LanguageSwitcher;

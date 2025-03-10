import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

const fallbackLng = ['en'];
const availableLanguages = ['en', 'ru'];

const options = {
  // order and from where user language should be detected
  order: ['navigator', 'htmlTag', 'path', 'subdomain'],

  // keys or params to lookup language from
  lookupQuerystring: 'lng',
  lookupCookie: 'i18next',
  lookupLocalStorage: 'i18nextLng',
  lookupFromPathIndex: 0,
  lookupFromSubdomainIndex: 0,

  // cache user language on
  caches: ['localStorage', 'cookie'],
  excludeCacheFor: ['cimode'], // languages to not persist (cookie, localStorage)

  // optional expire and domain for set cookie
  cookieMinutes: 10,
  cookieDomain: 'myDomain',

  // optional htmlTag with lang attribute, the default is:
  htmlTag: document.documentElement,

  // only detect languages that are in the whitelist
  checkWhitelist: true,
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath:
        process.env.NODE_ENV === 'production'
          ? '/billionstraker-fe/locales/{{lng}}/{{ns}}.json'
          : '/locales/{{lng}}/{{ns}}.json',
    },
    lng: localStorage.getItem('i18nextLng') || 'en',
    fallbackLng,
    whitelist: availableLanguages,
    detection: options,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;

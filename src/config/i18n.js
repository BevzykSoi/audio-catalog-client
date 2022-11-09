import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from 'locales/en.json';
import ua from 'locales/ua.json';

i18n.use(initReactI18next).init({
  debug: true,
  resources: {
    en,
    ua,
  },
  lng: 'ua',
  fallbackLng: 'en',
});

export default i18n;

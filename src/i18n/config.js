import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './locales/en/translations.json'

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  lng: 'en',
  resources: {
    en: {
      translations: enTranslation
    },
  },
  ns: ['translations'],
  defaultNS: 'translations'
});

i18n.languages = ['en'];

export default i18n;
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './locale/en.json';

i18n.use(initReactI18next).init();

export const setDefaultTranslation = () => {
  i18n.addResourceBundle('en', 'translation', enTranslation);
  i18n.changeLanguage('en');
};

export default i18n;

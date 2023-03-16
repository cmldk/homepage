import React from 'react';
import { useTranslation } from 'react-i18next';
import Dropdown from '../../Base/Dropdown/Dropdown';
import { useData } from '../../../DataProvider';

function LanguageSwitcher() {
  const { languages } = useData();
  const { i18n } = useTranslation();

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
  };

  const getItems = () => {
    const items = [];

    languages.forEach((lang) => {
      items.push({
        value: lang,
        onClick: () => handleLanguageChange(lang),
        selected: i18n.language === lang,
      });
    });
    return items;
  };

  return (
    <>{languages.length > 1 && <Dropdown items={getItems()}></Dropdown>}</>
  );
}

export default LanguageSwitcher;

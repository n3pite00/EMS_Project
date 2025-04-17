import React from 'react';
import { useTranslation } from 'react-i18next';

function Language() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <button onClick={() => changeLanguage('fi')}>Suomi</button>
      <button onClick={() => changeLanguage('en')}>English</button>
    </div>
  );
}

export default Language;

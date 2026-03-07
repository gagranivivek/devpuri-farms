'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import en from '@/i18n/en.json';
import hi from '@/i18n/hi.json';

const LanguageContext = createContext();

const translations = {
  en,
  hi
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Get language from localStorage or browser
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && Object.keys(translations).includes(savedLanguage)) {
      setLanguage(savedLanguage);
    } else {
      // Auto-detect from browser
      const browserLang = navigator.language.split('-')[0];
      if (Object.keys(translations).includes(browserLang)) {
        setLanguage(browserLang);
      } else {
        setLanguage('en');
      }
    }
    setIsLoaded(true);
  }, []);

  const changeLanguage = (lang) => {
    if (Object.keys(translations).includes(lang)) {
      setLanguage(lang);
      localStorage.setItem('language', lang);
    }
  };

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key; // Return key if translation not found
  };

  if (!isLoaded) {
    return null;
  }

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}

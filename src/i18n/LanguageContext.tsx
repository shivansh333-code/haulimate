import React, { createContext, useContext, useState, useEffect } from 'react';
import hiDict from './hi.json';
import enDict from './en.json';
import { Language } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (keyPath: string, defaultVal?: string) => string;
}

const dictionaries: Record<Language, any> = {
  hi: hiDict,
  en: enDict,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('haulimate_lang') as Language;
    if (saved === 'hi' || saved === 'en') return saved;
    if (typeof navigator !== 'undefined' && navigator.language && navigator.language.toLowerCase().startsWith('hi')) {
      return 'hi';
    }
    return 'en';
  });

  useEffect(() => {
    localStorage.setItem('haulimate_lang', language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    setLanguageState(prev => (prev === 'hi' ? 'en' : 'hi'));
  };

  const t = (keyPath: string, defaultVal?: string): string => {
    const keys = keyPath.split('.');
    let current: any = dictionaries[language];
    for (const k of keys) {
      if (current && typeof current === 'object' && k in current) {
        current = current[k];
      } else {
        // Fallback to English dictionary
        let fallbackCurrent: any = dictionaries.en;
        for (const fbK of keys) {
          if (fallbackCurrent && typeof fallbackCurrent === 'object' && fbK in fallbackCurrent) {
            fallbackCurrent = fallbackCurrent[fbK];
          } else {
            return defaultVal || keyPath;
          }
        }
        return typeof fallbackCurrent === 'string' ? fallbackCurrent : defaultVal || keyPath;
      }
    }
    return typeof current === 'string' ? current : defaultVal || keyPath;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

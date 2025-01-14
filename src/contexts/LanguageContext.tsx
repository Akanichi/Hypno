import React, { createContext, useContext, useState, useCallback } from 'react';
import { Language, translations, Translation } from '../services/languageConfig';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translation;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Try to get the language from localStorage, default to 'en'
    const savedLang = localStorage.getItem('language') as Language;
    return savedLang || 'en';
  });

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    // Update document direction for RTL support
    document.dir = lang === 'ar' ? 'rtl' : 'ltr';
    // Update document language
    document.documentElement.lang = lang;
  }, []);

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language],
    dir: language === 'ar' ? 'rtl' : 'ltr' as const,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Language selector component
export const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value as Language)}
      style={{
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        backgroundColor: 'transparent',
        cursor: 'pointer',
      }}
    >
      <option value="en">English</option>
      <option value="fr">Français</option>
      <option value="ar">العربية</option>
    </select>
  );
}; 
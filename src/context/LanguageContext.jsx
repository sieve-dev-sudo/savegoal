import { createContext, useContext, useCallback, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { translations } from '../constants/translations';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useLocalStorage('savegoal:language', 'kh');

  useEffect(() => {
    document.documentElement.lang = language === 'kh' ? 'km' : 'en';
  }, [language]);

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === 'kh' ? 'en' : 'kh'));
  }, [setLanguage]);

  const t = translations[language] || translations.kh;

  const value = {
    language,
    isEnglish: language === 'en',
    toggleLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

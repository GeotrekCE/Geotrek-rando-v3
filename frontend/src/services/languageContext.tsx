import { createContext, useContext, useState } from 'react';
import { getHeaderConfig } from 'modules/header/utills';

interface LanguageInterface {
  language: string;
  setLanguage: (language: string) => void;
}
const LanguageContext = createContext<LanguageInterface>({} as LanguageInterface);

export function LanguageWrapper({ children }: { children: any }) {
  const { menu: languageConfig } = getHeaderConfig();
  let initialLangugage = languageConfig.defaultLanguage;
  if (typeof navigator !== 'undefined') {
    const navigatorLanguage = navigator.language.split('-')[0];
    initialLangugage = languageConfig.supportedLanguages.includes(navigatorLanguage)
      ? navigatorLanguage
      : initialLangugage;
  }
  const [language, setLanguage] = useState(initialLangugage);
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguageContext() {
  return useContext(LanguageContext);
}

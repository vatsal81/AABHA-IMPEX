import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import gu from './locales/gu.json';
import hi from './locales/hi.json';
import ar from './locales/ar.json';
import ur from './locales/ur.json';
import ml from './locales/ml.json';
import ta from './locales/ta.json';
import bn from './locales/bn.json';
import tl from './locales/tl.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      gu: { translation: gu },
      hi: { translation: hi },
      ar: { translation: ar },
      ur: { translation: ur },
      ml: { translation: ml },
      ta: { translation: ta },
      bn: { translation: bn },
      tl: { translation: tl }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'cookie', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage']
    }
  });

export default i18n;

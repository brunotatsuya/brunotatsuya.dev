import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import en from './languages/en.json'
import ptBR from './languages/pt-br.json'

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    showSupportNotice: false,
    fallbackLng: 'en',
    supportedLngs: ['en', 'pt-BR'],
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: { translation: en },
      'pt-BR': { translation: ptBR },
    },
    detection: {
      order: ['localStorage'],
      caches: ['localStorage'],
    },
  })

export default i18next

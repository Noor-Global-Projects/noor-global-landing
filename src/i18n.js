import { createI18n } from 'vue-i18n'
import en from './lang/en.json'
import ar from './lang/ar.json'
import ru from './lang/ru.json'
import uz from './lang/uz.json'

const i18n = createI18n({
  legacy: false,
  locale: 'en', // default locale
  fallbackLocale: 'en',
  messages: {
    en,
    ar,
    ru,
    uz
  }
})

export default i18n


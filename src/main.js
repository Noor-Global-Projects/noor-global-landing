import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import AOS from 'aos'
import 'aos/dist/aos.css'
import i18n from './i18n'

try {
  const saved = localStorage.getItem('noor-locale')
  if (saved && ['en', 'ar', 'ru', 'uz'].includes(saved)) {
    i18n.global.locale.value = saved
  }
} catch {
  /* ignore */
}

const initialLocale = i18n.global.locale.value
document.documentElement.setAttribute('dir', initialLocale === 'ar' ? 'rtl' : 'ltr')
document.documentElement.setAttribute('lang', initialLocale)

const app = createApp(App)
app.use(i18n)
app.mount('#app')

// Initialize AOS with enhanced settings for Framer-like animations
AOS.init({
  duration: 1000,
  easing: 'ease-out',
  once: false,
  mirror: true,
  offset: 50,
  delay: 0,
  anchorPlacement: 'top-bottom',
})


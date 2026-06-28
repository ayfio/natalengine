// src/i18n/index.js
import { ru } from './ru.js';

const translations = {
  en: {},  // Пустой — fallback к ключам
  ru
};

let currentLang = 'ru';

/**
 * Установить язык приложения
 * @param {string} lang - Код языка ('ru' | 'en')
 */
export function setLanguage(lang) {
  if (translations[lang]) {
    currentLang = lang;
    document.documentElement.lang = lang;
    localStorage.setItem('natalengine-lang', lang);
    updatePageText();
    // Dispatch event for components to react
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
  }
}

/**
 * Получить перевод по ключу
 * @param {string} path - Ключ в формате 'section.key'
 * @param {Object} params - Параметры для подстановки {name: 'value'}
 * @returns {string} Переведённая строка или ключ, если не найдено
 */
export function t(path, params = {}) {
  const keys = path.split('.');
  let value = translations[currentLang];
  
  for (const key of keys) {
    value = value?.[key];
    if (value === undefined) {
      // Fallback к английскому, затем к ключу
      const enValue = translations.en;
      if (enValue) {
        let en = enValue;
        for (const k of keys) {
          en = en?.[k];
          if (en !== undefined) return _interpolate(en, params);
        }
      }
      return path;
    }
  }
  
  return _interpolate(value, params);
}

/**
 * Подстановка параметров в строку: "Привет, {name}!" → "Привет, Алексей!"
 */
function _interpolate(str, params) {
  if (typeof str !== 'string' || Object.keys(params).length === 0) {
    return str;
  }
  return str.replace(/\{(\w+)\}/g, (_, key) => params[key] || `{${key}}`);
}

/**
 * Обновить текст на странице по data-i18n атрибутам
 */
export function updatePageText() {
  // Текст элементов
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const params = el.dataset.i18nParams ? JSON.parse(el.dataset.i18nParams) : {};
    const translated = t(key, params);
    if (translated) {
      el.textContent = translated;
    }
  });
  
  // Placeholder'ы
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    const translated = t(key);
    if (translated) {
      el.placeholder = translated;
    }
  });
  
  // Title'ы
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.dataset.i18nTitle;
    const translated = t(key);
    if (translated) {
      el.title = translated;
    }
  });
  
  // Aria-label'ы
  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    const key = el.dataset.i18nAria;
    const translated = t(key);
    if (translated) {
      el.setAttribute('aria-label', translated);
    }
  });
}

/**
 * Инициализация i18n при загрузке
 */
export function initI18n() {
  // 1. Проверить сохранённый язык
  const saved = localStorage.getItem('natalengine-lang');
  if (saved && translations[saved]) {
    currentLang = saved;
  }
  // 2. Или определить по браузеру
  else {
    const browserLang = navigator.language?.split('-')[0];
    if (translations[browserLang]) {
      currentLang = browserLang;
    }
  }
  
  // 3. Применить язык
  document.documentElement.lang = currentLang;
  
  // 4. Обновить текст на странице
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updatePageText);
  } else {
    updatePageText();
  }
}

// Авто-инициализация (если модуль загружен в браузере)
if (typeof window !== 'undefined') {
  initI18n();
}

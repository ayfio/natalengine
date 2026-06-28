// src/i18n/ru.js
export const ru = {
  // 🧭 Навигация
  nav: {
    calculator: 'Калькулятор',
    docs: 'Документация',
    mcp: 'MCP',
    github: 'GitHub'
  },

  // 🏷️ Заголовки
  title: 'NatalEngine — Калькулятор натальных карт',
  subtitle: 'Расчёт карт Западной и Ведической астрологии, Дизайна Человека и Gene Keys',
  tagline: {
    astrology: 'Астрология',
    vedic: 'Ведика',
    humandesign: 'Дизайн Человека',
    genekeys: 'Gene Keys'
  },

  // 📋 Форма ввода
  birthInfo: 'Данные рождения',
  date: 'Дата',
  time: 'Время',
  location: 'Место рождения',
  searchCity: 'Найдите город...',
  coordinates: 'Координаты',
  latitude: 'Широта',
  longitude: 'Долгота',
  timezone: 'Смещение UTC',
  enterCoords: 'Ввести координаты вручную',
  calculate: 'Рассчитать',

  // 💾 Профили
  saveProfile: 'Сохранить профиль',
  profileName: 'Название профиля (например: Я, Партнёр)',
  savedProfiles: 'Сохранённые профили',
  loadProfile: 'Загрузить профиль',
  deleteProfile: 'Удалить профиль',

  // 📊 Результаты
  results: 'Результаты',
  copyJSON: 'Копировать JSON',
  copied: 'Скопировано!',
  tabs: {
    astrology: 'Астрология',
    vedic: 'Ведика',
    humandesign: 'Дизайн Человека',
    genekeys: 'Gene Keys'
  },

  // 🧬 Human Design — типы и описания
  hd: {
    types: {
      'Generator': 'Генератор',
      'Manifesting Generator': 'Манифестирующий Генератор',
      'Projector': 'Проектор',
      'Manifestor': 'Манифестор',
      'Reflector': 'Рефлектор'
    },
    strategies: {
      'Wait to Respond': 'Ждать отклика',
      'Inform then Act': 'Информировать, затем действовать',
      'Wait for Invitation': 'Ждать приглашения',
      'Wait a Lunar Cycle': 'Выждать лунный цикл (28 дней)'
    },
    notSelf: {
      'Frustration': 'Фрустрация',
      'Anger': 'Гнев',
      'Bitterness': 'Горечь',
      'Disappointment': 'Разочарование'
    },
    authorities: {
      'Emotional': 'Эмоциональный',
      'Sacral': 'Сакральный',
      'Splenic': 'Селезёночный',
      'Ego': 'Эго-авторитет',
      'Lunar': 'Лунный',
      'Self-Projected': 'Самовыраженный',
      'None': 'Без авторитета'
    },
    centers: {
      'head': 'Голова',
      'ajna': 'Аджна',
      'throat': 'Горло',
      'g': 'G-центр',
      'heart': 'Сердце/Эго',
      'sacral': 'Сакрал',
      'solarPlexus': 'Солнечное сплетение',
      'spleen': 'Селезёнка',
      'root': 'Корень'
    },
    definitions: {
      'Single': 'Одно определение',
      'Split': 'Разделённое',
      'Triple': 'Тройное',
      'Quadruple': 'Четверное',
      'Undefined': 'Без определения'
    },
    profiles: {
      '1/3': '1/3 — Исследователь/Мученик',
      '2/4': '2/4 — Отшельник/Опортунист',
      '3/6': '3/6 — Мученик/Ролевая модель',
      '4/1': '4/1 — Опортунист/Исследователь',
      '5/1': '5/1 — Еретик/Исследователь',
      '6/2': '6/2 — Ролевая модель/Отшельник'
    }
  },

  // 🔮 Астрология
  astrology: {
    signs: {
      'Aries': 'Овен', 'Taurus': 'Телец', 'Gemini': 'Близнецы',
      'Cancer': 'Рак', 'Leo': 'Лев', 'Virgo': 'Дева',
      'Libra': 'Весы', 'Scorpio': 'Скорпион', 'Sagittarius': 'Стрелец',
      'Capricorn': 'Козерог', 'Aquarius': 'Водолей', 'Pisces': 'Рыбы'
    },
    planets: {
      'Sun': 'Солнце', 'Moon': 'Луна', 'Mercury': 'Меркурий',
      'Venus': 'Венера', 'Mars': 'Марс', 'Jupiter': 'Юпитер',
      'Saturn': 'Сатурн', 'Uranus': 'Уран', 'Neptune': 'Нептун',
      'Pluto': 'Плутон', 'North Node': 'Северный узел',
      'South Node': 'Южный узел', 'Chiron': 'Хирон'
    },
    aspects: {
      'conjunction': 'Соединение (0°)',
      'opposition': 'Оппозиция (180°)',
      'trine': 'Трин (120°)',
      'square': 'Квадрат (90°)',
      'sextile': 'Секстиль (60°)',
      'quincunx': 'Квинконс (150°)'
    },
    houses: 'Дома',
    elements: {
      'Fire': 'Огонь', 'Earth': 'Земля', 'Air': 'Воздух', 'Water': 'Вода'
    },
    modalities: {
      'Cardinal': 'Кардинальный', 'Fixed': 'Фиксированный', 'Mutable': 'Мутабельный'
    }
  },

  // 🕉️ Ведика (Jyotish)
  vedic: {
    ayanamsha: 'Аянамша',
    nakshatras: 'Накшатры',
    dashas: 'Даши',
    signs: {
      'Aries': 'Меша (Овен)', 'Taurus': 'Вришаба (Телец)',
      'Gemini': 'Митхуна (Близнецы)', 'Cancer': 'Карката (Рак)',
      'Leo': 'Симха (Лев)', 'Virgo': 'Канья (Дева)',
      'Libra': 'Тула (Весы)', 'Scorpio': 'Вришчика (Скорпион)',
      'Sagittarius': 'Дхану (Стрелец)', 'Capricorn': 'Макара (Козерог)',
      'Aquarius': 'Кумбха (Водолей)', 'Pisces': 'Мина (Рыбы)'
    }
  },

  // 🔑 Gene Keys
  genekeys: {
    frequencies: 'Частоты',
    sequences: 'Последовательности',
    shadows: 'Тень',
    gifts: 'Дар',
    siddhis: 'Сиддхи'
  },

  // ♾️ Совместимость
  compatibility: {
    title: '❤ Совместимость карт',
    subtitle: 'Сравнение карт по астрологии, Дизайну Человека и Gene Keys',
    beta: 'Бета-функция — анализ совместимости находится в разработке.',
    feedback: 'Обратная связь приветствуется на GitHub',
    personA: 'Человек A',
    personB: 'Человек B',
    savedProfile: 'Сохранённый профиль',
    enterInfo: 'Ввести данные',
    currentChart: 'Текущая карта (выше)',
    selectProfile: 'Выберите профиль...',
    compareAstrology: '☉ Астрология',
    compareHd: '◎ Дизайн Человека',
    compareGk: '✦ Gene Keys',
    compareBtn: 'Сравнить карты',
    analyzing: 'Анализирую...',
    noProfiles: 'Пока нет сохранённых профилей. Рассчитайте карту выше и нажмите "Сохранить профиль", или используйте "Ввести данные" для сравнения без сохранения.',
    resultsTitle: 'Результаты совместимости',
    harmony: 'Гармония',
    challenge: 'Вызов',
    neutral: 'Нейтрально'
  },

  // ⚙️ Интерфейс
  ui: {
    loading: 'Рассчитываю...',
    error: 'Ошибка',
    success: 'Готово',
    darkMode: 'Тёмная тема',
    lightMode: 'Светлая тема',
    export: 'Экспорт',
    share: 'Поделиться',
    toggleLanguage: 'Сменить язык',
    close: 'Закрыть',
    cancel: 'Отмена',
    confirm: 'Подтвердить',
    delete: 'Удалить',
    search: 'Поиск...'
  },

  // 🌍 Геокодинг
  geocoding: {
    searching: 'Поиск...',
    noResults: 'Ничего не найдено',
    selectLocation: 'Выберите местоположение',
    error: 'Не удалось определить координаты'
  },

  // 📄 Футер
  footer: 'NatalEngine — проект с открытым исходным кодом. Лицензия MIT.'
};

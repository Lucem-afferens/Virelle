# Дизайн-система Chill Out Lingerie

Этот документ описывает дизайн-систему проекта Chill Out Lingerie и должен использоваться при всех изменениях и разработке новых компонентов.

## 1. ЦВЕТОВАЯ ПАЛИТРА

### Основные цвета

**Акцентные цвета:**
- Золотой акцент: `#d4af37`
- Розовый светлый (Light Pink): `#ffb6c1`
- Розовый (Pink): `#ffc0cb`

**Фоновые цвета:**
- Charcoal (основной фон): `#2b2b2b`
- Neutral-900 (темный фон): `#171717`
- Neutral-800 (средний фон): `#262626`

**Цвета текста:**
- Основной текст: `#ffffff`
- Второстепенный текст: `#d1d5db`
- Подзаголовки: `#d5c4cc`
- Темный текст (на светлом фоне): `#2b2b2b`

### Градиенты

**Основной градиент (золотой → розовый):**
```scss
background: linear-gradient(135deg, #d4af37 0%, #ffb6c1 50%, #ffc0cb 100%);
```

**Обратный градиент (для hover состояний):**
```scss
background: linear-gradient(135deg, #ffc0cb 0%, #ffb6c1 50%, #d4af37 100%);
```

**Градиент для текста (с text-clip):**
```scss
background: linear-gradient(135deg, #d4af37 0%, #ffb6c1 50%, #ffc0cb 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
```

**Правило:** Все градиенты должны использовать угол 135deg и переходы между золотым и розовыми оттенками.

### Система тем (Theming)

Проект поддерживает две темы: **темную (по умолчанию)** и **светлую**.

**Темная тема (по умолчанию):**
- Фоновые цвета: темные оттенки (#2b2b2b, #171717, #262626)
- Цвета текста: светлые оттенки (#ffffff, #d1d5db, #d5c4cc)
- Применяется через `:root` без дополнительных атрибутов

**Светлая тема:**
- Фоновые цвета: светлые оттенки (#fafafa, #ffffff, #f5f5f5)
- Цвета текста: темные оттенки (#1a1a1a, #4a4a4a, #6a6a6a)
- Применяется через атрибут `data-theme="light"` на элементе `<html>`
- Переключение через функцию `toggleTheme()` в JavaScript
- Предпочтение пользователя сохраняется в `localStorage`

**CSS переменные для цветов:**
Все цвета определены как CSS переменные в `_variables.scss`:
- `--color-bg-primary`, `--color-bg-secondary`, `--color-bg-tertiary` - фоновые цвета
- `--color-text-primary`, `--color-text-secondary`, `--color-text-tertiary`, `--color-text-inverse`, `--color-text-accent`, `--color-text-muted` - цвета текста
- `--color-gold`, `--color-pink-light`, `--color-pink` - акцентные цвета (одинаковые для обеих тем)
- `--color-glass-bg`, `--color-glass-border` - цвета для glassmorphism
- `--color-shadow-pink`, `--color-shadow-pink-hover`, `--color-shadow-pink-strong`, `--color-shadow-black` - цвета теней
- `--color-overlay-bg`, `--color-overlay-bg-light` - цвета overlay
- `--color-border-pink`, `--color-border-pink-light` - цвета границ
- `--color-carousel-bg`, `--color-carousel-bg-hover`, `--color-carousel-border`, `--color-carousel-shadow`, `--color-carousel-shadow-hover`, `--color-carousel-shadow-strong` - цвета для карусели
- `--gradient-bg-section`, `--gradient-bg-vk-notice`, `--gradient-bg-menu`, `--gradient-hero-overlay` - градиенты для фонов

**Правило:** Всегда используй CSS переменные вместо жестко заданных цветов. Акцентные цвета (золотой, розовый) остаются одинаковыми в обеих темах.

**Переключатель темы:**
- Кнопка переключения темы находится в header (`.header-actions`)
- Иконка: `fa-sun` для темной темы, `fa-moon` для светлой
- Функция: `toggleTheme()` в `script.js`
- Сохранение: автоматическое сохранение в `localStorage`

## 2. ТИПОГРАФИКА

### Шрифтовые семейства

**Основной шрифт (Sans-serif):**
- `'Montserrat', sans-serif`
- Доступные веса: 200, 300, 400, 500, 600
- Используется для: основного текста, кнопок, навигации, форм

**Заголовочный шрифт (Serif):**
- `'Cormorant Garamond', serif`
- Доступные веса: 300, 400, 500, 600, 700
- Используется для: заголовков, логотипа, акцентного текста

### Размеры шрифтов

**Заголовки:**
- `.section-title`: `4rem` (64px) - крупные заголовки секций
- `.hero-title`: `6rem` (96px) - главный заголовок hero секции (desktop), адаптивный на мобильных
- `.hero-subtitle`: `4rem` (64px) - подзаголовок hero секции (desktop), адаптивный на мобильных
- Средние заголовки: `1.875rem` (30px) - для карточек и подсекций
- Малые заголовки: `1.5rem` (24px) - для второстепенных заголовков

**Текст:**
- Основной текст: `1.125rem` (18px)
- Подзаголовки: `1.25rem` (20px)
- Малый текст: `0.875rem` (14px)
- Очень малый: `0.75rem` (12px)

**Правило:** Используй clamp() для адаптивных размеров шрифтов на мобильных устройствах.

### Типографические стили

**Заголовки секций:**
- Семейство: `'Cormorant Garamond', serif`
- Вес: `300` (light)
- Цвет: градиент (золотой → розовый с text-clip)
- Line-height: `1.2`

**Подзаголовки секций:**
- Семейство: `'Montserrat', sans-serif`
- Вес: `300` (light)
- Цвет: `var(--color-text-tertiary)` (используй переменную)
- Размер: `1.25rem`
- Line-height: `1.6`

**Основной текст:**
- Семейство: `'Montserrat', sans-serif`
- Вес: `300` или `400`
- Цвет: `var(--color-text-primary)` или `var(--color-text-secondary)` (используй переменные)
- Размер: `1.125rem`
- Line-height: `1.6`

## 3. СИСТЕМА ОТСТУПОВ (SPACING)

### CSS Переменные (определены в `_variables.scss`)

```scss
--spacing-xs: 0.25rem;    /* 4px */
--spacing-sm: 0.5rem;     /* 8px */
--spacing-md: 1rem;       /* 16px */
--spacing-lg: 1.5rem;     /* 24px */
--spacing-xl: 2rem;       /* 32px */
--spacing-2xl: 3rem;      /* 48px */
--spacing-3xl: 4rem;      /* 64px */
--spacing-4xl: 6rem;      /* 96px */
```

### Специальные отступы

**Секции:**
- Desktop: `--section-padding-y: 4rem` (64px)
- Mobile: `--section-padding-y-mobile: 2.5rem` (40px)

**Карточки:**
- Gap: `--card-gap: 2rem` (desktop), `--card-gap-mobile: 1.25rem` (mobile)
- Padding: `--card-padding: 1.5rem`

**Toolbar:**
- Padding: `--toolbar-padding: 1.5rem`
- Gap: `--toolbar-gap: 1.5rem`

**Правило:** Всегда используй CSS переменные для отступов вместо жестко заданных значений. Для секций используй `var(--section-padding-y)`.

### Контейнеры

**Основной контейнер:**
- Max-width: `1440px`
- Padding: `0 2rem` (desktop), `0 1.5rem` (tablet), `0 1rem` (mobile)
- Margin: `0 auto`

**Правило:** Все контентные блоки должны быть внутри `.container`. Для специальных секций (например, shop-by-category) может использоваться `.shop-category-container` с теми же параметрами.

## 4. КОМПОНЕНТЫ

### Кнопки

**Базовый класс:** `.cta-button`

**Варианты:**
- `.btn-outline` - контурная кнопка
- `.btn-solid` - заливка с градиентом

**Стили кнопок:**
```scss
// Базовые свойства
padding: 1rem 3rem;
border-radius: 12px;
font-family: 'Montserrat', sans-serif;
font-size: 0.875rem;
font-weight: 500;
letter-spacing: 0.1em;
transition: all 0.3s ease;
```

**Outline кнопка:**
- Border: `2px solid #ffb6c1`
- Цвет текста: `#ffb6c1`
- Фон: `transparent`
- Hover: градиентный фон, цвет текста `#2b2b2b`

**Solid кнопка:**
- Фон: градиент (золотой → розовый)
- Цвет текста: `#2b2b2b`
- Hover: обратный градиент, тень

**Правило:** Все кнопки должны иметь псевдоэлемент `::before` для ripple эффекта при hover. Текст кнопки всегда обернут в `<span>` с `z-index: 10` для правильного отображения поверх ripple эффекта.

**Дополнительные кнопки:**
- `.btn-vk` - кнопка для ВКонтакте с градиентным фоном
- `.btn-vk-large` - большая кнопка ВКонтакте для секции vk-notice
- `.quick-view-btn` - кнопка быстрого просмотра в overlay карточек товаров

### Карточки товаров

**Базовый класс:** `.product-card`

**Стили:**
- Border-radius: `8px`
- Фон: `transparent`
- Hover: `transform: translateY(-8px)`
- Тень при hover: `0 20px 40px rgba(0, 0, 0, 0.3)`
- Transition: `transform 0.3s ease, box-shadow 0.3s ease`

**Image wrapper:**
- Высота: `24rem` (desktop)
- Border-radius: `8px`
- Overflow: `hidden`
- Фон: `#262626`
- Hover на карточке: изображение `scale(1.1)`, transition `0.5s ease`

**Overlay:**
- Градиент: `linear-gradient(to top, rgba(43, 43, 43, 0.8), transparent)`
- Opacity: `0` по умолчанию, `1` при hover
- Transition: `opacity 0.3s ease`

**Правило:** На тач-устройствах overlay должен быть всегда видим с opacity `1` и более светлым градиентом. Кнопка быстрого просмотра на тач-устройствах отображается как текст с подчеркиванием без фона.

**Цена товара:**
- Класс: `.product-price`
- Font-size: `1.5rem`
- Font-weight: `700`
- Font-family: `'Montserrat', sans-serif`
- Градиентный текст (золотой → розовый) с анимацией `priceGradient` (4s ease infinite)
- Background-size: `200% 200%` для плавной анимации градиента
- Letter-spacing: `0.02em`
- При hover на карточке: `transform: scale(1.05)`

**Название и описание товара:**
- `.product-name` / `.product-title`: размер `1.25rem`, семейство `'Cormorant Garamond'`, вес `500`, цвет `var(--color-text-primary)`, ограничение 2 строки через `line-clamp`
- `.product-desc` / `.product-description`: размер `0.9375rem`, семейство `'Montserrat'`, вес `400`, цвет `var(--color-text-secondary)`, ограничение 2 строки

### Badges (Бейджи)

**Базовый класс:** `.product-badge`

**Стили:**
- Position: `absolute`
- Top: `1rem`, Left: `1rem`
- Padding: `0.375rem 0.875rem`
- Border-radius: `20px` (округлый)
- Font-size: `0.75rem`
- Font-weight: `700`
- Letter-spacing: `0.1em`
- Text-transform: `uppercase`
- Backdrop-filter: `blur(10px)`
- Анимация: `badgeAppear 0.5s cubic-bezier(0.4, 0, 0.2, 1)`

**Варианты:**
- `.badge-new` - градиентный фон (золотой → розовый), цвет текста `var(--color-text-inverse)`
- `.bestseller` или `.badge-bestseller` - красный градиентный фон (`#fb7185 → #f43f5e → #e11d48`), цвет текста `var(--color-text-primary)`
- `.badge-sale` - красный градиентный фон (`#dc2626 → #b91c1c → #991b1b`), цвет текста `var(--color-text-primary)`
- `.rating-badge` - для рейтингов с иконкой звезды

**Дополнительные стили badges:**
- Все badges имеют анимацию `badgeGradient` для плавного движения градиента (3s ease infinite)
- Box-shadow с несколькими слоями для глубины
- Backdrop-filter: `blur(10px)` для эффекта стекла
- При hover: `transform: scale(1.05)` и усиленная тень

**Правило:** Все badges должны использовать градиентный фон с анимацией и иметь анимацию появления `badgeAppear`.

### Уведомления (Notifications)
**Базовый класс:** `.notification`

**Структура:**
- `.notification-overlay` - затемнение фона с blur эффектом
- `.notification-content` - контейнер уведомления с glassmorphism
- `.notification-icon` - круглая иконка с градиентным фоном
- `.notification-message` - контейнер для текста
  - `.notification-title` - заголовок уведомления
  - `.notification-text` - текст сообщения
- `.notification-close` - кнопка закрытия

**Стили:**
- Position: `fixed`, полный экран, `z-index: 2000`
- Overlay: градиентный фон с `backdrop-filter: blur(8px)`
- Content: glassmorphism с градиентным фоном, border-radius `20px`
- Max-width: `500px` (desktop), адаптивный на мобильных
- Transform анимация: `scale(0.9) translateY(30px)` → `scale(1) translateY(0)`
- Transition: `0.4s cubic-bezier(0.4, 0, 0.2, 1)`

**Варианты:**
- `.notification-success` - зеленый акцент для успешных операций
  - Иконка: `fa-check-circle`, цвет `#22c55e`
  - Фон иконки: градиент с зеленым оттенком
- `.notification-error` - красный акцент для ошибок
  - Иконка: `fa-triangle-exclamation`, цвет `#ef4444`
  - Фон иконки: градиент с красным оттенком

**Иконка:**
- Размер: `3.5rem × 3.5rem` (desktop), адаптивный на мобильных
- Фон: градиентный с glassmorphism эффектом
- Border: `1.5px solid` с цветом в зависимости от типа
- Анимация: `notificationIconPulse` (пульсация)

**Кнопка закрытия:**
- Размер: `2.5rem × 2.5rem`, минимум `44px × 44px` для доступности
- Фон: полупрозрачный розовый с glassmorphism
- Hover: увеличение масштаба и поворот на `90deg`
- Иконка: `fa-times`

**Правило:** Уведомления автоматически закрываются через 5 секунд (настраивается), но могут быть закрыты вручную через кнопку, клик на overlay или клавишу ESC. При открытии уведомления блокируется скролл body.

## 5. ЭФФЕКТЫ И АНИМАЦИИ

### Переходы (Transitions)

**Стандартные переходы:**
- Быстрый: `0.3s ease` - для большинства элементов
- Средний: `0.5s ease` - для изображений
- Медленный: `0.7s ease` - для крупных изображений

**Правило:** Используй `transition: all 0.3s ease` для интерактивных элементов, конкретные свойства для оптимизации производительности.

### Тени (Shadows)

**Малые тени:**
```scss
box-shadow: 0 4px 15px rgba(255, 182, 193, 0.3);
```

**Средние тени:**
```scss
box-shadow: 0 8px 25px rgba(255, 182, 193, 0.4);
```

**Крупные тени:**
```scss
box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
```

**Правило:** Розовые тени используются для акцентных элементов, черные - для карточек и подъемов.

### Анимации

**Bounce (для scroll индикатора):**
```scss
@keyframes bounce {
    0%, 100% { transform: translate(-50%, 0); }
    50% { transform: translate(-50%, 10px); }
}
```

**BadgeAppear (для badges):**
```scss
@keyframes badgeAppear {
    from {
        opacity: 0;
        transform: scale(0.8) translateY(-10px);
    }
    to {
        opacity: 1;
        transform: scale(1) translateY(0);
    }
}
```

**BadgeGradient (для анимации градиента в badges):**
```scss
@keyframes badgeGradient {
    0%, 100% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
}
```

**PriceGradient (для анимации градиента в ценах):**
```scss
@keyframes priceGradient {
    0%, 100% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
}
```

**FadeIn (для hero контента):**
```scss
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}
```

**ThemeIconRotate (для иконки переключения темы):**
```scss
@keyframes themeIconRotate {
    0% {
        transform: rotate(0deg);
        opacity: 1;
    }
    100% {
        transform: rotate(360deg);
        opacity: 1;
    }
}
```

**NotificationIconPulse (для иконки в уведомлениях):**
```scss
@keyframes notificationIconPulse {
    0%, 100% {
        transform: scale(1);
        opacity: 1;
    }
    50% {
        transform: scale(1.1);
        opacity: 0.9;
    }
}
```

**Правило:** Все анимации должны использовать cubic-bezier для плавности: `cubic-bezier(0.4, 0, 0.2, 1)` или `cubic-bezier(0.25, 0.46, 0.45, 0.94)` для более плавных переходов.

### Эффекты

**Glassmorphism:**
```scss
background: rgba(255, 192, 203, 0.08);
backdrop-filter: blur(20px);
border: 1px solid rgba(255, 182, 193, 0.15);
```

**Hover Lift:**
```scss
transform: translateY(-8px);
box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
```

**Правило:** Glassmorphism используется для header, модальных окон, overlay элементов, карточек отзывов.

**Ripple эффект (для кнопок):**
```scss
.cta-button::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: var(--color-shadow-pink);
    transform: translate(-50%, -50%);
    transition: width 0.6s ease, height 0.6s ease;
    z-index: 1;
}

.cta-button:hover::before {
    width: 200px;
    height: 200px;
}
```

## 6. LAYOUT СИСТЕМА

### Grid системы

**4 колонки (desktop):**
```scss
grid-template-columns: repeat(4, 1fr);
gap: 2rem;
```

**3 колонки (планшеты):**
```scss
grid-template-columns: repeat(3, 1fr);
gap: 1.5rem;
```

**2 колонки (мобильные):**
```scss
grid-template-columns: repeat(2, 1fr);
gap: 1.25rem;
```

**1 колонка (маленькие мобильные):**
```scss
grid-template-columns: 1fr;
```

**Правило:** Все grid layouts должны быть адаптивными с использованием media queries.

### Breakpoints (Точки перелома)

```scss
// Большие экраны
@media (min-width: 1400px) { }

// Планшеты landscape и маленькие ноутбуки
@media (max-width: 1399px) { }

// Планшеты и маленькие ноутбуки
@media (max-width: 1199px) { }

// Планшеты
@media (max-width: 1023px) { }

// Планшеты и большие телефоны
@media (max-width: 899px) { }

// Мобильные устройства
@media (max-width: 767px) { }

// Маленькие мобильные
@media (max-width: 639px) { }

// Очень маленькие мобильные
@media (max-width: 479px) { }
```

**Правило:** Используй mobile-first подход где возможно, но проект использует desktop-first с max-width media queries.

**Адаптивные изменения:**
- Hero заголовки: `6rem` → `4.5rem` → `3.75rem` (desktop → tablet → mobile)
- Hero подзаголовки: `4rem` → `3.5rem` → `2.5rem`
- Section titles: `4rem` → `3rem` → `2.5rem`
- Product grid: `4 колонки` → `3 колонки` → `2 колонки` → `1 колонка`
- Header: padding уменьшается на мобильных, логотип масштабируется
- Container padding: `2rem` → `1.5rem` → `1rem` (desktop → tablet → mobile)
- Уведомления: max-width `500px` → `90%` → `95%` (desktop → tablet → mobile), размеры иконок и текста адаптируются

## 7. ДОСТУПНОСТЬ (ACCESSIBILITY)

### Обязательные требования

1. **Skip Link:** Всегда присутствует для навигации к основному контенту
2. **ARIA атрибуты:** Используются для модальных окон, меню, форм
3. **Focus States:** Все интерактивные элементы имеют видимый focus outline
4. **Контрастность:** Минимальный контраст 4.5:1 для текста
5. **Screen Reader:** Класс `.sr-only` для скрытого текста

### Focus States

**Стандартный focus outline:**
```scss
outline: 2px solid #d4af37;
outline-offset: 2px;
```

**Правило:** Все кнопки, ссылки и интерактивные элементы должны иметь видимый focus state.

## 8. СТРУКТУРА ФАЙЛОВ

### Организация стилей

```
src/styles/
├── style.scss (главный файл - импортирует base и blocks)
├── base/
│   ├── _variables.scss (CSS переменные)
│   ├── _reset.scss (reset стили)
│   ├── _base.scss (агрегатор base)
│   ├── _utilities.scss (утилиты)
│   └── _accessibility.scss (доступность)
└── blocks/
    ├── _blocks.scss (агрегатор blocks)
    ├── _header.scss
    ├── _menu.scss
    ├── _hero.scss
    ├── _buttons.scss
    ├── _sections.scss
    ├── _products.scss
    ├── _catalog.scss
    ├── _footer.scss
    └── _responsive.scss
```

**Правило:** Новые стили должны добавляться в соответствующие файлы блоков, общие стили - в base/_utilities.scss.

## 9. СЕКЦИИ САЙТА

### Hero секция
**ID:** `#hero`
- Высота: `100vh` / `100svh`, минимум `600px`
- Фоновые изображения: два изображения с переключением через opacity в зависимости от темы
  - `.hero-image-dark` - для темной темы (opacity: 1 по умолчанию)
  - `.hero-image-light` - для светлой темы (opacity: 0 по умолчанию)
  - Переключение: `[data-theme="light"]` меняет opacity изображений
  - Transition: `opacity 0.15s ease-in-out`
- Overlay: градиентный overlay с `var(--gradient-hero-overlay)`
- Контент: центрированный, с анимацией `fadeIn`
- Заголовок: `.hero-title` с градиентным текстом, размер `6rem` (desktop)
- Подзаголовок: `.hero-subtitle` размер `4rem` (desktop)
- Текст: `.hero-text` размер `1.25rem`, цвет `var(--color-text-accent)`
- Кнопки: `.hero-buttons` с двумя CTA кнопками
- Scroll индикатор: `.hero-scroll` с иконкой chevron-down и анимацией `bounce`

### VK Notice секция
**ID:** `#vk-notice`
- Фон: `var(--gradient-bg-vk-notice)`
- Границы: верхняя и нижняя с `var(--color-border-pink)`
- Содержит: иконку ВКонтакте, текст и большую кнопку перехода в VK
- Padding: `4rem 0`

### Value Proposition секция
**ID:** `#value-proposition`
- Grid: 3 колонки (desktop), 2 колонки (tablet), 1 колонка (mobile)
- Элементы: иконка, заголовок, описание
- Hover эффект: подъем элемента (`translateY(-8px)`)

### Featured Collection секция
**ID:** `#featured-collection`
- Grid: 4 колонки (desktop), адаптивный
- Фоновые декоративные элементы: `.featured-bg-1`, `.featured-bg-2`
- Содержит: сетку товаров с карточками

### Bestsellers секция
**ID:** `#bestsellers`
- Карусель: горизонтальная прокрутка с кнопками управления
- Обертка: `.carousel-wrapper` - позиционирование относительно для стрелок
- Контейнер: `.carousel-container` - flex контейнер с `overflow-x: auto`
- Стрелки: `.carousel-btn` - круглые кнопки с glassmorphism эффектом
  - `.carousel-btn-left` - слева, `.carousel-btn-right` - справа
  - Размер: `3.5rem × 3.5rem`
  - Фон: `var(--color-carousel-bg)` с backdrop-filter
  - Граница: `2px solid var(--color-carousel-border)`
  - Opacity: `0.7` по умолчанию, `1` при hover на обертке
  - Hover: градиентный фон, увеличение масштаба `scale(1.1)`
- Элементы карусели: `.carousel-item` с фиксированной шириной `20rem` (`flex: 0 0 20rem`)
- Gap между элементами: `2rem`
- Padding карусели: `2rem 4rem` для места под стрелки
- Scroll: `scroll-behavior: smooth`, скрыт scrollbar (`scrollbar-width: none`)
- Функция прокрутки: `scrollCarousel(direction)` - прокрутка на `350px`

### New Arrivals секция
**ID:** `#new-arrivals`
- Grid: `2fr 1fr` (большая карточка + две маленькие)
- Большая карточка: `.featured-large` с высотой `42rem`
- Маленькие карточки: `.featured-small` с высотой `20rem`
- Overlay с glassmorphism эффектом для контента

### Shop by Category секция
**ID:** `#shop-by-category`
- Grid: 2 большие карточки + 3 маленькие карточки
- Большие карточки: высота `450px`
- Маленькие карточки: высота `320px`
- Overlay с градиентом для текста поверх изображений

### Testimonials секция
**ID:** `#testimonials`
- Grid: 3 колонки (desktop), адаптивный
- Фон: декоративный размытый круг (`.testimonials-bg`)
- Карточки: glassmorphism эффект с backdrop-filter
- Содержит: аватар, имя, рейтинг (звезды), текст отзыва

### Size Guide секция
**ID:** `#size-guide`
- Grid: 2 колонки (текст + форма калькулятора)
- Форма: `.calculator-form` с полями для размеров
- Кнопка: `.form-submit` для расчета размера

### About секция
**ID:** `#about`
- Grid: текст + сетка изображений (2x2)
- Изображения: `.about-image` с разными размерами

### Sustainability секция
**ID:** `#sustainability`
- Центрированная карточка с иконкой листа
- Статистика: `.sustainability-stats` с 4 блоками
- Фон: `var(--color-bg-primary)`

### Newsletter секция
**ID:** `#newsletter`
- Центрированная форма подписки
- Input: `.newsletter-input` для email
- Кнопка: `.cta-button.btn-solid`

### Contact секция
**ID:** `#contact`
- Grid: контактная информация + форма обратной связи
- Форма: `.contact-form-fields` с валидацией
- Контактные элементы: телефон, email, адрес с иконками

## 10. HEADER И НАВИГАЦИЯ

### Header
**ID:** `#header`
- Position: `fixed`, `top: 0`, `z-index: 50`
- Фон: glassmorphism (`var(--color-glass-bg)`, `backdrop-filter: blur(20px)`)
- Тень: `0 4px 20px var(--color-shadow-pink)`
- Содержит: кнопка меню (слева), логотип (центр), действия (справа)

### Логотип
- Изображение: `.header-logo-image` (max-height: `3rem`, max-width: `120px`)
- Текст: `.header-logo` с градиентным текстом
- Позиционирование: абсолютное по центру через `left: 50%`, `transform: translateX(-50%)`

### Мобильное меню
**Класс:** `.menu-overlay`
- Position: `fixed`, полный экран
- Фон: `var(--gradient-bg-menu)` с backdrop-filter
- Анимация: slide-in слева (`left: -100%` → `left: 0`)
- Содержит: навигационные ссылки (`.menu-nav`), социальные сети (`.menu-social`)
- Закрытие: кнопка `.menu-close` в правом верхнем углу, ESC клавиша, клик вне меню
- Блокировка скролла: `body.style.overflow = 'hidden'` при открытии

### Иконки действий
- `.icon-btn` - базовый стиль для иконок в header
- Размер: `1.8rem`, цвет: `var(--color-pink-light)`
- Hover: цвет меняется на `var(--color-pink)`

## 11. FOOTER

### Footer
**ID:** `#footer`
- Фон: `var(--color-bg-secondary)`
- Граница: верхняя с `var(--color-border-pink)`
- Padding: `4rem 0 2rem 0`

### Элементы footer
- `.footer-brand` - название бренда с золотым цветом
- `.footer-desc` - описание бренда
- `.footer-social` - социальные сети с иконками
- `.footer-bottom` - нижняя часть с копирайтом

### Социальные сети
- Круглые кнопки с границей
- Особый стиль для VK: `.footer-social a.vk` с золотой границей и glassmorphism фоном
- Hover: фон становится золотым, цвет текста инвертируется

## 12. ФОРМЫ

### Общие стили форм
- `.form-group` - обертка для полей формы
- Input/Textarea: полупрозрачный фон, border, focus state с золотым outline
- Кнопка submit: `.cta-button.btn-solid` или `.form-submit`

### Форма контактов
- Поля: имя, email, тема, сообщение
- Валидация: HTML5 валидация с `required`
- Обработчик: `handleContactSubmit(event)` в JavaScript
- Уведомление: при успешной отправке показывается уведомление через `showNotification()`

### Калькулятор размеров
- Поля: обхват под грудью, обхват груди, тип телосложения
- Обработчик: `handleSizeCalculatorSubmit(event)` в JavaScript
- Результат: отображается в блоке `.calculator-result` на странице

### Форма подписки
- Класс: `.newsletter-form`
- Поле: `.newsletter-input` - email input
- Кнопка: `.cta-button.btn-solid`
- Примечание: `.newsletter-note` - текст о согласии с политикой конфиденциальности
- Секция: `#newsletter` с центрированным контентом
- Валидация: проверка email через регулярное выражение
- Уведомление: при успешной подписке или ошибке показывается уведомление через `showNotification()`

**Правило:** Все формы используют систему уведомлений вместо стандартных `alert()`. Уведомления отображаются в стиле сайта с glassmorphism эффектом и автоматически закрываются через 5 секунд.

### Стили полей формы
- Input/Textarea: полупрозрачный фон, border с `var(--color-border-pink)`
- Focus state: outline с золотым цветом (`var(--color-gold)`)
- Placeholder: цвет `var(--color-text-tertiary)`
- Валидация: HTML5 валидация с визуальной обратной связью

## 13. ВАЖНЫЕ ПРАВИЛА И ПАТТЕРНЫ

### Общие правила

1. **Цвета:** Всегда используй CSS переменные из `_variables.scss` вместо жестко заданных цветов. Это обеспечивает поддержку темной и светлой тем.
2. **Шрифты:** Montserrat для текста, Cormorant Garamond для заголовков
3. **Отступы:** Используй CSS переменные из `_variables.scss`
4. **Border-radius:** 8px для карточек, 12px для кнопок, 20px для badges
5. **Transitions:** Стандартно 0.3s ease
6. **Hover эффекты:** Всегда добавляй плавные переходы
7. **Адаптивность:** Все компоненты должны быть адаптивными
8. **Доступность:** WCAG стандарты обязательны
9. **Темы:** Все цвета должны использовать CSS переменные для поддержки переключения темы

### Паттерны компонентов

**Секции:**
- Всегда используют `.container`
- Заголовок: `.section-header` > `.section-title` + `.section-subtitle`
- Padding: `var(--section-padding-y)` сверху и снизу

**Карточки:**
- Структура: `.product-card` > `.product-image-wrapper` > `img` + `.product-overlay`
- Hover эффект: подъем карточки и масштаб изображения
- Badges позиционируются абсолютно в верхнем левом углу

**Формы:**
- Используют `.form-group` для обертки
- Input стили: полупрозрачный фон, border, focus state
- Кнопка submit: `.cta-button.btn-solid`

**Кнопки:**
- Всегда обернуты в `<span>` для текста
- Имеют псевдоэлемент `::before` для ripple эффекта
- Используют `aria-label` для доступности

## 14. ЧАСТО ИСПОЛЬЗУЕМЫЕ КОМБИНАЦИИ

### Градиентный заголовок
```scss
.section-title {
    font-size: 4rem;
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    background: linear-gradient(135deg, #d4af37 0%, #ffb6c1 50%, #ffc0cb 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}
```

### Glassmorphism элемент
```scss
background: rgba(255, 192, 203, 0.08);
backdrop-filter: blur(20px);
border: 1px solid rgba(255, 182, 193, 0.15);
```

### Hover lift эффект
```scss
transition: transform 0.3s ease, box-shadow 0.3s ease;
&:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}
```

### Стандартная кнопка CTA
```html
<a href="#" class="cta-button btn-solid" style="text-decoration: none;">
    <span>ТЕКСТ КНОПКИ</span>
</a>
```

### Карточка товара
```html
<div class="product-card">
    <div class="product-image-wrapper">
        <img src="..." alt="...">
        <div class="product-overlay">
            <button class="quick-view-btn">БЫСТРЫЙ ПРОСМОТР</button>
        </div>
        <div class="product-badge badge-new">NEW</div>
    </div>
    <h4 class="product-name">Название товара</h4>
    <p class="product-desc">Описание товара</p>
    <p class="product-price">7 800 ₽</p>
</div>
```

### Секция с заголовком
```html
<section id="section-name">
    <div class="container">
        <div class="section-header">
            <h2 class="section-title">Заголовок секции</h2>
            <p class="section-subtitle">Подзаголовок секции</p>
        </div>
        <!-- Контент секции -->
    </div>
</section>
```

### Уведомление
```html
<div id="notification" class="notification" role="alert" aria-live="polite" aria-atomic="true">
    <div class="notification-overlay"></div>
    <div class="notification-content">
        <div class="notification-icon">
            <i></i>
        </div>
        <div class="notification-message">
            <h4 class="notification-title"></h4>
            <p class="notification-text"></p>
        </div>
        <button class="notification-close" aria-label="Закрыть уведомление">
            <i class="fa-solid fa-times"></i>
        </button>
    </div>
</div>
```

**Использование:**
```javascript
// Показать уведомление об успехе
showNotification('Сообщение отправлено!', 'Мы свяжемся с вами в ближайшее время.', 'success');

// Показать уведомление об ошибке
showNotification('Ошибка', 'Пожалуйста, проверьте введенные данные.', 'error');

// Показать уведомление с кастомным временем закрытия
showNotification('Заголовок', 'Текст сообщения', 'success', 3000);
```

### Карусель
```html
<div class="carousel-wrapper">
    <button onclick="scrollCarousel('left')" class="carousel-btn carousel-btn-left">
        <i class="fa-solid fa-chevron-left"></i>
    </button>
    <button onclick="scrollCarousel('right')" class="carousel-btn carousel-btn-right">
        <i class="fa-solid fa-chevron-right"></i>
    </button>
    <div id="carousel" class="carousel-container">
        <div class="carousel-item">
            <!-- Контент элемента карусели -->
        </div>
    </div>
</div>
```

### Glassmorphism карточка
```scss
.glass-card {
    background: var(--color-glass-bg);
    backdrop-filter: blur(20px);
    border: 1px solid var(--color-glass-border);
    padding: 2rem;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    
    &:hover {
        transform: translateY(-8px);
        box-shadow: 0 20px 40px var(--color-shadow-black);
    }
}
```

---

## 15. JAVASCRIPT ФУНКЦИИ

### Основные функции (script.js)

**Переключение темы:**
```javascript
toggleTheme() - переключает между темной и светлой темой, сохраняет в localStorage
initTheme() - инициализирует тему при загрузке страницы
```

**Меню:**
```javascript
openMenu() - открывает мобильное меню, блокирует скролл
closeMenu() - закрывает мобильное меню, восстанавливает скролл
```

**Карусель:**
```javascript
scrollCarousel(direction) - прокручивает карусель влево/вправо на 350px
```

**Формы:**
```javascript
handleContactSubmit(event) - обрабатывает отправку формы контактов, показывает уведомление об успехе
handleSizeCalculatorSubmit(event) - рассчитывает размер на основе введенных данных, отображает результат на странице
```

**Уведомления:**
```javascript
showNotification(title, message, type = 'success', duration = 5000) - показывает уведомление
  - title: заголовок уведомления (строка)
  - message: текст сообщения (строка)
  - type: тип уведомления ('success' или 'error', по умолчанию 'success')
  - duration: время автоматического закрытия в миллисекундах (по умолчанию 5000)
  - Блокирует скролл body при открытии
  - Автоматически закрывается через указанное время

hideNotification() - скрывает уведомление
  - Восстанавливает скролл body
  - Отменяет автоматическое закрытие, если оно еще не произошло
  - Может быть вызвано через кнопку закрытия, клик на overlay или клавишу ESC
```

**Анимации при скролле:**
- IntersectionObserver для плавного появления секций при скролле
- Анимация: `opacity: 0 → 1`, `translateY(30px) → translateY(0)`
- Transition: `0.8s ease`

**Обработчики событий:**
- ESC клавиша закрывает меню, модальные окна и уведомления
- Клик на overlay закрывает соответствующий элемент
- Все формы используют уведомления для обратной связи с пользователем

---

**ВАЖНО:** При любых изменениях в проекте всегда сверяйся с этим документом и поддерживай консистентность дизайн-системы. Все новые компоненты должны следовать описанным паттернам и использовать CSS переменные для цветов и отступов.

function openMenu() {
    const menuOverlay = document.getElementById('menu-overlay');
    const menuBtn = document.querySelector('.menu-btn');
    menuOverlay.classList.add('active');
    if (menuBtn) {
        menuBtn.setAttribute('aria-expanded', 'true');
    }
    // Блокируем скролл body при открытом меню
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    const menuOverlay = document.getElementById('menu-overlay');
    const menuBtn = document.querySelector('.menu-btn');
    menuOverlay.classList.remove('active');
    if (menuBtn) {
        menuBtn.setAttribute('aria-expanded', 'false');
    }
    // Восстанавливаем скролл body
    document.body.style.overflow = '';
}

// Функции для уведомлений
function showNotification(title, message, type = 'success', duration = 5000) {
    const notification = document.getElementById('notification');
    const notificationTitle = notification.querySelector('.notification-title');
    const notificationText = notification.querySelector('.notification-text');
    const notificationIcon = notification.querySelector('.notification-icon i');
    
    // Устанавливаем тип уведомления
    notification.className = 'notification';
    if (type === 'success') {
        notification.classList.add('notification-success');
        notificationIcon.className = 'fa-solid fa-check-circle';
    } else if (type === 'error') {
        notification.classList.add('notification-error');
        notificationIcon.className = 'fa-solid fa-triangle-exclamation';
    }
    
    // Устанавливаем текст
    notificationTitle.textContent = title;
    notificationText.textContent = message;
    
    // Показываем уведомление
    notification.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Автоматическое закрытие через duration миллисекунд
    const autoCloseTimeout = setTimeout(() => {
        hideNotification();
    }, duration);
    
    // Сохраняем timeout для возможности отмены
    notification._autoCloseTimeout = autoCloseTimeout;
}

function hideNotification() {
    const notification = document.getElementById('notification');
    
    // Отменяем автоматическое закрытие, если оно еще не произошло
    if (notification._autoCloseTimeout) {
        clearTimeout(notification._autoCloseTimeout);
        notification._autoCloseTimeout = null;
    }
    
    notification.classList.remove('active');
    document.body.style.overflow = '';
}

// Обработчики форм с валидацией
function handleContactSubmit(event) {
    event.preventDefault();
    const form = event.target;
    
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    // Здесь будет отправка на сервер
    // Показываем уведомление об успешной отправке
    showNotification(
        'Сообщение отправлено!',
        'Мы свяжемся с вами в ближайшее время.',
        'success'
    );
    form.reset();
}

// Функция для обновления полей формы в зависимости от выбранного типа
function updateCalculatorFields() {
    const productType = document.getElementById('product-type').value;
    const braFields = document.getElementById('bra-fields');
    const pantiesFields = document.getElementById('panties-fields');
    const resultDiv = document.getElementById('calculator-result');
    
    // Скрываем все поля и результат
    if (braFields) braFields.style.display = 'none';
    if (pantiesFields) pantiesFields.style.display = 'none';
    if (resultDiv) resultDiv.style.display = 'none';
    
    // Очищаем поля
    const bandSizeInput = document.getElementById('band-size');
    const bustSizeInput = document.getElementById('bust-size');
    const hipSizeInput = document.getElementById('hip-size');
    const clothingBustInput = document.getElementById('clothing-bust-size');
    const clothingWaistInput = document.getElementById('clothing-waist-size');
    const clothingHipInput = document.getElementById('clothing-hip-size');
    const clothingFields = document.getElementById('clothing-fields');
    
    if (bandSizeInput) {
        bandSizeInput.value = '';
        bandSizeInput.removeAttribute('required');
    }
    if (bustSizeInput) {
        bustSizeInput.value = '';
        bustSizeInput.removeAttribute('required');
    }
    if (hipSizeInput) {
        hipSizeInput.value = '';
        hipSizeInput.removeAttribute('required');
    }
    if (clothingBustInput) {
        clothingBustInput.value = '';
        clothingBustInput.removeAttribute('required');
    }
    if (clothingWaistInput) {
        clothingWaistInput.value = '';
        clothingWaistInput.removeAttribute('required');
    }
    if (clothingHipInput) {
        clothingHipInput.value = '';
        clothingHipInput.removeAttribute('required');
    }
    
    // Показываем нужные поля
    if (productType === 'bra') {
        if (braFields) braFields.style.display = 'block';
        if (bandSizeInput) bandSizeInput.setAttribute('required', 'required');
        if (bustSizeInput) bustSizeInput.setAttribute('required', 'required');
    } else if (productType === 'panties') {
        if (pantiesFields) pantiesFields.style.display = 'block';
        if (hipSizeInput) hipSizeInput.setAttribute('required', 'required');
    } else if (productType === 'clothing') {
        if (clothingFields) clothingFields.style.display = 'block';
        if (clothingBustInput) clothingBustInput.setAttribute('required', 'required');
        if (clothingWaistInput) clothingWaistInput.setAttribute('required', 'required');
        if (clothingHipInput) clothingHipInput.setAttribute('required', 'required');
    }
}

// Данные для расчета размеров бюстгальтеров
const braSizeData = {
    // Размер: [мин обхват под грудью, макс обхват под грудью]
    sizes: {
        65: [63, 67],
        70: [66, 72],
        75: [73, 77],
        80: [78, 82],
        85: [83, 87],
        90: [88, 92],
        95: [93, 97]
    },
    // Чашка: [размер]: [мин обхват груди, макс обхват груди]
    cups: {
        65: { A: [77, 79], B: [79, 81], C: [81, 83], D: [83, 85] },
        70: { A: [82, 84], B: [84, 86], C: [86, 88], D: [88, 90], E: [90, 92], F: [92, 94], G: [94, 96] },
        75: { A: [87, 89], B: [89, 91], C: [91, 93], D: [93, 95], E: [95, 97], F: [97, 99], G: [99, 101] },
        80: { A: [92, 94], B: [94, 96], C: [96, 98], D: [98, 100], E: [100, 102], F: [102, 104], G: [104, 106] },
        85: { A: [97, 99], B: [99, 101], C: [101, 103], D: [103, 105], E: [105, 107], F: [107, 109], G: [109, 111] },
        90: { A: [102, 104], B: [104, 106], C: [106, 108], D: [108, 110], E: [110, 112], F: [112, 114], G: [114, 116] },
        95: { A: [107, 109], B: [109, 111], C: [111, 113], D: [113, 115], E: [115, 117], F: [117, 119], G: [119, 121] }
    }
};

// Данные для расчета размеров трусов
const pantiesSizeData = {
    // Обхват бёдер: [мин, макс] -> размеры
    sizes: [
        { range: [86, 90], ru: '40', eu: '38', int: 'XS' },
        { range: [91, 95], ru: '42', eu: '40', int: 'S' },
        { range: [96, 100], ru: '44', eu: '42', int: 'M' },
        { range: [101, 105], ru: '46', eu: '44', int: 'L' },
        { range: [106, 110], ru: '48', eu: '46', int: 'XL' }
    ]
};

// Данные для расчета размеров одежды/пижамы
const clothingSizeData = {
    sizes: [
        { 
            int: 'XS', 
            ru: '40', 
            eu: '38', 
            bust: [78, 82], 
            waist: [58, 62], 
            hip: [86, 90] 
        },
        { 
            int: 'S', 
            ru: '42', 
            eu: '40', 
            bust: [82, 86], 
            waist: [62, 66], 
            hip: [90, 94] 
        },
        { 
            int: 'M', 
            ru: '44', 
            eu: '42', 
            bust: [86, 90], 
            waist: [66, 70], 
            hip: [94, 98] 
        },
        { 
            int: 'L', 
            ru: '46', 
            eu: '44', 
            bust: [90, 96], 
            waist: [70, 76], 
            hip: [98, 104] 
        },
        { 
            int: 'XL', 
            ru: '48', 
            eu: '46', 
            bust: [96, 102], 
            waist: [76, 82], 
            hip: [104, 110] 
        },
        { 
            int: 'XXL', 
            ru: '50', 
            eu: '48', 
            bust: [102, 108], 
            waist: [82, 88], 
            hip: [110, 116] 
        }
    ]
};

// Функция расчета размера бюстгальтера
function calculateBraSize(bandSize, bustSize) {
    // Определяем размер по обхвату под грудью
    let braSize = null;
    for (const [size, range] of Object.entries(braSizeData.sizes)) {
        if (bandSize >= range[0] && bandSize <= range[1]) {
            braSize = parseInt(size);
            break;
        }
    }
    
    if (!braSize) {
        return null;
    }
    
    // Определяем чашку по обхвату груди
    let cup = null;
    const cupsForSize = braSizeData.cups[braSize];
    
    if (cupsForSize) {
        for (const [cupLetter, range] of Object.entries(cupsForSize)) {
            if (bustSize >= range[0] && bustSize <= range[1]) {
                cup = cupLetter;
                break;
            }
        }
    }
    
    if (!cup) {
        // Если точного совпадения нет, ищем ближайший
        let minDiff = Infinity;
        let closestCup = null;
        
        for (const [cupLetter, range] of Object.entries(cupsForSize)) {
            const midPoint = (range[0] + range[1]) / 2;
            const diff = Math.abs(bustSize - midPoint);
            if (diff < minDiff) {
                minDiff = diff;
                closestCup = cupLetter;
            }
        }
        cup = closestCup;
    }
    
    return {
        size: braSize,
        cup: cup,
        fullSize: `${braSize}${cup}`
    };
}

// Функция расчета размера трусов
function calculatePantiesSize(hipSize) {
    for (const sizeInfo of pantiesSizeData.sizes) {
        if (hipSize >= sizeInfo.range[0] && hipSize <= sizeInfo.range[1]) {
            return {
                ru: sizeInfo.ru,
                eu: sizeInfo.eu,
                int: sizeInfo.int
            };
        }
    }
    
    // Если точного совпадения нет, ищем ближайший
    let minDiff = Infinity;
    let closestSize = null;
    
    for (const sizeInfo of pantiesSizeData.sizes) {
        const midPoint = (sizeInfo.range[0] + sizeInfo.range[1]) / 2;
        const diff = Math.abs(hipSize - midPoint);
        if (diff < minDiff) {
            minDiff = diff;
            closestSize = sizeInfo;
        }
    }
    
    return closestSize ? {
        ru: closestSize.ru,
        eu: closestSize.eu,
        int: closestSize.int
    } : null;
}

// Функция расчета размера одежды/пижамы
function calculateClothingSize(bustSize, waistSize, hipSize) {
    // Подсчитываем количество совпадений для каждого размера
    const sizeMatches = clothingSizeData.sizes.map(sizeInfo => {
        let matches = 0;
        let totalDiff = 0;
        
        // Проверяем обхват груди
        if (bustSize >= sizeInfo.bust[0] && bustSize <= sizeInfo.bust[1]) {
            matches++;
        } else {
            const midPoint = (sizeInfo.bust[0] + sizeInfo.bust[1]) / 2;
            totalDiff += Math.abs(bustSize - midPoint);
        }
        
        // Проверяем обхват талии
        if (waistSize >= sizeInfo.waist[0] && waistSize <= sizeInfo.waist[1]) {
            matches++;
        } else {
            const midPoint = (sizeInfo.waist[0] + sizeInfo.waist[1]) / 2;
            totalDiff += Math.abs(waistSize - midPoint);
        }
        
        // Проверяем обхват бёдер
        if (hipSize >= sizeInfo.hip[0] && hipSize <= sizeInfo.hip[1]) {
            matches++;
        } else {
            const midPoint = (sizeInfo.hip[0] + sizeInfo.hip[1]) / 2;
            totalDiff += Math.abs(hipSize - midPoint);
        }
        
        return {
            sizeInfo: sizeInfo,
            matches: matches,
            totalDiff: totalDiff
        };
    });
    
    // Сортируем по количеству совпадений (больше = лучше), затем по минимальной разнице
    sizeMatches.sort((a, b) => {
        if (b.matches !== a.matches) {
            return b.matches - a.matches;
        }
        return a.totalDiff - b.totalDiff;
    });
    
    const bestMatch = sizeMatches[0];
    
    if (bestMatch && bestMatch.matches >= 1) {
        return {
            int: bestMatch.sizeInfo.int,
            ru: bestMatch.sizeInfo.ru,
            eu: bestMatch.sizeInfo.eu,
            matches: bestMatch.matches,
            totalDiff: bestMatch.totalDiff
        };
    }
    
    return null;
}

// Обработчик отправки формы калькулятора
function handleSizeCalculatorSubmit(event) {
    event.preventDefault();
    const form = event.target;
    
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    const productType = document.getElementById('product-type').value;
    const resultDiv = document.getElementById('calculator-result');
    
    if (!resultDiv) return;
    
    let result = null;
    let resultHTML = '';
    
    if (productType === 'bra') {
        const bandSize = parseInt(document.getElementById('band-size').value);
        const bustSize = parseInt(document.getElementById('bust-size').value);
        
        result = calculateBraSize(bandSize, bustSize);
        
        if (result) {
            resultHTML = `
                <div class="calculator-result-content">
                    <h4 class="calculator-result-title">Рекомендуемый размер бюстгальтера:</h4>
                    <div class="calculator-result-size">${result.fullSize}</div>
                    <div class="calculator-result-details">
                        <p><strong>Размер:</strong> ${result.size}</p>
                        <p><strong>Чашка:</strong> ${result.cup}</p>
                    </div>
                </div>
            `;
        } else {
            resultHTML = `
                <div class="calculator-result-content calculator-result-error">
                    <p>Не удалось определить размер. Пожалуйста, проверьте введенные значения.</p>
                    <p class="calculator-result-hint">Обхват под грудью должен быть от 63 до 97 см.</p>
                </div>
            `;
        }
    } else if (productType === 'panties') {
        const hipSize = parseInt(document.getElementById('hip-size').value);
        
        result = calculatePantiesSize(hipSize);
        
        if (result) {
            resultHTML = `
                <div class="calculator-result-content">
                    <h4 class="calculator-result-title">Рекомендуемый размер трусов:</h4>
                    <div class="calculator-result-sizes">
                        <div class="calculator-result-size-item">
                            <span class="calculator-result-label">Международный:</span>
                            <span class="calculator-result-value">${result.int}</span>
                        </div>
                        <div class="calculator-result-size-item">
                            <span class="calculator-result-label">Российский:</span>
                            <span class="calculator-result-value">${result.ru}</span>
                        </div>
                        <div class="calculator-result-size-item">
                            <span class="calculator-result-label">Европейский:</span>
                            <span class="calculator-result-value">${result.eu}</span>
                        </div>
                    </div>
                </div>
            `;
        } else {
            resultHTML = `
                <div class="calculator-result-content calculator-result-error">
                    <p>Не удалось определить размер. Пожалуйста, проверьте введенное значение.</p>
                    <p class="calculator-result-hint">Обхват бёдер должен быть от 86 до 110 см.</p>
                </div>
            `;
        }
    } else if (productType === 'clothing') {
        const bustSize = parseInt(document.getElementById('clothing-bust-size').value);
        const waistSize = parseInt(document.getElementById('clothing-waist-size').value);
        const hipSize = parseInt(document.getElementById('clothing-hip-size').value);
        
        result = calculateClothingSize(bustSize, waistSize, hipSize);
        
        if (result) {
            let matchInfo = '';
            if (result.matches === 3) {
                matchInfo = '<p class="calculator-result-match calculator-result-match-success">✓ Все параметры соответствуют размеру</p>';
            } else if (result.matches === 2) {
                matchInfo = '<p class="calculator-result-match calculator-result-match-success">✓ Два параметра соответствуют размеру</p>';
            } else {
                matchInfo = '<p class="calculator-result-match calculator-result-match-warning">⚠ Размер рассчитан по ближайшим значениям</p>';
            }
            
            resultHTML = `
                <div class="calculator-result-content">
                    <h4 class="calculator-result-title">Рекомендуемый размер одежды/пижамы:</h4>
                    <div class="calculator-result-size">${result.int}</div>
                    ${matchInfo}
                    <div class="calculator-result-sizes">
                        <div class="calculator-result-size-item">
                            <span class="calculator-result-label">Международный:</span>
                            <span class="calculator-result-value">${result.int}</span>
                        </div>
                        <div class="calculator-result-size-item">
                            <span class="calculator-result-label">Российский:</span>
                            <span class="calculator-result-value">${result.ru}</span>
                        </div>
                        <div class="calculator-result-size-item">
                            <span class="calculator-result-label">Европейский:</span>
                            <span class="calculator-result-value">${result.eu}</span>
                        </div>
                    </div>
                </div>
            `;
        } else {
            resultHTML = `
                <div class="calculator-result-content calculator-result-error">
                    <p>Не удалось определить размер. Пожалуйста, проверьте введенные значения.</p>
                    <p class="calculator-result-hint">Обхват груди: 78-108 см, талии: 58-88 см, бёдер: 86-116 см.</p>
                </div>
            `;
        }
    }
    
    if (resultHTML) {
        resultDiv.innerHTML = resultHTML;
        resultDiv.style.display = 'block';
        
        // Прокручиваем к результату
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// Закрытие меню по ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const menuOverlay = document.getElementById('menu-overlay');
        if (menuOverlay && menuOverlay.classList.contains('active')) {
            closeMenu();
        }
        // Закрытие модального окна руководства по размерам
        const sizeGuideModal = document.getElementById('size-guide-modal');
        if (sizeGuideModal && sizeGuideModal.classList.contains('active')) {
            closeSizeGuideModal();
        }
        // Закрытие уведомления
        const notification = document.getElementById('notification');
        if (notification && notification.classList.contains('active')) {
            hideNotification();
        }
    }
});

// Функции для модального окна руководства по размерам
function openSizeGuideModal() {
    const modal = document.getElementById('size-guide-modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeSizeGuideModal() {
    const modal = document.getElementById('size-guide-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function scrollCarousel(direction) {
    const carousel = document.getElementById('carousel');
    const scrollAmount = 350;
    
    if (direction === 'left') {
        carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
        carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
}

// Функция для получения класса иконки по теме
function getIconClass(theme) {
    return theme === 'dark' ? 'fa-moon' : 'fa-sun';
}

// Функция для обновления иконки Font Awesome (работает с SVG от autoReplaceSvg: 'nest')
function updateIconElement(iconContainer, iconClass) {
    if (!iconContainer) return;
    
    // Font Awesome с autoReplaceSvg: 'nest' создает SVG внутри <i>
    // Для правильной работы нужно полностью пересоздать элемент <i>
    const iconElement = iconContainer.querySelector('i');
    
    if (iconElement) {
        // Сохраняем атрибут aria-hidden
        const ariaHidden = iconElement.getAttribute('aria-hidden');
        
        // Создаем новый элемент <i> с правильным классом
        const newIconElement = document.createElement('i');
        newIconElement.className = 'fa-solid ' + iconClass;
        if (ariaHidden) {
            newIconElement.setAttribute('aria-hidden', ariaHidden);
        }
        
        // Заменяем старый элемент новым
        iconElement.replaceWith(newIconElement);
        
        // Font Awesome автоматически создаст SVG внутри нового элемента
    }
}

// Функция для синхронизации иконок с текущей темой
function syncThemeIcon() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme') || 'light';
    const themeToggle = document.getElementById('theme-toggle');
    
    if (!themeToggle) return;
    
    const currentSpan = themeToggle.querySelector('.icon--current');
    const nextSpan = themeToggle.querySelector('.icon--next');
    
    if (!currentSpan || !nextSpan) return;
    
    // Текущая иконка должна показывать текущую тему
    // Следующая иконка должна показывать противоположную тему
    const currentIconClass = getIconClass(currentTheme);
    const nextIconClass = getIconClass(currentTheme === 'light' ? 'dark' : 'light');
    
    // Обновляем иконки с учетом SVG от Font Awesome
    // Передаем span контейнер, функция сама найдет и обновит <i> элемент внутри
    updateIconElement(currentSpan, currentIconClass);
    updateIconElement(nextSpan, nextIconClass);
}

// Переключение темы
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    const themeToggle = document.getElementById('theme-toggle');
    
    if (!themeToggle) return;
    
    // Обновляем тему
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Сначала обновляем иконки в соответствии с новой темой
    // Затем меняем роли для плавной смены
    const currentSpan = themeToggle.querySelector('.icon--current');
    const nextSpan = themeToggle.querySelector('.icon--next');
    
    if (currentSpan && nextSpan) {
        // Обновляем классы иконок Font Awesome для новой темы
        const newCurrentIconClass = getIconClass(newTheme);
        const newNextIconClass = getIconClass(newTheme === 'light' ? 'dark' : 'light');
        
        // Обновляем иконку, которая станет текущей (сейчас она next)
        // Используем функцию updateIconElement для правильной работы с SVG
        updateIconElement(nextSpan, newCurrentIconClass);
        
        // Обновляем иконку, которая станет следующей (сейчас она current)
        updateIconElement(currentSpan, newNextIconClass);
        
        // Теперь меняем роли: текущая становится следующей, следующая становится текущей
        // Это запустит CSS transition для плавной смены
        currentSpan.classList.remove('icon--current');
        currentSpan.classList.add('icon--next');
        
        nextSpan.classList.remove('icon--next');
        nextSpan.classList.add('icon--current');
    }
    
    // Обновляем aria-label
        themeToggle.setAttribute('aria-label', newTheme === 'light' ? 'Переключить на темную тему' : 'Переключить на светлую тему');
}

// Инициализация темы при загрузке
function initTheme() {
    // Тема уже установлена inline скриптом в head, но проверим на всякий случай
    const savedTheme = localStorage.getItem('theme') || 'light'; // По умолчанию светлая тема
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    
    // Если тема не установлена или не совпадает с сохраненной, обновляем
    if (!currentTheme || currentTheme !== savedTheme) {
        html.setAttribute('data-theme', savedTheme);
    }
    
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    // Сразу обновляем иконки без проверки - это быстрее
    const currentSpan = themeToggle.querySelector('.icon--current');
    const nextSpan = themeToggle.querySelector('.icon--next');
    
    if (currentSpan && nextSpan) {
        const currentIcon = currentSpan.querySelector('i');
        const nextIcon = nextSpan.querySelector('i');
        
        if (currentIcon && nextIcon) {
            // Определяем, какая иконка должна быть текущей
            const expectedCurrentIcon = getIconClass(savedTheme);
            const currentIconClass = currentIcon.classList.contains('fa-sun') ? 'fa-sun' : 'fa-moon';
            
            // Если иконки не соответствуют теме, обновляем их
            if (currentIconClass !== expectedCurrentIcon) {
                // Обновляем иконки через updateIconElement для правильной работы с Font Awesome
                updateIconElement(currentSpan, expectedCurrentIcon);
                updateIconElement(nextSpan, getIconClass(savedTheme === 'light' ? 'dark' : 'light'));
            } else {
                // Иконки правильные, но нужно убедиться, что следующая иконка тоже правильная
                const expectedNextIcon = getIconClass(savedTheme === 'light' ? 'dark' : 'light');
                const nextIconClass = nextIcon.classList.contains('fa-sun') ? 'fa-sun' : 'fa-moon';
                if (nextIconClass !== expectedNextIcon) {
                    updateIconElement(nextSpan, expectedNextIcon);
                }
            }
        }
    }
    
    // Синхронизируем иконки с темой (на случай, если Font Awesome уже загрузился)
    syncThemeIcon();
    
    // Обновляем aria-label
    themeToggle.setAttribute('aria-label', savedTheme === 'light' ? 'Переключить на темную тему' : 'Переключить на светлую тему');
    
    // Дополнительная проверка через небольшую задержку (на случай, если Font Awesome еще не загрузился)
    setTimeout(() => {
        syncThemeIcon();
    }, 50); // Уменьшил задержку до 50ms для более быстрого обновления
}

// ==========================================================================
// МОДАЛЬНОЕ ОКНО БЫСТРОГО ПРОСМОТРА ТОВАРА
// Определяем функции ДО DOMContentLoaded, чтобы они были доступны из onclick
// ==========================================================================

// Вспомогательная функция для открытия модального окна из карточки товара
function openQuickViewFromCard(button) {
    if (!button) return;
    
    // Находим родительскую карточку товара или элемент карусели
    const productCard = button.closest('.product-card');
    const carouselItem = button.closest('.carousel-item');
    const container = productCard || carouselItem;
    
    if (!container) return;
    
    // Получаем данные из карточки
    const name = container.querySelector('.product-name')?.textContent || '';
    const description = container.querySelector('.product-desc')?.textContent || '';
    const priceText = container.querySelector('.product-price')?.textContent || '';
    const image = container.querySelector('img')?.src || '';
    const badge = container.querySelector('.product-badge');
    
    // Парсим цену
    const priceMatch = priceText.match(/[\d\s]+/);
    const price = priceMatch ? parseInt(priceMatch[0].replace(/\s/g, '')) : 0;
    
    // Получаем ID товара, если есть
    const productId = productCard?.getAttribute('data-product-id');
    
    // Создаем объект товара
    const product = {
        id: productId ? parseInt(productId) : Date.now(),
        name: name,
        description: description,
        price: price,
        originalPrice: null,
        image: image,
        sizes: ['S', 'M', 'L', 'XL'], // По умолчанию
        isNew: badge?.classList.contains('badge-new') || false,
        isBestseller: badge?.classList.contains('bestseller') || false
    };
    
    // Открываем модальное окно
    if (window.openQuickViewModalWithData) {
        window.openQuickViewModalWithData(product);
    } else if (typeof openQuickViewModalWithData === 'function') {
        openQuickViewModalWithData(product);
    } else {
        console.error('Функция openQuickViewModalWithData не доступна');
    }
}

// Функция открытия модального окна быстрого просмотра с данными товара
function openQuickViewModalWithData(product) {
    // Заполняем модальное окно данными товара
    const modal = document.getElementById('quick-view-modal');
    if (!modal) {
        console.error('Модальное окно quick-view-modal не найдено в DOM');
        return;
    }
    
    if (!product) {
        console.error('Данные товара не переданы в openQuickViewModalWithData');
        return;
    }
    
    // Изображение
    const imageEl = document.getElementById('quick-view-image');
    if (imageEl) {
        imageEl.src = product.image;
        imageEl.alt = product.name;
    }
    
    // Название
    const nameEl = document.getElementById('quick-view-name');
    if (nameEl) {
        nameEl.textContent = product.name;
    }
    
    // Описание
    const descriptionEl = document.getElementById('quick-view-description');
    if (descriptionEl) {
        descriptionEl.textContent = product.description;
    }
    
    // Цена
    const priceEl = document.getElementById('quick-view-price');
    const originalPriceEl = document.getElementById('quick-view-original-price');
    if (priceEl) {
        if (product.originalPrice) {
            priceEl.textContent = `${product.price.toLocaleString('ru-RU')} ₽`;
            if (originalPriceEl) {
                originalPriceEl.textContent = `${product.originalPrice.toLocaleString('ru-RU')} ₽`;
                originalPriceEl.style.display = 'block';
            }
        } else {
            priceEl.textContent = `${product.price.toLocaleString('ru-RU')} ₽`;
            if (originalPriceEl) {
                originalPriceEl.style.display = 'none';
            }
        }
    }
    
    // Размеры
    const sizesListEl = document.getElementById('quick-view-sizes-list');
    if (sizesListEl && product.sizes) {
        sizesListEl.innerHTML = product.sizes.map(size => 
            `<span class="quick-view-size-item">${size}</span>`
        ).join('');
    }
    
    // Бейдж
    const badgeEl = document.getElementById('quick-view-badge');
    if (badgeEl) {
        if (product.isNew) {
            badgeEl.textContent = 'NEW';
            badgeEl.className = 'quick-view-badge badge-new';
            badgeEl.style.display = 'block';
        } else if (product.isBestseller) {
            badgeEl.textContent = 'BESTSELLER';
            badgeEl.className = 'quick-view-badge bestseller';
            badgeEl.style.display = 'block';
        } else {
            badgeEl.style.display = 'none';
        }
    }
    
    // Кнопка заказа - добавляем название товара в ссылку ВК
    const orderBtn = document.getElementById('quick-view-order-btn');
    if (orderBtn) {
        // Можно добавить параметры в URL для передачи информации о товаре
        const vkUrl = new URL('https://vk.com/chilloutlingerie');
        // Если нужно, можно добавить параметры запроса
        orderBtn.href = vkUrl.toString();
    }
    
    // Открываем модальное окно
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Устанавливаем aria-hidden для основного контента
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
        mainContent.setAttribute('aria-hidden', 'true');
    }
    
    // Фокус на кнопке закрытия для доступности
    const closeBtn = modal.querySelector('.quick-view-modal-close');
    if (closeBtn) {
        setTimeout(() => closeBtn.focus(), 100);
    }
}

// Функция открытия модального окна быстрого просмотра
function openQuickViewModal(productId) {
    // Сначала пытаемся найти товар в DOM (для главной страницы)
    const productCard = document.querySelector(`[data-product-id="${productId}"]`);
    
    if (productCard) {
        // Получаем данные из карточки товара на странице
        const name = productCard.querySelector('.product-name')?.textContent || '';
        const description = productCard.querySelector('.product-desc')?.textContent || '';
        const priceText = productCard.querySelector('.product-price')?.textContent || '';
        const image = productCard.querySelector('img')?.src || '';
        const badge = productCard.querySelector('.product-badge');
        
        // Парсим цену
        const priceMatch = priceText.match(/[\d\s]+/);
        const price = priceMatch ? parseInt(priceMatch[0].replace(/\s/g, '')) : 0;
        
        const product = {
            id: productId,
            name: name,
            description: description,
            price: price,
            originalPrice: null,
            image: image,
            sizes: ['S', 'M', 'L', 'XL'], // По умолчанию
            isNew: badge?.classList.contains('badge-new') || false,
            isBestseller: badge?.classList.contains('bestseller') || false
        };
        
        // Используем общую функцию для заполнения модального окна
        if (typeof openQuickViewModalWithData === 'function') {
            openQuickViewModalWithData(product);
        } else if (window.openQuickViewModalWithData) {
            window.openQuickViewModalWithData(product);
        } else {
            console.error('Функция openQuickViewModalWithData не доступна');
        }
        return;
    }
    
    // Если не нашли в DOM, ищем в каталоге товаров (для страницы каталога)
    if (typeof catalogProducts !== 'undefined') {
        const product = catalogProducts.find(p => p.id === productId);
        if (product) {
            if (typeof openQuickViewModalWithData === 'function') {
                openQuickViewModalWithData(product);
            } else if (window.openQuickViewModalWithData) {
                window.openQuickViewModalWithData(product);
            }
            return;
        }
    }
    
    // Если товар не найден ни в DOM, ни в каталоге
    console.error('Товар не найден:', productId);
}

// Функция закрытия модального окна быстрого просмотра
function closeQuickViewModal() {
    const modal = document.getElementById('quick-view-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Убираем aria-hidden с основного контента
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.removeAttribute('aria-hidden');
        }
    }
}

// Экспортируем функции в window сразу после определения для надежности
if (typeof window !== 'undefined') {
    window.openQuickViewModal = openQuickViewModal;
    window.openQuickViewModalWithData = openQuickViewModalWithData;
    window.closeQuickViewModal = closeQuickViewModal;
    window.openQuickViewFromCard = openQuickViewFromCard;
}

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация темы
    initTheme();
    
    // Наблюдатель за изменением атрибута data-theme для синхронизации иконки
    const themeObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
                syncThemeIcon();
            }
        });
    });
    
    // Наблюдаем за изменениями атрибута data-theme на элементе html
    themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme']
    });
    
    // Скрытие шапки при скролле вниз, появление при скролле вверх
    const header = document.getElementById('header');
    if (header) {
        let lastScrollY = window.scrollY || window.pageYOffset;
        let ticking = false;
        const scrollThreshold = 80;

        function updateHeaderScroll() {
            const scrollY = window.scrollY || window.pageYOffset;
            const menuOverlay = document.getElementById('menu-overlay');
            if (menuOverlay && menuOverlay.classList.contains('active')) {
                header.classList.remove('header-hidden');
                lastScrollY = scrollY;
                ticking = false;
                return;
            }
            if (scrollY < scrollThreshold) {
                header.classList.remove('header-hidden');
            } else if (scrollY > lastScrollY) {
                header.classList.add('header-hidden');
            } else {
                header.classList.remove('header-hidden');
            }
            lastScrollY = scrollY;
            ticking = false;
        }

        function onScroll() {
            if (!ticking) {
                requestAnimationFrame(updateHeaderScroll);
                ticking = true;
            }
        }

        window.addEventListener('scroll', onScroll, { passive: true });
    }

    // Закрытие меню при клике вне его
    const menuOverlay = document.getElementById('menu-overlay');
    if (menuOverlay) {
        menuOverlay.addEventListener('click', function(event) {
            if (event.target === this) {
                closeMenu();
            }
        });
    }
    
    // Закрытие модального окна руководства по размерам при клике на overlay
    const sizeGuideModal = document.getElementById('size-guide-modal');
    if (sizeGuideModal) {
        const overlay = sizeGuideModal.querySelector('.size-guide-modal-overlay');
        if (overlay) {
            overlay.addEventListener('click', function() {
                closeSizeGuideModal();
            });
        }
    }
    
    // Закрытие уведомления при клике на overlay или кнопку закрытия
    const notification = document.getElementById('notification');
    if (notification) {
        const notificationOverlay = notification.querySelector('.notification-overlay');
        const notificationClose = notification.querySelector('.notification-close');
        
        if (notificationOverlay) {
            notificationOverlay.addEventListener('click', function() {
                hideNotification();
            });
        }
        
        if (notificationClose) {
            notificationClose.addEventListener('click', function() {
                hideNotification();
            });
        }
    }
    
    // Обработчик формы подписки на рассылку
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const form = event.target;
            const emailInput = form.querySelector('input[type="email"]');
            
            if (!emailInput || !emailInput.value) {
                showNotification(
                    'Ошибка',
                    'Пожалуйста, введите корректный email адрес.',
                    'error'
                );
                return;
            }
            
            // Валидация email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                showNotification(
                    'Ошибка',
                    'Пожалуйста, введите корректный email адрес.',
                    'error'
                );
                return;
            }
            
            // Здесь будет отправка на сервер
            showNotification(
                'Подписка оформлена!',
                'Спасибо за подписку! Вы будете получать наши новости и специальные предложения.',
                'success'
            );
            form.reset();
        });
    }
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
    
    // Инициализация каталога, если мы на странице каталога
    if (document.getElementById('catalog-page')) {
        initCatalog();
    }
    
    // Обработчики клика на кнопки "БЫСТРЫЙ ПРОСМОТР" для статических карточек на главной странице
    // Используем делегирование событий для надежности
    function handleQuickViewClick(e) {
        // Проверяем, был ли клик по кнопке быстрого просмотра или её дочернему элементу
        const button = e.target.closest('.quick-view-btn');
        if (!button) {
            // Не клик по кнопке быстрого просмотра, игнорируем
            return;
        }
        
        // Клик по кнопке быстрого просмотра обнаружен
        
        // Пропускаем кнопки, которые уже имеют onclick (динамически созданные)
        if (button.hasAttribute('onclick')) {
            return;
        }
        
        // Пропускаем ссылки, которые ведут на другую страницу
        if (button.tagName === 'A' && button.getAttribute('href') && !button.getAttribute('href').startsWith('#')) {
            return;
        }
        
        e.preventDefault();
        e.stopPropagation();
        
        // Используем window для доступа к функциям (на случай модульной загрузки)
        // Пробуем получить функции из window, если они там есть
        let openModal = window.openQuickViewModal;
        let openModalWithData = window.openQuickViewModalWithData;
        
        // Если функции не в window, но доступны в области видимости, используем их напрямую
        if (!openModalWithData && typeof openQuickViewModalWithData === 'function') {
            openModalWithData = openQuickViewModalWithData;
        }
        if (!openModal && typeof openQuickViewModal === 'function') {
            openModal = openQuickViewModal;
        }
        
        if (!openModalWithData) {
            console.error('Функция openQuickViewModalWithData не доступна. Попробуйте обновить страницу.');
            return;
        }
        
        // Находим родительскую карточку товара
        const productCard = button.closest('.product-card');
        if (!productCard) {
            // Если не нашли .product-card, ищем в карусели
            const carouselItem = button.closest('.carousel-item');
            if (carouselItem) {
                // Получаем данные из карусели
                const name = carouselItem.querySelector('.product-name')?.textContent || '';
                const description = carouselItem.querySelector('.product-desc')?.textContent || '';
                const priceText = carouselItem.querySelector('.product-price')?.textContent || '';
                const image = carouselItem.querySelector('img')?.src || '';
                
                // Парсим цену
                const priceMatch = priceText.match(/[\d\s]+/);
                const price = priceMatch ? parseInt(priceMatch[0].replace(/\s/g, '')) : 0;
                
                // Создаем временный объект товара
                const tempProduct = {
                    id: Date.now(), // Временный ID
                    name: name,
                    description: description,
                    price: price,
                    originalPrice: null,
                    image: image,
                    sizes: ['S', 'M', 'L', 'XL'], // По умолчанию
                    isNew: false,
                    isBestseller: false
                };
                
                // Открываем модальное окно с данными товара
                openModalWithData(tempProduct);
                return;
            }
            return;
        }
        
        // Получаем ID товара из data-атрибута
        const productId = productCard.getAttribute('data-product-id');
        if (productId && openModal) {
            openModal(parseInt(productId));
        } else {
            // Если нет ID, получаем данные напрямую из карточки
            const name = productCard.querySelector('.product-name')?.textContent || '';
            const description = productCard.querySelector('.product-desc')?.textContent || '';
            const priceText = productCard.querySelector('.product-price')?.textContent || '';
            const image = productCard.querySelector('img')?.src || '';
            const badge = productCard.querySelector('.product-badge');
            
            // Парсим цену
            const priceMatch = priceText.match(/[\d\s]+/);
            const price = priceMatch ? parseInt(priceMatch[0].replace(/\s/g, '')) : 0;
            
            // Создаем временный объект товара
            const tempProduct = {
                id: Date.now(), // Временный ID
                name: name,
                description: description,
                price: price,
                originalPrice: null,
                image: image,
                sizes: ['S', 'M', 'L', 'XL'], // По умолчанию
                isNew: badge?.classList.contains('badge-new') || false,
                isBestseller: badge?.classList.contains('bestseller') || false
            };
            
            // Открываем модальное окно с данными товара
            openModalWithData(tempProduct);
        }
    }
    
    // Проверяем наличие модального окна в DOM
    const quickViewModal = document.getElementById('quick-view-modal');
    if (!quickViewModal) {
        console.error('Модальное окно quick-view-modal не найдено в DOM при инициализации');
    }
    
    // Используем делегирование событий на document для надежности
    document.addEventListener('click', handleQuickViewClick);
    
    // Закрытие модального окна быстрого просмотра по ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const quickViewModal = document.getElementById('quick-view-modal');
            if (quickViewModal && quickViewModal.classList.contains('active')) {
                closeQuickViewModal();
            }
        }
    });
    
    // Закрытие модального окна быстрого просмотра при клике на overlay
    const quickViewModalOverlay = document.querySelector('.quick-view-modal-overlay');
    if (quickViewModalOverlay) {
        quickViewModalOverlay.addEventListener('click', function() {
            closeQuickViewModal();
        });
    }
});

// ==========================================================================
// КАТАЛОГ - Mock данные и функции
// ==========================================================================

// Mock данные товаров
const catalogProducts = [
    {
        id: 1,
        name: "Бюстгальтер Midnight Lace",
        description: "Нежное французское кружево",
        price: 7800,
        originalPrice: null,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/8f519f1bef-1895a91e1bd88105cd4a.png",
        type: ["bra"],
        category: ["sexy", "everyday"],
        sizes: ["75B", "75C", "80B", "80C", "85B"],
        isNew: true,
        isBestseller: false,
        discount: 0,
        popularity: 150,
        dateAdded: "2024-01-15"
    },
    {
        id: 2,
        name: "Комплект Ivory Dream",
        description: "Роскошный комплект из шелка",
        price: 12500,
        originalPrice: 15000,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/d34cd14776-fd8800389b5e3f0b7c82.png",
        type: ["set"],
        category: ["bridal", "cozy"],
        sizes: ["S", "M", "L", "XL"],
        isNew: false,
        isBestseller: true,
        discount: 17,
        popularity: 200,
        dateAdded: "2023-12-10"
    },
    {
        id: 3,
        name: "Трусы Lace Delight",
        description: "Кружевные трусы премиум качества",
        price: 3200,
        originalPrice: null,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/8f519f1bef-1895a91e1bd88105cd4a.png",
        type: ["panties"],
        category: ["everyday", "sexy"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        isNew: true,
        isBestseller: false,
        discount: 0,
        popularity: 120,
        dateAdded: "2024-01-20"
    },
    {
        id: 4,
        name: "Пижама Silk Comfort",
        description: "Уютная пижама из натурального шелка",
        price: 9800,
        originalPrice: 12000,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b4b7c4de51-082c1749c35819c5b24b.png",
        type: ["pajamas"],
        category: ["cozy", "everyday"],
        sizes: ["XS", "S", "M", "L", "XL"],
        isNew: false,
        isBestseller: true,
        discount: 18,
        popularity: 180,
        dateAdded: "2023-11-25"
    },
    {
        id: 5,
        name: "Тедди Black Elegance",
        description: "Сексуальное тедди с кружевными вставками",
        price: 11200,
        originalPrice: null,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/d34cd14776-fd8800389b5e3f0b7c82.png",
        type: ["teddy"],
        category: ["sexy"],
        sizes: ["S", "M", "L"],
        isNew: true,
        isBestseller: false,
        discount: 0,
        popularity: 95,
        dateAdded: "2024-02-01"
    },
    {
        id: 6,
        name: "Бюстгальтер Rose Petal",
        description: "Нежный розовый бюстгальтер",
        price: 8500,
        originalPrice: 10000,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/8f519f1bef-1895a91e1bd88105cd4a.png",
        type: ["bra"],
        category: ["bridal", "everyday"],
        sizes: ["75C", "75D", "80B", "80C", "80D", "85B", "85C"],
        isNew: false,
        isBestseller: true,
        discount: 15,
        popularity: 220,
        dateAdded: "2023-10-15"
    },
    {
        id: 7,
        name: "Комплект Sport Luxe",
        description: "Спортивный комплект премиум класса",
        price: 6800,
        originalPrice: null,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b968491bc7-138dd7e45dcca10c68bc.png",
        type: ["set"],
        category: ["sport"],
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        isNew: false,
        isBestseller: false,
        discount: 0,
        popularity: 75,
        dateAdded: "2023-09-20"
    },
    {
        id: 8,
        name: "Трусы Cotton Bliss",
        description: "Комфортные трусы из органического хлопка",
        price: 2800,
        originalPrice: null,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/8f519f1bef-1895a91e1bd88105cd4a.png",
        type: ["panties"],
        category: ["cozy", "everyday"],
        sizes: ["S", "M", "L", "XL", "XXL", "3XL", "4XL"],
        isNew: false,
        isBestseller: false,
        discount: 0,
        popularity: 110,
        dateAdded: "2023-08-10"
    },
    {
        id: 9,
        name: "Пижама Velvet Night",
        description: "Роскошная пижама из бархата",
        price: 13500,
        originalPrice: 16000,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b4b7c4de51-082c1749c35819c5b24b.png",
        type: ["pajamas"],
        category: ["cozy"],
        sizes: ["S", "M", "L", "XL"],
        isNew: false,
        isBestseller: true,
        discount: 16,
        popularity: 165,
        dateAdded: "2023-12-05"
    },
    {
        id: 10,
        name: "Бюстгальтер Pearl White",
        description: "Свадебный бюстгальтер с жемчужными деталями",
        price: 11800,
        originalPrice: null,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/d34cd14776-fd8800389b5e3f0b7c82.png",
        type: ["bra"],
        category: ["bridal"],
        sizes: ["75B", "75C", "80B", "80C", "80D", "85B", "85C", "90B"],
        isNew: true,
        isBestseller: false,
        discount: 0,
        popularity: 140,
        dateAdded: "2024-01-25"
    },
    {
        id: 11,
        name: "Тедди Red Passion",
        description: "Страстное красное тедди",
        price: 10500,
        originalPrice: 13000,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/d34cd14776-fd8800389b5e3f0b7c82.png",
        type: ["teddy"],
        category: ["sexy"],
        sizes: ["S", "M", "L"],
        isNew: false,
        isBestseller: false,
        discount: 19,
        popularity: 88,
        dateAdded: "2023-11-15"
    },
    {
        id: 12,
        name: "Комплект Everyday Elegance",
        description: "Элегантный повседневный комплект",
        price: 9200,
        originalPrice: null,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/8f519f1bef-1895a91e1bd88105cd4a.png",
        type: ["set"],
        category: ["everyday"],
        sizes: ["S", "M", "L", "XL"],
        isNew: false,
        isBestseller: false,
        discount: 0,
        popularity: 130,
        dateAdded: "2023-10-30"
    },
    {
        id: 13,
        name: "Бюстгальтер Lavender Mist",
        description: "Нежный лавандовый оттенок",
        price: 7200,
        originalPrice: null,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/8f519f1bef-1895a91e1bd88105cd4a.png",
        type: ["bra"],
        category: ["everyday", "cozy"],
        sizes: ["70B", "70C", "75B", "75C", "80B"],
        isNew: true,
        isBestseller: false,
        discount: 0,
        popularity: 105,
        dateAdded: "2024-02-10"
    },
    {
        id: 14,
        name: "Трусы Silk Touch",
        description: "Шелковистые трусы премиум качества",
        price: 3500,
        originalPrice: 4200,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/8f519f1bef-1895a91e1bd88105cd4a.png",
        type: ["panties"],
        category: ["sexy", "bridal"],
        sizes: ["S", "M", "L", "XL"],
        isNew: false,
        isBestseller: true,
        discount: 17,
        popularity: 175,
        dateAdded: "2023-12-20"
    },
    {
        id: 15,
        name: "Пижама Moonlight",
        description: "Романтичная пижама для особых вечеров",
        price: 11000,
        originalPrice: null,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b4b7c4de51-082c1749c35819c5b24b.png",
        type: ["pajamas"],
        category: ["cozy", "bridal"],
        sizes: ["XS", "S", "M", "L"],
        isNew: true,
        isBestseller: false,
        discount: 0,
        popularity: 125,
        dateAdded: "2024-01-30"
    },
    {
        id: 16,
        name: "Тедди Emerald Dream",
        description: "Изумрудное тедди с золотыми акцентами",
        price: 12800,
        originalPrice: 15000,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/d34cd14776-fd8800389b5e3f0b7c82.png",
        type: ["teddy"],
        category: ["sexy"],
        sizes: ["S", "M", "L"],
        isNew: false,
        isBestseller: false,
        discount: 15,
        popularity: 92,
        dateAdded: "2023-11-20"
    },
    {
        id: 17,
        name: "Комплект Vintage Rose",
        description: "Винтажный комплект в розовых тонах",
        price: 10200,
        originalPrice: null,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/8f519f1bef-1895a91e1bd88105cd4a.png",
        type: ["set"],
        category: ["bridal", "everyday"],
        sizes: ["S", "M", "L", "XL"],
        isNew: false,
        isBestseller: false,
        discount: 0,
        popularity: 145,
        dateAdded: "2023-10-05"
    },
    {
        id: 18,
        name: "Бюстгальтер Classic Black",
        description: "Классический черный бюстгальтер",
        price: 6500,
        originalPrice: null,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/8f519f1bef-1895a91e1bd88105cd4a.png",
        type: ["bra"],
        category: ["everyday"],
        sizes: ["75B", "75C", "75D", "80B", "80C", "80D", "85B", "85C"],
        isNew: false,
        isBestseller: true,
        discount: 0,
        popularity: 250,
        dateAdded: "2023-09-15"
    },
    {
        id: 19,
        name: "Трусы Lace Fantasy",
        description: "Фантазийные кружевные трусы",
        price: 2900,
        originalPrice: null,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/8f519f1bef-1895a91e1bd88105cd4a.png",
        type: ["panties"],
        category: ["sexy"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        isNew: true,
        isBestseller: false,
        discount: 0,
        popularity: 115,
        dateAdded: "2024-02-15"
    },
    {
        id: 20,
        name: "Пижама Cozy Morning",
        description: "Уютная пижама для утреннего кофе",
        price: 8900,
        originalPrice: 11000,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b4b7c4de51-082c1749c35819c5b24b.png",
        type: ["pajamas"],
        category: ["cozy", "everyday"],
        sizes: ["XS", "S", "M", "L", "XL"],
        isNew: false,
        isBestseller: true,
        discount: 19,
        popularity: 190,
        dateAdded: "2023-12-01"
    },
    {
        id: 21,
        name: "Бюстгальтер Nude Perfect",
        description: "Идеальный телесный оттенок",
        price: 8800,
        originalPrice: null,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/8f519f1bef-1895a91e1bd88105cd4a.png",
        type: ["bra"],
        category: ["everyday"],
        sizes: ["70C", "70D", "75B", "75C", "75D", "80B", "80C"],
        isNew: false,
        isBestseller: false,
        discount: 0,
        popularity: 160,
        dateAdded: "2023-11-10"
    },
    {
        id: 22,
        name: "Комплект Royal Blue",
        description: "Королевский синий комплект",
        price: 11500,
        originalPrice: 14000,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/d34cd14776-fd8800389b5e3f0b7c82.png",
        type: ["set"],
        category: ["sexy", "bridal"],
        sizes: ["S", "M", "L"],
        isNew: true,
        isBestseller: false,
        discount: 18,
        popularity: 135,
        dateAdded: "2024-01-18"
    },
    {
        id: 23,
        name: "Трусы Sporty Comfort",
        description: "Спортивные трусы для активного дня",
        price: 2400,
        originalPrice: null,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b968491bc7-138dd7e45dcca10c68bc.png",
        type: ["panties"],
        category: ["sport", "everyday"],
        sizes: ["S", "M", "L", "XL", "XXL", "3XL"],
        isNew: false,
        isBestseller: false,
        discount: 0,
        popularity: 85,
        dateAdded: "2023-09-05"
    },
    {
        id: 24,
        name: "Тедди Cherry Blossom",
        description: "Нежное тедди в цветах сакуры",
        price: 9800,
        originalPrice: null,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/d34cd14776-fd8800389b5e3f0b7c82.png",
        type: ["teddy"],
        category: ["sexy", "bridal"],
        sizes: ["S", "M", "L"],
        isNew: true,
        isBestseller: false,
        discount: 0,
        popularity: 100,
        dateAdded: "2024-02-05"
    },
    {
        id: 25,
        name: "Пижама Winter Warmth",
        description: "Теплая пижама для холодных вечеров",
        price: 12500,
        originalPrice: null,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b4b7c4de51-082c1749c35819c5b24b.png",
        type: ["pajamas"],
        category: ["cozy"],
        sizes: ["S", "M", "L", "XL"],
        isNew: false,
        isBestseller: false,
        discount: 0,
        popularity: 155,
        dateAdded: "2023-11-30"
    },
    {
        id: 26,
        name: "Бюстгальтер Push Up Delight",
        description: "Бюстгальтер с эффектом пуш-ап",
        price: 9500,
        originalPrice: 11500,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/8f519f1bef-1895a91e1bd88105cd4a.png",
        type: ["bra"],
        category: ["sexy", "everyday"],
        sizes: ["75B", "75C", "80B", "80C", "85B", "85C"],
        isNew: false,
        isBestseller: true,
        discount: 17,
        popularity: 210,
        dateAdded: "2023-10-20"
    },
    {
        id: 27,
        name: "Комплект Minimalist",
        description: "Минималистичный комплект в бежевых тонах",
        price: 8700,
        originalPrice: null,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/8f519f1bef-1895a91e1bd88105cd4a.png",
        type: ["set"],
        category: ["everyday"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        isNew: false,
        isBestseller: false,
        discount: 0,
        popularity: 140,
        dateAdded: "2023-10-12"
    },
    {
        id: 28,
        name: "Трусы High Waist",
        description: "Трусы с высокой талией",
        price: 3100,
        originalPrice: null,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/8f519f1bef-1895a91e1bd88105cd4a.png",
        type: ["panties"],
        category: ["everyday"],
        sizes: ["S", "M", "L", "XL"],
        isNew: true,
        isBestseller: false,
        discount: 0,
        popularity: 108,
        dateAdded: "2024-01-12"
    },
    {
        id: 29,
        name: "Бюстгальтер Lace Romance",
        description: "Романтичный кружевной бюстгальтер",
        price: 8200,
        originalPrice: null,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/8f519f1bef-1895a91e1bd88105cd4a.png",
        type: ["bra"],
        category: ["bridal", "sexy"],
        sizes: ["70B", "70C", "75B", "75C", "80B", "80C"],
        isNew: false,
        isBestseller: false,
        discount: 0,
        popularity: 170,
        dateAdded: "2023-11-05"
    },
    {
        id: 30,
        name: "Пижама Summer Breeze",
        description: "Легкая пижама для летних ночей",
        price: 7600,
        originalPrice: 9500,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b4b7c4de51-082c1749c35819c5b24b.png",
        type: ["pajamas"],
        category: ["cozy", "everyday"],
        sizes: ["XS", "S", "M", "L", "XL"],
        isNew: false,
        isBestseller: true,
        discount: 20,
        popularity: 195,
        dateAdded: "2023-12-15"
    },
    {
        id: 31,
        name: "Тедди Midnight Blue",
        description: "Темно-синее тедди с кружевом",
        price: 11000,
        originalPrice: null,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/d34cd14776-fd8800389b5e3f0b7c82.png",
        type: ["teddy"],
        category: ["sexy"],
        sizes: ["S", "M", "L"],
        isNew: false,
        isBestseller: false,
        discount: 0,
        popularity: 98,
        dateAdded: "2023-11-25"
    },
    {
        id: 32,
        name: "Комплект Floral Garden",
        description: "Цветочный комплект в пастельных тонах",
        price: 10800,
        originalPrice: null,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/8f519f1bef-1895a91e1bd88105cd4a.png",
        type: ["set"],
        category: ["bridal", "cozy"],
        sizes: ["S", "M", "L", "XL"],
        isNew: true,
        isBestseller: false,
        discount: 0,
        popularity: 128,
        dateAdded: "2024-02-20"
    },
    {
        id: 33,
        name: "Бюстгальтер Seamless",
        description: "Бесшовный бюстгальтер для комфорта",
        price: 6800,
        originalPrice: null,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/8f519f1bef-1895a91e1bd88105cd4a.png",
        type: ["bra"],
        category: ["everyday", "sport"],
        sizes: ["70B", "70C", "75B", "75C", "80B", "80C", "85B"],
        isNew: false,
        isBestseller: false,
        discount: 0,
        popularity: 148,
        dateAdded: "2023-10-08"
    },
    {
        id: 34,
        name: "Трусы Brazilian",
        description: "Бразильские трусы премиум качества",
        price: 3300,
        originalPrice: 4000,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/8f519f1bef-1895a91e1bd88105cd4a.png",
        type: ["panties"],
        category: ["sexy"],
        sizes: ["S", "M", "L", "XL"],
        isNew: false,
        isBestseller: true,
        discount: 18,
        popularity: 185,
        dateAdded: "2023-12-08"
    },
    {
        id: 35,
        name: "Пижама Elegant Night",
        description: "Элегантная пижама для особых случаев",
        price: 14200,
        originalPrice: 17000,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b4b7c4de51-082c1749c35819c5b24b.png",
        type: ["pajamas"],
        category: ["bridal", "cozy"],
        sizes: ["S", "M", "L"],
        isNew: false,
        isBestseller: false,
        discount: 16,
        popularity: 142,
        dateAdded: "2023-11-18"
    },
    {
        id: 36,
        name: "Бюстгальтер Strapless",
        description: "Без бретелек для особых нарядов",
        price: 9200,
        originalPrice: null,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/8f519f1bef-1895a91e1bd88105cd4a.png",
        type: ["bra"],
        category: ["sexy", "bridal"],
        sizes: ["75B", "75C", "80B", "80C", "85B", "85C"],
        isNew: true,
        isBestseller: false,
        discount: 0,
        popularity: 118,
        dateAdded: "2024-01-28"
    },
    {
        id: 37,
        name: "Комплект Sporty Chic",
        description: "Спортивный комплект в стильном дизайне",
        price: 7200,
        originalPrice: null,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b968491bc7-138dd7e45dcca10c68bc.png",
        type: ["set"],
        category: ["sport"],
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        isNew: false,
        isBestseller: false,
        discount: 0,
        popularity: 78,
        dateAdded: "2023-09-12"
    },
    {
        id: 38,
        name: "Трусы Thong Premium",
        description: "Премиум стринги из кружева",
        price: 2700,
        originalPrice: null,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/8f519f1bef-1895a91e1bd88105cd4a.png",
        type: ["panties"],
        category: ["sexy"],
        sizes: ["S", "M", "L", "XL"],
        isNew: false,
        isBestseller: false,
        discount: 0,
        popularity: 132,
        dateAdded: "2023-10-25"
    },
    {
        id: 39,
        name: "Тедди White Lace",
        description: "Белое кружевное тедди",
        price: 10200,
        originalPrice: 12000,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/d34cd14776-fd8800389b5e3f0b7c82.png",
        type: ["teddy"],
        category: ["bridal", "sexy"],
        sizes: ["S", "M", "L"],
        isNew: false,
        isBestseller: true,
        discount: 15,
        popularity: 168,
        dateAdded: "2023-12-22"
    },
    {
        id: 40,
        name: "Пижама Cozy Weekend",
        description: "Уютная пижама для выходных",
        price: 9400,
        originalPrice: null,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b4b7c4de51-082c1749c35819c5b24b.png",
        type: ["pajamas"],
        category: ["cozy", "everyday"],
        sizes: ["S", "M", "L", "XL"],
        isNew: false,
        isBestseller: false,
        discount: 0,
        popularity: 152,
        dateAdded: "2023-11-12"
    },
    {
        id: 41,
        name: "Бюстгальтер Plunge",
        description: "Бюстгальтер с глубоким вырезом",
        price: 8900,
        originalPrice: null,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/8f519f1bef-1895a91e1bd88105cd4a.png",
        type: ["bra"],
        category: ["sexy"],
        sizes: ["75C", "75D", "80B", "80C", "80D", "85B", "85C"],
        isNew: false,
        isBestseller: false,
        discount: 0,
        popularity: 138,
        dateAdded: "2023-10-18"
    },
    {
        id: 42,
        name: "Комплект Luxury Set",
        description: "Роскошный комплект с золотыми деталями",
        price: 13800,
        originalPrice: 16500,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/d34cd14776-fd8800389b5e3f0b7c82.png",
        type: ["set"],
        category: ["bridal", "sexy"],
        sizes: ["S", "M", "L"],
        isNew: true,
        isBestseller: false,
        discount: 16,
        popularity: 122,
        dateAdded: "2024-02-08"
    },
    {
        id: 43,
        name: "Трусы Seamless Comfort",
        description: "Бесшовные трусы для комфорта",
        price: 2600,
        originalPrice: null,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/8f519f1bef-1895a91e1bd88105cd4a.png",
        type: ["panties"],
        category: ["everyday", "sport"],
        sizes: ["S", "M", "L", "XL", "XXL", "3XL"],
        isNew: false,
        isBestseller: false,
        discount: 0,
        popularity: 112,
        dateAdded: "2023-09-28"
    },
    {
        id: 44,
        name: "Бюстгальтер T-Shirt",
        description: "Бюстгальтер для футболок",
        price: 7100,
        originalPrice: null,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/8f519f1bef-1895a91e1bd88105cd4a.png",
        type: ["bra"],
        category: ["everyday"],
        sizes: ["70B", "70C", "75B", "75C", "80B", "80C", "85B", "85C"],
        isNew: false,
        isBestseller: true,
        discount: 0,
        popularity: 225,
        dateAdded: "2023-09-10"
    },
    {
        id: 45,
        name: "Пижама Spring Collection",
        description: "Весенняя коллекция пижам",
        price: 10100,
        originalPrice: null,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b4b7c4de51-082c1749c35819c5b24b.png",
        type: ["pajamas"],
        category: ["cozy"],
        sizes: ["XS", "S", "M", "L", "XL"],
        isNew: true,
        isBestseller: false,
        discount: 0,
        popularity: 134,
        dateAdded: "2024-02-12"
    },
    {
        id: 46,
        name: "Тедди Purple Velvet",
        description: "Бархатное тедди в фиолетовых тонах",
        price: 11600,
        originalPrice: 13500,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/d34cd14776-fd8800389b5e3f0b7c82.png",
        type: ["teddy"],
        category: ["sexy"],
        sizes: ["S", "M", "L"],
        isNew: false,
        isBestseller: false,
        discount: 14,
        popularity: 102,
        dateAdded: "2023-11-08"
    },
    {
        id: 47,
        name: "Комплект Classic White",
        description: "Классический белый комплект",
        price: 9600,
        originalPrice: null,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/8f519f1bef-1895a91e1bd88105cd4a.png",
        type: ["set"],
        category: ["bridal", "everyday"],
        sizes: ["S", "M", "L", "XL"],
        isNew: false,
        isBestseller: false,
        discount: 0,
        popularity: 158,
        dateAdded: "2023-10-22"
    },
    {
        id: 48,
        name: "Бюстгальтер Full Coverage",
        description: "Бюстгальтер с полным покрытием",
        price: 8400,
        originalPrice: null,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/8f519f1bef-1895a91e1bd88105cd4a.png",
        type: ["bra"],
        category: ["everyday"],
        sizes: ["75C", "75D", "75E", "80B", "80C", "80D", "85B", "85C", "85D"],
        isNew: false,
        isBestseller: false,
        discount: 0,
        popularity: 162,
        dateAdded: "2023-11-02"
    },
    {
        id: 49,
        name: "Трусы Lace Trim",
        description: "Трусы с кружевной отделкой",
        price: 3000,
        originalPrice: null,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/8f519f1bef-1895a91e1bd88105cd4a.png",
        type: ["panties"],
        category: ["everyday", "sexy"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        isNew: true,
        isBestseller: false,
        discount: 0,
        popularity: 114,
        dateAdded: "2024-01-22"
    },
    {
        id: 50,
        name: "Пижама Autumn Leaves",
        description: "Пижама в осенних тонах",
        price: 10700,
        originalPrice: null,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b4b7c4de51-082c1749c35819c5b24b.png",
        type: ["pajamas"],
        category: ["cozy"],
        sizes: ["S", "M", "L", "XL"],
        isNew: false,
        isBestseller: false,
        discount: 0,
        popularity: 147,
        dateAdded: "2023-10-28"
    },
    {
        id: 51,
        name: "Бюстгальтер Demi Cup",
        description: "Бюстгальтер с чашкой деми",
        price: 7900,
        originalPrice: null,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/8f519f1bef-1895a91e1bd88105cd4a.png",
        type: ["bra"],
        category: ["sexy", "everyday"],
        sizes: ["70B", "70C", "75B", "75C", "80B", "80C"],
        isNew: false,
        isBestseller: false,
        discount: 0,
        popularity: 136,
        dateAdded: "2023-10-14"
    },
    {
        id: 52,
        name: "Комплект Pastel Dreams",
        description: "Комплект в пастельных тонах",
        price: 10400,
        originalPrice: null,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/8f519f1bef-1895a91e1bd88105cd4a.png",
        type: ["set"],
        category: ["bridal", "cozy"],
        sizes: ["S", "M", "L", "XL"],
        isNew: true,
        isBestseller: false,
        discount: 0,
        popularity: 129,
        dateAdded: "2024-02-18"
    },
    {
        id: 53,
        name: "Трусы Bikini Style",
        description: "Трусы в стиле бикини",
        price: 2800,
        originalPrice: null,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/8f519f1bef-1895a91e1bd88105cd4a.png",
        type: ["panties"],
        category: ["everyday"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        isNew: false,
        isBestseller: false,
        discount: 0,
        popularity: 106,
        dateAdded: "2023-09-22"
    },
    {
        id: 54,
        name: "Тедди Gold Accents",
        description: "Тедди с золотыми акцентами",
        price: 12400,
        originalPrice: 14500,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/d34cd14776-fd8800389b5e3f0b7c82.png",
        type: ["teddy"],
        category: ["sexy", "bridal"],
        sizes: ["S", "M", "L"],
        isNew: false,
        isBestseller: true,
        discount: 14,
        popularity: 178,
        dateAdded: "2023-12-12"
    },
    {
        id: 55,
        name: "Пижама Holiday Special",
        description: "Праздничная пижама",
        price: 11800,
        originalPrice: null,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b4b7c4de51-082c1749c35819c5b24b.png",
        type: ["pajamas"],
        category: ["cozy", "bridal"],
        sizes: ["S", "M", "L", "XL"],
        isNew: false,
        isBestseller: false,
        discount: 0,
        popularity: 149,
        dateAdded: "2023-11-28"
    },
    {
        id: 56,
        name: "Бюстгальтер Longline",
        description: "Длинный бюстгальтер",
        price: 9900,
        originalPrice: null,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/8f519f1bef-1895a91e1bd88105cd4a.png",
        type: ["bra"],
        category: ["sexy"],
        sizes: ["75B", "75C", "80B", "80C", "85B", "85C"],
        isNew: true,
        isBestseller: false,
        discount: 0,
        popularity: 121,
        dateAdded: "2024-01-08"
    },
    {
        id: 57,
        name: "Комплект Sporty Luxe",
        description: "Спортивный комплект премиум",
        price: 7500,
        originalPrice: null,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b968491bc7-138dd7e45dcca10c68bc.png",
        type: ["set"],
        category: ["sport"],
        sizes: ["XS", "S", "M", "L", "XL"],
        isNew: false,
        isBestseller: false,
        discount: 0,
        popularity: 82,
        dateAdded: "2023-09-18"
    },
    {
        id: 58,
        name: "Трусы High Cut",
        description: "Трусы с высоким вырезом",
        price: 3100,
        originalPrice: null,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/8f519f1bef-1895a91e1bd88105cd4a.png",
        type: ["panties"],
        category: ["sexy"],
        sizes: ["S", "M", "L", "XL"],
        isNew: false,
        isBestseller: false,
        discount: 0,
        popularity: 124,
        dateAdded: "2023-10-30"
    },
    {
        id: 59,
        name: "Бюстгальтер Wireless",
        description: "Бюстгальтер без косточек",
        price: 7600,
        originalPrice: null,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/8f519f1bef-1895a91e1bd88105cd4a.png",
        type: ["bra"],
        category: ["cozy", "everyday"],
        sizes: ["70B", "70C", "75B", "75C", "80B", "80C", "85B"],
        isNew: false,
        isBestseller: true,
        discount: 0,
        popularity: 205,
        dateAdded: "2023-10-02"
    },
    {
        id: 60,
        name: "Пижама Cozy Nights",
        description: "Уютные ночи в мягкой пижаме",
        price: 11200,
        originalPrice: null,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b4b7c4de51-082c1749c35819c5b24b.png",
        type: ["pajamas"],
        category: ["cozy"],
        sizes: ["S", "M", "L", "XL"],
        isNew: false,
        isBestseller: false,
        discount: 0,
        popularity: 153,
        dateAdded: "2023-11-22"
    },
    {
        id: 61,
        name: "Тедди Red Velvet",
        description: "Красное бархатное тедди",
        price: 10900,
        originalPrice: 12800,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/d34cd14776-fd8800389b5e3f0b7c82.png",
        type: ["teddy"],
        category: ["sexy"],
        sizes: ["S", "M", "L"],
        isNew: false,
        isBestseller: false,
        discount: 15,
        popularity: 96,
        dateAdded: "2023-11-14"
    },
    {
        id: 62,
        name: "Комплект Elegant Touch",
        description: "Элегантный комплект с изысканными деталями",
        price: 12100,
        originalPrice: null,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/8f519f1bef-1895a91e1bd88105cd4a.png",
        type: ["set"],
        category: ["bridal", "sexy"],
        sizes: ["S", "M", "L"],
        isNew: true,
        isBestseller: false,
        discount: 0,
        popularity: 126,
        dateAdded: "2024-02-14"
    },
    {
        id: 63,
        name: "Бюстгальтер Convertible",
        description: "Многофункциональный бюстгальтер",
        price: 9100,
        originalPrice: null,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/8f519f1bef-1895a91e1bd88105cd4a.png",
        type: ["bra"],
        category: ["everyday"],
        sizes: ["75B", "75C", "80B", "80C", "85B", "85C"],
        isNew: false,
        isBestseller: false,
        discount: 0,
        popularity: 144,
        dateAdded: "2023-10-26"
    },
    {
        id: 64,
        name: "Трусы Seamless Invisible",
        description: "Невидимые бесшовные трусы",
        price: 2900,
        originalPrice: null,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/8f519f1bef-1895a91e1bd88105cd4a.png",
        type: ["panties"],
        category: ["everyday"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        isNew: false,
        isBestseller: false,
        discount: 0,
        popularity: 119,
        dateAdded: "2023-09-30"
    },
    {
        id: 65,
        name: "Пижама Silk Elegance",
        description: "Шелковая пижама элегантного кроя",
        price: 13200,
        originalPrice: 15500,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b4b7c4de51-082c1749c35819c5b24b.png",
        type: ["pajamas"],
        category: ["bridal", "cozy"],
        sizes: ["S", "M", "L", "XL"],
        isNew: false,
        isBestseller: true,
        discount: 15,
        popularity: 172,
        dateAdded: "2023-12-18"
    },
    {
        id: 66,
        name: "Бюстгальтер Racerback",
        description: "Бюстгальтер с перекрестными лямками",
        price: 7300,
        originalPrice: null,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/8f519f1bef-1895a91e1bd88105cd4a.png",
        type: ["bra"],
        category: ["sport", "everyday"],
        sizes: ["70B", "70C", "75B", "75C", "80B", "80C"],
        isNew: false,
        isBestseller: false,
        discount: 0,
        popularity: 131,
        dateAdded: "2023-10-04"
    },
    {
        id: 67,
        name: "Комплект Romantic",
        description: "Романтичный комплект для особых моментов",
        price: 11300,
        originalPrice: null,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/d34cd14776-fd8800389b5e3f0b7c82.png",
        type: ["set"],
        category: ["bridal", "sexy"],
        sizes: ["S", "M", "L"],
        isNew: false,
        isBestseller: false,
        discount: 0,
        popularity: 141,
        dateAdded: "2023-11-06"
    },
    {
        id: 68,
        name: "Трусы Lace Detail",
        description: "Трусы с изысканной кружевной отделкой",
        price: 3200,
        originalPrice: null,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/8f519f1bef-1895a91e1bd88105cd4a.png",
        type: ["panties"],
        category: ["sexy", "bridal"],
        sizes: ["S", "M", "L", "XL"],
        isNew: true,
        isBestseller: false,
        discount: 0,
        popularity: 116,
        dateAdded: "2024-01-16"
    },
    {
        id: 69,
        name: "Тедди Black Lace",
        description: "Черное кружевное тедди",
        price: 10300,
        originalPrice: null,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/d34cd14776-fd8800389b5e3f0b7c82.png",
        type: ["teddy"],
        category: ["sexy"],
        sizes: ["S", "M", "L"],
        isNew: false,
        isBestseller: false,
        discount: 0,
        popularity: 104,
        dateAdded: "2023-10-16"
    },
    {
        id: 70,
        name: "Пижама Comfort Plus",
        description: "Максимальный комфорт для отдыха",
        price: 9700,
        originalPrice: null,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b4b7c4de51-082c1749c35819c5b24b.png",
        type: ["pajamas"],
        category: ["cozy", "everyday"],
        sizes: ["XS", "S", "M", "L", "XL"],
        isNew: false,
        isBestseller: false,
        discount: 0,
        popularity: 156,
        dateAdded: "2023-11-20"
    },
    {
        id: 71,
        name: "Бюстгальтер Balconette",
        description: "Бюстгальтер балконет",
        price: 8600,
        originalPrice: null,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/8f519f1bef-1895a91e1bd88105cd4a.png",
        type: ["bra"],
        category: ["sexy", "everyday"],
        sizes: ["70C", "75B", "75C", "80B", "80C", "85B"],
        isNew: false,
        isBestseller: false,
        discount: 0,
        popularity: 139,
        dateAdded: "2023-10-10"
    },
    {
        id: 72,
        name: "Комплект Deluxe",
        description: "Делюкс комплект премиум качества",
        price: 14400,
        originalPrice: 17000,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/d34cd14776-fd8800389b5e3f0b7c82.png",
        type: ["set"],
        category: ["bridal", "sexy"],
        sizes: ["S", "M", "L"],
        isNew: false,
        isBestseller: true,
        discount: 15,
        popularity: 188,
        dateAdded: "2023-12-25"
    },
    {
        id: 73,
        name: "Трусы Classic Brief",
        description: "Классические трусы",
        price: 2500,
        originalPrice: null,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/8f519f1bef-1895a91e1bd88105cd4a.png",
        type: ["panties"],
        category: ["everyday"],
        sizes: ["S", "M", "L", "XL", "XXL", "3XL", "4XL"],
        isNew: false,
        isBestseller: false,
        discount: 0,
        popularity: 103,
        dateAdded: "2023-09-08"
    },
    {
        id: 74,
        name: "Пижама Dreamy Nights",
        description: "Сновидческие ночи в мягкой пижаме",
        price: 10500,
        originalPrice: null,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b4b7c4de51-082c1749c35819c5b24b.png",
        type: ["pajamas"],
        category: ["cozy"],
        sizes: ["S", "M", "L", "XL"],
        isNew: true,
        isBestseller: false,
        discount: 0,
        popularity: 127,
        dateAdded: "2024-02-02"
    },
    {
        id: 75,
        name: "Бюстгальтер Minimizer",
        description: "Бюстгальтер-минимизатор",
        price: 9000,
        originalPrice: null,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/8f519f1bef-1895a91e1bd88105cd4a.png",
        type: ["bra"],
        category: ["everyday"],
        sizes: ["75C", "75D", "75E", "80C", "80D", "80E", "85C", "85D"],
        isNew: false,
        isBestseller: false,
        discount: 0,
        popularity: 146,
        dateAdded: "2023-11-04"
    },
    {
        id: 76,
        name: "Тедди Silver Lining",
        description: "Тедди с серебряными акцентами",
        price: 11500,
        originalPrice: null,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/d34cd14776-fd8800389b5e3f0b7c82.png",
        type: ["teddy"],
        category: ["sexy", "bridal"],
        sizes: ["S", "M", "L"],
        isNew: false,
        isBestseller: false,
        discount: 0,
        popularity: 101,
        dateAdded: "2023-10-24"
    },
    {
        id: 77,
        name: "Комплект Ultimate Comfort",
        description: "Максимальный комфорт в каждом элементе",
        price: 9900,
        originalPrice: null,
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/8f519f1bef-1895a91e1bd88105cd4a.png",
        type: ["set"],
        category: ["cozy", "everyday"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        isNew: false,
        isBestseller: false,
        discount: 0,
        popularity: 137,
        dateAdded: "2023-10-20"
    }
];

// Глобальные переменные для каталога
let filteredProducts = [...catalogProducts];
let currentSort = 'popularity';
let activeFilters = {
    type: [],
    category: [],
    size: []
};

// Переменные для пагинации
let currentPage = 1;
const itemsPerPage = 30;

// Функции-обертки для пагинации (для использования в onclick)
function goToPrevPage() {
    if (currentPage > 1) {
        goToPage(currentPage - 1);
    }
}

function goToNextPage() {
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    if (currentPage < totalPages) {
        goToPage(currentPage + 1);
    }
}

// Функции управления модальным окном фильтров
function openFiltersModal() {
    const modal = document.getElementById('filters-modal');
    const filterBtn = document.getElementById('filter-btn');
    if (modal && filterBtn) {
        // Восстанавливаем состояние чекбоксов из активных фильтров
        restoreFilterState();
        
        modal.classList.add('active');
        filterBtn.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
        
        // Фокус на первом элементе для доступности
        const firstInput = modal.querySelector('.filter-input');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
        }
        
        // Устанавливаем aria-hidden для основного контента
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.setAttribute('aria-hidden', 'true');
        }
    }
}

// Функция восстановления состояния фильтров в модальном окне
function restoreFilterState() {
    // Восстанавливаем чекбоксы типов
    document.querySelectorAll('input[name="type"]').forEach(input => {
        input.checked = activeFilters.type.includes(input.value);
    });
    
    // Восстанавливаем чекбоксы категорий
    document.querySelectorAll('input[name="category"]').forEach(input => {
        input.checked = activeFilters.category.includes(input.value);
    });
    
    // Восстанавливаем чекбоксы размеров
    document.querySelectorAll('input[name="size"]').forEach(input => {
        input.checked = activeFilters.size.includes(input.value);
    });
    
    // Обновляем счетчик
    updateFilterCount();
}

function closeFiltersModal() {
    const modal = document.getElementById('filters-modal');
    const filterBtn = document.getElementById('filter-btn');
    if (modal && filterBtn) {
        // Восстанавливаем состояние чекбоксов из активных фильтров
        // (отменяем несохраненные изменения)
        restoreFilterState();
        
        modal.classList.remove('active');
        filterBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        
        // Возвращаем фокус на кнопку фильтра
        filterBtn.focus();
        
        // Убираем aria-hidden с основного контента
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.removeAttribute('aria-hidden');
        }
    }
}

// Функция обновления счетчика активных фильтров
function updateFilterCount() {
    const typeInputs = document.querySelectorAll('input[name="type"]:checked');
    const categoryInputs = document.querySelectorAll('input[name="category"]:checked');
    const sizeInputs = document.querySelectorAll('input[name="size"]:checked');
    
    const totalCount = typeInputs.length + categoryInputs.length + sizeInputs.length;
    const filterCountEl = document.getElementById('filter-count');
    
    if (filterCountEl) {
        if (totalCount > 0) {
            filterCountEl.textContent = totalCount;
            filterCountEl.style.display = 'inline-flex';
        } else {
            filterCountEl.style.display = 'none';
        }
    }
}

// Функция применения фильтров
function applyFilters() {
    // Собираем выбранные фильтры
    const selectedTypes = Array.from(document.querySelectorAll('input[name="type"]:checked')).map(cb => cb.value);
    const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked')).map(cb => cb.value);
    const selectedSizes = Array.from(document.querySelectorAll('input[name="size"]:checked')).map(cb => cb.value);
    
    // Сохраняем активные фильтры
    activeFilters = {
        type: selectedTypes,
        category: selectedCategories,
        size: selectedSizes
    };
    
    // Применяем фильтры к товарам
    applyFiltersToProducts();
    
    // Закрываем модальное окно
    closeFiltersModal();
}

// Функция применения фильтров к товарам (отдельно для возможности вызова без закрытия модального окна)
function applyFiltersToProducts() {
    // Применяем фильтры
    filteredProducts = catalogProducts.filter(product => {
        // Фильтр по типу: товар должен содержать хотя бы один выбранный тип
        if (activeFilters.type.length > 0) {
            const hasType = activeFilters.type.some(type => product.type.includes(type));
            if (!hasType) return false;
        }
        
        // Фильтр по категории: товар должен содержать хотя бы одну выбранную категорию
        if (activeFilters.category.length > 0) {
            const hasCategory = activeFilters.category.some(cat => product.category.includes(cat));
            if (!hasCategory) return false;
        }
        
        // Фильтр по размеру: товар должен иметь хотя бы один выбранный размер
        if (activeFilters.size.length > 0) {
            const hasSize = activeFilters.size.some(size => product.sizes.includes(size));
            if (!hasSize) return false;
        }
        
        return true;
    });
    
    // Применяем текущую сортировку к отфильтрованным товарам
    filteredProducts.sort((a, b) => {
        switch (currentSort) {
            case 'popularity':
                // Сначала бестселлеры, затем обычные товары
                // Внутри каждой группы сортируем по популярности (по убыванию)
                if (a.isBestseller && !b.isBestseller) return -1;
                if (!a.isBestseller && b.isBestseller) return 1;
                return b.popularity - a.popularity;
            case 'price-asc':
                return a.price - b.price;
            case 'price-desc':
                return b.price - a.price;
            case 'discount':
                return b.discount - a.discount;
            case 'newest':
                return new Date(b.dateAdded) - new Date(a.dateAdded);
            default:
                return 0;
        }
    });
    
    // Сбрасываем на первую страницу при применении фильтров
    currentPage = 1;
    
    // Обновляем отображение
    renderProducts(filteredProducts);
    updateProductCount(filteredProducts.length);
    updateFilterCount();
}

// Функция сброса фильтров
function resetFilters() {
    // Сбрасываем все чекбоксы
    document.querySelectorAll('.filter-input').forEach(input => {
        input.checked = false;
    });
    
    // Сбрасываем активные фильтры
    activeFilters = {
        type: [],
        category: [],
        size: []
    };
    
    // Показываем все товары
    filteredProducts = [...catalogProducts];
    
    // Сбрасываем на первую страницу
    currentPage = 1;
    
    // Применяем текущую сортировку
    sortProducts(currentSort);
    
    // Обновляем отображение
    renderProducts(filteredProducts);
    updateProductCount(filteredProducts.length);
    updateFilterCount();
    
    // Если модальное окно открыто, не закрываем его (пользователь может продолжить выбор)
}

// Функция сортировки товаров
function sortProducts(sortType) {
    currentSort = sortType;
    
    // Если есть активные фильтры, применяем их (они уже применят сортировку)
    if (activeFilters.type.length > 0 || activeFilters.category.length > 0 || activeFilters.size.length > 0) {
        // Применяем фильтры и сортировку
        applyFiltersToProducts();
        return; // applyFiltersToProducts уже вызывает renderProducts
    }
    
    // Если фильтров нет, сортируем все товары
    filteredProducts = [...catalogProducts];
    
    filteredProducts.sort((a, b) => {
        switch (sortType) {
            case 'popularity':
                // Сначала бестселлеры, затем обычные товары
                // Внутри каждой группы сортируем по популярности (по убыванию)
                if (a.isBestseller && !b.isBestseller) return -1;
                if (!a.isBestseller && b.isBestseller) return 1;
                return b.popularity - a.popularity;
            case 'price-asc':
                return a.price - b.price;
            case 'price-desc':
                return b.price - a.price;
            case 'discount':
                return b.discount - a.discount;
            case 'newest':
                return new Date(b.dateAdded) - new Date(a.dateAdded);
            default:
                return 0;
        }
    });
    
    // Сбрасываем на первую страницу при изменении сортировки
    currentPage = 1;
    
    renderProducts(filteredProducts);
    updateProductCount(filteredProducts.length);
}

// Обработчик изменения сортировки
function handleSortChange(event) {
    const sortType = event.target.value;
    sortProducts(sortType);
}

// Функция создания карточки товара
function createProductCard(product) {
    const badge = product.isNew ? '<div class="product-badge badge-new">NEW</div>' : 
                  product.isBestseller ? '<div class="product-badge bestseller">BESTSELLER</div>' : '';
    
    const priceHTML = product.originalPrice ? 
        `<p class="product-price">
            <span style="text-decoration: line-through; opacity: 0.6; font-size: 1.2rem; margin-right: 0.5rem;">${product.originalPrice.toLocaleString('ru-RU')} ₽</span>
            ${product.price.toLocaleString('ru-RU')} ₽
        </p>` :
        `<p class="product-price">${product.price.toLocaleString('ru-RU')} ₽</p>`;
    
    return `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-image-wrapper">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <div class="product-overlay">
                    <button class="quick-view-btn" onclick="openQuickViewModal(${product.id})" aria-label="Быстрый просмотр товара ${product.name}">БЫСТРЫЙ ПРОСМОТР</button>
                </div>
                ${badge}
            </div>
            <h4 class="product-name">${product.name}</h4>
            <p class="product-desc">${product.description}</p>
            ${priceHTML}
        </div>
    `;
}

// Функция рендеринга товаров с пагинацией
function renderProducts(products) {
    const grid = document.getElementById('products-grid');
    const emptyState = document.getElementById('empty-state');
    const pagination = document.getElementById('pagination');
    
    if (!grid) return;
    
    if (products.length === 0) {
        grid.style.display = 'none';
        if (emptyState) {
            emptyState.style.display = 'block';
        }
        if (pagination) {
            pagination.style.display = 'none';
        }
    } else {
        grid.style.display = 'grid';
        if (emptyState) {
            emptyState.style.display = 'none';
        }
        
        // Вычисляем общее количество страниц
        const totalPages = Math.ceil(products.length / itemsPerPage);
        
        // Сбрасываем на первую страницу, если текущая страница больше общего количества
        if (currentPage > totalPages) {
            currentPage = 1;
        }
        
        // Вычисляем индексы для текущей страницы
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const productsToShow = products.slice(startIndex, endIndex);
        
        // Рендерим товары текущей страницы
        grid.innerHTML = productsToShow.map(product => createProductCard(product)).join('');
        
        // Рендерим пагинацию, если товаров больше чем на одной странице
        if (totalPages > 1) {
            renderPagination(totalPages);
            if (pagination) {
                pagination.style.display = 'flex';
            }
        } else {
            if (pagination) {
                pagination.style.display = 'none';
            }
        }
    }
}

// Функция обновления счетчика товаров
function updateProductCount(count) {
    const countEl = document.getElementById('products-count');
    if (countEl) {
        const word = count === 1 ? 'товар' : count < 5 ? 'товара' : 'товаров';
        countEl.textContent = `${count} ${word}`;
    }
}

// Функция перехода на страницу
function goToPage(page) {
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    
    if (page < 1 || page > totalPages) {
        return;
    }
    
    currentPage = page;
    
    // Напрямую рендерим товары без сброса страницы
    renderProducts(filteredProducts);
    
    // Прокручиваем к началу секции каталога
    const catalogSection = document.getElementById('catalog-page');
    if (catalogSection) {
        const headerHeight = document.getElementById('header')?.offsetHeight || 0;
        const sectionTop = catalogSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({ top: sectionTop, behavior: 'smooth' });
    } else {
        // Если секция не найдена, прокручиваем в самый верх
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Функция рендеринга пагинации
function renderPagination(totalPages) {
    const paginationPages = document.getElementById('pagination-pages');
    const prevBtn = document.getElementById('pagination-prev');
    const nextBtn = document.getElementById('pagination-next');
    
    if (!paginationPages) return;
    
    // Обновляем состояние кнопок "Назад" и "Вперед"
    if (prevBtn) {
        prevBtn.disabled = currentPage === 1;
    }
    if (nextBtn) {
        nextBtn.disabled = currentPage === totalPages;
    }
    
    // Генерируем кнопки страниц
    let paginationHTML = '';
    
    // Всегда показываем первую страницу
    if (totalPages <= 7) {
        // Если страниц 7 или меньше, показываем все
        for (let i = 1; i <= totalPages; i++) {
            paginationHTML += `
                <button onclick="goToPage(${i})" class="pagination-btn pagination-btn-page ${i === currentPage ? 'active' : ''}" aria-label="Страница ${i}" ${i === currentPage ? 'aria-current="page"' : ''}>
                    ${i}
                </button>
            `;
        }
    } else {
        // Если страниц больше 7, показываем с многоточием
        if (currentPage <= 3) {
            // Показываем первые 3 страницы, многоточие, последние 2
            for (let i = 1; i <= 3; i++) {
                paginationHTML += `
                    <button onclick="goToPage(${i})" class="pagination-btn pagination-btn-page ${i === currentPage ? 'active' : ''}" aria-label="Страница ${i}" ${i === currentPage ? 'aria-current="page"' : ''}>
                        ${i}
                    </button>
                `;
            }
            paginationHTML += '<span class="pagination-ellipsis">...</span>';
            for (let i = totalPages - 1; i <= totalPages; i++) {
                paginationHTML += `
                    <button onclick="goToPage(${i})" class="pagination-btn pagination-btn-page ${i === currentPage ? 'active' : ''}" aria-label="Страница ${i}" ${i === currentPage ? 'aria-current="page"' : ''}>
                        ${i}
                    </button>
                `;
            }
        } else if (currentPage >= totalPages - 2) {
            // Показываем первые 2 страницы, многоточие, последние 3
            for (let i = 1; i <= 2; i++) {
                paginationHTML += `
                    <button onclick="goToPage(${i})" class="pagination-btn pagination-btn-page ${i === currentPage ? 'active' : ''}" aria-label="Страница ${i}" ${i === currentPage ? 'aria-current="page"' : ''}>
                        ${i}
                    </button>
                `;
            }
            paginationHTML += '<span class="pagination-ellipsis">...</span>';
            for (let i = totalPages - 2; i <= totalPages; i++) {
                paginationHTML += `
                    <button onclick="goToPage(${i})" class="pagination-btn pagination-btn-page ${i === currentPage ? 'active' : ''}" aria-label="Страница ${i}" ${i === currentPage ? 'aria-current="page"' : ''}>
                        ${i}
                    </button>
                `;
            }
        } else {
            // Показываем первую страницу, многоточие, текущую и соседние, многоточие, последнюю
            paginationHTML += `
                <button onclick="goToPage(1)" class="pagination-btn pagination-btn-page ${1 === currentPage ? 'active' : ''}" aria-label="Страница 1" ${1 === currentPage ? 'aria-current="page"' : ''}>
                    1
                </button>
            `;
            paginationHTML += '<span class="pagination-ellipsis">...</span>';
            for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                paginationHTML += `
                    <button onclick="goToPage(${i})" class="pagination-btn pagination-btn-page ${i === currentPage ? 'active' : ''}" aria-label="Страница ${i}" ${i === currentPage ? 'aria-current="page"' : ''}>
                        ${i}
                    </button>
                `;
            }
            paginationHTML += '<span class="pagination-ellipsis">...</span>';
            paginationHTML += `
                <button onclick="goToPage(${totalPages})" class="pagination-btn pagination-btn-page ${totalPages === currentPage ? 'active' : ''}" aria-label="Страница ${totalPages}" ${totalPages === currentPage ? 'aria-current="page"' : ''}>
                    ${totalPages}
                </button>
            `;
        }
    }
    
    paginationPages.innerHTML = paginationHTML;
}

// Инициализация каталога
function initCatalog() {
    // Инициализируем счетчик фильтров
    updateFilterCount();
    
    // Сбрасываем на первую страницу
    currentPage = 1;
    
    // Устанавливаем сортировку по умолчанию (это также отобразит все товары)
    sortProducts('popularity');
    
    // Обработчик ESC для закрытия модального окна (только один раз)
    if (!window.catalogEscHandlerAdded) {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const modal = document.getElementById('filters-modal');
                if (modal && modal.classList.contains('active')) {
                    closeFiltersModal();
                }
            }
        });
        window.catalogEscHandlerAdded = true;
    }
    
    // Обработчик клика на overlay для закрытия модального окна
    const overlay = document.querySelector('.filters-modal-overlay');
    if (overlay && !overlay.hasAttribute('data-listener-added')) {
        overlay.addEventListener('click', closeFiltersModal);
        overlay.setAttribute('data-listener-added', 'true');
    }
}

// Функции модального окна уже определены выше перед DOMContentLoaded
// Дубликаты удалены для избежания конфликтов

// Экспортируем функции в window для доступа из HTML (onclick)
// Это нужно для работы с type="module" в Vite
window.openMenu = openMenu;
window.closeMenu = closeMenu;
window.toggleTheme = toggleTheme;
window.showNotification = showNotification;
window.hideNotification = hideNotification;
window.handleContactSubmit = handleContactSubmit;
window.updateCalculatorFields = updateCalculatorFields;
window.handleSizeCalculatorSubmit = handleSizeCalculatorSubmit;
window.openSizeGuideModal = openSizeGuideModal;
window.closeSizeGuideModal = closeSizeGuideModal;
window.scrollCarousel = scrollCarousel;
window.openFiltersModal = openFiltersModal;
window.closeFiltersModal = closeFiltersModal;
window.applyFilters = applyFilters;
window.resetFilters = resetFilters;
window.handleSortChange = handleSortChange;
window.goToPage = goToPage;
window.goToPrevPage = goToPrevPage;
window.goToNextPage = goToNextPage;
// Экспортируем функции быстрого просмотра для доступа из HTML (onclick)
window.openQuickViewModal = openQuickViewModal;
window.openQuickViewModalWithData = openQuickViewModalWithData;
window.closeQuickViewModal = closeQuickViewModal;
window.openQuickViewFromCard = openQuickViewFromCard;

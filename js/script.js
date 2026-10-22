/* ============================================
1. АНИМАЦИЯ ПОЯВЛЕНИЯ ПРИ СКРОЛЛЕ
============================================ */
document.addEventListener('DOMContentLoaded', function () {

const animatedElements = document.querySelectorAll(
'.feature-card, .service-card, .portfolio__item, .master__card, .section-title, .calc-form, .step-card, .price__row'
);

animatedElements.forEach((el) => {
el.style.opacity = '0';
el.style.transform = 'translateY(40px)';
el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
});

function checkVisibility() {
const windowHeight = window.innerHeight;

animatedElements.forEach((el, index) => {
const rect = el.getBoundingClientRect();
const isVisible = rect.top < windowHeight - 80;

if (isVisible) {
setTimeout(() => {
el.style.opacity = '1';
el.style.transform = 'translateY(0)';
}, (index % 4) * 100);
}
});
}

checkVisibility();
window.addEventListener('scroll', checkVisibility);
});


/* ============================================
2. АНИМАЦИЯ СЧЁТЧИКА
============================================ */
document.addEventListener('DOMContentLoaded', function () {

const counters = document.querySelectorAll('.counter');
let counterStarted = false;

function animateCounters() {
const windowHeight = window.innerHeight;

counters.forEach((counter) => {
const rect = counter.getBoundingClientRect();

if (rect.top < windowHeight - 100 && !counterStarted) {
counterStarted = true;

const target = +counter.getAttribute('data-target');
const duration = 1500;
const stepTime = 20;
const totalSteps = duration / stepTime;
const increment = target / totalSteps;

let current = 0;

const timer = setInterval(() => {
current += increment;
if (current >= target) {
counter.textContent = target;
clearInterval(timer);
} else {
counter.textContent = Math.floor(current);
}
}, stepTime);
}
});
}

animateCounters();
window.addEventListener('scroll', animateCounters);
});


/* ============================================
3. КАЛЬКУЛЯТОР СТОИМОСТИ (универсальный)
============================================ */
document.addEventListener('DOMContentLoaded', function () {

const form = document.getElementById('calcForm');
if (!form) return;

// ========== ЦЕНЫ ПО ПЛОЩАДИ ==========
const prices = {
'kamen': { price: 4000, label: 'Каменный ковёр (цоколь)' },
'kamen-stupeni': { price: 5000, label: 'Каменный ковёр (ступени)' },
'kamen-otmostka': { price: 3500, label: 'Каменный ковёр (отмостка)' },
'kamen-ukladka': { price: 2000, label: 'Укладка каменного ковра' },
'beton-otmostka': { price: 2000, label: 'Отмостка дома' },
'beton-ploshchadka': { price: 1400, label: 'Площадка под авто' },
'beton-poly': { price: 1800, label: 'Бетонные полы' },
'beton-styazhka': { price: 700, label: 'Полусухая стяжка' },
'beton-styazhka-beton': { price: 1000, label: 'Бетонная стяжка' },
'beton-styazhka-suhaya':{ price: 600, label: 'Сухая стяжка Knauf' },
'beton-garazh': { price: 700, label: 'Выравнивание в гараже' },
'beton-uprochnenie': { price: 700, label: 'Упрочнение бетона' },
'uteplenie-cokol': { price: 800, label: 'Утепление цоколя ЭППС' },
'uteplenie-minvata': { price: 300, label: 'Утепление минватой' },
'otdelka-sayding': { price: 1600, label: 'Отделка сайдингом' },
'otdelka-fasad': { price: 1000, label: 'Отделка фасада' },
'otdelka-cokol': { price: 1600, label: 'Отделка + утепление цоколя' },
'otdelka-armstrong': { price: 600, label: 'Потолок Армстронг' },
'otdelka-vyravnivanie': { price: 200, label: 'Выравнивание участка' },
'otdelka-oboi': { price: 200, label: 'Обои / покраска' },
'krovlya-remont': { price: 800, label: 'Ремонт кровли без огня' },
'krovlya-garazh': { price: 700, label: 'Ремонт кровли гаража' },
'krovlya-ploskaya': { price: 700, label: 'Ремонт плоских/скатных крыш' },
'krovlya-gidro': { price: 700, label: 'Гидроизоляция' }
};

// ========== ЦЕНЫ ПО ПОГОННЫМ МЕТРАМ ==========
const linearPrices = {
'beton-armopoyas': { price: 2500, label: 'Армопояс' },
'otdelka-zabor': { price: 900, label: 'Монтаж забора' }
};

// ========== ТЕПЛОВИЗОР ==========
const teploPrices = {
'teplo-kvartira': { no: 3000, yes: 4500, label: 'Тепловизор — квартира' },
'teplo-dom': { no: 5000, yes: 6500, label: 'Тепловизор — дом' },
'teplo-dom100-no': { no: 6000, yes: 6000, label: 'Тепловизор — дом >100 м² без отчёта' },
'teplo-dom100-yes': { no: 7500, yes: 7500, label: 'Тепловизор — дом >100 м² с отчётом' }
};

// ========== КАКОЙ БЛОК ПОКАЗЫВАТЬ ==========
const blocksByType = {
'kamen': 'block-area',
'kamen-otmostka': 'block-area',
'kamen-ukladka': 'block-area',
'beton-otmostka': 'block-area',
'beton-ploshchadka': 'block-area',
'beton-poly': 'block-area',
'beton-styazhka': 'block-area',
'beton-styazhka-beton': 'block-area',
'beton-styazhka-suhaya':'block-area',
'beton-garazh': 'block-area',
'beton-uprochnenie': 'block-area',
'uteplenie-cokol': 'block-area',
'uteplenie-minvata': 'block-area',
'otdelka-sayding': 'block-area',
'otdelka-fasad': 'block-area',
'otdelka-cokol': 'block-area',
'otdelka-armstrong': 'block-area',
'otdelka-vyravnivanie': 'block-area',
'otdelka-oboi': 'block-area',
'krovlya-remont': 'block-area',
'krovlya-garazh': 'block-area',
'krovlya-ploskaya': 'block-area',
'krovlya-gidro': 'block-area',
'kamen-stupeni': 'block-steps',
'beton-armopoyas': 'block-linear',
'otdelka-zabor': 'block-linear',
'teplo-kvartira': 'block-teplo',
'teplo-dom': 'block-teplo',
'teplo-dom100-no': 'block-teplo',
'teplo-dom100-yes': 'block-teplo'
};

const typeSelect = document.getElementById('calcType');
const allBlocks = document.querySelectorAll('.calc-block');

if (!typeSelect) return;

// ========== ПЕРЕМЕННЫЕ КНОПКИ ПЛОЩАДИ ==========
const toggleBtn = document.getElementById('toggleAreaCalc');
const areaCalcBlock = document.getElementById('areaCalculator');
const calcAreaBtn = document.getElementById('calcAreaBtn');
const areaResult = document.getElementById('areaResult');

const btnDefaultHTML = toggleBtn ? toggleBtn.innerHTML : '';
const btnActiveHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>Скрыть калькулятор площади';

// ========== ФУНКЦИЯ ПЕРЕКЛЮЧЕНИЯ БЛОКА ==========
function switchBlock() {
const type = typeSelect.value;
const activeBlockId = blocksByType[type];

allBlocks.forEach(block => block.classList.remove('active'));

const activeBlock = document.getElementById(activeBlockId);
if (activeBlock) activeBlock.classList.add('active');

if (areaCalcBlock) areaCalcBlock.classList.remove('active');
if (toggleBtn) toggleBtn.innerHTML = btnDefaultHTML;

const resultBlock = document.getElementById('calcResult');
if (resultBlock) resultBlock.innerHTML = '';
}

typeSelect.addEventListener('change', switchBlock);
switchBlock();

// ========== ПЛОЩАДЬ ПО СТОРОНАМ ==========
if (toggleBtn && areaCalcBlock) {
toggleBtn.addEventListener('click', function () {
areaCalcBlock.classList.toggle('active');
if (areaCalcBlock.classList.contains('active')) {
toggleBtn.innerHTML = btnActiveHTML;
} else {
toggleBtn.innerHTML = btnDefaultHTML;
}
});
}

if (calcAreaBtn) {
calcAreaBtn.addEventListener('click', function () {
const sides = document.querySelectorAll('.area-side');
const heightInput = document.getElementById('areaHeight');
let perimeter = 0;
let hasSide = false;

sides.forEach(side => {
const val = parseFloat(side.value);
if (!isNaN(val) && val > 0) { perimeter += val; hasSide = true; }
});

const height = parseFloat(heightInput.value);

if (!hasSide) {
areaResult.innerHTML = 'Введите хотя бы одну сторону';
areaResult.style.color = '#ef4444';
return;
}
if (isNaN(height) || height <= 0) {
areaResult.innerHTML = 'Введите высоту';
areaResult.style.color = '#ef4444';
return;
}

const area = perimeter * height;
areaResult.style.color = 'var(--color-accent)';
areaResult.innerHTML = `Периметр: ${perimeter} м<br>Площадь: <strong>${area.toFixed(2)} м²</strong>`;

const mainInput = document.getElementById('calcArea');
if (mainInput) mainInput.value = area.toFixed(2);
});
}

// ========== СТУПЕНИ ==========
const calcStepsBtn = document.getElementById('calcStepsBtn');
const stepsResult = document.getElementById('stepsResult');

if (calcStepsBtn) {
calcStepsBtn.addEventListener('click', function () {
const count = parseFloat(document.getElementById('stepsCount').value);
const width = parseFloat(document.getElementById('stepsWidth').value);
const tread = parseFloat(document.getElementById('stepsTread').value);
const riser = parseFloat(document.getElementById('stepsRiser').value);

if (isNaN(count) || count <= 0) { stepsResult.innerHTML = 'Введите количество ступеней'; stepsResult.style.color = '#ef4444'; return; }
if (isNaN(width) || width <= 0) { stepsResult.innerHTML = 'Введите ширину'; stepsResult.style.color = '#ef4444'; return; }
if (isNaN(tread) || isNaN(riser)) { stepsResult.innerHTML = 'Введите проступь и подступенок'; stepsResult.style.color = '#ef4444'; return; }

const oneStep = width * ((tread / 100) + (riser / 100));
const totalArea = oneStep * count;

stepsResult.style.color = 'var(--color-accent)';
stepsResult.innerHTML = `Площадь одной ступени: ${oneStep.toFixed(2)} м²<br>Общая площадь (${count} шт.): <strong>${totalArea.toFixed(2)} м²</strong>`;
calcStepsBtn.dataset.area = totalArea.toFixed(2);
});
}

// ========== РАСЧЁТ СТОИМОСТИ ==========
form.addEventListener('submit', function (e) {
e.preventDefault();
const type = typeSelect.value;
const resultBlock = document.getElementById('calcResult');

// ТЕПЛОВИЗОР
if (teploPrices[type]) {
let price;
if (type.includes('-no') || type.includes('-yes')) {
price = teploPrices[type].no;
} else {
const report = document.getElementById('teploReport').value;
price = teploPrices[type][report];
}
const formatted = price.toLocaleString('ru-RU');

resultBlock.style.color = 'var(--color-accent)';
resultBlock.innerHTML = `${teploPrices[type].label}:<br><span style="font-size: 36px;">от ${formatted} ₽</span><br><span style="font-size: 14px; color: #fff; opacity: 0.7;">Точная цена — после уточнения площади</span>`;
return;
}

// ПОГОННЫЕ МЕТРЫ
if (linearPrices[type]) {
const length = parseFloat(document.getElementById('calcLinear').value);
if (isNaN(length) || length <= 0) {
resultBlock.textContent = 'Введите длину в погонных метрах';
resultBlock.style.color = '#ef4444';
return;
}
const total = length * linearPrices[type].price;
const formatted = total.toLocaleString('ru-RU');
resultBlock.style.color = 'var(--color-accent)';
resultBlock.innerHTML = `${linearPrices[type].label}: примерно<br><span style="font-size: 36px;">${formatted} ₽</span><br><span style="font-size: 14px; color: #fff; opacity: 0.7;">Точная цена — после выезда на объект</span>`;
return;
}

// СТУПЕНИ
if (type === 'kamen-stupeni') {
const area = parseFloat(calcStepsBtn.dataset.area);
if (isNaN(area) || area <= 0) {
resultBlock.textContent = 'Сначала посчитайте площадь ступеней';
resultBlock.style.color = '#ef4444';
return;
}
const total = area * prices[type].price;
const formatted = total.toLocaleString('ru-RU');
resultBlock.style.color = 'var(--color-accent)';
resultBlock.innerHTML = `${prices[type].label}: примерно<br><span style="font-size: 36px;">${formatted} ₽</span><br><span style="font-size: 14px; color: #fff; opacity: 0.7;">Точная цена — после выезда на объект</span>`;
return;
}

// ПЛОЩАДЬ
const area = parseFloat(document.getElementById('calcArea').value);
if (isNaN(area) || area <= 0) {
resultBlock.textContent = 'Введите корректную площадь';
resultBlock.style.color = '#ef4444';
return;
}
const info = prices[type];
if (!info) return;

const total = area * info.price;
const formatted = total.toLocaleString('ru-RU');
resultBlock.style.color = 'var(--color-accent)';
resultBlock.innerHTML = `${info.label}: примерно<br><span style="font-size: 36px;">${formatted} ₽</span><br><span style="font-size: 14px; color: #fff; opacity: 0.7;">Точная цена — после выезда на объект</span>`;
});
});


/* ============================================
4. МОБИЛЬНОЕ МЕНЮ (бургер)
============================================ */
document.addEventListener('DOMContentLoaded', function () {

const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav');

if (!burger || !nav) return;

burger.addEventListener('click', function () {
burger.classList.toggle('active');
nav.classList.toggle('active');
});

const navLinks = nav.querySelectorAll('.nav__link');
navLinks.forEach((link) => {
link.addEventListener('click', function () {
burger.classList.remove('active');
nav.classList.remove('active');
});
});
});


/* ============================================
5. ОБРАБОТКА ФОРМ (Netlify Forms)
============================================ */
document.addEventListener('DOMContentLoaded', function () {

const contactForm = document.querySelector('.contacts__form');
if (!contactForm) return;

contactForm.addEventListener('submit', function (e) {
e.preventDefault();

const nameInput = contactForm.querySelector('input[name="name"]');
const phoneInput = contactForm.querySelector('input[name="phone"]');
const submitBtn = contactForm.querySelector('button[type="submit"]');

const name = nameInput.value.trim();
const phone = phoneInput.value.trim();

if (!name || !phone) {
alert('Пожалуйста, заполните имя и телефон');
return;
}

const originalText = submitBtn.textContent;
submitBtn.textContent = 'Отправляем...';
submitBtn.disabled = true;

const formData = new FormData(contactForm);
const encoded = new URLSearchParams(formData).toString();

fetch('/', {
method: 'POST',
headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
body: encoded
})
.then(response => {
if (response.ok) {
alert(`Спасибо, ${name}! Заявка отправлена. Мы свяжемся с вами по номеру ${phone}.`);
contactForm.reset();
} else {
alert('Ошибка отправки. Позвоните нам: +7 (937) 378-73-08');
}
})
.catch(() => {
alert('Ошибка отправки. Проверьте интернет или позвоните: +7 (937) 378-73-08');
})
.finally(() => {
submitBtn.textContent = originalText;
submitBtn.disabled = false;
});
});
});
// --- 1. Хранилище: ключ для localStorage ---
const REWARDS_STORAGE_KEY = 'studiedLetters';

// --- 2. Функция добавления награды (вызывается из заданий) ---
function addReward(letter) {
    // Получаем текущий список изученных букв
    let studied = JSON.parse(localStorage.getItem(REWARDS_STORAGE_KEY)) || [];

    // Если буквы ещё нет в списке — добавляем
    if (!studied.includes(letter)) {
        studied.push(letter);
        localStorage.setItem(REWARDS_STORAGE_KEY, JSON.stringify(studied));
        console.log(`Награда за букву ${letter} добавлена!`);
    } else {
        console.log(`Буква ${letter} уже изучена ранее.`);
    }
}

// --- 3. Функция получения списка изученных букв ---
function getStudiedLetters() {
    return JSON.parse(localStorage.getItem(REWARDS_STORAGE_KEY)) || [];
}

// --- 4. Функция отрисовки наград на странице (вызывается из rewards.html) ---
function renderRewardsPage() {
    // Находим элементы на странице
    const actionBlock = document.querySelector('.action');
    const rewardsWrapper = document.querySelector('.rewards__wrapper');
    const rewardsItemsContainer = document.querySelector('.rewards__items');

    // Получаем изученные буквы
    const studied = getStudiedLetters();

    if (studied.length === 0) {
        // Нет наград — показываем блок action, скрываем награды
        actionBlock.style.display = 'block';
        rewardsWrapper.style.display = 'none';
        return;
    }

    // Есть награды — скрываем action, показываем блок наград
    actionBlock.style.display = 'none';
    rewardsWrapper.style.display = 'block';

    // Очищаем контейнер с наградами (удаляем всё, что было статично)
    rewardsItemsContainer.innerHTML = '';

    // Для каждой изученной буквы создаём элемент награды
    studied.forEach(letter => {
        // Создаём контейнер для одной награды
        const rewardItem = document.createElement('div');
        rewardItem.className = 'rewards__item';

        // Создаём картинку
        const img = document.createElement('img');
        // Формируем путь к картинке. У тебя: /public/alphabet/награда-А.svg
        img.src = `/public/alphabet/награда-${letter}.svg`;
        img.alt = `Награда за букву ${letter}`;

        // Собираем всё вместе
        rewardItem.appendChild(img);
        rewardsItemsContainer.appendChild(rewardItem);

        rewardItem.addEventListener('click', function() {
            const sound = new Audio('../../public/audio/base/конфетти.mp3');
            sound.volume = 0.5;
            sound.play().catch(e => console.log('Ошибка воспроизведения:', e));
             confetti({
                    particleCount: 250,
                    spread: 150,
                    origin: { y: 0.5, x: 0.8 },
                    colors: ['#FFBD4D', '#22C55E', '#8B5CF6', '#3D87FF']
                });
                confetti({
                    particleCount: 250,
                    spread: 150,
                    origin: { y: 0.5, x: 0.2 },
                    colors: ['#FFBD4D', '#22C55E', '#8B5CF6', '#3D87FF']
                });
        })
    });
}

function initRewardsPage() {
    // Ждём полной загрузки DOM, чтобы найти элементы
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderRewardsPage);
    } else {
        renderRewardsPage();
    }
}
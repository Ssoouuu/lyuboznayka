//  Хранилище: ключ для localStorage
const REWARDS_STORAGE_KEY = 'studiedLetters';

// Функция добавления награды (вызывается из заданий)
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

// Функция получения списка изученных букв 
function studiedLetters() {
    return JSON.parse(localStorage.getItem(REWARDS_STORAGE_KEY)) || [];
}

// Функция отрисовки наград на странице (вызывается из rewards.html)
function renderRewardsPage() {
    // Находим элементы на странице
    const actionBlock = document.querySelector('.action');
    const rewardsWrapper = document.querySelector('.rewards__wrapper');
    const rewardsItemsContainer = document.querySelector('.rewards__items');

    // Получаем изученные буквы
    const studied = studiedLetters();

    const resetBtn = document.getElementById('resetProgress');
    if (studied.length === 0) {
        // Нет наград — показываем блок action, скрываем награды
        actionBlock.style.display = 'block';
        rewardsWrapper.style.display = 'none';
        if (resetBtn) resetBtn.style.display = 'none';
        return;
    }

    // Есть награды — скрываем action, показываем блок наград
    actionBlock.style.display = 'none';
    rewardsWrapper.style.display = 'block';
    if (resetBtn) resetBtn.style.display = 'inline-block';

    rewardsItemsContainer.innerHTML = '';

    // Для каждой изученной буквы создаём элемент награды
    studied.forEach(letter => {
        // Создаём контейнер для одной награды
        const rewardItem = document.createElement('div');
        rewardItem.className = 'rewards__item';

        // Создаём картинку
        const img = document.createElement('img');
        // Формируем путь к картинке
        img.src = `/public/alphabet/награда-${letter}.svg`;
        img.alt = `Награда за букву ${letter}`;

        // Собираем всё вместе
        rewardItem.appendChild(img);
        rewardsItemsContainer.appendChild(rewardItem);

        // АУДИО
        rewardItem.addEventListener('click', function () {
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

// СБРОС ПРОГРЕССА
// модальное окно
function showConfirm(message) {
    return new Promise(resolve => {
        const modal = document.getElementById('modalWarn');
        if (!modal) return resolve(false);
        modal.style.display = 'flex';
        modal.querySelector('.modal-warn__text').textContent = message;
        document.getElementById('warnYes').onclick = () => {
            modal.style.display = 'none';
            resolve(true);
        };
        document.getElementById('warnNo').onclick = () => {
            modal.style.display = 'none';
            resolve(false);
        };

    });
}

// Окно сброса
async function resetProgress() {
    const confirmed = await showConfirm('Если ты сбросишь прогресс, все твои награды исчезнут, и их придётся зарабатывать заново. Ты точно хочешь это сделать?');
    if (confirmed) {
        localStorage.removeItem(REWARDS_STORAGE_KEY);
        console.log('Прогресс сброшен.');
        location.reload();
    } else {
        console.log('Сброс отменён пользователем.');
    }
}

// Кнопки сброса
function initResetBtn() {
    const resetBtn = document.getElementById('resetProgress');
    if (resetBtn) {
        resetBtn.removeEventListener('click', resetProgress);
        resetBtn.addEventListener('click', resetProgress);
    }
}

// Обновление
function updateReset() {
    const resetBtn = document.getElementById('resetProgress');
    if (!resetBtn) return;
    const studied = studiedLetters();
    resetBtn.style.display = studied.length === 0 ? 'none' : 'inline-block';
}

// Инициализация страницы наград
function initRewardsPage() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            renderRewardsPage();
            initResetBtn();
        });
    } else {
        renderRewardsPage();
        initResetBtn();
    }
}

// Запуск
initRewardsPage();
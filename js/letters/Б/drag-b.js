document.addEventListener('DOMContentLoaded', function () {
    const butterfly = document.querySelector('.drag-b__butterfly img');
    const flowers = document.querySelectorAll('.drag-b__items img');
    const container = document.getElementById('drag-b');
    const nextButton = document.querySelector('.btn-yellow');
    const counter = document.getElementById('counter');

    // Предзагрузка звуков (убирает приглушение первого звука)
    const correctSound = new Audio('../../public/audio/base/Верный-ответ.mp3');
    const wrongSound = new Audio('../../public/audio/base/Неверный-ответ.mp3');
    const confettiSound = new Audio('../../public/audio/base/конфетти.mp3');
    correctSound.volume = 0.5;
    wrongSound.volume = 0.5;
    confettiSound.volume = 0.5;
    correctSound.load();
    wrongSound.load();
    confettiSound.load();

    nextButton.style.display = 'none';
    container.style.position = 'relative';

    let corrCount = 0;
    function updateCounter() { counter.textContent = corrCount; }
    updateCounter();

    let correctCount = 0;
    const totalCorrect = document.querySelectorAll('[data-correct="true"]').length;

    let dragging = false;
    let offsetX, offsetY;

    // --- Единая функция получения координат ---
    function getClientCoords(e) {
        if (e.touches) return { clientX: e.touches[0].clientX, clientY: e.touches[0].clientY };
        return { clientX: e.clientX, clientY: e.clientY };
    }

    function onStart(e) {
        e.preventDefault();
        const coords = getClientCoords(e);
        const rect = butterfly.getBoundingClientRect();
        butterfly.classList.add('dragging');
        const containerRect = container.getBoundingClientRect();
        butterfly.style.left = (rect.left - containerRect.left) + 'px';
        butterfly.style.top = (rect.top - containerRect.top) + 'px';
        offsetX = coords.clientX - rect.left;
        offsetY = coords.clientY - rect.top;
        dragging = true;
    }

    function onMove(e) {
        if (!dragging) return;
        const coords = getClientCoords(e);
        const containerRect = container.getBoundingClientRect();
        butterfly.style.left = (coords.clientX - containerRect.left - offsetX) + 'px';
        butterfly.style.top = (coords.clientY - containerRect.top - offsetY) + 'px';
    }

    function onEnd() {
        if (!dragging) return;
        const butterflyRect = butterfly.getBoundingClientRect();
        flowers.forEach(flower => {
            const flowerRect = flower.getBoundingClientRect();
            if (butterflyRect.left < flowerRect.right &&
                butterflyRect.right > flowerRect.left &&
                butterflyRect.top < flowerRect.bottom &&
                butterflyRect.bottom > flowerRect.top) {
                if (flower.classList.contains('done')) return;
                if (flower.dataset.correct === 'true') {
                    flower.classList.add('correct', 'done');
                    corrCount++;
                    updateCounter();
                    correctSound.currentTime = 0;
                    correctSound.play().catch(e => console.log('Ошибка:', e));
                } else {
                    flower.classList.add('wrong');
                    setTimeout(() => flower.classList.remove('wrong'), 500);
                    wrongSound.currentTime = 0;
                    wrongSound.play().catch(e => console.log('Ошибка:', e));
                }
            }
        });
        butterfly.classList.remove('dragging');
        butterfly.style.left = '';
        butterfly.style.top = '';
        dragging = false;
        correctCount = document.querySelectorAll('.drag-b__items img.done').length;
        if (correctCount >= totalCorrect) {
            setTimeout(() => {
                confettiSound.currentTime = 0;
                confettiSound.play().catch(e => console.log('Ошибка:', e));
                confetti({ particleCount: 250, spread: 150, origin: { y: 0.5, x: 0.8 }, colors: ['#FFBD4D', '#22C55E', '#8B5CF6', '#3D87FF'] });
                confetti({ particleCount: 250, spread: 150, origin: { y: 0.5, x: 0.2 }, colors: ['#FFBD4D', '#22C55E', '#8B5CF6', '#3D87FF'] });
            }, 400);

            butterfly.style.pointerEvents = 'none';
            nextButton.style.display = 'inline-block';
            nextButton.style.animation = 'pulse 0.5s ease';
        }
    }

    // Регистрация событий (и мышь, и тач)
    butterfly.addEventListener('mousedown', onStart);
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onEnd);
    butterfly.addEventListener('touchstart', onStart);
    document.addEventListener('touchmove', onMove);
    document.addEventListener('touchend', onEnd);
});
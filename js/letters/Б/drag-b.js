document.addEventListener('DOMContentLoaded', function () {
    const butterfly = document.querySelector('.drag-b__butterfly img');
    const flowers = document.querySelectorAll('.drag-b__items img');
    const container = document.getElementById('drag-b');
    const nextButton = document.querySelector('.btn-yellow');
    const counter = document.getElementById('counter');

    nextButton.style.display = 'none';
    container.style.position = 'relative';

    let corrCount = 0;

    function updateCounter() {
        counter.textContent = corrCount;
    }

    updateCounter();

    let correctCount = 0;
    const totalCorrect = document.querySelectorAll('[data-correct="true"]').length;

    let dragging = false;
    let offsetX, offsetY;

    butterfly.addEventListener('mousedown', function (e) {
        e.preventDefault();

        // Запоминаем координаты бабочки на экране (до добавления класса)
        const rect = butterfly.getBoundingClientRect();

        // Включаем режим перетаскивания — добавляем класс с position:absolute
        butterfly.classList.add('dragging');

        // Теперь бабочка позиционируется абсолютно относительно #drag-b
        // Вычисляем её положение относительно контейнера
        const containerRect = container.getBoundingClientRect();
        butterfly.style.left = (rect.left - containerRect.left) + 'px';
        butterfly.style.top = (rect.top - containerRect.top) + 'px';

        // Вычисляем смещение курсора от левого верхнего угла бабочки
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;

        dragging = true;
    });

    document.addEventListener('mousemove', function (e) {
        if (!dragging) return;

        const containerRect = container.getBoundingClientRect();
        butterfly.style.left = (e.clientX - containerRect.left - offsetX) + 'px';
        butterfly.style.top = (e.clientY - containerRect.top - offsetY) + 'px';
    });

    document.addEventListener('mouseup', function () {
        if (!dragging) return;

        const butterflyRect = butterfly.getBoundingClientRect();

        // Проверка пересечения с цветами
        flowers.forEach(flower => {
            const flowerRect = flower.getBoundingClientRect();
            if (butterflyRect.left < flowerRect.right &&
                butterflyRect.right > flowerRect.left &&
                butterflyRect.top < flowerRect.bottom &&
                butterflyRect.bottom > flowerRect.top) {

                if (flower.dataset.correct === 'true') {
                    flower.classList.add('correct', 'done');
                    corrCount++;
                    updateCounter();
                } else {
                    flower.classList.add('wrong');
                    setTimeout(() => flower.classList.remove('wrong'), 500);
                }
            }
        });

        // Возвращаем бабочку в исходное положение
        butterfly.classList.remove('dragging');
        butterfly.style.left = '';
        butterfly.style.top = '';
        dragging = false;

        correctCount = document.querySelectorAll('.drag-b__items img.done').length;
        if (correctCount >= totalCorrect) {
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
            butterfly.style.pointerEvents = 'none';
            nextButton.style.display = 'inline-block';
            nextButton.style.animation = 'pulse 0.5s ease';
        }
    });
});
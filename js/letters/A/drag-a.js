document.addEventListener('DOMContentLoaded', function () {
    const letterA = document.getElementById('letter-A');
    const houses = document.querySelectorAll('.word-house');
    const container = document.getElementById('drag-a');
    const nextButton = document.querySelector('.btn-yellow');

    // Сначала прячем кнопку "Вперед"
    nextButton.style.display = 'none';

    // Убеждаемся что родитель относительный
    container.style.position = 'relative';

    // Убираем лишние координаты - пусть CSS управляет позицией
    letterA.style.position = 'absolute';

    let dragging = false;
    let offsetX, offsetY;

    // Функция проверки - все ли домики заполнены
    function checkAllHousesFilled() {
        let allFilled = true;
        
        houses.forEach(house => {
            const placeholder = house.querySelector('.placeholder');
            if (placeholder.textContent === '_') {
                allFilled = false; // если хоть один домик пустой
            }
        });
        
        return allFilled;
    }

    // Хватаем букву
    letterA.addEventListener('mousedown', function (e) {
        dragging = true;

            letterA.style.transform = 'none';

        const rect = letterA.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;

        e.preventDefault();
    });

    // Тащим
    document.addEventListener('mousemove', function (e) {
        if (!dragging) return;

        const parentRect = container.getBoundingClientRect();

        letterA.style.left = (e.clientX - parentRect.left - offsetX) + 'px';
        letterA.style.top = (e.clientY - parentRect.top - offsetY) + 'px';
    });

    // Отпускаем
    document.addEventListener('mouseup', function () {
        if (!dragging) return;

        // Проверяем домики
        houses.forEach(house => {
            const houseRect = house.getBoundingClientRect();
            const letterRect = letterA.getBoundingClientRect();

            if (letterRect.left < houseRect.right &&
                letterRect.right > houseRect.left &&
                letterRect.top < houseRect.bottom &&
                letterRect.bottom > houseRect.top) {

                const placeholder = house.querySelector('.placeholder');
                if (placeholder.textContent === '_') {
                    placeholder.textContent = 'А';
                    placeholder.style.color = '#FFBD4D';
                    house.style.borderColor = '#22c55e';
                    house.style.backgroundColor = '#f0fdf4';
                }
            }
        });

        // Возвращаем букву
        letterA.style.left = '';
        letterA.style.top = '';
            letterA.style.transform = 'none';
        letterA.style.position = 'absolute';

        dragging = false;

        // ПРОВЕРЯЕМ - все ли домики заполнены?
        if (checkAllHousesFilled()) {
            // Если все заполнены - показываем кнопку "Вперед"
            nextButton.style.display = 'inline-block';
            nextButton.style.animation = 'pulse 0.5s ease';
        }
    });
});
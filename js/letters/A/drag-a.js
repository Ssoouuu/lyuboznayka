document.addEventListener('DOMContentLoaded', function () {
  const letter = document.getElementById('letter-A');
  const containers = document.querySelectorAll('.word-container');
  const nextButton = document.querySelector('.btn-yellow');
  const container = document.getElementById('drag-a');

  nextButton.style.display = 'none';
  container.style.position = 'relative';
  letter.style.position = 'absolute';

  let dragging = false;
  let offsetX, offsetY;

  // Функция для получения координат (мышь или тач)
  function getCoords(e) {
    if (e.touches) {
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    return { x: e.clientX, y: e.clientY };
  }

  // Начало перетаскивания
  function onStart(e) {
    e.preventDefault();
    dragging = true;

    // Запоминаем, где курсор относительно левого верхнего угла буквы
    const rect = letter.getBoundingClientRect();
    const coords = getCoords(e);
    offsetX = coords.x - rect.left;
    offsetY = coords.y - rect.top;

    // Фиксируем текущую позицию буквы в left/top
    const parentRect = container.getBoundingClientRect();
    letter.style.left = (rect.left - parentRect.left) + 'px';
    letter.style.top = (rect.top - parentRect.top) + 'px';
  }

  // Перемещение
  function onMove(e) {
    if (!dragging) return;
    e.preventDefault();

    const coords = getCoords(e);
    const parentRect = container.getBoundingClientRect();

    let newLeft = coords.x - parentRect.left - offsetX;
    let newTop = coords.y - parentRect.top - offsetY;

    letter.style.left = newLeft + 'px';
    letter.style.top = newTop + 'px';
  }

  // Отпускание
  function onEnd() {
    if (!dragging) return;

    const letterRect = letter.getBoundingClientRect();

    // Проверяем, на какой контейнер (домик) наложилась буква
    containers.forEach(container => {
      const img = container.querySelector('img');
      const houseRect = container.getBoundingClientRect();

      if (letterRect.left < houseRect.right &&
        letterRect.right > houseRect.left &&
        letterRect.top < houseRect.bottom &&
        letterRect.bottom > houseRect.top) {

        // Меняем картинку, если она ещё не заменена
        if (!img.dataset.done) {
          const wordHouse = container.querySelector('.word-house');
          let newSrc = '';

          if (wordHouse.id === 'house1') {
            newSrc = '../../public/alphabet/home-1-green.svg';   // например, '../../public/alphabet/home-1-green.png'
          } else if (wordHouse.id === 'house2') {
            newSrc = '../../public/alphabet/home-2-green.svg';
          } else if (wordHouse.id === 'house3') {
            newSrc = '../../public/alphabet/home-3-green.svg';
          }

          img.src = newSrc;
          img.dataset.done = 'true';

        }
        const sound = new Audio('../../public/audio/base/Верный-ответ.mp3');
        sound.volume = 0.5;
        sound.play().catch(e => console.log('Ошибка воспроизведения:', e));
      }
    });

    // Возвращаем букву на исходное место
    letter.style.left = '';
    letter.style.top = '';

    dragging = false;

    // Проверяем, все ли картинки заменены
    const allDone = Array.from(containers).every(c => c.querySelector('img').dataset.done === 'true');
    if (allDone) {
      // Запускаем конфетти
      setTimeout(() => {
        const sound = new Audio('../../public/audio/base/конфетти.mp3');
        sound.volume = 0.5;
        sound.play().catch(e => console.log('Ошибка воспроизведения:', e));
        confetti({ particleCount: 250, spread: 150, origin: { y: 0.5, x: 0.8 }, colors: ['#FFBD4D', '#22C55E', '#8B5CF6', '#3D87FF'] });
        confetti({ particleCount: 250, spread: 150, origin: { y: 0.5, x: 0.2 }, colors: ['#FFBD4D', '#22C55E', '#8B5CF6', '#3D87FF'] });
      }, 400);

      letter.style.pointerEvents = 'none'; // букву больше нельзя трогать
      nextButton.style.display = 'inline-block';
      nextButton.style.animation = 'pulse 0.5s ease';
    }
  }

  // Регистрируем события
  letter.addEventListener('mousedown', onStart);
  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup', onEnd);

  letter.addEventListener('touchstart', onStart);
  document.addEventListener('touchmove', onMove);
  document.addEventListener('touchend', onEnd);
});
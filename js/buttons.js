// Предзагружаем звук для кнопок один раз
const buttonSound = new Audio('../../public/audio/base/кнопка.mp3');
buttonSound.volume = 0.5;
buttonSound.load();   // начинаем загрузку сразу

// Выбираем все нужные кнопки
const buttons = document.querySelectorAll('.btn-green, .btn-yellow');

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const targetUrl = button.getAttribute('href');
        
        // Используем уже загруженный звук
        buttonSound.currentTime = 0;
        buttonSound.play().catch(e => console.log('Ошибка:', e));
        
        setTimeout(() => {
            window.location.href = targetUrl;
        }, 800);
    });
});
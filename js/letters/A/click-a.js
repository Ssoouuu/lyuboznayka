document.addEventListener('DOMContentLoaded', function () {
    const images = document.querySelectorAll('.click-a__images img');
    const nextButton = document.querySelector('.btn-yellow');

    // Предзагрузка звуков
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

    let correctCount = 0;

    images.forEach(image => {
        image.addEventListener('click', function () {
            if (this.dataset.correct === 'true') {
                // Правильный ответ
                this.classList.add('correct-click');
                correctCount++;
                this.style.pointerEvents = 'none';
                correctSound.currentTime = 0;
                correctSound.play().catch(e => console.log('Ошибка воспроизведения:', e));
            } else {
                // Неправильный ответ
                this.classList.add('wrong-click');
                setTimeout(() => this.classList.remove('wrong-click'), 500);
                wrongSound.currentTime = 0;
                wrongSound.play().catch(e => console.log('Ошибка воспроизведения:', e));
            }

            // Если все 3 правильные картинки нажаты
            if (correctCount === 3) {
                setTimeout(() => {
                    confettiSound.currentTime = 0;
                    confettiSound.play().catch(e => console.log('Ошибка воспроизведения:', e));
                    confetti({ particleCount: 250, spread: 150, origin: { y: 0.5, x: 0.8 }, colors: ['#FFBD4D', '#22C55E', '#8B5CF6', '#3D87FF'] });
                    confetti({ particleCount: 250, spread: 150, origin: { y: 0.5, x: 0.2 }, colors: ['#FFBD4D', '#22C55E', '#8B5CF6', '#3D87FF'] });
                }, 400);
                images.forEach(img => {
                    img.style.pointerEvents = 'none';
                });
                nextButton.style.display = 'inline-block';
                nextButton.style.animation = 'pulse 0.5s ease';
                addReward('А');
            }
        });
    });
});
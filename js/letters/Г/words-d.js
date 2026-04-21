document.addEventListener('DOMContentLoaded', function () {
    const rowOne = document.querySelector('.words-d__row--one');
    const rowTwo = document.querySelector('.words-d__row--two');
    const words = document.querySelectorAll('.words-d__item');
    const nextButton = document.querySelector('.btn-yellow');
    const counter = document.getElementById('counter');

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

    let correctCount = 0;

    function updateCounter() {
        counter.textContent = correctCount;
    }

    updateCounter();

    nextButton.style.display = 'none';
    if (rowOne) rowOne.style.display = 'none';
    if (rowTwo) rowTwo.style.display = 'none';

    words.forEach(item => {
        item.addEventListener('click', function () {
            if (this.dataset.correct === 'true') {
                this.classList.add('correct');
                this.style.pointerEvents = 'none';
                correctCount++;
                updateCounter();
                if (rowOne) rowOne.style.display = 'grid';
                correctSound.currentTime = 0;
                correctSound.play().catch(e => console.log('Ошибка воспроизведения:', e));
            } else {
                this.classList.add('wrong');
                setTimeout(() => this.classList.remove('wrong'), 500);
                wrongSound.currentTime = 0;
                wrongSound.play().catch(e => console.log('Ошибка воспроизведения:', e));
            }

            if (correctCount === 2) {
                if (rowTwo) rowTwo.style.display = 'grid';
            }

            if (correctCount === 3) {
                setTimeout(() => {
                    confettiSound.currentTime = 0;
                    confettiSound.play().catch(e => console.log('Ошибка воспроизведения:', e));
                    confetti({ particleCount: 250, spread: 150, origin: { y: 0.5, x: 0.8 }, colors: ['#FFBD4D', '#22C55E', '#8B5CF6', '#3D87FF'] });
                    confetti({ particleCount: 250, spread: 150, origin: { y: 0.5, x: 0.2 }, colors: ['#FFBD4D', '#22C55E', '#8B5CF6', '#3D87FF'] });
                }, 400);
                words.forEach(item => {
                    item.style.pointerEvents = 'none';
                });
                nextButton.style.display = 'inline-block';
                nextButton.style.animation = 'pulse 0.5s ease';
                addReward('Г');
            }
        })

    })
});
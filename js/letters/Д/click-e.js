document.addEventListener('DOMContentLoaded', function () {
    const letters = document.querySelectorAll('.flying-letter');
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

    nextButton.style.display = 'none';

    let correctCount = 0;

    function updateCounter() {
        counter.textContent = correctCount;
    }

    updateCounter();

    letters.forEach(item => {
        item.addEventListener('click', function () {
            if (this.dataset.correct === 'true') {
                this.classList.add('correct');
                correctCount++;
                updateCounter();
                setTimeout(() => this.style.display = 'none', 1000);
                correctSound.currentTime = 0;
                correctSound.play().catch(e => console.log('Ошибка воспроизведения:', e));
            } else {
                this.classList.add('wrong');
                setTimeout(() => this.classList.remove('wrong'), 1000);
                wrongSound.currentTime = 0;
                wrongSound.play().catch(e => console.log('Ошибка воспроизведения:', e));
            }

            if (correctCount === 4) {
                setTimeout(() => {
                    confettiSound.currentTime = 0;
                    confettiSound.play().catch(e => console.log('Ошибка воспроизведения:', e));
                    confetti({ particleCount: 250, spread: 150, origin: { y: 0.5, x: 0.8 }, colors: ['#FFBD4D', '#22C55E', '#8B5CF6', '#3D87FF'] });
                    confetti({ particleCount: 250, spread: 150, origin: { y: 0.5, x: 0.2 }, colors: ['#FFBD4D', '#22C55E', '#8B5CF6', '#3D87FF'] });
                }, 400);
                letters.forEach(item => {
                    item.style.pointerEvents = 'none';
                });
                nextButton.style.display = 'inline-block';
                nextButton.style.animation = 'pulse 0.5s ease'
            }
        })
    })
})
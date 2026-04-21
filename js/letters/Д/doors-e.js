document.addEventListener('DOMContentLoaded', function () {
    const nextButton = document.querySelector('.btn-yellow');
    const doors = document.querySelectorAll('.doors-e__image');
    const counter = document.querySelector('#counter');

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

    let animating = false;

    let correctCount = 0;

    function updateCounter() {
        counter.textContent = correctCount;
    }

    updateCounter();

    doors.forEach(door => {
        door.addEventListener('click', function (e) {
            const parent = this.closest('.doors-e__item');
            if (animating) return;
            if (this.dataset.correct === 'true') {
                this.style.opacity = '0';
                const icon = parent.querySelector('.doors-e__icon');
                if (icon) {
                    icon.classList.add('correct');
                    icon.style.opacity = '1';
                }
                correctCount++;
                updateCounter();
                correctSound.currentTime = 0;
                correctSound.play().catch(e => console.log('Ошибка воспроизведения:', e));
            } else {
                animating = true;
                this.style.opacity = '0';
                const icon = parent.querySelector('.doors-e__icon');
                if (icon) {
                    icon.classList.add('wrong');
                    icon.style.opacity = '1';
                }

                setTimeout(() => {
                    this.style.opacity = '1';
                    if (icon) {
                        icon.classList.remove('wrong');
                        icon.style.opacity = '0';
                    }
                    animating = false;
                }, 800);
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
                doors.forEach(door => {
                    door.style.pointerEvents = 'none';
                });
                nextButton.style.display = 'inline-block';
                nextButton.style.animation = 'pulse 0.5s ease';
                addReward('Д');
            }
        })
    })

})
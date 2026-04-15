document.addEventListener('DOMContentLoaded', function () {
    const nextButton = document.querySelector('.btn-yellow');
    const doors = document.querySelectorAll('.doors-e__image');
    // const icon = document.querySelectorAll('.doors-e__icon');
    const counter = document.querySelector('#counter');

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
                this.style.display = 'none';
                const icon = parent.querySelector('.doors-e__icon');
                if (icon) {
                    icon.classList.add('correct');
                    icon.style.display = 'block';
                }
                correctCount++;
                updateCounter();
                const sound = new Audio('../../public/audio/base/Верный-ответ.mp3');
                sound.volume = 0.5;
                sound.play().catch(e => console.log('Ошибка воспроизведения:', e));
            } else {
                animating = true;
                this.style.display = 'none';
                const icon = parent.querySelector('.doors-e__icon');
                if (icon) {
                    icon.classList.add('wrong');
                    icon.style.display = 'block';
                }

                setTimeout(() => {
                    this.style.display = 'block';
                    if (icon) {
                        icon.classList.remove('wrong');
                        icon.style.display = 'none';
                    }
                    animating = false;
                }, 800);
                const sound = new Audio('../../public/audio/base/Неверный-ответ.mp3');
                sound.volume = 0.5;
                sound.play().catch(e => console.log('Ошибка воспроизведения:', e));
            }

            if (correctCount === 4) {
                setTimeout(() => {
                    const sound = new Audio('../../public/audio/base/конфетти.mp3');
                    sound.volume = 0.5;
                    sound.play().catch(e => console.log('Ошибка воспроизведения:', e));
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
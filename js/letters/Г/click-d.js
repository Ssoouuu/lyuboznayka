document.addEventListener('DOMContentLoaded', function () {
    const items = document.querySelectorAll('.click-d__item')
    const nextButton = document.querySelector('.btn-yellow')
    const counter = document.getElementById('counter');

    nextButton.style.display = 'none';

    let correctCount = 0;

    function updateCounter() {
        counter.textContent = correctCount;
    }

    updateCounter();

    items.forEach(item => {
        item.addEventListener('click', function () {
            if (this.dataset.correct === 'true') {
                this.classList.add('correct');
                correctCount++;
                this.style.pointerEvents = 'none';
                updateCounter()
                const sound = new Audio('../../public/audio/base/Верный-ответ.mp3');
                sound.volume = 0.5;
                sound.play().catch(e => console.log('Ошибка воспроизведения:', e));
            } else {
                this.classList.add('wrong');
                setTimeout(() => this.classList.remove('wrong'), 500);
                const sound = new Audio('../../public/audio/base/Неверный-ответ.mp3');
                sound.volume = 0.5;
                sound.play().catch(e => console.log('Ошибка воспроизведения:', e));
            }

            if (correctCount === 3) {
                setTimeout(() => {
                    const sound = new Audio('../../public/audio/base/конфетти.mp3');
                    sound.volume = 0.5;
                    sound.play().catch(e => console.log('Ошибка воспроизведения:', e));
                    confetti({ particleCount: 250, spread: 150, origin: { y: 0.5, x: 0.8 }, colors: ['#FFBD4D', '#22C55E', '#8B5CF6', '#3D87FF'] });
                    confetti({ particleCount: 250, spread: 150, origin: { y: 0.5, x: 0.2 }, colors: ['#FFBD4D', '#22C55E', '#8B5CF6', '#3D87FF'] });
                }, 400);
                items.forEach(item => {
                    item.style.pointerEvents = 'none';
                });
                nextButton.style.display = 'inline-block';
                nextButton.style.animation = 'pulse 0.5s ease'
            }
        })
    })
})
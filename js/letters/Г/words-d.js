document.addEventListener('DOMContentLoaded', function () {
    const rowOne = document.querySelector('.words-d__row--one');
    const rowTwo = document.querySelector('.words-d__row--two');
    const words = document.querySelectorAll('.words-d__item');
    const nextButton = document.querySelector('.btn-yellow');

    let correctCount = 0;

    nextButton.style.display = 'none';
    if (rowOne) rowOne.style.display = 'none';
    if (rowTwo) rowTwo.style.display = 'none';

    words.forEach(item => {
        item.addEventListener('click', function () {
            if (this.dataset.correct === 'true') {
                this.classList.add('correct');
                this.style.pointerEvents = 'none';
                correctCount++;
                if (rowOne) rowOne.style.display = 'grid';
            } else {
                this.classList.add('wrong');
                setTimeout(() => this.classList.remove('wrong'), 500);
            }

            if (correctCount === 2) {
                if (rowTwo) rowTwo.style.display = 'grid';
            }

            if (correctCount === 3) {
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
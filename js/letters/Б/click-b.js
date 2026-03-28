document.addEventListener('DOMContentLoaded', function () {
    const words = document.querySelectorAll('.click-b__word');
    const nextButton = document.querySelector('.btn-yellow');
    const counter = document.getElementById('counter');

    nextButton.style.display = 'none';

    let correctCount = 0;

    function updateCounter() {
        counter.textContent = correctCount;
    }

    updateCounter();

    words.forEach(word => {
        word.addEventListener('click', function () {

            if (this.dataset.correct === 'true') {
                this.classList.add('correct');
                correctCount++;
                this.style.pointerEvents = 'none';
                updateCounter();
            } else {
                this.classList.add('wrong');
                setTimeout(() => this.classList.remove('wrong'), 500);
            }

            if (correctCount === 4) {
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
                words.forEach(word => {
                    word.style.pointerEvents = 'none';
                });
                nextButton.style.display = 'inline-block';
                nextButton.style.animation = 'pulse 0.5s ease';
                addReward('Б');
            }
        })
    })
})
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
            if (this.classList.contains('clicked')) return;

            this.classList.add('clicked');

            if (this.dataset.correct === 'true') {
                this.classList.add('correct');
                correctCount++;
                this.style.pointerEvents = 'none';
                updateCounter();
            } else {
                this.classList.add('wrong');
            }

            if (correctCount === 4) {
                nextButton.style.display = 'inline-block';
                nextButton.style.animation = 'pulse 0.5s ease';
                addReward('Б');
            }
        })
    })
})
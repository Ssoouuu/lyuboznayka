document.addEventListener('DOMContentLoaded', function () {
    const letters = document.querySelectorAll('.flying-letter');
    const nextButton = document.querySelector('.btn-yellow');
    const counter = document.getElementById('counter');

    nextButton.style.display = 'none';

     let correctCount  = 0;

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
                
            } else {
                this.classList.add('wrong');
                setTimeout(() => this.classList.remove('wrong'), 1000);
            }

            if(correctCount  === 4) {
                nextButton.style.display = 'inline-block';
                nextButton.style.animation = 'pulse 0.5s ease'
            }
        })
    })
})
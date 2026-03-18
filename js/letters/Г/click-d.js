document.addEventListener('DOMContentLoaded', function() {
    const items = document.querySelectorAll('.click-d__item')
    const nextButton = document.querySelector('.btn-yellow')
    const counter = document.getElementById('counter');

    nextButton.style.display = 'none';

    let correctCount  = 0;

    function updateCounter() {
        counter.textContent = correctCount ;
    }

    updateCounter();

    items.forEach(item => {
        item.addEventListener('click', function() {
            if(this.dataset.correct === 'true') {
                this.classList.add('correct');
                correctCount ++;
                this.style.pointerEvents = 'none';
                updateCounter()
            } else {
                this.classList.add('wrong');
                setTimeout(() => this.classList.remove('wrong'), 500);
            }

            if(correctCount  === 3) {
                nextButton.style.display = 'inline-block';
                nextButton.style.animation = 'pulse 0.5s ease'
            }
        })
    })
})
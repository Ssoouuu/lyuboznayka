document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.click-a__images img');
    const nextButton = document.querySelector('.btn-yellow');

        nextButton.style.display = 'none';
    
    let correctCount = 0;
    
    images.forEach(image => {
        image.addEventListener('click', function() {
            // Если картинку уже нажимали - выходим
            if (this.classList.contains('clicked')) return;
            
            this.classList.add('clicked');
            
            if (this.dataset.correct === 'true') {
                // Правильный ответ
                this.classList.add('correct-click');
                correctCount++;
                this.style.pointerEvents = 'none';
            } else {
                // Неправильный ответ
                this.classList.add('wrong-click');
            }
            
            // Если все 3 правильные картинки нажаты
            if (correctCount === 3) {
            nextButton.style.display = 'inline-block';
            nextButton.style.animation = 'pulse 0.5s ease';
            }
        });
    });
});
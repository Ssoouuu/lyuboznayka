document.addEventListener('DOMContentLoaded', function () {
    const images = document.querySelectorAll('.click-a__images img');
    const nextButton = document.querySelector('.btn-yellow');

    nextButton.style.display = 'none';

    let correctCount = 0;

    images.forEach(image => {
        image.addEventListener('click', function () {
            if (this.dataset.correct === 'true') {
                // Правильный ответ
                this.classList.add('correct-click');
                correctCount++;
                this.style.pointerEvents = 'none';
            } else {
                // Неправильный ответ
                this.classList.add('wrong-click');
                setTimeout(() => this.classList.remove('wrong-click'), 500);
            }

            // Если все 3 правильные картинки нажаты
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
                images.forEach(img => {
                    img.style.pointerEvents = 'none';
                });
                nextButton.style.display = 'inline-block';
                nextButton.style.animation = 'pulse 0.5s ease';
                addReward('А');
            }
        });
    });
});
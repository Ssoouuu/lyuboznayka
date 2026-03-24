document.addEventListener('DOMContentLoaded', function() {
    const nextButton = document.querySelector('.btn-yellow');
    const doors = document.querySelectorAll('.doors-e__image');
    // const icon = document.querySelectorAll('.doors-e__icon');
    const counter = document.querySelector('#counter');

    nextButton.style.display = 'none';

    let animating = false;

    let correctCount  = 0;

    function updateCounter() {
        counter.textContent = correctCount ;
    }

    updateCounter();

    doors.forEach(door => {
        door.addEventListener('click', function(e) {
            const parent = this.closest('.doors-e__item');
             if (animating) return;
            if(this.dataset.correct === 'true') {
                this.style.display = 'none';
                const icon = parent.querySelector('.doors-e__icon');
                if (icon) {
                    icon.classList.add('correct');
                    icon.style.display = 'block';
                }
                correctCount++;
                updateCounter();
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
            }

            if(correctCount  === 4) {
                nextButton.style.display = 'inline-block';
                nextButton.style.animation = 'pulse 0.5s ease'
            }
        })
    })

})
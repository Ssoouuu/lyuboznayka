document.addEventListener('DOMContentLoaded', function() {
    const letterGroups = document.querySelectorAll('.letter-group');
    const positions = ['a', 'b', 'c'];
    
    function swapLetters() {
        // Добавляем класс для исчезновения
        letterGroups.forEach(group => {
            group.classList.add('swapping');
        });
        
        // Ждем половину анимации исчезновения
        setTimeout(() => {
            const shuffled = [...positions].sort(() => Math.random() - 0.5);
            
            letterGroups.forEach((group, index) => {
                group.classList.remove('letter-group--a', 'letter-group--b', 'letter-group--c');
                group.classList.add(`letter-group--${shuffled[index]}`);
            });
            
            // Убираем класс исчезновения - буквы появятся на новых местах
            setTimeout(() => {
                letterGroups.forEach(group => {
                    group.classList.remove('swapping');
                });
            }, 50);
        }, 250); // Половина времени анимации
    }
    
    setInterval(swapLetters, 10000);
});
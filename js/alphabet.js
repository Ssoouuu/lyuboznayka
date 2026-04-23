const alphabet = [
    { letter: 'Аа', type: 'yellow', link: '#' },
    { letter: 'Бб', type: 'blue', link: '#' },
    { letter: 'Вв', type: 'blue', link: '#' },
    { letter: 'Гг', type: 'blue', link: '#' },
    { letter: 'Дд', type: 'blue', link: '#' },
    { letter: 'Ее', type: 'yellow', link: '#' },
    { letter: 'Ёё', type: 'yellow', link: '#' },
    { letter: 'Жж', type: 'blue', link: '#' },
    { letter: 'Зз', type: 'blue', link: '#' },
    { letter: 'Ии', type: 'yellow', link: '#' },
    { letter: 'Йй', type: 'purple', link: '#' },
    { letter: 'Кк', type: 'blue', link: '#' },
    { letter: 'Лл', type: 'blue', link: '#' },
    { letter: 'Мм', type: 'blue', link: '#' },
    { letter: 'Нн', type: 'blue', link: '#' },
    { letter: 'Оо', type: 'yellow', link: '#' },
    { letter: 'Пп', type: 'blue', link: '#' },
    { letter: 'Рр', type: 'blue', link: '#' },
    { letter: 'Сс', type: 'blue', link: '#' },
    { letter: 'Тт', type: 'blue', link: '#' },
    { letter: 'Уу', type: 'yellow', link: '#' },
    { letter: 'Фф', type: 'blue', link: '#' },
    { letter: 'Хх', type: 'blue', link: '#' },
    { letter: 'Цц', type: 'blue', link: '#' },
    { letter: 'Чч', type: 'blue', link: '#' },
    { letter: 'Шш', type: 'blue', link: '#' },
    { letter: 'Щщ', type: 'blue', link: '#' },
    { letter: 'Ъъ', type: 'purple', link: '#' },
    { letter: 'Ыы', type: 'yellow', link: '#' },
    { letter: 'Ьь', type: 'purple', link: '#' },
    { letter: 'Ээ', type: 'yellow', link: '#' },
    { letter: 'Юю', type: 'yellow', link: '#' },
    { letter: 'Яя', type: 'yellow', link: '#' }
];

// Предзагрузка картинок с теорией для всех букв
const theoryImages = [];
alphabet.forEach(item => {
    const letterName = item.letter[0].toUpperCase();
    const imgSrc = `../public/alphabet/Буква ${letterName} - теория.webp`;
    const img = new Image();
    img.src = imgSrc;
    theoryImages.push(img); // сохраняем, если нужно, но можно и без массива
});

let transitionTimer = null;
let currentAudio = null;          // текущий воспроизводимый звук

// Хранилище предзагруженных звуков
const sounds = {};

// Предзагрузка всех звуков алфавита (загружаем сразу при старте)
alphabet.forEach(item => {
    const letter = item.letter[0];
    const audio = new Audio(`../public/audio/letters/${letter}.mp3`);
    audio.volume = 0.5;           
    audio.load();                 
    sounds[letter] = audio;       
});

// Функция проигрывания (звук уже предзагружен)
function playSound(letterChar, targetLink) {
    const audio = sounds[letterChar];
    if (!audio) return;
    
    // Останавливаем предыдущий звук, если он ещё играет
    if (currentAudio && currentAudio !== audio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
    
    audio.currentTime = 0;        // сброс к началу
    currentAudio = audio;
    audio.play().catch(e => console.log('Ошибка:', e));
    
    //  отменяет предыдущий запланированный переход
    clearTimeout(transitionTimer);

    // запуск нового таймера
    transitionTimer = setTimeout(() => {
        window.location.href = targetLink;  
    }, 1500);
}

// Отрисовка кнопок алфавита
function renderAlphabet() {
    const container = document.getElementById('alphabet-container');
    alphabet.forEach(item => {
        const link = document.createElement('a');
        const targetLink = `components-html/letter.html?letter=${item.letter[0]}`;
        link.href = 'javascript:void(0)';
        link.className = `alphabet__letter alphabet__letter--${item.type}`;
        link.innerHTML = `<p>${item.letter}</p>`;
        
        // При клике – звук и переход
        link.addEventListener('click', (e) => {
            e.preventDefault();
            playSound(item.letter[0], targetLink);
        });
        
        container.appendChild(link);
    });
}

renderAlphabet();
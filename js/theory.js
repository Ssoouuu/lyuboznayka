console.log('theory.js загрузился!');
console.log('Буква из URL:', window.location.search);

// КОНТЕНТ ДЛЯ КАЖДЫЙ БУКВЫ
const lettersContent = {
    'А': {
        title: 'Ого! Это буква «<span class="letter-yellow">А</span>»',
        text: 'Буква «<span class="letter-yellow">А</span>» — самая первая и самая важная буква в алфавите! А теперь попробуй её пропеть: <span class="letter-yellow">А-а-а</span>! С этой буквы начинаются вкусные и интересные слова: <span class="letter-yellow">А</span>рбуз, <span class="letter-yellow">А</span>збука, <span class="letter-yellow">А</span>ист.',
        image: '../public/alphabet/Буква А - теория.webp',
        link: '../letter-html/A/drag-a.html?letter=А',
        endImage: '../public/alphabet/Конец-А.webp',
        endText: 'Отличная работа! Буква «<span class="letter-yellow">А</span>» заслуженно твоя!',
        audio: '../public/audio/letters/letter-a.mp3'
    },
    'Б': {
        title: 'Познакомься — это буква «<span class="letter-blue">Б</span>»',
        text: 'Буква «<span class="letter-blue">Б</span>» любит громко и звонко звучать! Посмотри: у неё есть пухлый животик и длинная ножка. Она прячется в самых милых словах: <span class="letter-blue">Б</span>ык, <span class="letter-blue">Б</span>елка и <span class="letter-blue">Б</span>абочка! А теперь скажи: <span class="letter-blue">Б-б-б</span>! Чувствуешь, как будто <span class="letter-blue">Б</span>арабан стучит? Давай запомним эту весёлую букву!',
        image: '../public/alphabet/Буква Б - теория.webp',
        link: '../letter-html/Б/drag-b.html?letter=Б',
        endImage: '../public/alphabet/Конец-Б.webp',
        endText: 'Супер! Забирай букву «<span class="letter-blue">Б</span>» в награду!',
        audio: '../public/audio/letters/Буква-Б.mp3'
    },
    'В': {
        title: 'Привет, буква «<span class="letter-blue">В</span>»!',
        text: 'Посмотри на букву «<span class="letter-blue">В</span>». Она похожа на два кружочка — как очки! Попробуй произнести: <span class="letter-blue">В-в-в</span>! Чувствуешь, как зубки касаются нижней губы? С этой буквы начинаются необычные слова: <span class="letter-blue">В</span>олк, <span class="letter-blue">В</span>ода, <span class="letter-blue">В</span>елосипед. Вот такая она важная!',
        image: '../public/alphabet/Буква В - теория.webp',
        link: '../letter-html/В/quiz.html?letter=В',
        endImage: '../public/alphabet/Конец-В.webp',
        endText: 'Вау, отличный результат! Ты — Знаток буквы «<span class="letter-blue">В</span>»!',
        audio: '../public/audio/letters/Буква-В.mp3'
    },
    'Г': {
        title: 'Ура! Новая буква — «<span class="letter-blue">Г</span>»!',
        text: 'Познакомься с буквой «<span class="letter-blue">Г</span>». Она стоит на стройной ножке, чтобы быть самой высокой! На ней висит спелая <span class="letter-blue">Г</span>руша — любимое лакомство Любознайки! Эта буква любит прятаться в середине слов: кни<span class="letter-blue">Г</span>а, и<span class="letter-blue">Г</span>ра, ва<span class="letter-blue">Г</span>он.',
        image: '../public/alphabet/Буква Г - теория.webp',
        link: '../letter-html/Г/click-d.html?letter=Г',
        endImage: '../public/alphabet/Конец-Г.webp',
        endText: 'Вот и буква «<span class="letter-blue">Г</span>»! Любознайка гордится тобой!',
        audio: '../public/audio/letters/Буква-Г.mp3'
    },
    'Д': {
        title: 'Смотри — это буква «<span class="letter-blue">Д</span>»!',
        text: 'А ты знаешь букву «<span class="letter-blue">Д</span>»? Она стоит на крепких ножках, а сверху у неё крыша, как у <span class="letter-blue">Д</span>ома. А ещё она прячется в словах: Е<span class="letter-blue">д</span>а, <span class="letter-blue">Д</span>руг, са<span class="letter-blue">Д</span>. Когда произносишь букву «<span class="letter-blue">Д</span>», язычок упирается в верхние зубки и звонко стучит: <span class="letter-blue">Д-д-д</span>! Давай изучим её вместе!',
        image: '../public/alphabet/Буква Д - теория.webp',
        link: '../letter-html/Д/click-e.html?letter=Д',
        endImage: '../public/alphabet/Конец-Д.webp',
        endText: 'Ого! Новая буква в твоей копилке — «<span class="letter-blue">Д</span>»!',
        audio: '../public/audio/letters/Буква-Д.mp3'
    }
};

const urlParams = new URLSearchParams(window.location.search);
const key = urlParams.get('letter');

if (!lettersContent[key]) {
    window.location.href = '../components-html/soon.html?letter=' + key;
} else {
    const data = lettersContent[key];

    // Проверяем, на какой мы странице
    const isEndPage = window.location.pathname.includes('end.html');

    if (isEndPage) {
        // Если это end.html - показываем endImage и endText
        document.getElementById('end-text').innerHTML = data.endText;
        document.getElementById('end-image').innerHTML = '<img src="' + data.endImage + '" alt="Победа">';
        const sound = new Audio('../public/audio/base/Победа.mp3');
        sound.volume = 0.3;
        sound.play().catch(e => console.log('Ошибка воспроизведения:', e));

        // НАЧАТЬ ЗАНОВО
        const restartBtn = document.getElementById('restart-btn');
        if (restartBtn) {
            restartBtn.href = '../components-html/letter.html?letter=' + key;
        }
    } else {
        // Если это letter.html - показываем обычный контент
        document.getElementById('letter-title').innerHTML = data.title;
        document.getElementById('letter-text').innerHTML = data.text;
        document.getElementById('letter-image').innerHTML = '<img src="' + data.image + '" alt="Буква ' + key + '">';
        // АУДИО
        if (data.audio) {
            const audio = new Audio(data.audio);
            const playBtn = document.getElementById('playSoundBtn');
            audio.volume = 0.5;
            audio.play();
            if (playBtn) {
                playBtn.addEventListener('click', () => {
                    audio.play();
                });
            }
        }
        // if (data.audio) {
        //     const playBtn = document.getElementById('playSoundBtn');
        //         const autoAudio = new Audio(data.audio);
        //     autoAudio.volume = 0.5;
        //     autoAudio.play().catch(e => console.log('Автовоспроизведение заблокировано'));
        //     if (playBtn) {
        //         let currentAudio = null;

        //         playBtn.addEventListener('click', () => {
        //             if (currentAudio && !currentAudio.paused) {
        //                 currentAudio.pause();
        //                 playBtn.textContent = '🔊 Продолжить';
        //             } else if (currentAudio && currentAudio.paused) {
        //                 currentAudio.play();
        //                 playBtn.textContent = '⏹️ Пауза';
        //             } else {
        //                 currentAudio = new Audio(data.audio);
        //                 currentAudio.volume = 0.5;
        //                 currentAudio.play();
        //                 playBtn.textContent = '⏹️ Пауза';
        //                 currentAudio.onended = () => {
        //                     playBtn.textContent = '🔊 Прослушать';
        //                     currentAudio = null;
        //                 };
        //             }
        //         });
        //     }
        // }

        // КНОПКА "ВПЕРЕД"
        const nextButton = document.querySelector('.btn-yellow');
        if (data.link) {
            nextButton.href = data.link;
        }
    }
}
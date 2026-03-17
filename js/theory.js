// КОНТЕНТ ДЛЯ КАЖДЫЙ БУКВЫ
const lettersContent = {
    'А': {
        title: 'Ого! Это буква «<span class="letter-yellow">А</span>»',
        text: 'Буква «<span class="letter-yellow">А</span>» — первая в алфавите и похожа на домик! А теперь попробуй её пропеть: <span class="letter-yellow">А-а-а</span>! С этой буквы начинаются вкусные и интересные слова: <span class="letter-yellow">А</span>рбуз, <span class="letter-yellow">А</span>нанас, <span class="letter-yellow">А</span>ист.',
        image: 'public/alphabet/Буква А - теория.webp',
        link: 'letter-html/A/drag-a.html?letter=А',
        endImage: 'public/alphabet/end-A.webp',
        endText: 'Поздравляем! Ты — Знаток буквы «<span class="letter-yellow">А</span>»!'
    },
    'Б': {
        title: 'Познакомься — это буква «<span class="letter-blue">Б</span>»',
        text: 'Буква «<span class="letter-blue">Б</span>» любит громко и звонко звучать! Посмотри: у неё круглая шапочка и длинная ножка. С неё начинаются самые милые слова: <span class="letter-blue">Б</span>егемот, <span class="letter-blue">Б</span>елочка и <span class="letter-blue">Б</span>а<span class="letter-blue">Б</span>очка! А теперь скажи: <span class="letter-blue">Б-б-б</span>! Чувствуешь, как будто <span class="letter-blue">Б</span>арабан стучит? Давай запомним эту весёлую букву!',
        image: 'public/alphabet/Буква Б - теория.webp',
        link: 'letter-html/Б/drag-b.html?letter=Б',
        endImage: 'public/alphabet/end-B.webp',
        endText: 'Поздравляем! Ты — Знаток буквы «<span class="letter-blue">Б</span>»!'
    },
    'В': {
        title: 'Привет, буква «<span class="letter-blue">В</span>»!',
        text: 'Посмотри на букву «В». На что она похожа? На очки или на два барабана? Попробуй произнести: <span class="letter-blue">В-в-в</span>! Чувствуешь, как зубки касаются нижней губы? С буквы «<span class="letter-blue">В</span>» начинаются важные слова: <span class="letter-blue">В</span>ода, <span class="letter-blue">В</span>оздух, <span class="letter-blue">В</span>ремя. А ещё <span class="letter-blue">В</span>олк, <span class="letter-blue">В</span>орона и <span class="letter-blue">В</span>елосипед!',
        image: 'public/alphabet/Буква В - теория.webp',
        link: 'letter-html/В/quiz.html?letter=В',
        endImage: 'public/alphabet/end-B.webp',
        endText: 'Ты отлично прошел викторину на знание буквы «<span class="letter-blue">В</span>»!'
    }
};

const urlParams = new URLSearchParams(window.location.search);
const key = urlParams.get('letter');

if (!lettersContent[key]) {
    window.location.href = 'components html/soon.html?letter=' + key;
} else {
    const data = lettersContent[key];

    // Проверяем, на какой мы странице
    const isEndPage = window.location.pathname.includes('end.html');

    if (isEndPage) {
        // Если это end.html - показываем endImage и endText
        document.getElementById('end-text').innerHTML = data.endText;
        document.getElementById('end-image').innerHTML = '<img src="' + data.endImage + '" alt="Победа">';

        // НАЧАТЬ ЗАНОВО
        const restartBtn = document.getElementById('restart-btn');
        if (restartBtn) {
            restartBtn.href = 'components html' + '/letter.html?letter=' + key;
        }
    } else {
        // Если это letter.html - показываем обычный контент
        document.getElementById('letter-title').innerHTML = data.title;
        document.getElementById('letter-text').innerHTML = data.text;
        document.getElementById('letter-image').innerHTML = '<img src="' + data.image + '" alt="Буква ' + key + '">';

        // КНОПКА "ВПЕРЕД"
        const nextButton = document.querySelector('.btn-yellow');
        if (data.link) {
            nextButton.href = data.link;
        }
    }
}
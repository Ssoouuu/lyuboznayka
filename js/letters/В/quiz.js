const quiz = [
    {
        image: '../../../public/alphabet/Буква В - вопрос 1.webp',
        quest: 'В каком слове <span style="border-bottom: 3px solid var(--text-blue); color: var(--text-blue); font-size: 28px;">нет</span> буквы «<span class="blue">В</span>»?',
        ans: ['ВОЛК', 'ВОРОНА', 'САМОЛЁТ'],
        correct: 2
    },
    {
        image: '../../../public/alphabet/Буква В - вопрос 2.webp',
        quest: 'Сколько букв «<span class="blue">В</span>» спряталось на картинке?',
        ans: ['5', '3', '2'],
        correct: 1
    },
    {
        image: '../../../public/alphabet/Буква В - вопрос 3.webp',
        quest: 'Чем похожи слова «<span class="blue">ВРАЧ</span>» и «<span class="blue">ВАЗА</span>»?',
        ans: ['Начинаются на В', 'Конец на А', 'Ничем'],
        correct: 0
    },
]

let currentQuestion = 0;

const nextButton = document.querySelector('.btn-yellow');
nextButton.style.display = 'none';

// Загрузка вопросов
function loadQuestion() {
    const q = quiz[currentQuestion]

    document.querySelector('.quiz__image-pic').src = q.image;

    document.querySelector('.quiz__text').innerHTML = q.quest;

    const quizItems = document.querySelectorAll('.quiz__item');

    quizItems.forEach((item, index) => {
        item.textContent = q.ans[index];
        item.classList.remove('correct', 'wrong', 'disabled');
        item.style.pointerEvents = 'auto';
    })
}

// Проверка ответа
function checkAnswer(e) {
    const q = quiz[currentQuestion];
    const quizItems = document.querySelectorAll('.quiz__item');

    if (e === q.correct) {
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
        quizItems[e].classList.add('correct');

        quizItems.forEach(item => {
            item.style.pointerEvents = 'none';
            item.classList.add('disabled');
        });

        // Следующий вопрос
        setTimeout(() => {
            if (currentQuestion < quiz.length - 1) {
                currentQuestion++;
                loadQuestion();
            } else {
                // Викторина пройдена
                addReward('В');
                window.location.href = '../../components-html/end.html?letter=В';
            }
        }, 1000);

    } else {
        // Ответ неправильный
        quizItems[e].classList.add('wrong');
        setTimeout(() => {
            quizItems[e].classList.remove('wrong');
        }, 500);
    }
}

// Обработчик ответов 
function answerListener() {
    const quizItems = document.querySelectorAll('.quiz__item');
    quizItems.forEach((item, index) => {
        item.addEventListener('click', () => checkAnswer(index))
    })
}

// Загрузка первого вопроса при загрузке страницы
document.addEventListener('DOMContentLoaded', function () {
    loadQuestion();
    answerListener();
});
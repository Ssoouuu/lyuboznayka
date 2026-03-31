fetch('../../components-html/header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header-placeholder').innerHTML = data;
        initBurger();
    })
    .catch(error => console.error('Ошибка загрузки шапки:', error));


fetch('../../components-html/footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer-placeholder').innerHTML = data;
    })
    .catch(error => console.error('Ошибка загрузки подвала:', error));

function initBurger() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav');
    if (burger && nav) {
        burger.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('open');
        });
        console.log('Бургер активен');
    } else {
        console.warn('Не найден бургер или навигация');
    }
}
fetch('components-html/header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header-placeholder').innerHTML = data;
    })
    .catch(error => console.error('Ошибка загрузки шапки:', error));


fetch('components-html/footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer-placeholder').innerHTML = data;
    })
    .catch(error => console.error('Ошибка загрузки подвала:', error));

console.log('include.js загрузился!');
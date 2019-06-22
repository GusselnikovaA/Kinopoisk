const searchForm = document.querySelector('#search-form'); //querySelector позволяет искать селекторы по имени
const movie = document. querySelector('#movies');
const urlPoster= 'https://image.tmdb.org/t/p/w500';


function apiSearch(event) {// эта функция срабатывает на отправку данных при нажатии клавиши enter, в коде submit
    event.preventDefault();
    const searchText = document.querySelector('.form-control').value; 
    const server = 'https://api.themoviedb.org/3/search/multi?api_key=2f2e6d930da6232833088a7d78e99c55&language=ru&query=' + searchText; //наш api + введенные в троку пользователем текст
    movie.innerHTML = 'Загрузка...';    // вывод сообщения Загрузка по выполнению кода
    
    fetch(server) // fetch это api внутри которой лежит promise и мы его принимаем и обрабатываем далее, с помощью then
        .then(function(value){ // then метод, который обрабатывает promise, функцию c параметром value. Эта функция обязательная)
            if(value.status !== 200) { 
                return Promise.reject(value);
            }
            return value.json(); 
        })

        .then(function(output) {
            console.log(output);
            let inner = '';
            output.results.forEach(function(item) {
                let nameItem = item.name || item.title;
                inner += `
                <div class = "col-12 col-md-4 col-xl-3" item>
                <img src = "${urlPoster + item.poster_path}" alt = "${nameItem}">
                <h5>${nameItem}</h5>
                </div>
                `;
            });//Каждый раз когда находит элемент запускает функцию c параметрами мы к существующим данным выводим пустую строку потом див с выводом Имен произведений. Строку inner += '<div class = "col-12">' + nameItem + '</div>' можем заменять на inner += `<div class = "col-12">${nameItem}</div>`;  Это новый способ вывода на ES6
            movie.innerHTML = inner;//innerHtml- свойство, с помощью которого мы можем получать текст со страницы либо записывать туда. В данном случае мы записываем.     
        })
        .catch(function(reason) {   // метод, обрабатывает ошибку. reason- возвращается описане ошибки
            movie.innerHTML = 'Упс, что-то пошло не так'; //выводим в окно надпись если обнаружена ошибка
            console.log('ERROR ' + reason.status);
        });
    
    
}

searchForm.addEventListener('submit', apiSearch);//'submit - кнопка enter



   


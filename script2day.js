const searchForm = document.querySelector('#search-form'); //querySelector позволяет искать селекторы по имени
const movie = document. querySelector('#movies');



function apiSearch(event) {// эта функция срабатывает на отправку данных при нажатии клавиши enter, в коде submit
    event.preventDefault();
    const searchText = document.querySelector('.form-control').value; 
    const server = 'https://api.themoviedb.org/3/search/multi?api_key=2f2e6d930da6232833088a7d78e99c55&language=ru&query=' + searchText; //наш api + введенные в троку пользователем текст
    movie.innerHTML = 'Загрузка...';    // вывод сообщения Загрузка по выполнению кода
    requestApi(server) //вызываем функцию, сама функция ниже
        .then (function(result) { // then метод, который обрабатывает вернувшийся promise, функцию c параметром result = resolve (ответ от сервера в функции requestApi)
            const output = JSON.parse(result); //result - получили опсиание нашего запроса. Это json строка. переводим ее в обычный объект, с помощью метода parse
            let inner = '';
            output.results.forEach(function(item) {
                let nameItem = item.name || item.title;
                inner += `<div class = "col-12 col-md-4 col-xl-3">${nameItem}</div>`;
            });//Каждый раз когда находит элемент запускает функцию c параметрами мы к существующим данным выводим пустую строку потом див с выводом Имен произведений. Строку inner += '<div class = "col-12">' + nameItem + '</div>' можем заменять на inner += `<div class = "col-12">${nameItem}</div>`;  Это новый способ вывода на ES6
            movie.innerHTML = inner;//innerHtml- свойство, с помощью которого мы можем получать текст со страницы либо записывать туда. В данном случае мы записываем.     
        })  

        .catch(function(reason){
            movie.innerHTML = 'Упс, что-то пошло не так'; //выводим в окно надпись если обнаружена ошибка
            console.log('ERROR ' + reason.status);
        });
}



searchForm.addEventListener('submit', apiSearch);//'submit - кнопка enter



function requestApi(url){ //url берем из переменной server

    return new Promise (function(resolve, reject) { // создаем промис с функцией с двумя параметрами resolve-выполнено, reject- отклонено и возвращаем эти значение в requestApi что выше
        const request = new XMLHttpRequest(); //прототип глобальному XMLHttp...
        request.open('GET', url); // обращаемся к прототипу, у которого есть метод open для настройки сервера, передаем туда запрос GET и url
        
        request.addEventListener('load', function() {  // событие, которое приходит от сервера при ожидании
            if (request.status !== 200) { // дополнительный поиск ошибок, например 404, она не ловится событием error и может залететь в load, поэтому ставим это дополнительное условие
                reject({status: request.status});
                return;
            }
            resolve(request.response); //ответ от сервера, результат всей функции
        });  
        
        request.addEventListener('error', function(){ //событие, которое приходит от сервера, при обнаружени ошибки
            reject({status: request.status})
        }); 

        request.send(); // отправляем запрос на сервер
    });

}

   // request.addEventListener('readystatechange', () =>{
   //     if (request.readyState !== 4){
   //         movie.innerHTML = 'Загрузка...'; //выводим в окно надпись, пока readystate не дойдет до 4
   //         return
   //     }

   //     if(request.status !== 200){
   //     movie.innerHTML = 'Упс, что-то пошло не так'; //выводим в окно надпись если обнаружена ошибка
   //         console.log('ERROR ' + request.status);
   //         return;
   //     }


    //const output = JSON.parse(request.responseText); //request.responseText - получили опсиание нашего запроса. Это json строка. переводим ее в обычный объект, с помощью метода parse

    //let inner = '';

    //output.results.forEach(function(item){
    //    let nameItem = item.name || item.title;
    //    console.log(nameItem);
    //    inner += `<div class = "col-12 col-md-4 col-xl-3">${nameItem}</div>`;
    //});//Каждый раз когда находит элемент запускает функцию c параметрами мы к существующим данным выводим пустую строку потом див с выводом Имен произведений. Строку inner += '<div class = "col-12">' + nameItem + '</div>' можем заменять на inner += `<div class = "col-12">${nameItem}</div>`;  Это новый способ вывода на ES6

    //movie.innerHTML = inner;//innerHtml- свойство, с помощью которого мы можем получать текст со страницы либо записывать туда. В данном случае мы записываем.


    //}); // ждем ответ от сервера, если не равен 4, то выходим из функции



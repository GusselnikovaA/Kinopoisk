const searchForm = document.querySelector('#search-form'); //querySelector позволяет искать селекторы по имени
const movie = document. querySelector('#movies');



function apiSearch(event){
    event.preventDefault();
    
    const searchText = document.querySelector('.form-control').value; 
    const server = 'https://api.themoviedb.org/3/search/multi?api_key=2f2e6d930da6232833088a7d78e99c55&language=ru&query=' + searchText; //наш api + введенные в троку пользователем текст
    requestApi(server); //вызываем функцию, сама функция ниже
    
}



searchForm.addEventListener('submit', apiSearch);//'submit - кнопка enter



function requestApi(url){ //url берем из переменной server


    const request = new XMLHttpRequest(); //прототип глобальному XMLHttp...
    request.open('GET', url); // обращаемся к прототипу, у которого есть метод open для настройки сервера, передаем туда запрос запрос GET и url
    request.send(); // отправляем запрос на сервер


    request.addEventListener('readystatechange', () =>{
        if (request.readyState !== 4) return; 

        if(request.status !== 200){
        console.log('ERROR ' + request.status);
        return;
    }


    const output = JSON.parse(request.responseText); //request.responseText - получили опсиание нашего запроса. Это json строка. переводим ее в обычный объект, с помощью метода parse

    let inner = '';

    output.results.forEach(function(item){
        let nameItem = item.name || item.title;
        console.log(nameItem);
        inner += `<div class = "col-12 col-md-4 col-xl-3">${nameItem}</div>`;
    });//Каждый раз когда находит элемент запускает функцию c параметрами мы к существующим данным выводим пустую строку потом див с выводом Имен произведений. Строку inner += '<div class = "col-12">' + nameItem + '</div>' можем заменять на inner += `<div class = "col-12">${nameItem}</div>`;  Это новый способ вывода на ES6

    movie.innerHTML = inner;//innerHtml- свойство, с помощью которого мы можем получать текст со страницы либо записывать туда. В данном случае мы записываем.


    }); // ждем ответ от сервера, если не равен 4, то выходим из функции


}
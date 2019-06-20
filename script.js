const searchForm = document.querySelector('#search-form');

function apiSearch(event){
    event.preventDefault();
    const searchText = document.querySelector('.form-control').value,
    url = ''
    
}


searchForm.addEventListener('submit', apiSearch);
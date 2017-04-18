var searchForm =  $('#searchForm');
var results = document.getElementById('results');
var searchButton = document.getElementById('searchButton');

function bookSearch(){
  let data = searchForm.serialize();
  console.log(data);
  $.post('search', data);
}

searchButton.addEventListener('click', bookSearch, false);

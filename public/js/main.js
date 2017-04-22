var searchForm =  $('#searchForm');
var results = document.getElementById('results');
var searchButton = document.getElementById('searchButton');

function bookSearch(){
  let data = searchForm.serialize();
  console.log(data);
  $.ajax({
    url: 'results',
    data: data,
    error: function(){
      console.log('error');
    },
    success: function(response){
      console.log(response);
    },
    type: 'GET'
  });
}

// searchButton.addEventListener('click', bookSearch, false);

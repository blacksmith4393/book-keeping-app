var https = require('https');
var URL = require('url');
var qs = require('querystring');

// var sampleUrl = 'https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&'+ KEY + 'maxResults=10' + '&fields=kind,items(volumeInfo)';

var KEY = process.env.KEY;

function getQuery( titleStr, authorStr ){
  var queryParams = {};
  queryParams.intitle = titleStr;
  queryParams.inauthor = authorStr;
  return qs.stringify(queryParams,'+', ':');
}

var getBooks = function(title, author, callback){

  var query = getQuery(title, author);

  var options = {
    protocol: 'https:',
    slashes: true,
    hostname: 'www.googleapis.com',
    search: '?q='+ query+ '&' + KEY + '&maxResults=10' + '&fields=kind,items(volumeInfo)' + '&printType=books',
    pathname: '/books/v1/volumes'
  };

  var url = URL.format(options);

  var books;
  
  var request = https.get(url, function (response) {
    var data = [];
    response.setEncoding('utf8');
    response.on('data', (chunk) => {
      data.push(chunk);
    });
    response.on('end', function() {
      data = data.join('');
      data = JSON.parse(data);
      data = data.items;
      callback(data);
    });
  });
  request.on('error', (e) => {
    console.error(e);
  });
  request.end(books);
};


var exports = module.exports = getBooks;
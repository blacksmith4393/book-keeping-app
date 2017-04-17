var https = require('https');

// https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=yourAPIKey

var options = {
  hostname: 'www.googleapis.com',
  path: '/books/v1/volumes',
  query: 'q=flowers+inauthor:keyes',
  method: 'GET',
  'api-key': 'AIzaSyAv5_xYzI-SQX3byRz4wulFAVjLCk6CS6g'

};

https.get(options, function (response) {
  response.setEncoding('utf8');
  response.on('data', console.log);
  response.on('error', console.error);
}).on('error', console.error);
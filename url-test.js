var url = require('url');
var queryObj = {
  hostname: 'www.googleapis.com',
  path: '/books/v1/volumes',
  query: { 'q' : 'flowers' + 'inauthor'}, 
  method: 'GET',
  'api-key': 'AIzaSyAv5_xYzI-SQX3byRz4wulFAVjLCk6CS6g'
};
console.log(url.format(queryObj));
var https = require('https');
var URL = require('url');
var qs = require('querystring');

var sampleUrl = 'https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&'+ KEY + 'maxResults=10' + '&fields=kind,items(volumeInfo)';

var KEY = process.env.KEY;

var query = {};
if(process.argv[2]){
  query.intitle = process.argv[2];
}
if(process.argv[3]){
  query.inauthor = process.argv[3];
}

var searchQuery = qs.stringify(query,'+', ':');
console.log(searchQuery);

var options = {
  protocol: 'https:',
  slashes: true,
  hostname: 'www.googleapis.com',
  search: '?q='+ searchQuery+ '&' + KEY + '&maxResults=10' + '&fields=kind,items(volumeInfo)' + '&printType=books',
  pathname: '/books/v1/volumes'
};

var url = URL.format(options);
console.log(url);

function callback(response) {
  var data = [];
  if(response.statusCode !== 200){
    console.log(response.statusCode + ':' + response.statusMessage);
  } else {
    response.setEncoding('utf8');
    response.on('data', (chunk) => {
      data.push(chunk);
    });
    response.on('end', function() {
      data = data.join('');
      data = JSON.parse(data);
      console.log(data.items);
    });
    response.on('error', console.error);  
  }
}

var request = https.get(url, callback);

request.on('error', (e) => {
  console.log(e.message);
});
request.end();
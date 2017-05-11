const https = require('https');
const URL = require('url');
const qs = require('querystring');
const dotenv = require('dotenv');
dotenv.config();

const KEY = process.env.KEY;

function getQuery( title, author ){
  let queryParams = {};
  if(title){
    queryParams.intitle = title;
  }
  if(author){
    queryParams.inauthor = author;
  }
  return qs.stringify(queryParams,'+', ':');
}

const getBooks = function(title, author, callback){

  var query = getQuery(title, author);

  var options = {
    protocol: 'https:',
    slashes: true,
    hostname: 'www.googleapis.com',
    search: '?q='+ query+ '&' + 'key='+ KEY + '&maxResults=10' + '&fields=kind,items(volumeInfo)' + '&printType=books',
    pathname: '/books/v1/volumes'
  };

  const url = URL.format(options);
  console.log(url);

  const request = https.get(url, function (response) {
    let error = null;

    if (response.statusCode !== 200) {
      error = new Error(`Request Failed. Status Code: ${response.statusCode}`);
      return callback(error);
    }

    response.setEncoding('utf8');

    let rawData = [];
    response.on('data', (chunk) => {
      rawData.push(chunk);
    });
    response.on('end', function() {
      rawData = rawData.join('');
      let data = rawData;
      return callback(null, data);
    });
  });
  request.on('error', (e) => {
    console.error(e);
  });
  request.end();
};

var exports = module.exports = getBooks;
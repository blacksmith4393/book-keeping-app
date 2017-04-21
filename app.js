const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const getBooks = require('./getBooks.js');
const app = express();

app.set('port', (process.env.PORT) || 5000);

app.use(express.static(__dirname + '/public'));

app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname,'public')));

app.get('/', function(request, response) {
  response.render('pages/index');
});
app.get('/search', function(request, response) {
  response.render('pages/search');
});
app.get('/results', function(request, response) {
  let title = request.query.title;
  let author = request.query.author;

  getBooks(title, author, function(data){
    let books = {
      items: data.items
    };
    console.log(books);
    response.render('pages/results', books);
  });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

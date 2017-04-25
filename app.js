
// MODULES ===============================================
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const getBooks = require('./getBooks');
const users = require('./app/routes/users');
const database = require('./config/database');
const mongoose = require('mongoose');

const app = express();

// CONNECT TO DATABASE ===================================
mongoose.connect(database.url);
mongoose.connection.on('connected', () => {
  console.log('connected to database:' + database.url);
});
mongoose.connection.on('error', (err) => {
  console.log('database error:' + err);
});

//APP CONFIGURATION ======================================

// set port
app.set('port', (process.env.PORT) || 5000);

// set up body-parser middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// set static files location
app.use(express.static(path.join(__dirname,'public')));

app.use('/users', users);

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
    let books = { items: data};
    response.render('pages/results', books);
  });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

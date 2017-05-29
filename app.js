
// MODULES ===============================================
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
require('dotenv').config();


const users = require('./app/routes/users');
const books = require('./app/routes/books');
const database = require('./config/database');

const app = express();

// CONNECT TO DATABASE ===================================
if (process.argv[2] === 'dev'){
  mongoose.connect(database.devUrl);
  // mongoose.connection.on('connected', () => {
  //   console.log('connected to database:' + database.devUrl);
  // });
} else {
  mongoose.connect(database.url);
  // mongoose.connection.on('connected', () => {
  //   console.log('connected to database:' + database.url);
  // });
}

mongoose.connection.on('error', (err) => {
  console.log('database error:' + err);
});

// APP CONFIGURATION =====================================

// set port
app.set('port', (process.env.PORT) || 5000);

// CORS Middleware
app.use(cors());

// set static files location
app.use(express.static(path.join(__dirname,'public/angular')));

// set up body-parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// set up passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);
app.use('/books', books);


// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname,'public/angular/index.html'));
// });

const server = app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

module.exports = server;
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

app.set('port', (process.env.PORT) || 5000);

app.use(express.static(__dirname + '/public'));

app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname,'public')));

app.get('/', function(request, response) {
  response.render('pages/index');
});
app.get('/about', function(request, response) {
  response.render('pages/about');
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');


const app= express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname,'public')));

app.get('/', function (req, res) {
  res.render('index');
});

app.listen(3000, function(){
  console.log('app listening on port 3000');
});

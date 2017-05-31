const express = require('express');
const router = express.Router();
const Books = require('../controllers/books-controller');

router.get('/', function(req, res, next){
  let title = req.query.title;
  let author = req.query.author;
  res.send('hello');
});

module.exports = router;
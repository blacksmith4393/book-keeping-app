const express = require('express');
const router = express.Router();
const getBooks = require('../get-books');
const Books = require('../controllers/books');

router.get('/', function(req, res, next){
  let title = req.params.title;
  let author = req.params.author;
  res.send('hello');
});

module.exports = router;
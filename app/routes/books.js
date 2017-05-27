const express = require('express');
const router = express.Router();
// const passport = require('passport');
const getBooks = require('../get-books');

router.get('/books', function(req, res, next){
  let title = req.query.title;
  let author = req.query.author;
  getBooks(title, author, (err, data) => {
    if(err) {
      res.send(err.message);
    } else {
      res.send(data);
    }
  });
});

module.exports = router;
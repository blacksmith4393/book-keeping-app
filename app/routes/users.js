const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const database = require('../../config/database');

const User = require('../models/user');
const usersController = require('../controllers/users-controller.js');

router.post('/', function(req, res, next) {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  });
  usersController.addUser(newUser, (err, user) => {
    if(err) {
      res.json({ success: false, msg: 'Failed to register user'});
    } else {
      res.json( 
        {
          success: true, 
          msg: 'User registered',
          _id: user._id,
          username: user.username
        });
    }
  });
});

router.post('/user', function(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;
  usersController.authenticateUser(username, password, (err, data) => {
    res.send(data);
  });
});

router.get('/:username/profile', passport.authenticate('jwt', {session: false}), function(req, res, next) {
  let username = req.params.username;
  usersController.getUserByUsername(username, function (err, user) {
    if(err) throw err;
    res.json(user);
  });
});

// router.get('/search', passport.authenticate('jwt', {session: false}), function(req, res, next){
//   let title = req.query.title;
//   let author = req.query.author;
//   getBooks(title, author, (err, data) => {
//     if(err) {
//       res.send(err.message);
//     } else {
//       res.send(data);
//     }
//   });
// });

module.exports = router;
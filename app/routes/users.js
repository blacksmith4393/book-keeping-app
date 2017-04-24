const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

router.post('/register', function(req, res, next) {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  });
  User.addUser(newUser, (err, user) => {
    if(err) {
      res.json({ success: false, msg: 'Failed to register user'});
    } else {
      res.json( {success: true, msg: 'User registered'});
    }
  });
});

router.post('/authenticate', function(req, res, next) {
  res.send('AUTHENTICATE');
});
router.get('/profile', function(req, res, next) {
  res.send('PROFILE');
});


module.exports = router;
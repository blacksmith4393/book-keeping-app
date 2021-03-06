const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const database = require('../../config/database');
const User = require('../models/user.js');
const getBooks = require('../getBooks');

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
  const username = req.body.username;
  const password = req.body.password;
  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user) {
      return res.json({success: false, msg: 'User not found'});
    } 

    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if(isMatch) {
        const token = jwt.sign(user, database.secret,{
          expiresIn: 3600
        });
        res.json({
          success: true,
          token: 'JWT ' + token,
          user: {
            _id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
          }
        });
      } else { 
        return res.json({success: false, msg:'Wrong password'});
      }
    });
  });
});

router.get('/profile', passport.authenticate('jwt', {session: false}), function(req, res, next) {
  res.json({user: req.user});
});

router.get('/search', passport.authenticate('jwt', {session: false}), function(req, res, next){
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
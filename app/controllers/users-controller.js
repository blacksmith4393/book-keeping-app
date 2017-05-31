const bcrypt = require('bcryptjs');
const database = require('../../config/database');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const usersController = {
  addUser: function ( newUser, callback ){
    bcrypt.genSalt(10, (err, salt) => {
      if ( err ) throw err;
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if ( err ) throw err;
        newUser.password = hash;
        newUser.save(callback);
      });
    });
  },
  authenticateUser: function ( username, password, callback ) {
    this.getUserByUsername( username, (err, user) => {
      if( err ) throw err;
      if( !user ) {
        callback( null, { success: false, msg: 'User not found' } );
      } 
      this.comparePassword( password, user.password, (err, isMatch) => {
        if ( err ) throw err;
        if ( isMatch ) {
          const token = jwt.sign(user._id, database.secret, { expiresIn: 3600 });
          callback( null, { success: true, msg: 'Login successful', token: token } );
        } else { 
          callback( null, { success: false, msg:'Wrong password' } );
        }
      });
    });
  },
  comparePassword: function ( candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
      if(err) throw err;
      callback(null, isMatch);
    });
  },
  getUserById: function ( id, callback ) {
    User.findById(id, callback);
  },
  getUserByUsername: function ( username, callback ) {
    const query = { username: username };
    User.findOne(query, callback);
  }
};

module.exports = usersController;

const chai = require('chai');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');
const server = require('../app.js');
const User = require('../app/models/user');
const jwt = require('jsonwebtoken');
const database = require('../config/database');
const usersController = require('../app/controllers/users-controller');

chai.use(chaiHttp);

describe('Load express server', function () {

  it('responds to / with status code 200', function (done) {
    chai.request(server)
      .get('/')
      .end( function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
    });
  });
  it('responds with 404 for undefined routes', function (done) {
    chai.request(server)
      .get('/foo/bar')
      .end( function (err, res) {
        expect(res).to.have.status(404);
        done();
      });
  });
});

describe('GET /books', function () {

  it('should return 200', function (done) {
    chai.request(server)
      .get('/books')
      .end( function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });

  it('content-type should be application/json', function (done) {
    chai.request(server)
      .get('/books')
      .query(
        { 
          title: 'brave new world', 
          author:'huxley'
        })
      .end( function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.headers).to.have.property('content-type', 'application/json');
        done();
      });
  });
});

describe('POST /users', function () {
  let user = {
    name: 'jon doe',
    email: 'jdoe@test.com',
    username: 'jdoe',
    password: 'password'
  };
  beforeEach(function (done) {
    User.remove({}, function (err) {
      if (err) { console.log(err); }
      done();
    });
  });

  it('should return 200 when request includes user data', function (done) {
    chai.request(server)
      .post('/users')
      .send(user)
      .end( function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should register new user and return new user\'s username and db id', function (done) {
    chai.request(server)
      .post('/users')
      .send(user)
      .end( function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.headers).to.have.property('content-type', 'application/json; charset=utf-8');
        expect(res.body).to.have.property('success', true);
        expect(res.body).to.have.property('username', 'jdoe');
        done();
      });
  });
});

describe('POST /users/user', function(){
  let testUser = new User({
    name: 'jon doe',
    email: 'jdoe@test.com',
    username: 'jdoe',
    password: 'password'
  });

  before( function (done) {
    User.remove({}, function (err) {
      if (err) { console.log(err); }
    });
    
    usersController.addUser(testUser, function (err, user) {
      if (err) { console.log(err); }
      testUser._id = user._id;
    });
    done();
  });

  it('should authenticate user and respond with jwt, username and db id', function (done) {
    chai.request(server)
      .post('/users/user')
      .send(
        { 
          username: testUser.username,
          password: testUser.password
        })
      .end( function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('token');
        done();
      });
  });
});

describe('GET /users/:username/profile', function () {
  let testUser;

  before( function (done) {
    User.remove({}, function (err) {
      if (err) { console.log(err); }
    });
    let userData = {
      name: 'jon doe',
      email: 'jdoe@test.com',
      username: 'jdoe',
      password: 'password'
    };
    usersController.addUser(new User( userData ), function (err, user) {
      if (err) { console.log(err); }
      testUser = user;
      testUser.token = jwt.sign(testUser.username, database.secret);
      done();    
    });
    
  });

  it('should respond with user profile data', function (done) {
    let url = '/users/${testUser.username}/profile';
    chai.request(server)
      .get(url)
      .set('Authorization', 'JWT ' + testUser.token)
      .end( function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('username', 'jdoe');
        expect(res.body).to.have.property('_id', testUser._id);
        done();
      });
  });
});

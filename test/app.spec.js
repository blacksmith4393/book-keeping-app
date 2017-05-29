const chai = require('chai');
const expect = require('chai').expect;
const request = require('supertest');
const chaiHttp = require('chai-http');
const server = require('../app.js');

chai.use(chaiHttp);

describe('Load express server', function () {

  it('responds to / with status code 200', function (done) {
    chai.request(server)
      .get('/')
      .end( function (err, res) {
        expect(res.status).to.equal(200);
        done();
    });
  });
  it('responds with 404 for undefined routes', function (done) {
    chai.request(server)
      .get('/foo/bar')
      .end( function (err, res) {
        expect(res.status).to.equal(404);
        done();
      });
  });
});

describe('GET /books', function () {

  it('should return 200', function (done) {
    chai.request(server)
      .get('/books')
      .end( function (err, res) {
        expect(res.status).to.equal(200);
        done();
    });
  });

  it('content-type should be application/json', function (done) {
    chai.request(server)
      .get('/books')
      .end( function (err, res) {
        expect(res.headers).to.include({'content-type': 'application/json'});
        done();
      });
  });

  // it('should respond with json data of books', function (done) {
  //   done();
  // });
});
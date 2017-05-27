const chai = require('chai');
const expect = require('chai').expect;
const assert = require('assert');
const http = require('http');

const app = require('../app');
const host = 'http://localhost:5000';

describe('app', function () {
  before(function () {
    server.listen(8000);
  });

  after(function () {
    server.close();
  });
});


describe('/', function () {
  it('should return 200', function (done) {
    http.get(host, function (res) {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
});
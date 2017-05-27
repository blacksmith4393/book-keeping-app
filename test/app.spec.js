const chai = require('chai');
const expect = require('chai').expect;
const request = require('supertest');

describe('loading express server', function () {
  let server;
  beforeEach(function () {
    delete require.cache[require.resolve('../app')];
    server = require('../app');
  });

  afterEach(function (done) {
    server.close();
    done();
  });

  it('responds to /', function testSlash(done) {
    request(server)
    .get('/')
    .expect(200, done);
  });
  it('404 everything else', function testPath(done) {
    request(server)
      .get('/foo/bar')
      .expect(404, done);
  });
});
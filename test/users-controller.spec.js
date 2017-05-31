const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = require('chai').expect;
const sinon = require('sinon');

const User = require('../app/models/user');
const usersController = require('../app/controllers/users-controller');

describe('usersController',function () {  
  describe('addUser', function () {

    it('should accept a User and callback as arguments', function (done) {
      let testUser = new User(
        {
          name: 'jon doe',
          email: 'jdoe@test.com',
          username: 'jdoe', 
          password: 'password'
        });
      usersController.addUser(testUser, function ( err, data ) {
        expect(err).to.be.null;
        done();
      });
    });
  });
});

// it('calls original function with right this and args', function () {
//     var callback = sinon.spy();
//     var proxy = once(callback);
//     var obj = {};

//     proxy.call(obj, 1, 2, 3);

//     assert(callback.calledOn(obj));
//     assert(callback.calledWith(1, 2, 3));
// });
// it("returns the return value from the original function", function () {
//     var callback = sinon.stub().returns(42);
//     var proxy = once(callback);

//     assert.equals(proxy(), 42);
// });
// after(function () {
//     // When the test either fails or passes, restore the original
//     // jQuery ajax function (Sinon.JS also provides tools to help
//     // test frameworks automate clean-up like this)
//     jQuery.ajax.restore();
// });

// it('makes a GET request for todo items', function () {
//     sinon.stub(jQuery, 'ajax');
//     getTodos(42, sinon.spy());

//     assert(jQuery.ajax.calledWithMatch({ url: '/todo/42/items' }));
// });
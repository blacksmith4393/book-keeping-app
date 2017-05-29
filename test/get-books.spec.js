const assert = require('assert');
const getBooks = require('../app/get-books');

describe('getBooks', function() {
  let title = 'Brave New World';
  let author = 'Aldous Huxley';

  it('should return a JSON-formatted string', function(done) {
    getBooks(title, author, (err, data) => {
      assert.equal( null, err );
      assert.equal( 'string', typeof data );
      done();
    });
  });

  it('parsed string should be an object containing an array of book data objects', function(done) {
    getBooks(title, author, (err, data) => {
      const parsedData = JSON.parse(data);
      assert.equal( null, err );
      assert.equal( 'object', typeof parsedData);
      assert.equal( true, parsedData.items.constructor === Array );
      done();
    });
  });
    
});
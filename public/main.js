var addBookButton = document.getElementById('addBookButton');
var bookList = document.getElementById('bookList');
var Mustache = require('mustache');

var Book = function(){
  this.title = '';
  this.author = '';
  this.rating = '';
};

var bookLibrary = {
  books: [],
  getBookInfo: function(){
    let bookTitle = document.getElementById('bookTitle').value;
    let bookAuthor = document.getElementById('bookAuthor').value;
    let bookRating =document.getElementById('bookRating').value;
    let bookInfo = [bookTitle, bookAuthor, bookRating];
    return bookInfo;
  },
  addBook: function(){
    let bookInfo = this.getBookInfo();
    let newBook = new Book();
    Object.keys(newBook).forEach(function(key, index){
      newBook[key] = bookInfo[index];
    });
    this.books.unshift(newBook);
    this.renderBooks();
  },
  renderBooks: function(){
    while (bookList.hasChildNodes()) {
    bookList.removeChild(bookList.lastChild);
    }
    this.books.forEach(function(book){
      //console.log(book);
      let li = document.createElement('li');
      li.className="list-group-item";
      let h4 = document.createElement('h4');
      h4.innerHTML = book.title;
      li.appendChild(h4);
      bookList.appendChild(li);
    });
  }
};

addBookButton.addEventListener('click', bookLibrary.addBook.bind(bookLibrary));

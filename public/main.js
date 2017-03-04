var addBookButton = document.getElementById('addBookButton');
var bookList = document.getElementById('bookList');
var template = document.getElementById('template').innerHTML;

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
    if (this.books[0]) {
      newBook.id = this.books[0].id + 1;
    } else {
      newBook.id = 1;
    }

    this.books.unshift(newBook);
    this.renderBooks();
  },
  renderBooks: function(){
    bookList.innerHTML = Mustache.render(template, bookLibrary);
  }
};

addBookButton.addEventListener('click', bookLibrary.addBook.bind(bookLibrary));

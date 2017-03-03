var addBookButton = document.getElementById('addBookButton');
var bookList = document.getElementById('bookList');

var Book = {
  title: '',
  author: '',
  rating: '',
  createBook: function(arr){
    let book = Object.create(Book);
    console.log(arr);
    return book;
  }
};

var bookLibrary = {
  books: [],
  getBookInfo: function(){
    var bookTitle = document.getElementById('bookTitle').value;
    var bookAuthor = document.getElementById('bookAuthor').value;
    var bookRating =document.getElementById('bookRating').value;
    var bookInfo = [bookTitle, bookAuthor, bookRating];
    return bookInfo;
  },
  addBook: function(){
    bookInfo = this.getBookInfo();
    var newBook = Book.createBook(bookInfo);
    this.books.unshift(newBook);
    this.renderBooks();
  },
  renderBooks: function(){
    this.books.forEach(function(book){
      //console.log(book);
      let li = document.createElement('li');
      li.className="list-group-item";
      let h4 = document.createElement('h4');
      h4.innerHTML = book;
      li.appendChild(h4);
      bookList.appendChild(li);
    });
  }
};

addBookButton.addEventListener('click', bookLibrary.addBook);

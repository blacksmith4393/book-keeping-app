import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  book: object = {};
  bookResults: object[];

  constructor(
    private booksService: BooksService
  ) { }

  ngOnInit() {
    this.bookResults = null;
  }

  onSearchSubmit(e){
    e.preventDefault();
    console.log(this.book);
    this.booksService.searchBooks(this.book).subscribe(
      books => {
        this.bookResults = books.items;
        console.log(this.bookResults);
      },
      err => {
        console.log(err);
        return false;
      }
    );
    
  }
}

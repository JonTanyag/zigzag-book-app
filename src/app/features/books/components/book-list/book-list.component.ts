import { Component, OnInit } from '@angular/core';
import { Book } from '../../../../shared/models/book';
import { BookService } from '../../../../shared/service/book.service';


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent implements OnInit {

  books: Book[] = [];

  constructor(private _bookService: BookService){ }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks() {
    this._bookService.getBooks()
    .subscribe(res => {
      this.books = res;
    })
  }
  deleteBook(id: string) {
    this._bookService.deleteBook(id)
                  .subscribe(() => {
                    this.books = this.books.filter(item => item.id != id);
                    console.log("Deleted.") 
                  }); 
  }
}

import { Component, OnInit } from '@angular/core';
import { Book } from '../../../../shared/models/book';
import { BookService } from '../../../../shared/service/book.service';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent implements OnInit {

  books: Book[] = [];
  errorMessage: string | null = null;

  constructor(private _bookService: BookService){ }

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks() {
    this._bookService.getBooks()
    .subscribe(res => {
      this.books = res;
    })
  }

  private handleError(error: HttpErrorResponse){
    if (error.status === 401) {
      this.errorMessage = 'You are not authorized to view this resource.'
    } else {
      this.errorMessage = 'An error occurred.'
    }

    return throwError(error);
  }

  deleteBook(id: number) {
    this._bookService.deleteBook(id)
                  .subscribe(() => {
                    this.books = this.books.filter(item => item.id != id);
                    console.log("Deleted.") 
                  }); 
  }
}

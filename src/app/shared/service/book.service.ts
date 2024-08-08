import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private BASE_URL = "http://localhost:5056/api"

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.BASE_URL + "/books");
  }

  getBook(id: string): Observable<Book> {
    return this.http.get<Book>(this.BASE_URL + "/books/" + id);
  }

  addBook(book: Book): Observable<void> {
    return this.http.post<void>(this.BASE_URL + "/books", {book: book});
  }

  updateBook(id: string, book: Book): Observable<Book> {
    book.id = id;
    return this.http.put<Book>(this.BASE_URL + "/books/" + id, {book: book});
  }

  deleteBook(id: string): Observable<void> {
    return this.http.delete<void>(this.BASE_URL + "/books/" + id);
  }
}

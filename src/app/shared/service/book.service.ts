import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private BASE_URL = "http://localhost:5056"
  private API_KEY = "Your-Secret-Api-Key-Here"
  private header = new HttpHeaders({ 'X-Api-Token': this.API_KEY })

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.BASE_URL + "/books", { headers: this.header });
  }

  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(this.BASE_URL + "/book/" + id, { headers: this.header });
  }

  addBook(book: Book): Observable<void> {
    return this.http.post<void>(this.BASE_URL + "/book", { book: book }, { headers: this.header });
  }

  updateBook(id: number, book: Book): Observable<Book> {
    book.id = id;
    return this.http.put<Book>(this.BASE_URL + "/book/" + id, { book: book }, { headers: this.header });
  }

  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(this.BASE_URL + "/book/" + id, { headers: this.header });
  }
}

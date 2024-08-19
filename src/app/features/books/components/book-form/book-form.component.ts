import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BookService } from '../../../../shared/service/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../../../../shared/models/book';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss'
})
export class BookFormComponent implements OnInit {
  book: Book = {
    id: 0,
    title: '',
    author: '',
    isbn: '',
    publishedDate: new Date()
  };
  bookForm: FormGroup = new FormGroup({});
  readonly: boolean = false;

  constructor(private _bookService: BookService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.readonly = params["readonly"];
    })
  }

  ngOnInit(): void {
    this.loadBook();
  }

  loadBook() {
    let id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (id) {
      this._bookService.getBook(id)?.subscribe((book: Book) => {
        this.book = book; 
        if (this.book.publishedDate) {
          const date = new Date(this.book.publishedDate);
          this.book.publishedDate = date;
        }
      });
    }
  }

  get formattedPublishedDate(): string {
    return this.book.publishedDate.toISOString().split('T')[0];
  }

  set formattedPublishedDate(value: string) {
    const [year, month, day] = value.split('-').map(num => parseInt(num, 10));
    this.book.publishedDate = new Date(year, month - 1, day); 
  }

  isValid() {
    return this.book.title && this.book.author && this.book.isbn && this.book.publishedDate;
  }

  onSubmit() {
    if (this.isValid()) {
      let bookData: Book = this.book;
      let id = this.activatedRoute.snapshot.paramMap.get('id');

      if (id) {
        this._bookService.updateBook(Number(id), bookData).subscribe(res => { this.back(); });
      } else {
        this._bookService.addBook(bookData).subscribe(() => { this.back(); });
      }
    }
  }

  formatDate(date: Date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [month, day, year].join('/');
  }

  back() {
    this.router.navigate(['/list']);
  }
}

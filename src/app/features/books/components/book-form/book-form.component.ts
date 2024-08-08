import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BookService } from '../../../../shared/service/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../../../../shared/models/book';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss'
})
export class BookFormComponent implements OnInit {

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
    this.bookForm = this.formBuilder.group({
      title: [''],
      author: [''],
      isbn: [''],
      publishedDate: [new Date()],
    })
    this.loadBook();
  }

  setReadOnly(readonly: boolean) {
    this.readonly = readonly;
  }

  loadBook() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this._bookService.getBook(id)?.subscribe(res => {
        debugger;
        if (res) {
          res.publishedDate = new Date(this.formatDate(res.publishedDate));
          this.bookForm.patchValue(res);
        }
      });
    }
  }

  onSubmit() {
    if (this.bookForm.valid) {
      let book: Book = this.bookForm.value;
      let id = this.activatedRoute.snapshot.paramMap.get('id');

      if (id) {
        this._bookService.updateBook(id, book).subscribe(res => { this.back(); });
      } else {
        this._bookService.addBook(book).subscribe(() => { this.back(); });
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

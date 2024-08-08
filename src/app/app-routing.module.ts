import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/components/home/home.component';
import { BookListComponent } from './features/books/components/book-list/book-list.component';
import { BookFormComponent } from './features/books/components/book-form/book-form.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "list", component: BookListComponent },
  { path: "new", component: BookFormComponent },
  { path: "edit/:id", component: BookFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

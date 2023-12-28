import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable, catchError, finalize, tap } from 'rxjs';
import { Book } from './models/book';
import { BookService } from './book.service';
import { AddBook } from './models/add-book';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  // Properties for getBooks()
  books$: Observable<Book[]> | undefined;
  isLoadingGetBooks: boolean = true;
  shouldShowGetBooksError: boolean = false;

  // Properties for submitAddBookForm()
  addBookModel: AddBook = {
    title: '',
    author: '',
  };
  isLoadingAddBook: boolean = false;
  shouldShowAddBookError: boolean = false;
  shouldShowAddBookSuccess: boolean = false;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.getBooks();
  }

  public getBooks(): void {
    this.isLoadingGetBooks = true;
    this.shouldShowGetBooksError = false;

    this.books$ = this.bookService.getBooks$().pipe(
      catchError(() => {
        this.shouldShowGetBooksError = true;
        return [];
      }),
      finalize(() => {
        this.isLoadingGetBooks = false;
      })
    );
  }

  submitAddBookForm() {
    this.isLoadingAddBook = true;
    this.shouldShowAddBookError = false;
    this.shouldShowAddBookSuccess = false;

    this.bookService
      .addBook$(this.addBookModel)
      .pipe(
        tap(() => (this.shouldShowAddBookSuccess = true)),
        catchError(() => {
          this.shouldShowAddBookError = true;
          return EMPTY;
        }),
        finalize(() => {
          this.isLoadingAddBook = false;
          this.clearAddBookForm();
        })
      )
      .subscribe(); // BookService.addBooks$() uses http.post which completes the rxjs pipeline. There is no need to unsubscribe
  }

  clearAddBookForm() {
    this.addBookModel = {
      author: '',
      title: '',
    };
  }
}

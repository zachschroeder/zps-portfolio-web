import { Component, OnInit } from '@angular/core';
import { EMPTY, catchError, finalize, tap } from 'rxjs';
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
  books: Book[] = [];
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

  // Properties for deleteBook()
  loadingDeleteBookForId: string = '';

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.getBooks();
  }

  public getBooks(): void {
    this.books = [];
    this.isLoadingGetBooks = true;
    this.shouldShowGetBooksError = false;

    this.bookService
      .getBooks$()
      .pipe(
        catchError(() => {
          this.shouldShowGetBooksError = true;
          return [];
        }),
        finalize(() => {
          this.isLoadingGetBooks = false;
        })
      )
      .subscribe((res) => (this.books = res)); // No need to unsubscribe, BookService.getBooks$() will complete the pipeline
  }

  addBook() {
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
      .subscribe((res) =>
        this.books.push({ id: res.id, title: res.title, author: res.author })
      ); // No need to unsubscribe, BookService.addBook$() will complete the pipeline
  }

  clearAddBookForm() {
    this.addBookModel = {
      author: '',
      title: '',
    };
  }

  deleteBook(id: string) {
    this.loadingDeleteBookForId = id;

    this.bookService
      .deleteBook$(id)
      .pipe(finalize(() => (this.loadingDeleteBookForId = '')))
      .subscribe(() => {
        this.books = this.books.filter((b) => b.id != id);
      }); // No need to unsubscribe, BookService.deleteBook$() will complete the pipeline
  }
}

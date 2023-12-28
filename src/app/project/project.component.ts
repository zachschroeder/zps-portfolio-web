import { Component, OnInit } from '@angular/core';
import { Observable, catchError, finalize } from 'rxjs';
import { Book } from './models/book';
import { BookService } from './book.service';
import { AddBook } from './models/add-book';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  books$: Observable<Book[]> | undefined;

  isLoading: boolean = true;
  shouldShowError: boolean = false;

  addBookModel: AddBook = {
    title: '',
    author: '',
  };

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.getBooks();
  }

  public getBooks(): void {
    this.isLoading = true;
    this.shouldShowError = false;

    this.books$ = this.bookService.getBooks$().pipe(
      catchError(() => {
        this.shouldShowError = true;
        return [];
      }),
      finalize(() => {
        this.isLoading = false;
      })
    );
  }

  submitAddBookForm() {
    this.bookService.addBook$(this.addBookModel).subscribe();
  }
}

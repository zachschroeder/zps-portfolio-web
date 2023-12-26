import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Book } from './models/book';
import { BookService } from './book.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  books$: Observable<Book[]> | undefined;

  isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject(true);
  isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.getBooks();
  }

  public getBooks(): void {
    this.isLoadingSubject.next(true);

    this.books$ = this.bookService
      .getBooks$()
      .pipe(tap(() => this.isLoadingSubject.next(false)));
  }
}

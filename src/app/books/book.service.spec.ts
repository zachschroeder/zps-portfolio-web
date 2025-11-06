import { TestBed } from '@angular/core/testing';
import { BookService } from './book.service';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { of } from 'rxjs';
import { AddBook, Book, DeleteBook } from './book-models';

const mockBookList: Book[] = [
  {
    id: '1',
    title: 'Green Eggs and Ham',
    author: 'Dr. Seuss',
  },
  {
    id: '2',
    title: 'The Hobbit',
    author: 'J. R. R. Tolkien',
  },
];

describe('BookService', () => {
  let service: BookService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(BookService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getBooks$()', () => {
    it('should return an observable of books', async () => {
      // Arrange
      service.getBooks$().subscribe((books) => {
        // Assert
        expect(books).toEqual(mockBookList);
      });

      // Act
      const req = httpTesting.expectOne({ method: 'GET' });
      req.flush(mockBookList);
    });
  });

  describe('addBook$()', () => {
    it('should return an observable of a book', async () => {
      // Arrange
      const addBookDto: AddBook = {
        title: mockBookList[0].title,
        author: mockBookList[0].author,
      };

      service.addBook$(addBookDto).subscribe((book) => {
        // Assert
        expect(book.title).toEqual(addBookDto.title);
      });

      // Act
      const req = httpTesting.expectOne({ method: 'POST' });
      req.flush(mockBookList[0]);
    });
  });

  describe('deleteBook$()', () => {
    it('should return response', async () => {
      // Arrange
      const deleteBook: DeleteBook = {
        id: mockBookList[0].id,
      };

      service.deleteBook$(deleteBook).subscribe((response) => {
        // Assert
        expect(response).toBeNull();
      });

      // Act
      const req = httpTesting.expectOne({ method: 'DELETE' });
      req.flush(null); // Request returns a 204 No Content
    });
  });

  afterEach(() => {
    httpTesting.verify();
  });
});

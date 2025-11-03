import { TestBed } from '@angular/core/testing';
import { BookService } from './book.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { of } from 'rxjs';
import { AddBook, Book } from './book-models';

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
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', [
      'get',
      'post',
      'delete',
    ]);

    TestBed.configureTestingModule({
      imports: [],
      providers: [
        {
          provide: HttpClient,
          useValue: httpClientSpy,
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(BookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getBooks$()', () => {
    it('should return an observable of books', () => {
      // Arrange
      httpClientSpy.get.and.returnValue(of(mockBookList));

      // Act
      service.getBooks$().subscribe((result) => {
        // Assert
        expect(result.length).toEqual(mockBookList.length);
      });
    });
  });

  describe('addBook$()', () => {
    it('should return an observable of a book', () => {
      // Arrange
      httpClientSpy.post.and.returnValue(of(mockBookList[0]));
      var addBookDto: AddBook = {
        title: mockBookList[0].title,
        author: mockBookList[0].author,
      };

      // Act
      service.addBook$(addBookDto).subscribe((result) => {
        // Assert
        expect(result.title).toEqual(addBookDto.title);
      });
    });
  });

  describe('deleteBook$()', () => {
    it('should return response', () => {
      // Arrange
      httpClientSpy.delete.and.returnValue(of(null)); // Request returns a 204 No Content

      // Act
      service.deleteBook$(mockBookList[0]).subscribe((result) => {
        // Assert
        expect(result).toEqual(null);
      });
    });
  });
});

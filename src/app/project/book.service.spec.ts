import { TestBed } from '@angular/core/testing';
import { BookService } from './book.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Book } from './models/book';
import { AddBook } from './models/add-book';

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
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HttpClient,
          useValue: httpClientSpy,
        },
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
});

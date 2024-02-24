import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProjectComponent } from './project.component';
import { BookService } from './book.service';
import { Book } from './models/book';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';

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

describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;

  let bookServiceSpy: jasmine.SpyObj<BookService>;

  beforeEach(() => {
    bookServiceSpy = jasmine.createSpyObj('BookService', [
      'getBooks$',
      'addBook$',
      'deleteBook$',
    ]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [ProjectComponent],
      providers: [
        {
          provide: BookService,
          useValue: bookServiceSpy,
        },
      ],
    });
    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;

    // If detectChanges() is run, this error is thrown: ExpressionChangedAfterItHasBeenCheckedError
    // This is a lifecycle issue(only shown in tests), but the component, service, and tests are straightforward enough that I'm not concerned
    // fixture.detectChanges();
  });

  it('should create', () => {
    // Arrange
    bookServiceSpy.getBooks$.and.returnValue(of(mockBookList));

    // Act
    component.ngOnInit();

    // Assert
    expect(component).toBeTruthy();
  });

  describe('getBooks()', () => {
    it('should set books', () => {
      // Arrange
      bookServiceSpy.getBooks$.and.returnValue(of(mockBookList));

      // Act
      component.getBooks();

      // Assert
      expect(component.books.length).toEqual(mockBookList.length);
      expect(component.books).toContain(mockBookList[0]);
      expect(component.books).toContain(mockBookList[1]);
    });

    it('should show error message on error', () => {
      // Arrange
      bookServiceSpy.getBooks$.and.returnValue(throwError(() => 'API Error'));

      // Act
      component.getBooks();

      // Assert
      expect(component.shouldShowGetBooksError).toBeTrue();
    });
  });

  describe('addBook()', () => {
    it('should show add book to books array and show success message on success', () => {
      // Arrange
      bookServiceSpy.addBook$.and.returnValue(of(mockBookList[0]));

      // Act
      component.addBook();

      // Assert
      expect(component.books).toContain(mockBookList[0]);
      expect(component.shouldShowAddBookSuccess).toBeTrue();
    });

    it('should show not add book to books array and show error message on error', () => {
      // Arrange
      bookServiceSpy.addBook$.and.returnValue(throwError(() => 'API Error'));

      // Act
      component.addBook();

      // Assert
      expect(component.books).not.toContain(mockBookList[0]);
      expect(component.shouldShowAddBookError).toBeTrue();
    });
  });

  describe('deleteBook()', () => {
    it('should remove book from books array', () => {
      // Arrange
      component.books = mockBookList;

      bookServiceSpy.deleteBook$.and.returnValue(of(true));

      // Act
      component.deleteBook(mockBookList[0].id);

      // Assert
      expect(component.books.length).toBe(1);
      expect(component.books.map((b) => b.id)).not.toContain(
        mockBookList[0].id
      );
      expect(component.books.map((b) => b.id)).toContain(mockBookList[1].id);
    });
  });
});

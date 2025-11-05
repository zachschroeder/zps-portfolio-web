import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoviesComponent } from './movies.component';
import { MoviesService } from './movies.service';
import { of } from 'rxjs';
import { Movie } from './movies-models';

describe('MoviesComponent', () => {
  let component: MoviesComponent;
  let fixture: ComponentFixture<MoviesComponent>;
  let mockService = jasmine.createSpyObj('MoviesService', ['fetchMovieList']);

  let mockMovieList: Movie[] = [
    {
      id: '1',
      title: 'The Movie',
      director: 'Mr. Director',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviesComponent],
      providers: [
        {
          provide: MoviesService,
          useValue: mockService,
        },
      ],
    }).compileComponents();

    mockService.fetchMovieList.and.returnValue(of(mockMovieList));

    fixture = TestBed.createComponent(MoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set movies property with value from service onInit', () => {
    // Assert
    expect(mockService.fetchMovieList).toHaveBeenCalled();
    expect(component.movies).toEqual(mockMovieList);
  });
});

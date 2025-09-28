import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MovieListResponse } from './movies-models';
import { MoviesService } from './movies.service';

const mockMovieListResponse: MovieListResponse = {
  status_code: '200',
  movie_list: [
    {
      id: '1',
      title: 'Christoper Nolan',
      director: 'The Dark Knight'
    }
  ]
}

describe('MoviesService', () => {
  let service: MoviesService;
  let httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: httpClientSpy
        }
      ]
    });
    service = TestBed.inject(MoviesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('fetchMovieList should emit to movieList$', () => {
    // Arrange
    httpClientSpy.get.and.returnValue(of(mockMovieListResponse));

    // Assert
    service.movieList$.subscribe(res => expect(res).toBe(mockMovieListResponse.movie_list));

    // Act
    service.fetchMovieList();
  })

});

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { filter, map, Subject, take } from 'rxjs';
import { Movie, MovieListResponse } from './movies-models';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private http = inject(HttpClient);

  private movieListSubject = new Subject<Movie[]>();
  movieList$ = this.movieListSubject
    .asObservable()
    .pipe(filter((val) => !!val));

  fetchMovieList() {
    const route =
      'https://efhveup792.execute-api.us-east-2.amazonaws.com/default/movies';
    return this.http
      .get<MovieListResponse>(route)
      .pipe(
        take(1),
        map((res) => res.movie_list)
      )
      .subscribe((res) => this.movieListSubject.next(res));
  }
}

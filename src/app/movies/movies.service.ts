import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, take } from 'rxjs';
import { MovieListResponse } from './movies-models';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private http = inject(HttpClient);

  fetchMovieList() {
    const route =
      'https://efhveup792.execute-api.us-east-2.amazonaws.com/default/movies';
    return this.http.get<MovieListResponse>(route).pipe(
      take(1),
      map((res) => res.movie_list)
    );
  }
}

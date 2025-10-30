import { NgForOf, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MoviesService } from './movies.service';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [NgForOf, NgIf],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss',
})
export class MoviesComponent implements OnInit {
  service = inject(MoviesService);

  isLoadingGetMovies: boolean = true;
  movies: any[] = [];

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.isLoadingGetMovies = true;
    this.movies = [];

    this.service.fetchMovieList().subscribe((res: any) => {
      this.movies = res;
      this.isLoadingGetMovies = false;
    });
  }
}

import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MoviesService } from './movies.service';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [AsyncPipe, JsonPipe],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss',
})
export class MoviesComponent implements OnInit {
  service = inject(MoviesService);

  ngOnInit(): void {
    this.service.fetchMovieList();
  }
}

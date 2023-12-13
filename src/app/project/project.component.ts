import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Book } from './models/book';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  books$: Observable<Book[]> | undefined;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getBooks();
  }

  public getBooks(): void {
    var headers = new HttpHeaders().set('x-functions-key', environment.apiKey);
    var url = `${environment.apiUrl}/Books`;

    this.books$ = this.http.get<Book[]>(url, {
      headers: headers,
    });
  }
}

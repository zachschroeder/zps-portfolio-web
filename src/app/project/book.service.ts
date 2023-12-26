import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from './models/book';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private headers = new HttpHeaders().set(
    'x-functions-key',
    environment.apiKey
  );

  constructor(private http: HttpClient) {}

  public getBooks$(): Observable<Book[]> {
    var url = `${environment.apiUrl}/Books`;

    return this.http.get<Book[]>(url, {
      headers: this.headers,
    });
  }
}

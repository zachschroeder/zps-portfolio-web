import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from './models/book';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { AddBook } from './models/add-book';

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

  public addBook$(book: AddBook): Observable<Book> {
    var url = `${environment.apiUrl}/book`;

    return this.http.post<Book>(url, book, {
      headers: this.headers,
    });
  }

  public deleteBook$(id: string): Observable<any> {
    var url = `${environment.apiUrl}/book`;

    return this.http.delete<any>(url, {
      headers: this.headers,
      body: `"${id}"`,
    });
  }
}

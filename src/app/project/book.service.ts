import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { AddBook, Book, DeleteBook } from './book-models';

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

  public deleteBook$(deleteBook: DeleteBook): Observable<any> {
    var url = `${environment.apiUrl}/book`;

    return this.http.delete<any>(url, {
      headers: this.headers,
      body: deleteBook,
    });
  }
}

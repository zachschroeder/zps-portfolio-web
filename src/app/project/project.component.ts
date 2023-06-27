import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent {
  functionOneResponse$: Observable<string> | undefined;

  constructor(private http: HttpClient) {}

  public callFunction1(): void {
    var headers = new HttpHeaders().set('x-functions-key', 'INSERT_KEY');

    this.functionOneResponse$ = this.http.get<string>(
      `${environment.apiUrl}/Function1`,
      { headers: headers, responseType: 'text' as 'json' }
    );
  }
}

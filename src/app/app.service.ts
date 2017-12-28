import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, RequestOptions, Headers, RequestOptionsArgs } from '@angular/http';

import { Book } from './app.model';
import { environment } from '../environments/environment';

@Injectable()
export class AppService {

  constructor(private http: Http) { }

  private setHeaders(): Headers {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    headersConfig[environment.authHeader] = environment.authToken;

    return new Headers(headersConfig);
  }

  getAllBooks(): Observable<any> {
    return this.http.get(environment.apiUrl + 'books', new RequestOptions({ headers: this.setHeaders()}));
  }
  getBook(id: number): Observable<any> {
    return this.http.get(environment.apiUrl + 'books/' + id, new RequestOptions({ headers: this.setHeaders()}));
  }
  getFormats(): Observable<any> {
    return this.http.get(environment.apiUrl + 'formats/', new RequestOptions({ headers: this.setHeaders()}));
  }
  getPublisher(id: number): Observable<any> {
    return this.http.get(environment.apiUrl + 'publishers/' + id, new RequestOptions({ headers: this.setHeaders()}));
  }
  getAllCities(): Observable<any> {
    return this.http.get(environment.apiUrl + 'cities/', new RequestOptions({ headers: this.setHeaders()}));
  }
  getAllCountries(): Observable<any> {
    return this.http.get(environment.apiUrl + 'countries/', new RequestOptions({ headers: this.setHeaders()}));
  }
  getAllPublishers(): Observable<any> {
    return this.http.get(environment.apiUrl + 'publishers/', new RequestOptions({ headers: this.setHeaders()}));
  }
  postBook(book: Book): Observable<any> {
    if (book.id) {
      return this.http.put(
        environment.apiUrl + 'books/' + book.id,
        JSON.stringify(book),
        new RequestOptions({ headers: this.setHeaders()})
      );
    } else {
      return this.http.post(
        environment.apiUrl + 'books/',
        JSON.stringify(book),
        new RequestOptions({ headers: this.setHeaders()})
      );
    }
  }



}

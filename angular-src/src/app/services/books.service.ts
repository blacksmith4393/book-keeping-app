import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { tokenNotExpired } from 'angular2-jwt';

import { AppConfig } from '../app.config';

@Injectable()
export class BooksService {
  authToken: string;
  book: object;
  isDev: boolean

  constructor(
    private http: Http,
    private auth: AuthService
  ) {
  }

  searchBooks(search): Observable<any>{
    let headers: Headers = new Headers();
    this.authToken = this.auth.getToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');

    let query: URLSearchParams = new URLSearchParams();
    query.set('title', search.title);
    query.set('author', search.author);

    let requestOptions = new RequestOptions();
    requestOptions.search = query;
    requestOptions.headers = headers;
    
    let ep = this.auth.prepEndpoint('users/search');
    console.log(ep);

    return this.http.get(ep, requestOptions)
      .map(res => res.json());
  }

}

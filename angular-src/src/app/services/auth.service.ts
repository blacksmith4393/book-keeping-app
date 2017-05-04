import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';

import { AppConfig } from '../app.config';

@Injectable()
export class AuthService {
  authToken: string;
  user: string;
  constructor(
    private http: Http, private config: AppConfig
  ) { }

  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post(this.config.apiUrl + '/users/authenticate', user,{headers: headers})
      .map(res => res.json());
  }

  storeUserData(token, user){
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;    
  }
  getProfile(){
    let headers = new Headers();
    this.getToken();
    headers.append('Authorization', this.authToken);
    headers.append('Conten-Type', 'application/json');
    return this.http.get(this.config.apiUrl + '/users/profile',{headers: headers})
      .map(res => res.json());
  }

  getToken(){
    this.authToken = localStorage.getItem('token');
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  loggedIn(){
    return tokenNotExpired('token');
  }
}

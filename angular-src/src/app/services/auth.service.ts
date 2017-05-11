import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';

import { AppConfig } from '../app.config';

@Injectable()
export class AuthService {
  authToken: string;
  user: string;
  isDev: boolean;

  constructor(private http: Http) {
    this.isDev = false;
  }

  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    let ep = this.prepEndpoint('users/register');
    return this.http.post(ep, user,{headers: headers})
      .map(res => res.json());
  }

  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    let ep = this.prepEndpoint('users/authenticate');
    return this.http.post(ep, user,{headers: headers})
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
    headers.append('Content-Type', 'application/json');
    let ep = this.prepEndpoint('users/profile');
    return this.http.get(ep, {headers: headers})
      .map(res => res.json());
  }

  getToken(){
    this.authToken = localStorage.getItem('token');
    return this.authToken;
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  loggedIn(){
    return tokenNotExpired('token');
  }

  prepEndpoint(ep){
    if(this.isDev){
      return ep;
    } else {
      return 'http://localhost:5000/'+ep;
    }
  }  
}

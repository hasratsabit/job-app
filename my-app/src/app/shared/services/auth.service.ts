import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  public url: string = 'http://localhost:3000';
  public authToken: string
  public user: string;
  public userStatus = new Subject<any>();

  constructor(
    private http: HttpClient,
    private jwtHelperService: JwtHelperService
  ) { }

  registerUser(user: User): Observable<any> {
    return this.http.post<any>(`${this.url}/users`, user);
  }

  loginUser(user: User): Observable<any> {
    return this.http.post<any>(`${this.url}/users/login`, user);
  }

  getUserProfile(): Observable<User> {
    return this.http.get<User>(`${this.url}/users/profile`);
  }


  userSignedIn(data) {
    this.userStatus.next(data);
  }

  logoutUser(): Observable<any> {
    return this.http.delete<any>(`${this.url}/users/logout`);
  }

  userIsLoggedIn() {
    const token: string = localStorage.getItem('token');
    this.authToken = token;
    if(!token) {
      return false;
    }
    return this.jwtHelperService.isTokenExpired(token);
  }


  loadToken() {
    this.authToken = localStorage.getItem('token') || 'novalue';
  }

  loadStorageUser() {
    const user = localStorage.getItem('user');
    return JSON.parse(user);
  }

  storeApiToken(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../models/user.model';
import { ErrorService } from './error.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public url: string = 'http://localhost:3000';
  constructor(
    private http: HttpClient,
    private errorService: ErrorService
  ) { }
}

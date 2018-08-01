import { Injectable } from '@angular/core';
import { ErrorTracker } from '../models/error-tracker';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  handleError(error: HttpErrorResponse): Observable<ErrorTracker> {
    const serviceError = new ErrorTracker();
    serviceError.errorNumber = 200;
    serviceError.message = error.statusText;
    serviceError.friendlyMessage = 'An error occurred.';
    return throwError(serviceError);
  }
}

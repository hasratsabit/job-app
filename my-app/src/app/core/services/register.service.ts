import { Injectable } from '@angular/core';
import { ErrorService } from '../../shared/service/error.service';
import { HttpClient } from '@angular/common/http';
import { Employer } from '../../shared/models/employer.model';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  public url: string = 'http://localhost:3000';
  constructor(
    private errorService: ErrorService,
    private http: HttpClient
  ) { }

  registerEmployer(employer: Employer): Observable<Employer> {
    return this.http.post<Employer>(`${this.url}/employer`, employer);
  }
}

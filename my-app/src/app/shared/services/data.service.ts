import { JobModel } from './../models/job.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../models/user.model';
import { ErrorService } from './error.service';
import { catchError, map, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { PopupModal } from '../models/popup.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public sharedNotification = new Subject<PopupModal>();

  public url: string = 'http://localhost:3000';
  constructor(
    private http: HttpClient,
    private errorService: ErrorService
  ) { }

  notify(data) {
    this.sharedNotification.next(data);
  }

  // Get Single Job
  getSingleJob(id): Observable<JobModel> {
    return this.http.get<JobModel>(`${this.url}/jobs/${id}`).pipe(
      map((data: any) => data.job),
      tap(data => JSON.stringify(data))
    )
  }
}

import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { JobModel } from './../../shared/models/job.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private url: string = 'http://localhost:3000/jobs';

  constructor(
    private http: HttpClient
  ) { }


  addJob(job: JobModel): Observable<any> {
    return this.http.post<any>(this.url, job);
  }

  getJobsByCreator(): Observable<JobModel[]> {
    return this.http.get<JobModel[]>(`${this.url}/creator`)
  }
}

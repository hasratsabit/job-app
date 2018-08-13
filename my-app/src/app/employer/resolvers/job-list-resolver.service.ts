import { Injectable } from '@angular/core';
import { JobService } from './../services/job.service';
import { JobModel } from './../../shared/models/job.model';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})

export class JobListResolverService implements Resolve<JobModel[]> {
  constructor(private jobService: JobService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<JobModel[]> {
    return this.jobService.getJobsByCreator();
  }
}

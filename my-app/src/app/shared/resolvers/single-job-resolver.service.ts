import { Observable } from 'rxjs/internal/Observable';
import { JobModel } from './../models/job.model';
import { DataService } from './../services/data.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SingleJobResolverService implements Resolve<JobModel> {

  constructor(
    private dataService: DataService,
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<JobModel> {
    const jobId = route.paramMap.get("id");
    return this.dataService.getSingleJob(jobId);
  }
}

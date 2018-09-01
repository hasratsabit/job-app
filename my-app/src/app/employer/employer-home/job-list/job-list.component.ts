import { ActivatedRoute } from '@angular/router';
import { JobService } from './../../services/job.service';
import { JobModel } from './../../../shared/models/job.model';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs';
import { SweetAlertService } from '../../../shared/services/sweet-alert.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit, OnDestroy {

  public allJobs: JobModel[];
  public filteredJobs: JobModel[];
  private sub: Subscription;

  constructor(
    private jobService: JobService,
    private sweetAlertService: SweetAlertService,
    private route: ActivatedRoute
  ) {}





  onDeleteJob(id) {
    this.sweetAlertService.confirmAlert(id);
  }

  onSearchList(query: string): void {
    this.filteredJobs = (query) ?
      this.allJobs.filter(
        jobs => jobs.jobTitle.toLowerCase().includes(query.toLowerCase())) : this.allJobs;
  }



  ngOnInit() {
    this.allJobs = this.route.snapshot.data['jobs'];
    this.filteredJobs = this.allJobs;
  }


  ngOnDestroy() {
 
  }

}

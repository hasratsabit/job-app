import { JobService } from './../../services/job.service';
import { JobModel } from './../../../shared/models/job.model';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {

  public allJobs: JobModel[] = [];

  constructor(
    private jobService: JobService
  ) { }



  ngOnInit() {
    this.jobService.getJobsByCreator().subscribe((jobs: any) => {
      this.allJobs.push(jobs.jobs)
    })
  }

}

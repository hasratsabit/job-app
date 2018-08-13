import { ActivatedRoute } from '@angular/router';
import { JobService } from './../../services/job.service';
import { JobModel } from './../../../shared/models/job.model';

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {

  public allJobs: JobModel[];

  constructor(
    private jobService: JobService,
    private route: ActivatedRoute
  ) { }



  ngOnInit() {
   this.allJobs = this.route.snapshot.data['jobs'];
  }

}

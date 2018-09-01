import { FormProcesserService } from './../../../shared/services/form-processer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { JobModel } from './../../../shared/models/job.model';
import { JobService } from '../../services/job.service';
import { AlertModel } from '../../../shared/models/alert.model';
import { Response } from '../../../shared/models/response.model';
import { Location } from '@angular/common';


@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.scss']
})
export class AddJobComponent implements OnInit {

  public addJobForm: FormGroup;
  public processing: boolean = false;
  public alertMessageIsShown: boolean;
  public routedPage: string;
  public alertData: AlertModel;

  constructor(
    private formBuilder: FormBuilder,
    private jobService: JobService,
    private formProService: FormProcesserService,
    private location: Location
  ) { 
    this.addJobForm = this.formBuilder.group({
      jobTitle: ['', Validators.required],
      companyName: ['', Validators.required],
      jobDescription: ['', Validators.required],
    })
  }


  onPostJob() {
    this.addJobForm.disable();
    this.processing = true;
    const job: JobModel = this.addJobForm.value;
    this.jobService.addJob(job).subscribe((response: Response) => {
      this.addJobIsCompleted(response);
    }, (err) => {
      console.log(err);
    })
  }

  addJobIsCompleted(response: Response) {
    this.alertMessageIsShown = this.formProService.alertMessageIsShowing;
    this.formProService.processingForm = this.addJobForm;
    this.alertData = this.formProService.message;
    this.formProService.routedPage = "/employer/job-list";
    this.formProService.formProccessCompleted(response);
  }

  onCancel(e) {
    e.preventDefault();
    this.location.back();
  }
  ngOnInit() {
    
  }

}

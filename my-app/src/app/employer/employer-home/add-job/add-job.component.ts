import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { JobModel } from './../../../shared/models/job.model';
import { JobService } from '../../services/job.service';
import { AlertModel } from '../../../shared/models/alert.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.scss']
})
export class AddJobComponent implements OnInit {

  public addJobForm: FormGroup;
  public processing: boolean = false;
  public alertMessageIsShown: boolean = false;
  public alertData: AlertModel = {alertClass: "", alertMessage: ""};

  constructor(
    private formBuilder: FormBuilder,
    private jobService: JobService,
    private router: Router
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
    this.jobService.addJob(job).subscribe(res => {
      this.addJobCompleted(res);
    }, (err) => {
      console.log(err);
    })
  }

  addJobCompleted(res) {
    this.showAlertMessage(res);
    if(res.success) {
      this.addJobForm.enable();
      this.addJobForm.reset();
      this.processing = false;
    }else {
      this.addJobForm.enable();
      this.processing = false;
    }
  }

  showAlertMessage(res) {
    this.alertMessageIsShown = true;
    if(res.success) {
      this.alertData.alertClass = "alert--success";
      this.alertData.alertMessage = res.message;
    } else {
      this.alertData.alertClass = "alert--success";
      this.alertData.alertMessage = res.message;
    }

    setTimeout(() => {
      if(res.success) {
        this.router.navigate(['/employer/job-list']);
      }
      this.alertMessageIsShown = false;
    }, 3000)
  }

  ngOnInit() {
  }

}

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { Job } from './../../../shared/models/job.model';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.scss']
})
export class AddJobComponent implements OnInit {

  public addJobForm: FormGroup;
  public processing: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private jobService: JobService
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
    const job: Job = this.addJobForm.value;
    this.jobService.addJob(job).subscribe(res => {
      this.addJobCompleted(res);
    }, (err) => {
      console.log(err);
    })
  }

  addJobCompleted(res) {
    if(res.success) {
      this.addJobForm.enable();
      this.addJobForm.reset();
      this.processing = false;
      console.log(res.message);
    }else {
      this.addJobForm.enable();
      this.processing = false;
      console.log(res);
    }
  }

  ngOnInit() {
  }

}

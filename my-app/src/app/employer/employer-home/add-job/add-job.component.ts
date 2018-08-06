import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { Job } from './../../../shared/models/job.model';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.scss']
})
export class AddJobComponent implements OnInit {

  public addJobForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
  ) { 
    this.addJobForm = this.formBuilder.group({
      jobTitle: ['', Validators.required],
      companyName: ['', Validators.required],
      jobDescription: ['', Validators.required],
    })
  }


  onPostJob() {
    const job: Job = this.addJobForm.value;
    console.log(job);
  }

  ngOnInit() {
  }

}

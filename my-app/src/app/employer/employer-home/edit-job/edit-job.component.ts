import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { JobModel } from './../../../shared/models/job.model';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.scss']
})
export class EditJobComponent implements OnInit {

  public job: JobModel;
  public updateJobForm: FormGroup

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private location: Location
  ) {
    this.updateJobForm = this.formBuilder.group({
      jobTitle: ['', Validators.required],
      companyName: ['', Validators.required],
      jobDescription: ['', Validators.required],
    })
   }

   onCancel(e) {
     e.preventDefault();
     this.location.back();
   }

  ngOnInit() {
    this.job = this.route.snapshot.data['job'];
    
    this.updateJobForm.patchValue({
      jobTitle: this.job.jobTitle,
      companyName: this.job.companyName,
      jobDescription: this.job.jobDescription
    })
  }

}

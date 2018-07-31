import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-job-seeker-register',
  templateUrl: './job-seeker-register.component.html',
  styleUrls: ['./job-seeker-register.component.scss']
})
export class JobSeekerRegisterComponent implements OnInit, AfterViewInit {

  public jobSeekerForm: FormGroup;
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    
  }

}

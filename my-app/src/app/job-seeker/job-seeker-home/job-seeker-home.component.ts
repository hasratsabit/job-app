import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-job-seeker-home',
  templateUrl: './job-seeker-home.component.html',
  styleUrls: ['./job-seeker-home.component.scss']
})
export class JobSeekerHomeComponent implements OnInit {

  public pageTitle: string = 'Job Seeker Dashboard';

  constructor() { }

  ngOnInit() {
  }

}

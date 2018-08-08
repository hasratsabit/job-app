import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/models/user.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-job-seeker-home',
  templateUrl: './job-seeker-home.component.html',
  styleUrls: ['./job-seeker-home.component.scss']
})
export class JobSeekerHomeComponent implements OnInit {

  public pageTitle: string = 'Job Seeker Dashboard';
  public profile: User;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.profile = this.route.snapshot.data['profile'].user;
  }

}

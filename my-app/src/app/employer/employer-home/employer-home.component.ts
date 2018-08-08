import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-employer-home',
  templateUrl: './employer-home.component.html',
  styleUrls: ['./employer-home.component.scss']
})
export class EmployerHomeComponent implements OnInit {

  public pageTitle: string = 'Employer Dashboard';
  public profile: User;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.profile = this.route.snapshot.data['profile'].user;
  }

}

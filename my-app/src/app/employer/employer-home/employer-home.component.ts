import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employer-home',
  templateUrl: './employer-home.component.html',
  styleUrls: ['./employer-home.component.scss']
})
export class EmployerHomeComponent implements OnInit {

  public pageTitle: string = 'Employer Dashboard';

  constructor() { }

  ngOnInit() {
  }

}

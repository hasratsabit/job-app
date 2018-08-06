import { AuthService } from './../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public authService: AuthService
  ) { }


  onLogoutUser(){
    this.authService.logoutUser().subscribe(res => {
      this.authService.authToken = null;
      localStorage.clear();
      console.log(res.message);
    })
  }

  ngOnInit() {
    this.authService.userStatus.subscribe(res => {
      console.log(res._id);
    });
  }

}

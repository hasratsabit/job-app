import { Router } from '@angular/router';
import { AuthService } from './../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }


  onLogoutUser(){
    this.authService.logoutUser().subscribe(res => {
      this.logoutCompleted(res);
    })
  }

  logoutCompleted(res) {
    this.authService.authToken = null;
    localStorage.clear();
    console.log(res.message);
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 2000);
  }

  ngOnInit() {
    this.authService.userStatus.subscribe(res => {
      // console.log(res._id);
    });
  }

}

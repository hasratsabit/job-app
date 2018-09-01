import { Router, Event } from '@angular/router';
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
    this.authService.authToken = null;
    localStorage.clear();
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 2000);
  }

  onLoadUser() {
    const user = this.authService.loadStorageUser();
    this.router.navigate([`${user.userCategory}`]);
  }

  ngOnInit() {
    this.authService.userStatus.subscribe(res => {
      // console.log(res._id);
    });
  }

}

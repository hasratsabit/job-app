import { AuthService } from './../../shared/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/models/user.model';
import { HttpResponse } from 'selenium-webdriver/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup
  public processing: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { 
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }


  onLoginUser() {
    const user: User = this.loginForm.value;
    this.authService.loginUser(user).subscribe((res) => {
      this.loginCompleted(res);
    }, (err) => console.log(err));
  }


  loginCompleted(res) {
    this.authService.storeApiToken(res.token);
    this.authService.userSignedIn(res.userData);
    this.loginForm.disable();
    this.processing = true;
    console.log(res.message);
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 2000);
  }

  ngOnInit() {
  }

}

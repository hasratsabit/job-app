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

  public loginForm: FormGroup;
  public processing: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  onLoginUser() {
    this.processing = true;
    this.loginForm.disable();
    const user: User = this.loginForm.value;
    this.authService.loginUser(user).subscribe((res) => {
      this.loginCompleted(res);
    }, (err) => {
      console.log(err);
    });
  }


  loginCompleted(res) {
    if(res.success) {
      this.authService.storeApiToken(res.token, res.data); // Store the data in the storage.
      this.router.navigate([`${res.data.userCategory}`]);
      console.log(res.message);
    } else {
      this.processing = false;
      this.loginForm.enable();
      console.log(res);
    }

  }

  ngOnInit() {
  }

}

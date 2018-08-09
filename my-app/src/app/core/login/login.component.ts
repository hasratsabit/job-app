import { AlertModel } from './../../shared/models/alert.model';
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
  public alertData: AlertModel = {alertClass: "", alertMessage: ""};
  public alertMessageIsShown: boolean = false;
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
    this.showAlertMessage(res);
    if(res.success) {
      this.authService.storeApiToken(res.token, res.data); // Store the data in the storage.
    } else {
      this.processing = false;
      this.loginForm.enable();
    }
  }

  showAlertMessage(res) {
    this.alertMessageIsShown = true;
    if(res.success) {
      this.alertData.alertClass = "alert--success";
      this.alertData.alertMessage = res.message;
    } else {
      this.alertData.alertMessage = res.message;
      this.alertData.alertClass = "alert--error"
    }
    setTimeout(() => {
      this.alertMessageIsShown = false;
      if(res.success) {
        this.router.navigate([`${res.data.userCategory}`]);
      }
    }, 3000)
  }

  ngOnInit() {
  }

}

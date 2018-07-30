import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employer-register',
  templateUrl: './employer-register.component.html',
  styleUrls: ['./employer-register.component.scss']
})
export class EmployerRegisterComponent implements OnInit {

  public employerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,

  ) {
    this.createEmployerRegisteration();
   }


  createEmployerRegisteration() {
    this.employerForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      confirmEmail: ['', Validators.required],
      companyName: ['', Validators.required],
      companySize: ['', Validators.required],
      serviceCategory: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    })
  }

  ngOnInit() {
  }

}

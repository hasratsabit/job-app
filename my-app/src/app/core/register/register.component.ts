import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registrationForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.createRegistrationForm();
   }



  createRegistrationForm() {
    this.registrationForm = this.formBuilder.group({
      name: ['', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30)
      ])],
      username: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30)
      ])],
      companyName: ['', Validators.required],
      companySize: ['', Validators.required],
      // serviceCategory: ['', Validators.required],
      emailGroup: this.formBuilder.group({
        email: ['', Validators.required],
        confirmEmail: ['', Validators.required],
      }),
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

}
